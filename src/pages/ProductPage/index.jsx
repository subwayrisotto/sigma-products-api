import React, { useState, useEffect } from 'react';
import ProductHeaderComponent from '../../components/ProductHeaderComponent/ProductHeaderComponent';
import ProductsListComponent from '../../components/ProductsListComponent/ProductsListComponent';

const fetchURL = 'https://dummyjson.com/products?limit=150';

function ProductPage() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            const result = await fetch(fetchURL);
            const json = await result.json();
            
            setProducts(json.products)
        }

        fetchProducts()
    }, []);

    return (
        <div>
            <ProductHeaderComponent onSearch={setSearch}/>
            <ProductsListComponent products={products} search={search}/>
        </div>
    )
}

export default ProductPage
