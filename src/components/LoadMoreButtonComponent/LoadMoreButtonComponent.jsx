import React from 'react';
import styles from './LoadMoreButtonComponent.module.scss';

function LoadMoreButtonComponent({setVisibleProduct}) {
  return (
    <div className={styles.loadMoreButtonCtn}>
        <button className={styles.loadMoreButton} type='button' onClick={() => setVisibleProduct(prev => prev + 6)}>Load more</button>
    </div>
  )
}

export default LoadMoreButtonComponent
