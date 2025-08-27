import React, { useEffect, useState } from 'react'
import LoadMoreButtonComponent from '../LoadMoreButtonComponent/LoadMoreButtonComponent';
import ProductCardComponent from '../ProductCardComponent/ProductCardComponent';
import styles from './ProductsListComponent.module.scss'

function ProductsListComponent({products, search}) {
    const [visibleFeaturedProducts, setVisibleFeaturedProducts] = useState(6);
    const [visibleNewProducts, setVisibleNewProducts] = useState(6);
    const [visibleSearchedProducts, setVisibleSearchedProducts] = useState(6);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [newProducts, setNewProducts] = useState([]);

    const [searchedProducts, setSearchedProducts] = useState([]);


    useEffect(() => {
        if(products.length > 0){
            //fetch featured products according to the product rating
            const featured = products.filter(product => product.rating > 4.5);
            setFeaturedProducts(featured)

            //fetch new products according to the product id
            const newArrivals = [...products].sort((a,b) => b.id - a.id);
            setNewProducts(newArrivals) 
        }
    }, [products])

    useEffect(() => {
        if(search !== ''){
            const searched = products.filter(product => {
               return product.title.toLowerCase().includes(search.toLowerCase())
            })
            setSearchedProducts(searched)
        }else{
            setSearchedProducts([]);
        }
    }, [search, products])

    return (
        <div className={styles.productsCardList}>

            {isModalOpen && selectedProduct && (
                <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <div className={styles.productWrapper}>
                            <div className={styles.productImg}>
                                <img src={selectedProduct.thumbnail} alt={selectedProduct.title} />
                            </div>
                            <div className={styles.productCtn}>
                                <h2>{selectedProduct.title}</h2>
                                <p>{selectedProduct.description}</p>
                                <p className={styles.price}>Price: ${selectedProduct.price}</p>
                                <button className={styles.closeButton} onClick={() => setIsModalOpen(false)}>Close</button>
                            </div>
                        </div>

                        <div className={styles.productReviews}>
                            {
                                selectedProduct.reviews.map((review, index) => {
                                    return(
                                        <div className={styles.review} key={index}>
                                            <div className={styles.reviewText}>{review.comment}</div>
                                            <div className={styles.reviewRating}>
                                                {Array.from({ length: review.rating }).map((_, index) => (
                                                    <img key={index} src="/star.svg" alt="star" />
                                                ))}
                                            </div>
                                            <div className={styles.reviewerName}>{review.reviewerName}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            )}

            {
                search ? (
                    <div className={styles.searchedProductsWrapper}>
                        <p className={styles.header}>Search result</p>
                        <div className={styles.searchedProductsList}>
                        {
                            searchedProducts.length > 0 ? (
                                searchedProducts.slice(0, visibleSearchedProducts).map((product, index) => {
                                    return(
                                        <ProductCardComponent product={product} key={index} onClick={() => {
                                            setSelectedProduct(product);
                                            setIsModalOpen(true);
                                        }}/>
                                    )
                                })
                            ) : <p>No result</p>
                        }
                        {
                            visibleSearchedProducts < searchedProducts.length && <LoadMoreButtonComponent setVisibleProduct={setVisibleSearchedProducts} />
                        }
                        </div>
                    </div>
                ) : (
                    <>
                        <div className={styles.featuredProductsWrapper}>
                            <p className={styles.header}>Featured Products</p>
                            <div className={styles.featuredProductsList}>
                                {
                                    featuredProducts.length > 0 ? (
                                        featuredProducts.slice(0, visibleFeaturedProducts).map((product, index) => {
                                            return(
                                                <ProductCardComponent product={product} key={index} onClick={() => {
                                                    setSelectedProduct(product);
                                                    setIsModalOpen(true);
                                                }}/>
                                            )
                                        })
                                    ) : <p>Loading...</p>
                                }
                                {
                                    visibleFeaturedProducts < featuredProducts.length && <LoadMoreButtonComponent setVisibleProduct={setVisibleFeaturedProducts} />
                                }
                            </div>
                        </div>

                        <div className={styles.newProductsWrapper}>
                            <p className={styles.header}>New Arrivals</p>
                            <div className={styles.newProductsList}>
                                {
                                    newProducts.length > 0 ? (
                                        newProducts.slice(0, visibleNewProducts).map((product, index) => {
                                            return(
                                                <ProductCardComponent product={product} key={index} onClick={() => {
                                                    setSelectedProduct(product);
                                                    setIsModalOpen(true);
                                                }}/>
                                            )
                                        })
                                    ) : <p>Loading...</p>
                                }
                                {
                                    visibleNewProducts < newProducts.length && <LoadMoreButtonComponent setVisibleProduct={setVisibleNewProducts} />
                                }
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default ProductsListComponent
