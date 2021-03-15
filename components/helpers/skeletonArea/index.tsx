import { connect } from 'react-redux';

import SkeletonArea, {
  SkeletonAreaPassedProps, SkeletonAreaStateProps, SkeletonAreaDispatchProps,
  SkeletonContext, useSkeletonLoading
} from 'components/helpers/skeletonArea/skeletonArea';

import { RootState } from 'types/state';
import { dispatchAnnouncement } from 'store/actionCreators/announcementActionCreators';

const mapStateToProps = (_state: RootState): SkeletonAreaStateProps => ({

});

const mapDispatchToProps: SkeletonAreaDispatchProps = {
  dispatchAnnouncement
};

const connector = connect<SkeletonAreaStateProps, SkeletonAreaDispatchProps, SkeletonAreaPassedProps>(mapStateToProps, mapDispatchToProps);

export { SkeletonContext, useSkeletonLoading };
export default connector(SkeletonArea);
