import { connect } from 'react-redux';

import Submission, { SubmissionStateProps, SubmissionDispatchProps, SubmissionPassedProps } from 'components/submissions/submissionsSubmission/submissionsSubmission';

import { createPost, deletePostById } from 'store/actionCreators/postActionCreators';
import { RootState } from 'types/state';

const mapStateToProps = (state: RootState): SubmissionStateProps => ({

});

const mapDispatchToProps: SubmissionDispatchProps = {
  createPost,
  deletePostById,
};

const connector = connect<SubmissionStateProps, SubmissionDispatchProps, SubmissionPassedProps>(mapStateToProps, mapDispatchToProps);

export default connector(Submission);
