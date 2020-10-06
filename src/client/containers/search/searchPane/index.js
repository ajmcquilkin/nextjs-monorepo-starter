import React from 'react';
import { connect } from 'react-redux';

import withLoading from '../../../hocs/withLoading';

import { fetchResources, updateResourceByID } from '../../../actions/resourceActions';
import { createErrorSelector } from '../../../actions/errorActions';
import { createLoadingSelector } from '../../../actions/loadingActions';

import SearchItem from '../../../components/SearchItem';
import SearchBar from '../searchBar';

class SearchPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <SearchBar />

        <div>
          {/* eslint-disable-next-line no-nested-ternary */}
          { this.props.isLoading === false
            ? (
              <>
                {/* Number of results available for given query and filter options */}
                {/* Check if there have been results loaded or if there is an array of resources in redux */}
                <p>
                  {this.props.numResults || (this.props.results && this.props.results.length) ? this.props.numResults || this.props.results.length : 0}
                  {' '}
                  results
                </p>

                {/* Go through passed data array and break into SearchItem elements */}
                {this.props.results && this.props.results.length ? this.props.results.map(element => <SearchItem key={element.id || element._id} displayObject={element} />) : null}
              </>
            )
            : this.props.isLoading ? <div>Searching...</div> : this.props.errorMessage
          }
        </div>
      </div>
    );
  }
}

// Import loading state and error messages of specified actions from redux state
const loadActions = ['SEARCH', 'FETCH_RESOURCES'];
const loadingSelector = createLoadingSelector(loadActions);
const errorSelector = createErrorSelector(loadActions);

const mapStateToProps = state => ({
  results: state.data.resources,
  numResults: state.data.numResults,
  isLoading: loadingSelector(state),
  errorMessage: errorSelector(state),
});

// Calls fetchResources and waits until complete to load SearchPane
const LoadingSearchPane = withLoading(SearchPane, [
  fetchResources,
]);

export default connect(mapStateToProps, { updateResourceByID })(LoadingSearchPane);
