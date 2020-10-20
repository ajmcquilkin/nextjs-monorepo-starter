import React from 'react';
import Form from 'react-bootstrap/Form';
import './styles.scss';
import { connect } from 'react-redux';
import MyEditor from '../richTextEditor';

import { createErrorSelector, createLoadingSelector } from '../../actions/requestActions';
import ActionTypes from '../../actions';

import {
  fetchItems, createItem, fetchItemByID, fetchApproved
} from '../../actions/itemActions';

class VoxForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    if (this.props.match.params.itemID !== 'new') { this.props.fetchItemByID(this.props.match.params.itemID); }
  }

  // TODO: Consolidate form values for submissions
  submit = () => {

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
            <Form.Label>Subject:</Form.Label>
            <Form.Control type="text" defaultValue={this.props.item.brief_content} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Summary:</Form.Label>
            <MyEditor content={this.props.item.full_content} />
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
