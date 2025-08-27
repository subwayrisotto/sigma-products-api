import React from 'react';
import SearchInputComponent from '../SearchInputComponent/SearchInputComponent';
import styles from './ProductHeaderComponent.module.scss';

function ProductHeaderComponent({onSearch}) {
  return (
    <header className={styles.header}>
        <div className={styles.headerWrapper}>
            <div className={styles.logoCtn}>
                <img src='/logo.svg' alt="logo" />
            </div>

            <div className={styles.searchCtn}>
                <SearchInputComponent onChange={onSearch}/>
            </div>
        </div>
    </header>
  )
}

export default ProductHeaderComponent
