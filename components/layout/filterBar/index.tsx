import { PostPublishType, PostStatus } from 'types/post';
import styles from './filterBar.module.scss';

export interface FilterBarProps {
  status: PostStatus | '',
  type: PostPublishType | '',
  setStatus: (status: PostStatus | '') => void
  setType: (type: PostPublishType | '') => void,

  hideStatus?: boolean,
  hideType?: boolean
}

const FilterBar = ({
  status, type, setStatus, setType, hideStatus = false, hideType = false
}: FilterBarProps): JSX.Element => (
  <div className={styles.filterBarContainer}>
    {!hideStatus && (
      <div className={styles.selectContainer}>
        <label htmlFor="post-status">
          Post Status
        </label>

        <select
          id="post-status"
          name="current post status"
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
    )}

    {!hideType && (
      <div className={styles.selectContainer}>
        <label htmlFor="post-type">
          Post Type
        </label>

        <select
          id="post-type"
          name="post type"
          value={type}
          onChange={(e) => setType((e.target.value) as (PostPublishType | ''))}
        >
          <option value="">View All</option>
          <option value="news">News</option>
          <option value="announcement">Announcement</option>
          <option value="event">Event</option>
        </select>
      </div>
    )}
  </div>
);

export default FilterBar;
