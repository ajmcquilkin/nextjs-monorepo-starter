import React from 'react';
import { connect } from 'react-redux';

import ActionTypes from '../actions';
import { createErrorSelector, createLoadingSelector } from '../actions/requestActions';
import {
  createItem, fetchItemByID, fetchApproved
} from '../actions/itemActions';
import ItemSection from './ItemSection';

import '../styles/webview.scss';

const Webview = ({ items = [], fetchApproved: fetchApprovedAction }) => {
  React.useEffect(() => {
    fetchApprovedAction();
  });

  const itemArray = React.useMemo(() => Object.values(items), [items]);

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const currentDateString = `${month}/${day}/${year}`;

  return (
    <div id="webview-container">
      Add other things here lol (from Adam)

      <div id="webview-header-content-container">

        <div id="webview-title-container">
          <div className="section-bar" />
          <div id="webview-title-text-container">
            <h2>Vox Daily News</h2>
            <p>{currentDateString}</p>
          </div>
          <div className="section-bar" />
        </div>

        <img
          src="https://c1.staticflickr.com/1/660/22036655429_172dbd93b4_b.jpg"
          alt="dartmouth college in the fall"
        />
      </div>

      <div id="webview-sections-container">
        <ItemSection
          title="news"
          subtitle="from the office of communications"
          itemList={itemArray.filter((item) => item.type === 'news')}
        />

        <ItemSection
          title="announcements"
          itemList={itemArray.filter((item) => item.type === 'announcement')}
        />

        <ItemSection
          title="events"
          itemList={itemArray.filter((item) => item.type === 'event')}
        />
      </div>
    </div>
  );
};

const itemSelectorActions = [ActionTypes.FETCH_RESOURCE, ActionTypes.FETCH_RESOURCES, ActionTypes.DELETE_RESOURCE];

const mapStateToProps = (state) => ({
  itemIsLoading: createLoadingSelector(itemSelectorActions)(state),
  itemErrorMessage: createErrorSelector(itemSelectorActions)(state),
  items: (state.item.items) ? state.item.items : state.item.items.filter((item) => item.status === 'approved')
});

export default connect(mapStateToProps, {
  createItem, fetchItemByID, fetchApproved
})(Webview);
