import { PostPublishType, PostStatus } from 'types/post';
import styles from './filterBar.module.scss';

export interface FilterBarProps {
  status: PostStatus | '',
  type: PostPublishType | '',
  setStatus: (status: PostStatus | '') => void
  setType: (type: PostPublishType | '') => void
}

const FilterBar = ({
  status, type, setStatus, setType
}: FilterBarProps): JSX.Element => (
  <div className={styles.filterBarContainer}>
    <div className={styles.selectContainer}>
      <p>Status</p>
      <select
        name="status"
        value={status}
        onChange={(e) => setStatus((e.target.value) as (PostStatus | ''))}
      >
        <option value="">View All</option>
        <option value="draft">Draft</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
        <option value="published">Published</option>
      </select>
    </div>

    <div className={styles.selectContainer}>
      <p>Type</p>
      <select
        name="postType"
        value={type}
        onChange={(e) => setType((e.target.value) as (PostPublishType | ''))}
      >
        <option value="">View All</option>
        <option value="news">News</option>
        <option value="announcement">Announcement</option>
        <option value="event">Event</option>
      </select>
    </div>
  </div>
);

export default FilterBar;
