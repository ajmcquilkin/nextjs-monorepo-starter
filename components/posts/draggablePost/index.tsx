import { useDrag } from 'react-dnd';
import PostContent from 'components/posts/postContent';

import { PostDragItem } from 'types/dnd';
import { Post } from 'types/post';

export interface DraggablePostProps {
  postContent: Post,
  type: string
}

const DraggablePost = ({ postContent, type }: DraggablePostProps): JSX.Element => {
  const [{ isDragging }, drag] = useDrag<PostDragItem, any, { isDragging: boolean }>({
    item: { type, id: postContent._id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      dropResult: monitor.getDropResult()
    })
  });

  return (
    <div ref={drag}>
      <PostContent content={postContent} />
    </div>
  );
};

export default DraggablePost;
