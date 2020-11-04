import React from 'react';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import RichTextEditor from 'react-rte';
import sanitizeHtml from 'sanitize-html';
import MyEditor from './richTextEditor';

import { createErrorSelector, createLoadingSelector, setError } from '../actions/requestActions';
import ActionTypes from '../actions';
import {
  createItem, fetchItemByID, fetchApproved, updateItemByID
} from '../actions/itemActions';

import { maxContentLength, generateFrontendErrorMessage } from '../constants';

import '../styles/form.scss';

class VoxForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brief_content: '',
      full_content: RichTextEditor.createEmptyValue(),
      url: '',
      type: '',

      briefContentError: '',
      fullContentError: '',
      typeError: '',
      // toError: ''
    };
  }

  componentDidMount() {
    if (this.props.authenticated) {
      if (this.props.match.params.itemID !== 'new') {
        this.props.fetchItemByID(this.props.match.params.itemID, this.loadSaved);
      }
    } else {
      this.props.history.push('/signin');
    }
  }

  validSubmission = (content) => {
    let isValid = true;
    const contentNoTags = content.replace(/(<([^>]+)>)/ig, '');

    if (!contentNoTags.length) { this.setState({ fullContentError: 'content is a required field' }); isValid = false; }
    if (contentNoTags.length > maxContentLength) {
      this.setState({
        fullContentError: `content has a max length of ${maxContentLength} characters, current length is ${contentNoTags.length} characters`
      });
      isValid = false;
    }
    // if (!this.state.(recipients)) { this.setState({ toError: 'please select recipients' }) } // TODO: Update and save "to" field
    if (!this.state.type) { this.setState({ typeError: 'type is a required field' }); isValid = false; }
    if (!this.state.brief_content) { this.setState({ briefContentError: 'brief content is a required field' }); isValid = false; }

    return isValid;
  }

  submit = async () => {
    const content = this.state.full_content.toString('html');
    const newItem = {
      full_content: content,
      brief_content: this.state.brief_content,
      type: this.state.type,
      url: this.state.url,
      status: 'pending'
    };
    const isNew = this.props.match.params.itemID === 'new';

    if (this.validSubmission(content)) {
      try {
      // Runs the appropriate request and THEN pushes to /submissions
        if (isNew) await this.props.createItem(newItem);
        else await this.props.updateItemByID(this.props.match.params.itemID, newItem, this.loadSaved);

        const editingOwn = this.props.item?.submitter_netid === this.props.netid;

        // Only run after createItem OR updateItemByID succeeds
        if (editingOwn) this.props.history.push('/submissions');
        else this.props.history.push('/review');
      } catch (error) {
      // Logs error to console if an action creator rejects
        console.error(error);
      }
    }
  }

  save = () => {
    const content = this.state.full_content.toString('html');

    if (this.validSubmission(content)) {
      const newItem = {
        full_content: content, brief_content: this.state.brief_content, type: this.state.type, url: this.state.url
      };

      const isNew = this.props.match.params.itemID === 'new';
      if (isNew) {
        this.props.createItem(newItem).then(() => this.props.history.push(`/form/${this.props.item._id}`));
      } else {
        const id = this.props.match.params.itemID;
        this.props.updateItemByID(id, newItem, this.loadSaved);
      }
    }
  }

  updateUrl = (e) => { this.setState({ url: e.target.value }); }

  updateBrief = (e) => { this.setState({ brief_content: e.target.value }); }

  updateType = (e) => {
    const type = e.target.id;
    this.setState({ type });
  }

  updateFull = (value) => {
    this.setState({ full_content: value });
  }

  loadSaved = (res) => {
    const item = res.data;
    this.setState({
      url: item.url,
      brief_content: item.brief_content,
      full_content: RichTextEditor.createValueFromString(item.full_content, 'html'),
      type: item.type
    });
  }

  render() {
    const isNew = this.props.match.params.itemID === 'new';
    const editingOwn = this.props.item?.submitter_netid === this.props.netid;
    const reviewerEdit = this.props.reviewer;
    const edititableStatus = this.props.item?.status === 'draft' || this.props.item?.status === 'rejected';
    const editable = isNew || (editingOwn && edititableStatus) || reviewerEdit;
    console.log(isNew, editingOwn, edititableStatus, reviewerEdit, editable);
    let buttons = <div />;
    if (editable) {
      buttons = (
        <div>
          <button variant="primary" type="button" onClick={this.submit}>
            Submit
          </button>
          <button variant="primary" type="button" onClick={this.save}>
            Save
          </button>
        </div>
      );
    } else {
      buttons = (
        <div>
          <p>Submitted, not editable</p>
        </div>
      );
    }

    const cleanHTML = sanitizeHtml(this.state.full_content.toString('html'));

    const header = isNew ? <h1>New Submission</h1> : <h1>Edit Submission</h1>;

    return (
      <div className="container">
        <div className="header">
          {header}
        </div>
        <div className="form-div">
          <Form>
            <Form.Group>
              <Form.Label>To:</Form.Label>
              <Form.Group>
                <Form.Check inline type="checkbox" disabled={!editable} label="Group 1" />
                <Form.Check inline type="checkbox" disabled={!editable} label="Group 2" />
                <Form.Check inline type="checkbox" disabled={!editable} label="Group 3" />
              </Form.Group>
              <Form.Label>Type: *</Form.Label>
              <Form.Group>
                <Form.Check
                  inline
                  name="type"
                  type="radio"
                  label="Event"
                  id="event"
                  onChange={this.updateType}
                  checked={this.state.type === 'event'}
                  disabled={!editable}
                />
                <Form.Check
                  inline
                  name="type"
                  type="radio"
                  label="Announcement"
                  id="announcement"
                  onChange={this.updateType}
                  checked={this.state.type === 'announcement'}
                  disabled={!editable}
                />
                <Form.Check
                  inline
                  name="type"
                  type="radio"
                  label="News"
                  id="news"
                  onChange={this.updateType}
                  checked={this.state.type === 'news'}
                  disabled={!editable}
                />
              </Form.Group>
              <div className="form-error-container">{generateFrontendErrorMessage(this.state.typeError)}</div>
            </Form.Group>
            <Form.Group>
              <Form.Label>Brief Description: *</Form.Label>
              <Form.Control
                type="text"
                value={this.state.brief_content}
                onChange={this.updateBrief}
                disabled={!editable}
              />
              <div className="form-error-container">{generateFrontendErrorMessage(this.state.briefContentError)}</div>
            </Form.Group>
            <Form.Group>
              <Form.Label>Summary: *</Form.Label>
              <MyEditor
                value={this.state.full_content}
                onChange={this.updateFull}
                readOnly={!editable}
              />
              <div className="form-error-container">{generateFrontendErrorMessage(this.state.fullContentError)}</div>
            </Form.Group>
            <Form.Group>
              <Form.Label>URL:</Form.Label>
              <Form.Control type="text" value={this.state.url} disabled={!editable ? true : null} onChange={this.updateUrl} />
            </Form.Group>
            {buttons}
          </Form>

          {generateFrontendErrorMessage(this.props.itemErrorMessage)}

          <h3 className="preview-header">Content Preview</h3>
          <div className="preview">
            <h3>{this.state.brief_content}</h3>
            {/* eslint-disable-next-line react/no-danger */}
            <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />
            <p>For more information:</p>
            <a href={this.state.url}>{this.state.url}</a>
          </div>
        </div>
      </div>
    );
  }
}

const itemSelectorActions = [ActionTypes.FETCH_ITEM, ActionTypes.FETCH_ITEMS, ActionTypes.DELETE_ITEM];

const mapStateToProps = (state) => ({
  itemIsLoading: createLoadingSelector(itemSelectorActions)(state),
  itemErrorMessage: createErrorSelector(itemSelectorActions)(state),

  item: state.item.selected,
  authenticated: state.auth.authenticated,
  netid: state.auth.netid,
  reviewer: state.auth.reviewer
});

export default connect(mapStateToProps, {
  createItem, fetchItemByID, fetchApproved, updateItemByID, setError,
})(VoxForm);
