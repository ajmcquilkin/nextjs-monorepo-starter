import styles from './searchBar.module.scss';

export interface SearchBarProps {
  query: string,
  setQuery: (query: string) => void
}

const SearchBar = ({ query, setQuery }: SearchBarProps): JSX.Element => (
  <div className={styles.searchBarContainer}>
    <label htmlFor="search-bar" className="visually-hidden">Search your posts</label>
    <img src="/icons/search.svg" alt="magnifying glass" aria-hidden="true" />
    <input id="search-bar" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search post content" />
  </div>
);

export default SearchBar;
