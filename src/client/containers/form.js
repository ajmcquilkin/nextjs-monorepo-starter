import React from 'react';
import Form from 'react-bootstrap/Form';
import '../styles/form.scss';
import { connect } from 'react-redux';
import RichTextEditor from 'react-rte';
import MyEditor from './richTextEditor';

import { createErrorSelector, createLoadingSelector } from '../actions/requestActions';
import ActionTypes from '../actions';

import {
  fetchItems, createItem, fetchItemByID, fetchApproved
} from '../actions/itemActions';

class VoxForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brief_content: '',
      full_content: RichTextEditor.createEmptyValue(),
      url: ''
    };
  }

  componentDidMount() {
    if (this.props.match.params.itemID !== 'new') {
      this.props.fetchItemByID(this.props.match.params.itemID, this.loadSaved);
    }
  }

  // TODO: Consolidate form values for submissions
  submit = () => {
    console.log('Submitting:');
  }

  updateUrl = (e) => { this.setState({ url: e.target.value }); }

  updateBrief = (e) => { this.setState({ brief_content: e.target.value }); }

  updateFull = (value) => {
    this.setState({ full_content: value });
  }

  loadSaved = (res) => {
    const item = res.data;
    this.setState({
      url: item.url,
      brief_content: item.brief_content,
      full_content: RichTextEditor.createValueFromString(item.full_content, 'html')
    });
  }

  render() {
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

          <button variant="primary" type="submit" onClick={this.submit}>
            Submit
          </button>
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
  fetchItems, createItem, fetchItemByID, fetchApproved
})(VoxForm);
