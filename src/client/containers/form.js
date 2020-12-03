/* eslint-disable jsx-a11y/label-has-associated-control */
// This warning can be ignored: nested labels and inputs are valid HTML

import React from 'react';
import { connect } from 'react-redux';
import RichTextEditor from 'react-rte';
import sanitizeHtml from 'sanitize-html';
import merge from 'lodash.merge';

import FormSection from './FormSection';
import MyEditor from './richTextEditor';

import ContentLengthChecker from '../components/ContentLengthChecker';

import { createErrorSelector, createLoadingSelector, setError } from '../actions/requestActions';
import ActionTypes from '../actions';
import {
  createItem, fetchItemByID, fetchApproved, updateItemByID
} from '../actions/itemActions';

import { maxContentLength, generateFrontendErrorMessage } from '../constants';

import '../styles/form.scss';

// TODO: TESTING ONLY, REMOVE
const tempSendList = [
  'Class of 2021',
  'Class of 2022',
  'Class of 2023',
  'Class of 2024',
  'Class of 2025',
];

// TODO: TESTING ONLY, REMOVE
const tempSendLists = [
  { name: 'Undergraduates', list: tempSendList },
  { name: 'Graduate Students', list: tempSendList },
  { name: 'Faculty', list: tempSendList },
  { name: 'Staff', list: tempSendList },
];

function getUniqueListElementName(listName, listElement) {
  return `${listName} - ${listElement}`;
}

class VoxForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: '',
      brief_content: '',
      full_content: RichTextEditor.createEmptyValue(),
      url: '',
      eventDate: '',
      publishDate: '',
      type: '',

      sendLists: {},

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
                <input
                  placeholder="Type department or division name here"
                  type="text"
                  value={this.state.from}
                  onChange={(e) => this.setState({ from: e.target.value })}
                />
              </label>
            </div>

            <div id="form-to-container">
              <div className="form-label-large">
                To
                <span className="form-required-field">*</span>
              </div>

              <div id="form-lists-checkbox-container">
                {/* TODO: UPDATE WITH LIVE DATA */}
                {tempSendLists.map(({ name, list }) => (
                  <div className="form-checkbox-column-container">
                    <h3>{name}</h3>

                    {list.map((e) => (
                      <label className="form-label-small">
                        <input
                          type="checkbox"
                          checked={!!(this.state.sendLists?.[getUniqueListElementName(name, e)]) || false}
                          value={e}
                          onChange={() => this.setState((prevState) => merge(prevState,
                            {
                              sendLists: {
                                [getUniqueListElementName(name, e)]: !(prevState.sendLists?.[getUniqueListElementName(name, e)] || false)
                              }
                            }))}
                        />
                        {e}
                      </label>
                    ))}

                    <button type="button">All</button>
                  </div>
                ))}
              </div>
            </div>
          </FormSection>

          <FormSection title="Publish Date">
            <label id="form-publish-container" className="form-label-large">
              Select Publish Date
              <br />
              <input
                type="date"
                value={this.state.publishDate}
                onChange={(e) => this.setState({ publishDate: e.target.value })}
              />
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
            <div className="form-error-container">{generateFrontendErrorMessage(this.state.typeError)}</div>

            <label className="form-label-large">
              Event Date
              <br />
              <input
                type="date"
                value={this.state.eventDate}
                onChange={(e) => this.setState({ eventDate: e.target.value })}
              />
            </label>
          </FormSection>

          <FormSection title="Body">
            <div id="form-content-container">
              <label className="form-label-small">
                Headline
                <br />
                <input
                  type="text"
                  placeholder="Enter headline text"
                  value={this.state.brief_content}
                  onChange={(e) => this.setState({ brief_content: e.target.value })}
                />
                <ContentLengthChecker contentLength={this.state.brief_content.length} maxContentLength={50} />
                <div className="form-error-container">{generateFrontendErrorMessage(this.state.briefContentError)}</div>
              </label>

              <label className="form-label-small" htmlFor="form-editor-container">Summary</label>
              <div id="form-editor-container">
                <MyEditor value={this.state.full_content} onChange={this.updateFull} />
                <div className="form-error-container">{generateFrontendErrorMessage(this.state.fullContentError)}</div>
              </div>

              <label className="form-label-small">
                URL
                {' '}
                <br />
                <input type="text" placeholder="Enter post URL" />
              </label>
            </div>
          </FormSection>

          <section id="form-buttons-container">
            {editable
              ? (
                <>
                  <button type="button" id="form-submit-button" onClick={this.submit}>Submit</button>
                  <button type="button" id="form-save-button" onClick={this.save}>Save Draft</button>
                  <button type="button" id="form-cancel-button">Cancel</button>
                </>
              ) : (
                <p>Submitted, not editable</p>
              )}
          </section>

          {generateFrontendErrorMessage(this.props.itemErrorMessage)}

          {/* <h3 className="preview-header">Content Preview</h3>
          <div className="preview">
            <h3>{this.state.brief_content}</h3>
            <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />
            <p>For more information:</p>
            <a href={this.state.url}>{this.state.url}</a>
          </div> */}
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
