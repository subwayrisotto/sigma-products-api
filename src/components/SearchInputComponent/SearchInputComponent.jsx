import React from 'react';
import styles from './SearchInputComponent.module.scss';

function SearchInputComponent({onChange}) {
  return (
    <div className={styles.searchInputWrapper}>
        <img src='/search.svg' alt='Search icon' />
        <input type={'text'} onChange={e => onChange(e.target.value)} placeholder="Search for products" className={styles.searchInput} />
    </div>
  )
}

export default SearchInputComponent
