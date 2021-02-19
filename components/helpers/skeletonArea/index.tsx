import { createContext, ReactNode, useContext } from 'react';

export const SkeletonContext = createContext(false);

export interface SkeletonAreaProps {
  isLoading: boolean,
  children: ReactNode
}

export const useSkeletonLoading = (): boolean => useContext(SkeletonContext);

const SkeletonArea = ({ isLoading, children }: SkeletonAreaProps): JSX.Element => (
  <SkeletonContext.Provider value={isLoading}>
    {children}
  </SkeletonContext.Provider>
);

export default SkeletonArea;
