import React from 'react';
import { connect } from 'react-redux';

import ActionTypes from '../actions';
import { createErrorSelector, createLoadingSelector } from '../actions/requestActions';
import {
  fetchItems, createItem, fetchItemByID, fetchApproved
} from '../actions/itemActions';
import ItemSection from './ItemSection';

import '../styles/webview.scss';

const Webview = ({ items = [], fetchApproved: fetchApprovedAction }) => {
  React.useEffect(() => {
    fetchApprovedAction();
  });

  const itemArray = React.useMemo(() => Object.values(items), [items]);

  return (
    <div className="webview">
      Add other things here lol (from Adam)

      <div className="webview-sections-container">
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
  fetchItems, createItem, fetchItemByID, fetchApproved
})(Webview);
