import React from 'react';
import styles from './ProductCardComponent.module.scss';

function ProductCardComponent({product, onClick}) {
    const { title, price, images } = product;

    const placeholderUrl = `https://placehold.co/176x176?text=${title.length > 14 ? title.slice(0,14)+'...' : title}`;

    return (
        <div className={styles.productCard} onClick={onClick}>
            <div className={styles.productCardImg}>
                <img src={images && images.length > 0 ? images[0] : placeholderUrl} alt={title} />
            </div>
            <div className={styles.productCardInfo}>
                <p className={styles.productName}>{title.length > 14 ? title.slice(0, 14)+'...' : title}</p>
                <p className={styles.productPrice}>${price}</p>
            </div>
        </div>
    )
}

export default ProductCardComponent
