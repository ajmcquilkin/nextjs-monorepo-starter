import React from 'react';
import { connect } from 'react-redux';

import { NavLink } from 'react-router-dom';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import ActionTypes from '../actions';
import { createErrorSelector, createLoadingSelector } from '../actions/requestActions';
import CompileItem from '../components/compileItem';
import {
  createItem, fetchItemByID, fetchApproved, fetchSubmissions, deleteItemByID, updateItemByID
} from '../actions/itemActions';
import '../styles/compile.scss';

const SortableItem = SortableElement(({ value }) => (
  <CompileItem item={value} />
));

const SortableList = SortableContainer(({ items }) => (
  <ul>
    {items.map((value, index) => (
      <SortableItem key={`item-${value._id}`} index={index} order={value.publish_order} value={value} />
    ))}
  </ul>
));

class Compile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedAnnouncements: [],
      sortedNews: [],
      sortedEvents: []

    };
  }

  async componentDidMount() {
    if (this.props.authenticated) {
      await this.props.fetchApproved();
      this.props.approved.sort((a, b) => ((a.publish_order > b.publish_order) ? 1 : -1));

      this.setState({
        sortedAnnouncements: this.props.approved.filter((item) => item.type === 'announcement'),
        sortedNews: this.props.approved.filter((item) => item.type === 'news'),
        sortedEvents: this.props.approved.filter((item) => item.type === 'event'),
      });
    } else {
      this.props.history.push('/signin');
    }
  }

  onSortEndAnnouncements = ({ oldIndex, newIndex }) => {
    this.setState(({ sortedAnnouncements }) => ({
      sortedAnnouncements: arrayMove(sortedAnnouncements, oldIndex, newIndex),
    }));
    this.publish();
  }

  onSortEndNews = ({ oldIndex, newIndex }) => {
    this.setState(({ sortedNews }) => ({
      sortedNews: arrayMove(sortedNews, oldIndex, newIndex),
    }));
    this.publish();
  }

  onSortEndEvents = ({ oldIndex, newIndex }) => {
    this.setState(({ sortedEvents }) => ({
      sortedEvents: arrayMove(sortedEvents, oldIndex, newIndex),
    }));
    this.publish();
  }

  publish = () => {
    console.log('jere');
    const lists = [this.state.sortedAnnouncements, this.state.sortedEvents, this.state.sortedNews];
    lists.forEach((list) => {
      for (let index = 0; index < list.length; index += 1) {
        const item = list[index];
        item.publish_order = index;
        this.props.updateItemByID(item._id, item);
      }
    });
  }

  render() {
    return (
      <div className="submissions">
        <div className="top-bar">
          <p>general info</p>
        </div>
        <div className="compile-container">
          <div>
            <h1>News</h1>
            <SortableList items={this.state.sortedNews} onSortEnd={this.onSortEndNews} />
          </div>
          <div>
            <h1>Announcements</h1>
            <SortableList items={this.state.sortedAnnouncements} onSortEnd={this.onSortEndAnnouncements} />
          </div>
          <div>
            <h1>Events</h1>
            <SortableList items={this.state.sortedEvents} onSortEnd={this.onSortEndEvents} />
          </div>

        </div>
        <button type="submit" onClick={this.publish}> Submit</button>
      </div>
    );
  }
}

const itemSelectorActions = [ActionTypes.FETCH_RESOURCE, ActionTypes.FETCH_RESOURCES, ActionTypes.DELETE_RESOURCE];

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
  netid: state.auth.netid,
  reviewer: state.auth.reviewer,

  itemIsLoading: createLoadingSelector(itemSelectorActions)(state),
  itemErrorMessage: createErrorSelector(itemSelectorActions)(state),

  items: state.item.items,
  approved: state.item.items ? Object.values(state.item.items).filter((item) => item.status === 'approved') : [],

});

export default connect(mapStateToProps, {
  createItem, fetchItemByID, fetchApproved, fetchSubmissions, deleteItemByID, updateItemByID
})(Compile);
