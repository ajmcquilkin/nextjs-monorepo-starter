/* eslint-disable jsx-a11y/label-has-associated-control */
// This warning can be ignored: nested labels and inputs are valid HTML

import React from 'react';
import { connect } from 'react-redux';
import RichTextEditor from 'react-rte';
import sanitizeHtml from 'sanitize-html';

import FormSection from './FormSection';
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
    if (this.props.match.params.itemID !== 'new') {
      this.props.fetchItemByID(this.props.match.params.itemID, this.loadSaved);
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

        // Only run after createItem OR updateItemByID succeeds
        this.props.history.push('/submissions');
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
    const editable = isNew || (this.props.item && this.props.item.status === 'draft');

    const cleanHTML = sanitizeHtml(this.state.full_content.toString('html'));
    return (
      <div className="form-container">
        <h1>{isNew ? 'New Submission' : 'Edit Submission'}</h1>
        <form>
          <FormSection title="Recipients">
            <div id="form-from-container">
              <label className="form-label-large">
                From
                <span className="form-required-field">*</span>
                <br />
                <input placeholder="Type department or division name here" type="text" />
              </label>
            </div>

            <div id="form-to-container">
              <div className="form-label-large">
                To
                <span className="form-required-field">*</span>
              </div>

              <div id="form-lists-checkbox-container">
                <div className="form-checkbox-column-container">
                  <h3>Undergraduates</h3>

                  <label className="form-label-small">
                    <input type="checkbox" />
                    Class of 2021
                  </label>

                  <label className="form-label-small">
                    <input type="checkbox" />
                    Class of 2022
                  </label>

                  <label className="form-label-small">
                    <input type="checkbox" />
                    Class of 2023
                  </label>

                  <label className="form-label-small">
                    <input type="checkbox" />
                    Class of 2024
                  </label>

                  <button type="button">All</button>
                </div>

                <div className="form-checkbox-column-container">
                  <h3>Undergraduates</h3>

                  <label className="form-label-small">
                    <input type="checkbox" />
                    Class of 2021
                  </label>

                  <label className="form-label-small">
                    <input type="checkbox" />
                    Class of 2022
                  </label>

                  <label className="form-label-small">
                    <input type="checkbox" />
                    Class of 2023
                  </label>

                  <label className="form-label-small">
                    <input type="checkbox" />
                    Class of 2024
                  </label>

                  <button type="button">All</button>
                </div>

                <div className="form-checkbox-column-container">
                  <h3>Undergraduates</h3>

                  <label className="form-label-small">
                    <input type="checkbox" />
                    Class of 2021
                  </label>

                  <label className="form-label-small">
                    <input type="checkbox" />
                    Class of 2022
                  </label>

                  <label className="form-label-small">
                    <input type="checkbox" />
                    Class of 2023
                  </label>

                  <label className="form-label-small">
                    <input type="checkbox" />
                    Class of 2024
                  </label>

                  <button type="button">All</button>
                </div>

                <div className="form-checkbox-column-container">
                  <h3>Undergraduates</h3>

                  <label className="form-label-small">
                    <input type="checkbox" />
                    Class of 2021
                  </label>

                  <label className="form-label-small">
                    <input type="checkbox" />
                    Class of 2022
                  </label>

                  <label className="form-label-small">
                    <input type="checkbox" />
                    Class of 2023
                  </label>

                  <label className="form-label-small">
                    <input type="checkbox" />
                    Class of 2024
                  </label>

                  <button type="button">All</button>
                </div>
              </div>
            </div>
          </FormSection>

          <FormSection title="Publish Date">
            <label id="form-publish-container" className="form-label-large">
              Select Publish Date
              <br />
              <input type="date" />
            </label>
          </FormSection>

          <FormSection title="Type">
            <div id="form-type-radio-container">
              <label id="form-type-container" className="form-label-small">
                <input type="radio" name="form-type" value="News" />
                News
              </label>

              <label id="form-type-container" className="form-label-small">
                <input type="radio" name="form-type" value="Announcement" />
                Announcement
              </label>

              <label id="form-type-container" className="form-label-small">
                <input type="radio" name="form-type" value="Event" />
                Event
              </label>
            </div>

            <label className="form-label-large">
              Event Date
              <br />
              <input type="date" />
            </label>
          </FormSection>

          <FormSection title="Body">
            <p>Hello, world</p>
          </FormSection>

          {/* <FormSection title="Graphics">
            <p>Hello, world</p>
          </FormSection> */}

          {/* <Form.Group>
            <Form.Label>To:</Form.Label>
            <Form.Group>
              <Form.Check inline type="checkbox" label="Group 1" />
              <Form.Check inline type="checkbox" label="Group 2" />
              <Form.Check inline type="checkbox" label="Group 3" />
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
              />
              <Form.Check
                inline
                name="type"
                type="radio"
                label="Announcement"
                id="announcement"
                onChange={this.updateType}
                checked={this.state.type === 'announcement'}
              />
              <Form.Check
                inline
                name="type"
                type="radio"
                label="News"
                id="news"
                onChange={this.updateType}
                checked={this.state.type === 'news'}
              />
            </Form.Group>
            <div className="form-error-container">{generateFrontendErrorMessage(this.state.typeError)}</div>
          </Form.Group>
          <Form.Group>
            <Form.Label>Brief Description: *</Form.Label>
            <Form.Control type="text" value={this.state.brief_content} onChange={this.updateBrief} />
            <div className="form-error-container">{generateFrontendErrorMessage(this.state.briefContentError)}</div>
          </Form.Group>
          <Form.Group>
            <Form.Label>Summary: *</Form.Label>
            <MyEditor value={this.state.full_content} onChange={this.updateFull} />
            <div className="form-error-container">{generateFrontendErrorMessage(this.state.fullContentError)}</div>
          </Form.Group>
          <Form.Group>
            <Form.Label>URL:</Form.Label>
            <Form.Control type="text" value={this.state.url} onChange={this.updateUrl} />
          </Form.Group> */}
          {editable
            ? (
              <div>
                <button type="button" onClick={this.submit}>Submit</button>
                <button type="button" onClick={this.save}>Save</button>
              </div>
            ) : (
              <div>
                <p>Submitted, not editable</p>
              </div>
            )}

          {generateFrontendErrorMessage(this.props.itemErrorMessage)}

          <h3 className="preview-header">Content Preview</h3>
          <div className="preview">
            <h3>{this.state.brief_content}</h3>
            {/* eslint-disable-next-line react/no-danger */}
            <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />
            <p>For more information:</p>
            <a href={this.state.url}>{this.state.url}</a>
          </div>
        </form>
      </div>
    );
  }
}

const itemSelectorActions = [ActionTypes.FETCH_ITEM, ActionTypes.FETCH_ITEMS, ActionTypes.DELETE_ITEM];

const mapStateToProps = (state) => ({
  itemIsLoading: createLoadingSelector(itemSelectorActions)(state),
  itemErrorMessage: createErrorSelector(itemSelectorActions)(state),

  item: state.item.selected,
});

export default connect(mapStateToProps, {
  createItem, fetchItemByID, fetchApproved, updateItemByID, setError,
})(VoxForm);
