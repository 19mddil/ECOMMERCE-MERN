
import React from 'react';
import Layout from '../Layout';
import { isAuthenticated } from '../../utils/auth'
const Home = () => {
    return (
        <div>
            {isAuthenticated() && <Layout title='Home Page' className='container' >
                I am homepage.
            </Layout>}
            {!isAuthenticated() && <Layout title='Home Page' className='container' >
                jwt token expried
            </Layout>}
        </div>

    )
}
export default Home;