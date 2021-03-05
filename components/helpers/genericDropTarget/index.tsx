import { ReactNode } from 'react';
import { useTarget } from 'components/helpers/targetArea';

export interface GenericDropTargetProps {
  children: ReactNode,
  className?: string,
  hoveredClassName?: string,
  validClassName?: string,
}

const GenericDropTarget = ({
  children, className = '',
  hoveredClassName = '', validClassName = ''
}: GenericDropTargetProps): JSX.Element => {
  const { isHovered, isValidTarget } = useTarget();

  return (
    <div className={[
      className,
      isHovered ? hoveredClassName : '',
      (isValidTarget && !isHovered) ? validClassName : ''
    ].join(' ')}
    >
      {children}
    </div>
  );
};

export default GenericDropTarget;
