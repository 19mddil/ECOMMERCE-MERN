import React from 'react';
import Layout from '../Layout';
import { Link } from 'react-router-dom';
import { userInfo } from '../../utils/auth';
import { Card, CardHeader, ListGroup, ListGroupItem } from 'reactstrap';

const AdminDashboard = () => {
    const { name, email, role } = userInfo();
    const UserLinks = () => {
        return (
            <Card >
                <CardHeader>
                    <h4>User Links</h4>
                </CardHeader>
                <ListGroup flush>
                    <ListGroupItem>
                        <Link to='/admin/create/category' className='nav-link'> Create Category</Link>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Link className="nav-link" to="/admin/create/product">Create Product</Link>
                    </ListGroupItem>
                </ListGroup>
            </Card>
        )
    };



    const UserInfo = () => (
        <div className="card mb-5">
            <h3 className="card-header">User Information</h3>
            <ul className="list-group">
                <li className="list-group-item">{name}</li>
                <li className="list-group-item">{email}</li>
                <li className="list-group-item">{role}</li>
            </ul>
        </div>
    );

    return (
        <div>

            <Layout title="Dashboard" className="container-fluid">
                <div className="row">
                    <div className="col-sm-3">
                        {UserLinks()}
                    </div>
                    <div className="col-sm-9">
                        {UserInfo()}

                    </div>
                </div>
                {/* <div className="row">
                <div className="col-sm-3">
                    <UserLinks />
                </div>
                <div className="col-sm-9">
                    <UserInfo />
                </div>
            </div> */}
            </Layout>
        </div>
    )
}

export default AdminDashboard;