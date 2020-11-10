import React from 'react';
import { connect } from 'react-redux';

import { NavLink } from 'react-router-dom';
import ActionTypes from '../actions';
import { createErrorSelector, createLoadingSelector } from '../actions/requestActions';

import {
  createItem, fetchItemByID, fetchApproved, fetchSubmissions, deleteItemByID, fetchReview, updateItemByID
} from '../actions/itemActions';
import ReviewItem from '../components/reviewItem';
import '../styles/submissions.scss';

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: ''
    };
  }

  componentDidMount() {
    if (this.props.authenticated) {
      if (this.props.reviewer) this.props.fetchReview();
    } else {
      this.props.history.push('/signin');
    }
  }

  updateFilter = (e) => {
    this.setState({ filter: e.target.value });
  }

  reject = (item) => {
    const newItem = { ...item, status: 'rejected' };
    this.props.updateItemByID(item._id, newItem, this.loadSaved);
  }

  approve = (item) => {
    const newItem = { ...item, status: 'approved' };
    this.props.updateItemByID(item._id, newItem, this.loadSaved);
  }

  keywordFilter = (items) => {
    const rendered = items.map((item) => {
      let containsFilter = false;
      if (item.brief_content.toLowerCase().includes(this.state.filter.toLowerCase())) containsFilter = true;
      if (item.full_content.toLowerCase().includes(this.state.filter.toLowerCase())) containsFilter = true;

      if (containsFilter) {
        return (
          <ReviewItem key={item._id} item={item} reject={() => this.reject(item)} approve={() => this.approve(item)} />
        );
      }
      return <div />;
    });
    return rendered;
  }

  render() {
    const pending = this.keywordFilter(this.props.pending);
    const approved = this.keywordFilter(this.props.approved);
    const published = this.keywordFilter(this.props.published);

    return (
      <div className="submissions">
        <div className="top-bar">
          <div className="filter-container">
            <input type="text" placeholder="Filter" value={this.state.filter} onChange={(e) => this.updateFilter(e)} />
          </div>

        </div>
        <div className="submissions-container">

          <h3>{`Pending (${pending.length})`}</h3>
          {pending}
          <h3>{`Approved (${approved.length})`}</h3>
          {approved}
          <h3>{`Published (${published.length})`}</h3>
          {published}
        </div>
      </div>
    );
  }
}

const itemSelectorActions = [ActionTypes.FETCH_RESOURCE, ActionTypes.FETCH_RESOURCES, ActionTypes.DELETE_RESOURCE];

const filter = (items) => {
  if (!items) return null;
  const filtered = Object.values(items).filter((item) => item.status === 'pending' || item.status === 'approved' || item.status === 'rejected');

  filtered.sort((a, b) => new Date(b.last_edited).getTime() - new Date(a.last_edited).getTime());
  return filtered;
};

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
  netid: state.auth.netid,
  reviewer: state.auth.reviewer,

  itemIsLoading: createLoadingSelector(itemSelectorActions)(state),
  itemErrorMessage: createErrorSelector(itemSelectorActions)(state),
  items: filter(state.item.items),

  pending: filter(state.item.items).filter((item) => item.status === 'pending'),
  approved: filter(state.item.items).filter((item) => item.status === 'approved'),
  published: filter(state.item.items).filter((item) => item.status === 'published'),
  rejected: filter(state.item.items).filter((item) => item.status === 'rejected')
});

export default connect(mapStateToProps, {
  createItem, fetchItemByID, fetchApproved, fetchSubmissions, deleteItemByID, fetchReview, updateItemByID
})(Review);
