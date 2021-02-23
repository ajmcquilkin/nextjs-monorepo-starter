import styles from './searchBar.module.scss';

export interface SearchBarProps {
  query: string,
  setQuery: (query: string) => void
}

const SearchBar = ({ query, setQuery }: SearchBarProps): JSX.Element => (
  <div className={styles.searchBarContainer}>
    <img src="/search.svg" alt="magnifying glass" />
    <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filter your posts here" />
  </div>
);

export default SearchBar;
