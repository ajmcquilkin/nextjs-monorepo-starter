import { connect } from 'react-redux';

import Redux, { ReduxStateProps, ReduxDispatchProps, ReduxPassedProps } from 'components/pages/redux';

import { createLoadingSelector, createErrorSelector } from 'store/actionCreators/requestActionCreators';
import { fetchResourceById } from 'store/actionCreators/resourceActionCreators';

import { RootState } from 'types/state';

const resourceLoadingSelector = createLoadingSelector(['FETCH_RESOURCE']);
const resourceErrorSelector = createErrorSelector(['FETCH_RESOURCE']);

const mapStateToProps = (state: RootState): ReduxStateProps => ({
  resourceMap: state.resource.resources,
  isLoading: resourceLoadingSelector(state),
  errorMessages: resourceErrorSelector(state)
});

const mapDispatchToProps: ReduxDispatchProps = {
  fetchResourceById
};

const connector = connect<ReduxStateProps, ReduxDispatchProps, ReduxPassedProps>(mapStateToProps, mapDispatchToProps);

export default connector(Redux);
