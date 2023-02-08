import React from 'react';
import { useState, useEffect } from 'react';
import Layout from '../Layout';
import { isAuthenticated } from '../../utils/auth'
import { getCategories, getProducts, getProductDetails } from '../../api/apiProduct';
import { showError, showSuccess } from '../../utils/messages'
import CheckBox from './checkbox';
import Card from './Card';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [limit, setLimit] = useState(30);
    const [order, setOrder] = useState('asc');
    const [sortBy, setSortBy] = useState('price');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getProducts(sortBy, order, limit)
            .then(res => setProducts(res.data))
            .catch(err => setError("Failed to load products"));

        getCategories()
            .then(res => setCategories(res.data))
            .catch(err => setError("Failed to load categories!"));
    }, []);

    const showFilters = () => {
        return (
            <>
                <div className='row'>
                    <div className='col-sm-3'>
                        <h5>Filter by Category:</h5>
                        <CheckBox categories={categories} />
                        <ul></ul>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div>
            {isAuthenticated() && <Layout title='Home Page' className='container' >
                {showFilters()}
                <div style={{ width: '100%' }}>
                    {showError(error, error)}
                    {showSuccess(success, "added to cart")}
                </div>
                <div className='row'>
                    {products && products.map(product => <Card product={product} key={product._id} />)}
                </div>
            </Layout>}
            {!isAuthenticated() && <Layout title='Home Page' className='container' >
                jwt token expried
            </Layout>}
        </div>

    )
}
export default Home;