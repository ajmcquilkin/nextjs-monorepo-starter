import React from 'react';
import Form from 'react-bootstrap/Form';
import '../styles/form.scss';
import { connect } from 'react-redux';
import RichTextEditor from 'react-rte';
import MyEditor from './richTextEditor';

import { createErrorSelector, createLoadingSelector } from '../actions/requestActions';
import ActionTypes from '../actions';

import {
  fetchItems, createItem, fetchItemByID, fetchApproved, updateItemByID
} from '../actions/itemActions';

class VoxForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brief_content: '',
      full_content: RichTextEditor.createEmptyValue(),
      url: '',
      type: ''
    };
  }

  componentDidMount() {
    if (this.props.match.params.itemID !== 'new') {
      this.props.fetchItemByID(this.props.match.params.itemID, this.loadSaved);
    }
  }

  submit = () => {
    console.log('Submitting:');
    const content = this.state.full_content.toString('html');
    const newItem = {
      full_content: content,
      brief_content: this.state.brief_content,
      type: this.state.type,
      url: this.state.url,
      status: 'pending'
    };
    const isNew = this.props.match.params.itemID === 'new';
    console.log(newItem);
    if (isNew) this.props.createItem(newItem);
    else {
      const id = this.props.match.params.itemID;
      this.props.updateItemByID(id, newItem, this.loadSaved);
    }
    this.props.history.push('/submissions');
  }

  save = () => {
    const content = this.state.full_content.toString('html');
    const newItem = {
      full_content: content, brief_content: this.state.brief_content, type: this.state.type, url: this.state.url
    };
    console.log(newItem);

    const isNew = this.props.match.params.itemID === 'new';
    if (isNew) {
      this.props.createItem(newItem).then(() => this.props.history.push(`/form/${this.props.item._id}`));
    } else {
      const id = this.props.match.params.itemID;
      this.props.updateItemByID(id, newItem, this.loadSaved);
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

    return (
      <div className="form-div">
        <Form>
          <Form.Group>
            <Form.Label>To:</Form.Label>
            <Form.Group>
              <Form.Check inline type="checkbox" label="Group 1" />
              <Form.Check inline type="checkbox" label="Group 2" />
              <Form.Check inline type="checkbox" label="Group 3" />
            </Form.Group>
            <Form.Label>Type:</Form.Label>
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
          </Form.Group>
          <Form.Group>
            <Form.Label>Brief Description:</Form.Label>
            <Form.Control type="text" value={this.state.brief_content} onChange={this.updateBrief} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Summary:</Form.Label>
            <MyEditor value={this.state.full_content} onChange={this.updateFull} />
          </Form.Group>
          <Form.Group>
            <Form.Label>URL:</Form.Label>
            <Form.Control type="text" value={this.state.url} onChange={this.updateUrl} />
          </Form.Group>
          {buttons}
        </Form>
      </div>
    );
  }
}

const itemSelectorActions = [ActionTypes.FETCH_RESOURCE, ActionTypes.FETCH_RESOURCES, ActionTypes.DELETE_RESOURCE];

const mapStateToProps = (state) => ({
  itemIsLoading: createLoadingSelector(itemSelectorActions)(state),
  itemErrorMessage: createErrorSelector(itemSelectorActions)(state),

  item: state.item.selected,
});

export default connect(mapStateToProps, {
  fetchItems, createItem, fetchItemByID, fetchApproved, updateItemByID
})(VoxForm);
