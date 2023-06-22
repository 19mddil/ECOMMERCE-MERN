import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavItem, NavbarToggler, Collapse } from 'reactstrap';
import { Link } from 'react-router-dom';
import { signout, isAuthenticated, userInfo } from '../../utils/auth';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
        }
    }
    navToggler = () => {
        this.setState({
            isNavOpen: !this.state.isNavOpen,
        })
    }
    render() {
        return (
            <div >
                <Navbar dark color='dark' expand="sm">
                    <NavbarBrand href='/' >Ecommerce Website</NavbarBrand>
                    <NavbarToggler onClick={this.navToggler} />
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                        <Nav className='mr-auto' navbar>
                            <NavItem>
                                <Link to='/' className='nav-link active'> Home</Link>
                            </NavItem>
                            {
                                !isAuthenticated() && (<>
                                    <NavItem>
                                        <Link to='/login' className='nav-link'> Login</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link to='/register' className='nav-link'> Register</Link>
                                    </NavItem></>)
                            }
                            {
                                isAuthenticated() && (<>
                                    <NavItem>
                                        <Link to='/logout' className='nav-link' onClick={() => { signout() }} >Logout</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link to='/user/dashboard' className='nav-link'>User Dashboard</Link>
                                    </NavItem>
                                </>)
                            }
                            {
                                isAuthenticated() && userInfo().role === 'admin' && (<>

                                    <NavItem>
                                        <Link to='/admin/dashboard' className='nav-link'>Admin Dashboard</Link>
                                    </NavItem>
                                </>)
                            }
                        </Nav>
                    </Collapse>
                </Navbar >
            </div >
        )
    }
}
export default Navigation;