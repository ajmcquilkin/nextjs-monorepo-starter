import { useDrag } from 'react-dnd';

export interface DraggablePostProps {
  _id: string,
  type: string
}

const DraggablePost = ({ _id, type }: DraggablePostProps): JSX.Element => {
  const [{ isDragging }, drag] = useDrag({
    item: { type, _id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  });

  return (
    <div ref={drag}>
      {_id}
    </div>
  );
};

export default DraggablePost;
