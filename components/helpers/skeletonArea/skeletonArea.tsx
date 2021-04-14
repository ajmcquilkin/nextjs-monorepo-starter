import {
  createContext, ReactNode,
  useContext, useEffect, useState
} from 'react';

import { dispatchAnnouncement as dispatchAnnouncementImport } from 'store/actionCreators/announcementActionCreators';

export const SkeletonContext = createContext(false);
export const useSkeletonLoading = (): boolean => useContext(SkeletonContext);

export interface SkeletonAreaPassedProps {
  isLoading: boolean,
  name: string,
  children: ReactNode
}

export interface SkeletonAreaStateProps {

}

export interface SkeletonAreaDispatchProps {
  dispatchAnnouncement: typeof dispatchAnnouncementImport,
}

export type SkeletonAreaProps = SkeletonAreaPassedProps & SkeletonAreaStateProps & SkeletonAreaDispatchProps;

const SkeletonArea = ({
  isLoading, name, children, dispatchAnnouncement
}: SkeletonAreaProps): JSX.Element => {
  const [hasBeenLoading, setHasBeenLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isLoading) {
      setHasBeenLoading(true);
      dispatchAnnouncement(`Area "${name}" is loading`);
    } else if (hasBeenLoading) {
      dispatchAnnouncement(`Area "${name}" has finished loading`);
    }
  }, [isLoading]);

  return (
    <SkeletonContext.Provider value={isLoading}>
      {children}
    </SkeletonContext.Provider>
  );
};

export default SkeletonArea;
