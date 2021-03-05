import { createContext, ReactNode, useContext } from 'react';

export interface TargetContext {
  isHovered: boolean,
  isValidTarget: boolean
}

export const TargetContext = createContext<TargetContext>({ isHovered: false, isValidTarget: false });

export interface TargetAreaProps {
  isHovered: boolean,
  isValidTarget: boolean,
  children: ReactNode
}

export const useTarget = (): TargetContext => useContext(TargetContext);

const TargetArea = ({ isHovered, isValidTarget, children }: TargetAreaProps): JSX.Element => (
  <TargetContext.Provider value={{ isHovered, isValidTarget }}>
    {children}
  </TargetContext.Provider>
);

export default TargetArea;
