// Reference: https://react-dnd.github.io/react-dnd/examples/sortable/simple

import { useRef } from 'react';
import { useDrag, useDrop, XYCoord } from 'react-dnd';

import { useSkeletonLoading } from 'components/helpers/skeletonArea';
import CompileSubmission from 'components/submissions/compileSubmission';

import { PostDragItem } from 'types/dnd';
import { Post } from 'types/post';

export interface DraggablePostProps {
  postContent: Post,
  type: string,
  index: number,

  movePost: (dragIndex: number, hoverIndex: number) => void,
  handleEdit: (_id: string) => void,
  handleReject: (_id: string) => void,

  isNew?: boolean,
  className?: string
}

const DraggablePost = ({
  postContent, type, index,
  movePost, handleEdit, handleReject,
  isNew = false, className = ''
}: DraggablePostProps): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const isLoading = useSkeletonLoading();

  const [, drop] = useDrop<PostDragItem, any, any>({
    accept: type,
    hover: (item, monitor) => {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      // Determine location of dragged element relative to target component
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return; // Dragging downwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return; // Dragging upwards

      movePost(dragIndex, hoverIndex);

      // * Mutation optimizes performance as opposed to linear search
      // eslint-disable-next-line no-param-reassign
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag<PostDragItem, any, { isDragging: boolean }>({
    item: { type, id: postContent._id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    })
  });

  drag(drop(ref));

  return (
    <div
      style={{ opacity: isDragging ? 0.5 : 1 }}
      aria-label={`post with title ${postContent.briefContent}` || `post with id ${postContent._id}`}
      ref={ref}
    >
      {isLoading
        ? <div style={{ background: 'gray', width: '100%', height: '100px' }} />
        : (
          <div className={className}>
            <CompileSubmission
              postContent={postContent}
              handleEdit={handleEdit}
              handleReject={handleReject}
              isNew={isNew}
            />
          </div>
        )}
    </div>
  );
};

export default DraggablePost;
