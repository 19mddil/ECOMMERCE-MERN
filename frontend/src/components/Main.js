
import React from 'react';
import { Routes, Route, Navigate } from 'react-router';
import Home from './home/Home';

const Main = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
        </Routes>
    )
}

export default Main;