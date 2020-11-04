import React from 'react';
import { connect } from 'react-redux';

import { NavLink } from 'react-router-dom';
import ActionTypes from '../actions';
import { createErrorSelector, createLoadingSelector } from '../actions/requestActions';

import {
  createItem, fetchItemByID, fetchApproved, fetchSubmissions, deleteItemByID
} from '../actions/itemActions';
import Submission from '../components/submission';
import '../styles/submissions.scss';

class Submissions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: ''
    };
  }

  componentDidMount() {
    this.props.fetchSubmissions();
  }

  updateFilter = (e) => {
    this.setState({ filter: e.target.value });
  }

  delete = (id) => {
    this.props.deleteItemByID(id);
  }

  duplicate = (item) => {
    this.props.createItem(item);
  }

  render() {
    const rendered = this.props.items.map((item) => {
      let containsFilter = false;
      if (item.brief_content.toLowerCase().includes(this.state.filter.toLowerCase())) containsFilter = true;
      if (item.full_content.toLowerCase().includes(this.state.filter.toLowerCase())) containsFilter = true;

      if (containsFilter) {
        return (
          <Submission key={item._id} item={item} deleteItem={() => this.delete(item._id)} duplicate={() => this.duplicate(item)} />
        );
      }
      return <div />;
    });
    return (
      <div className="submissions">
        <div className="top-bar">
          <div className="filter-container">
            <input type="text" placeholder="Filter" value={this.state.filter} onChange={(e) => this.updateFilter(e)} />
          </div>
          <div className="button-container">
            <NavLink to="/form/new">
              <button className="new-button" type="button">
                <i className="fa fa-plus-square" />
                {'   '}
                New Submission
              </button>
            </NavLink>
          </div>

        </div>
        <div className="submissions-container">
          {rendered}
        </div>
      </div>
    );
  }
}

const itemSelectorActions = [ActionTypes.FETCH_RESOURCE, ActionTypes.FETCH_RESOURCES, ActionTypes.DELETE_RESOURCE];

const filter = (items) => {
  if (!items) return null;
  const filtered = Object.values(items).filter((item) => item.status === 'draft' || item.status === 'pending');

  filtered.sort((a, b) => new Date(b.last_edited).getTime() - new Date(a.last_edited).getTime());
  return filtered;
};

const mapStateToProps = (state) => ({
  itemIsLoading: createLoadingSelector(itemSelectorActions)(state),
  itemErrorMessage: createErrorSelector(itemSelectorActions)(state),
  items: filter(state.item.items)

});

export default connect(mapStateToProps, {
  createItem, fetchItemByID, fetchApproved, fetchSubmissions, deleteItemByID
})(Submissions);
