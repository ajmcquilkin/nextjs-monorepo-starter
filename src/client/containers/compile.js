import React from 'react';
import { connect } from 'react-redux';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

import ActionTypes from '../actions';
import {
  createItem, fetchItemByID, fetchApproved, fetchSubmissions, deleteItemByID, updateItemByID
} from '../actions/itemActions';
import { createErrorSelector, createLoadingSelector } from '../actions/requestActions';

import CompileItem from '../components/CompileItem';

import { getFullDate } from '../constants';

import '../styles/compile.scss';

const SortableList = SortableContainer(({ items }) => items.map((value, index) => (
  <SortableItem
    key={`item-${value._id}`}
    index={index}
    order={value.publish_order}
    value={value}
  />
)));

const SortableItem = SortableElement(({ value }) => (
  <CompileItem item={value} />
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
      <form className="compile-container">
        <h1>Compile</h1>

        <section id="compile-header-container">
          <h2>{getFullDate()}</h2>
          <div id="compile-header-text-container">
            <p>* Click on the dots on the left and drag and drop to re-order.</p>
            <p>Auto-saved</p>
          </div>
        </section>

        <section id="compile-subject-container">
          <label>
            <h2>Release Subject</h2>
            <input type="text" placeholder="Enter subject of current release" />
          </label>
        </section>

        <section id="compile-image-container">
          <h2>Header Image (optional)</h2>
          <label>
            <p>Image</p>
            <input type="file" alt="Select image to upload" />
          </label>

          <label>
            <p>Image Caption</p>
            <input type="text" placeholder="Enter image caption here" />
          </label>
        </section>

        <section id="compile-qod-container">
          <h2>Quote of the Day (optional)</h2>

          <label>
            <p>Headline</p>
            <input type="text" placeholder="Enter subject of current release" />
          </label>

          <label>
            <p>Content</p>
            <input type="text" placeholder="Enter subject of current release" />
          </label>
        </section>

        <section id="compile-featured-container">
          <h2>Featured Story (optional)</h2>
          <p>TODO: Add story selector here</p>
        </section>

        <section id="compile-news-container">
          <h2>News</h2>
          <SortableList items={this.state.sortedNews} onSortEnd={this.onSortEndNews} />
        </section>

        <section id="compile-announcements-container">
          <h2>Announcements</h2>
          <SortableList items={this.state.sortedAnnouncements} onSortEnd={this.onSortEndAnnouncements} />
        </section>

        <section id="compile-events-container">
          <h2>Events</h2>
          <SortableList items={this.state.sortedEvents} onSortEnd={this.onSortEndEvents} />
        </section>

        <button type="submit" onClick={this.publish}>Publish  (undesigned)</button>
      </form>
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
