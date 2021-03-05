import { ReactNode } from 'react';
import { useDrop } from 'react-dnd';

import TargetArea from 'components/helpers/targetArea';

import { PostDragItem } from 'types/dnd';

export interface DraggablePostTargetProps {
  onDrop: (item: PostDragItem) => void,
  acceptType: string | string[],
  children: ReactNode
}

const DraggablePostTarget = ({ onDrop, acceptType, children }: DraggablePostTargetProps): JSX.Element => {
  const [{ isOver, isValidTarget }, drop] = useDrop({
    accept: acceptType,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      isValidTarget: !!monitor.canDrop()
    })
  });

  return (
    <div ref={drop}>
      <TargetArea
        isHovered={isOver}
        isValidTarget={isValidTarget}
      >
        {children}
      </TargetArea>
    </div>
  );
};

export default DraggablePostTarget;
