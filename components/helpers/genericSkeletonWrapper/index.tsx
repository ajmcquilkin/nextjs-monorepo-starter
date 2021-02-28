import { ReactNode } from 'react';
import { useSkeletonLoading } from 'components/helpers/skeletonArea';
import styles from './genericSkeletonWrapper.module.scss';

export interface GenericSkeletonWrapperProps {
  children: ReactNode
}

const GenericSkeletonWrapper = ({ children }: GenericSkeletonWrapperProps): JSX.Element => {
  const isLoading = useSkeletonLoading();

  return (
    <div className={styles.genericSkeletonWrapperContainer}>
      {isLoading
        ? <div className={styles.loading} />
        : children}
    </div>
  );
};

export default GenericSkeletonWrapper;
