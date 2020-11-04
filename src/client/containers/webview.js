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
  }, []);

  const itemArray = React.useMemo(() => Object.values(items), [items]);

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const currentDateString = `${month}/${day}/${year}`;

  return (
    <div id="webview-container">
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
          src="https://www.insubuy.com/assets/img/schools/dartmouth-college.jpg"
          alt="dartmouth college in the fall"
        />
      </div>

      <div id="webview-main-content-container">

        <div id="webview-featured-story-container">
          <h3>Featured Story</h3>
          <p>
            Dartmouth College is committed to providing a safe, equitable, and respectful environment for all
            members of the Dartmouth Community. The College&apos;s goal is to integrate these values into all we do
            at Dartmouth -- teaching, research, public service, student activities, and business operations.
            To guide us toward this goal, the College has developed programs and tools, which are described on our
            Compliance Resources web page. More text to reach 500 words. This is how much 500 characters looks like.
          </p>
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
