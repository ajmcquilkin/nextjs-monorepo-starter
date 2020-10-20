import React from 'react';
import { connect } from 'react-redux';

import { NavLink } from 'react-router-dom';
import ActionTypes from '../../actions';
import { createErrorSelector, createLoadingSelector } from '../../actions/requestActions';

import {
  fetchItems, createItem, fetchItemByID, fetchApproved, fetchSubmissions
} from '../../actions/itemActions';
import WebviewItem from '../../components/webviewItem';

import './styles.scss';

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

  render() {
    const rendered = Object.values(this.props.items).map((item) => {
      let containsFilter = false;
      if (item.brief_content.toLowerCase().includes(this.state.filter.toLowerCase())) containsFilter = true;
      if (item.full_content.toLowerCase().includes(this.state.filter.toLowerCase())) containsFilter = true;

      if (containsFilter) {
        return (
          <NavLink to={`/form/${item._id}`}>
            <WebviewItem key={item._id} item={item} />
          </NavLink>
        );
      }
      return <div />;
    });

    return (
      <div className="webview">

        <div className="filter-container">
          <input type="text" placeholder="Search" value={this.state.filter} onChange={(e) => this.updateFilter(e)} />
          <br />
        </div>
        <div className="button-container">
          <NavLink to="/form">
            <button type="button"> NEW </button>
          </NavLink>

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

  items: state.item.items,
});

export default connect(mapStateToProps, {
  fetchItems, createItem, fetchItemByID, fetchApproved, fetchSubmissions
})(Submissions);
