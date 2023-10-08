import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Layout';
import { getCategories, getProducts, getFilteredProducts } from '../../api/apiProduct';
import { addToCart } from '../../api/apiOrder';
import { showError, showSuccess } from '../../utils/messages'
import CheckBox from './Checkbox';
import RadioBox from './RadioBox';
import { prices } from '../../utils/prices';
import { isAuthenticated, isEmailVarified, userInfo } from '../../utils/auth';
import Card from './Card';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [limit, setLimit] = useState(30);
    const [skip, setSkip] = useState(0);
    const [order, setOrder] = useState('asc');
    const [sortBy, setSortBy] = useState('price');
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState({
        category: [],
        price: []
    })

    useEffect(() => {
        getProducts(sortBy, order, limit)
            .then(res => setProducts(res.data))
            .catch(err => setError("Failed to load products"));

        getCategories()
            .then(res => setCategories(res.data))
            .catch(err => setError("Failed to load categories!"));
    }, []);


    const handleAddToCart = product => () => {
        if (isAuthenticated()) {
            setError(false);
            setSuccess(false);
            const user = userInfo();
            const cartItem = {
                user: user._id,
                product: product._id,
                price: product.price
            }
            addToCart(user.token, cartItem)
                .then(res => setSuccess(true))
                .catch(err => {
                    if (err.response) setError(err.response.data);
                    else setError("Adding to Cart failed");
                })
        }
        else {
            setSuccess(false);
            setError("Please Login First");
        }
    }

    const handleFilters = (myfilters, filterBy) => {
        const newFilters = {
            ...filters
        };
        if (filterBy === 'category') {
            newFilters[filterBy] = myfilters;
        }
        if (filterBy === 'price') {
            const data = prices;
            let arr = [];
            for (let i in data) {
                if (data[i].id === parseInt(myfilters)) {
                    arr = data[i].arr;
                }
            }
            newFilters[filterBy] = arr;
        }
        setFilters(newFilters);
        getFilteredProducts(skip, limit, newFilters, order, sortBy)
            .then(res => setProducts(res.data))
            .catch(err => setError("Failed to load products"));

    }

    const showFilters = () => {
        return (
            <>
                <div className='row'>
                    <div className='col-sm-3'>
                        <h5>Filter by Category:</h5>
                        <ul>
                            <CheckBox categories={categories} handleFilters={myfilters => handleFilters(myfilters, 'category')} />
                        </ul>
                    </div>
                    <div className='col-sm-5'>
                        <h5>Filter By Price</h5>
                        <div className='row'>
                            <RadioBox prices={prices} handleFilters={myfilters => handleFilters(myfilters, 'price')} />
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div>
            {isAuthenticated() && <Layout title='Home Page' className='container' >

                {isEmailVarified() === false && (<Link to='/send/email'>Verify Email</Link>)}
                <p>Hi, {userInfo().role} user, email: {userInfo().email} {isEmailVarified() === true && (<span style={{ color: 'green' }}>(verified)</span>)}</p>
                {showFilters()}
                <div style={{ width: '100%' }}>
                    {showError(error, error)}
                    {showSuccess(success, "added to cart successfully now!")}
                </div>
                <div className='row'>
                    {products && products.map(product => <Card product={product} key={product._id} handleAddToCart={handleAddToCart(product)} />)}
                </div>
            </Layout>}
            {!isAuthenticated() && <Layout title='Home Page' className='container' >
                Please Login or SignUp
                <div className='row'>
                    {products && products.map(product => <Card product={product} key={product._id} handleAddToCart={handleAddToCart(product)} />)}
                </div>
            </Layout>}
        </div>

    )
}
export default Home;