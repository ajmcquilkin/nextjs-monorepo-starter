import { useDrag } from 'react-dnd';
import PostContent from 'components/posts/postContent';

import { PostDragItem } from 'types/dnd';
import { Post } from 'types/post';

export interface DraggablePostProps {
  postContent: Post,
  type: string,
  order: number
}

const DraggablePost = ({ postContent, type, order }: DraggablePostProps): JSX.Element => {
  const [{ isDragging }, drag] = useDrag<PostDragItem, any, { isDragging: boolean }>({
    item: { type, id: postContent._id, order },
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
