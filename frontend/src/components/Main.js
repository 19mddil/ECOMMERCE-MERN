import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import Home from './home/Home';
import Login from './user/Login';
import Register from './user/Register';
import Dashboard from './user/Dashboard';
import { isAuthenticated, userInfo } from '../utils/auth';
import AdminDashboard from './admin/AdminDashboard';
import CreateCategory from './admin/createCategory';
import CreateProduct from './admin/createProduct';
import ProductDetail from './home/productDetail';
import ShippingAddress from './order/ShippingAddress';
import Cart from './order/Cart';
import Checkout from './order/Checkout';
import Payment from './order/Payment';

class Main extends Component {
    state = {
        auth: false,
        role: ''
    }
    useAuth = () => {
        this.setState({
            auth: isAuthenticated()
        });
        if (isAuthenticated()) {
            const { role } = userInfo();
            this.setState({
                role: role
            })
        }
        //console.log(this.state.role);
    }
    render() {
        this.useAuth();
        return (
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={this.state.auth || isAuthenticated() ? (<Home />) : (<Login />)} />
                <Route path='/register' element={this.state.auth || isAuthenticated() ? (<Home />) : (<Register />)} />
                <Route path='/logout' element={<Navigate to='/login' />} />
                <Route
                    path='/user/dashboard'
                    element={
                        this.state.auth || isAuthenticated() ? (
                            <Dashboard />
                        ) : (
                            <Navigate
                                to="/login"
                            />
                        )
                    }
                />
                <Route
                    path='/user/cart'
                    element={
                        this.state.auth || isAuthenticated() ? (
                            <Cart />
                        ) : (
                            <Navigate
                                to="/login"
                            />
                        )
                    }
                />
                <Route
                    path='/user/shipping'
                    element={
                        this.state.auth || isAuthenticated() ? (
                            <ShippingAddress />
                        ) : (
                            <Navigate
                                to="/login"
                            />
                        )
                    }
                />
                <Route
                    path='/user/checkout'
                    element={
                        this.state.auth || isAuthenticated() ? (
                            <Checkout />
                        ) : (
                            <Navigate
                                to="/login"
                            />
                        )
                    }
                />
                <Route
                    path='/user/payment'
                    element={
                        this.state.auth || isAuthenticated() ? (
                            <Payment />
                        ) : (
                            <Navigate
                                to="/login"
                            />
                        )
                    }
                />
                <Route
                    path='/admin/dashboard'
                    element={
                        ((this.state.auth || isAuthenticated()) && (this.state.role === 'admin' || userInfo().role === 'admin')) ? (
                            <AdminDashboard />
                        ) : (
                            <Navigate
                                to='/'
                            />
                        )
                    }
                />
                <Route
                    path='/admin/create/category'
                    element={
                        ((this.state.auth || isAuthenticated()) && (this.state.role === 'admin' || userInfo().role === 'admin')) ? (
                            <CreateCategory />
                        ) : (
                            <Navigate
                                to='/'
                            />
                        )
                    }
                />
                <Route
                    path='/admin/create/product'
                    element={
                        ((this.state.auth || isAuthenticated()) && (this.state.role === 'admin' || userInfo().role === 'admin')) ? (
                            <CreateProduct />
                        ) : (
                            <Navigate
                                to='/'
                            />
                        )
                    }
                />
                <Route path='/*' element={<Navigate to='/' />} />
                <Route path='/product/:id' element={<ProductDetail />}>

                </Route>
            </Routes >
        )
    }



}

export default Main;