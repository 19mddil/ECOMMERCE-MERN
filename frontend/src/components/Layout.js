
import React from 'react';
import { useEffect } from "react";
import Navigation from './header/Navigation';

const Layout = ({ title = 'Title', className, children }) => {
    useEffect(() => {
        document.title = title;
    }, [])
    return (
        <div>
            <div className="mb-3">
                <Navigation />
            </div>
            <div className={className}>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout;