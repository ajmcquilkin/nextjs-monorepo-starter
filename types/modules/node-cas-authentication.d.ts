/* eslint-disable camelcase */

declare module 'node-cas-authentication' {
  import type { UrlWithStringQuery } from 'url';

  import http from 'http';
  import https from 'https';

  interface ConfigOptions<InfoType = any> {
    cas_url: string,
    service_url: string,
    return_to: string,

    session_name: string,
    session_info: string,
    destroy_session: boolean,

    cas_version?: string,
    renew?: boolean,

    is_dev_mode?: boolean,
    dev_mode_user?: string,
    dev_mode_info?: InfoType,
  }

  interface CASInstance<InfoType = any> {
    cas_url: ConfigOptions<InfoType>['cas_url'];

    parsed_cas_url: UrlWithStringQuery;

    request_client: typeof http | typeof https;

    cas_host: UrlWithStringQuery['hostname'];

    cas_port: number;

    cas_path: UrlWithStringQuery['pathname'];

    return_to: ConfigOptions<InfoType>['return_to'];

    service_url: ConfigOptions<InfoType>['service_url'];

    service_url_for_api: ConfigOptions<InfoType>['service_url_for_api']

    renew: ConfigOptions<InfoType>['renew'];

    is_dev_mode: ConfigOptions<InfoType>['is_dev_mode'];

    dev_mode_user: ConfigOptions<InfoType>['dev_mode_user'];

    dev_mode_info: ConfigOptions<InfoType>['dev_mode_info'];

    session_name: ConfigOptions<InfoType>['session_name'];

    session_info: ConfigOptions<InfoType>['session_info'];

    destroy_session: ConfigOptions<InfoType>['destroy_session'];

    bounce(req: any, res: any, next: any): void;

    bounce_redirect(req: any, res: any, next: any): void;

    block(req: any, res: any, next: any): void;

    logout(req: any, res: any, next: any): void;
  }

  export default function CASAuthentication<InfoType = any>(options: ConfigOptions<InfoType>): void;
}
