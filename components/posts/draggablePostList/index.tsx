import { ReactNode } from 'react';
import { useDrop } from 'react-dnd';
import { PostDragItem } from 'types/dnd';

export interface DraggablePostTargetProps {
  onDrop: (item: PostDragItem) => void,
  acceptType: string | string[],
  children: ReactNode
}

const DraggablePostTarget = ({ onDrop, acceptType, children }: DraggablePostTargetProps): JSX.Element => {
  const [{ isOver }, drop] = useDrop({
    accept: acceptType,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  });

  return (
    <div ref={drop}>{children}</div>
  );
};

export default DraggablePostTarget;
