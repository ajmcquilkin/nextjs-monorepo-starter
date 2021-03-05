import { ReactNode } from 'react';
import { useTarget } from 'components/helpers/targetArea';

export interface GenericDragTargetProps {
  children: ReactNode,
  className?: string,
  hoveredClassName?: string,
  validClassName?: string,
}

const GenericDragTarget = ({
  children, className = '',
  hoveredClassName = '', validClassName = ''
}: GenericDragTargetProps): JSX.Element => {
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

export default GenericDragTarget;
