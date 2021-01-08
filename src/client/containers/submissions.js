import React from 'react';
import { connect } from 'react-redux';

import { NavLink } from 'react-router-dom';
import ActionTypes from '../actions';
import { createErrorSelector, createLoadingSelector } from '../actions/requestActions';

import {
  createItem, fetchItemByID, fetchApproved, fetchSubmissions, deleteItemByID
} from '../actions/itemActions';
import Submission from '../components/submissionItem';
import '../styles/submissions.scss';

class Submissions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: ''
    };
  }

  componentDidMount() {
    if (this.props.authenticated) this.props.fetchSubmissions();
    else {
      this.props.history.push('/signin');
    }
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

  keywordFilter = (items) => {
    const rendered = items.map((item) => {
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
    return rendered;
  }

  render() {
    const rejected = this.keywordFilter(this.props.rejected);
    const drafts = this.keywordFilter(this.props.drafts);
    const pending = this.keywordFilter(this.props.pending);
    const approved = this.keywordFilter(this.props.approved);
    const published = this.keywordFilter(this.props.published);

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
          <h3>{`Rejected (${rejected.length})`}</h3>
          {rejected}
          <h3>{`Drafts (${drafts.length})`}</h3>
          {drafts}
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

const filter = (items, netid) => {
  if (!items) return null;
  const filtered = Object.values(items).filter((item) => item.submitter_netid === netid);

  filtered.sort((a, b) => new Date(b.last_edited).getTime() - new Date(a.last_edited).getTime());
  return filtered;
};

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
  netid: state.auth.netid,

  itemIsLoading: createLoadingSelector(itemSelectorActions)(state),
  itemErrorMessage: createErrorSelector(itemSelectorActions)(state),
  items: filter(state.item.items, state.auth.netid),

  drafts: filter(state.item.items, state.auth.netid).filter((item) => item.status === 'draft'),
  pending: filter(state.item.items, state.auth.netid).filter((item) => item.status === 'pending'),
  approved: filter(state.item.items, state.auth.netid).filter((item) => item.status === 'approved'),
  rejected: filter(state.item.items, state.auth.netid).filter((item) => item.status === 'rejected'),
  published: filter(state.item.items, state.auth.netid).filter((item) => item.status === 'published'),

});

export default connect(mapStateToProps, {
  createItem, fetchItemByID, fetchApproved, fetchSubmissions, deleteItemByID
})(Submissions);
