import { connect } from 'react-redux';

import Submission, { SubmissionStateProps, SubmissionDispatchProps, SubmissionPassedProps } from 'components/submissions/submissionsSubmission/submissionsSubmission';

import { openModal } from 'store/actionCreators/modalActionCreators';
import { createPost } from 'store/actionCreators/postActionCreators';

import { RootState } from 'types/state';

const mapStateToProps = (_state: RootState): SubmissionStateProps => ({

});

const mapDispatchToProps: SubmissionDispatchProps = {
  openModal,
  createPost,
};

const connector = connect<SubmissionStateProps, SubmissionDispatchProps, SubmissionPassedProps>(mapStateToProps, mapDispatchToProps);

export default connector(Submission);
