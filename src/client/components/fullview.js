import React from 'react';
import '../styles/fullview.scss';
// import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { createErrorSelector, createLoadingSelector } from '../actions/requestActions';
import ActionTypes from '../actions';

import {
  createItem, fetchItemByID, fetchApproved
} from '../actions/itemActions';

class Fullview extends React.Component {
  componentDidMount() {
    if (!(this.props.item && this.props.item._id === this.props.match.params.itemID)) {
      this.props.fetchItemByID(this.props.match.params.itemID);
    }
  }

  render() {
    // const id = this.props.match.params.itemID;
    const item = this.props.item || {};
    console.log(this.props.items);
    return (
      <div className="item">
        <h4>{item.brief_content}</h4>
        <h5>
          {item.from_name}
          {' '}
          {item.from_address}
        </h5>

        <p>
          {item.full_content}
        </p>
      </div>
    );
  }
}
const itemSelectorActions = [ActionTypes.FETCH_RESOURCE, ActionTypes.FETCH_RESOURCES, ActionTypes.DELETE_RESOURCE];

const mapStateToProps = (state) => ({
  itemIsLoading: createLoadingSelector(itemSelectorActions)(state),
  itemErrorMessage: createErrorSelector(itemSelectorActions)(state),

  items: state.item.items,
  item: state.item.selected
});

export default connect(mapStateToProps, {
  createItem, fetchItemByID, fetchApproved
})(Fullview);
