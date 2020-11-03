import React from 'react';
import { connect } from 'react-redux';

// import { NavLink } from 'react-router-dom';
import ActionTypes from '../actions';
import { createErrorSelector, createLoadingSelector } from '../actions/requestActions';
import {
   createItem, fetchItemByID, fetchApproved
} from '../actions/itemActions';
import WebviewItem from '../components/webviewItem';
import '../styles/webview.scss';

class Webview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: ''
    };
  }

  componentDidMount() {
    this.props.fetchApproved();
  }

  updateFilter = (e) => {
    this.setState({ filter: e.target.value });
  }

  render() {
    const rendered = Object.values(this.props.items).map((item) => {
      let containsFilter = false;
      if (item.brief_content.toLowerCase().includes(this.state.filter.toLowerCase())) containsFilter = true;
      if (item.full_content.toLowerCase().includes(this.state.filter.toLowerCase())) containsFilter = true;

      if (containsFilter) return <WebviewItem key={item._id} item={item} />;
      return null;
    });

    return (
      <div className="webview">
        <div className="filter-container">
          <input type="text" placeholder="Filter" value={this.state.filter} onChange={(e) => this.updateFilter(e)} />
          <br />
        </div>

        <div className="item-container">
          {rendered}
        </div>
      </div>
    );
  }
}

const itemSelectorActions = [ActionTypes.FETCH_RESOURCE, ActionTypes.FETCH_RESOURCES, ActionTypes.DELETE_RESOURCE];

const mapStateToProps = (state) => ({
  itemIsLoading: createLoadingSelector(itemSelectorActions)(state),
  itemErrorMessage: createErrorSelector(itemSelectorActions)(state),
  items: (state.item.items) ? state.item.items : state.item.items.filter((item) => item.status === 'approved')
});

export default connect(mapStateToProps, {
   createItem, fetchItemByID, fetchApproved
})(Webview);
