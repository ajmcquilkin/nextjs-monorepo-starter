// Reference: https://github.com/shunnmugam/cas-authentication/blob/master/index.js
// Reference: https://apereo.github.io/cas/4.2.x/images/cas_flow_diagram.png

import axios from 'axios';
import { NextHandler } from 'next-connect';
import { parseStringPromise } from 'xml2js';

import { ServerRequestType, ServerResponseType, ServerSessionInfo } from 'types/server';
import { BadCredentialsError } from 'errors';

export interface casConfigOptions<Info> {
  sessionName: string,
  sessionInfoField: string,
  casServerUrl: string,
  serviceUrl: string,
  isDevMode: boolean,
  devModeUser: string,
  devModeInfo: Info
}

type casMiddleware = (req: ServerRequestType, res: ServerResponseType, next: NextHandler) => void;

export default class CASAuthentication {
  private sessionName: string;

  private sessionInfoField: string;

  private casServerUrl: string;

  private serviceUrl: string;

  private isDevMode: boolean;

  private devModeUser: string;

  private devModeInfo: ServerSessionInfo;

  constructor(config: casConfigOptions<ServerSessionInfo>) {
    this.sessionName = config.sessionName;
    this.sessionInfoField = config.sessionInfoField;
    this.casServerUrl = config.casServerUrl;
    this.serviceUrl = config.serviceUrl;
    this.isDevMode = config.isDevMode;
    this.devModeUser = config.devModeUser;
    this.devModeInfo = config.devModeInfo;
  }

  getAuthenticationServerUrl = (): string => `${this.casServerUrl}?service=${this.serviceUrl}`;

  private _handleTicket = async (req: ServerRequestType, res: ServerResponseType, next: NextHandler): Promise<void> => {
    const { ticket } = req.query;

    const { data: xmlCASResponse } = await axios({
      method: 'GET',
      url: `${this.casServerUrl}/serviceValidate?service=${this.serviceUrl}&ticket=${ticket}`
    });

    const parsedXMLResponse = await parseStringPromise(xmlCASResponse);
    const {
      'cas:serviceResponse': {
        'cas:authenticationSuccess': authenticationSuccessPayload,
        'cas:authenticationFailure': authenticationFailurePayload
      }
    } = parsedXMLResponse;

    if (authenticationFailurePayload) throw new BadCredentialsError(authenticationFailurePayload);

    const {
      'cas:name': name,
      'cas:affil': affiliation,
      'cas:netid': netId,

      'cas:uid': uid,
      'cas:attributes': attributes,

      'cas:isReviewer': isReviewer,
      'cas:isStaff': isStaff,
    } = authenticationSuccessPayload?.[0] || {};

    const sessionInfo: ServerSessionInfo = {
      name, affiliation, netId, uid, attributes, isReviewer: !!isReviewer, isStaff: !!isStaff
    };

    req.session[this.sessionName] = name;
    req.session[this.sessionInfoField] = sessionInfo;

    return next();
  };

  private _handle = async (req: ServerRequestType, res: ServerResponseType, next: NextHandler): Promise<void> => {
    if (req.session[this.sessionName]) return next();

    if (this.isDevMode || __ENABLE_CAS_DEV_MODE__) {
      req.session[this.sessionName] = this.devModeUser;
      req.session[this.sessionInfoField] = this.devModeInfo;
      return next();
    }

    if (req.query?.ticket) {
      await this._handleTicket(req, res, next);
      return next();
    }

    return res.redirect(this.getAuthenticationServerUrl()).end();
  }

  authenticate: casMiddleware = (req, res, next) => {
    this._handle(req, res, next);
  };

  logout: casMiddleware = (req, res) => req.session.destroy((error) => {
    if (error) throw error;
    return res.redirect(`${this.casServerUrl}/logout`).end();
  });
}
