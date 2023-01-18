import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavItem, NavbarToggler, Collapse } from 'reactstrap';
import { Link } from 'react-router-dom';

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
                    <NavbarBrand href='/' >Restuarant Project 2</NavbarBrand>
                    <NavbarToggler onClick={this.navToggler} />
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                        <Nav className='mr-auto' navbar>
                            <NavItem>
                                <Link to='/' className='nav-link active'> Home</Link>
                            </NavItem>
                            <NavItem>
                                <Link to='/login' className='nav-link'> Login</Link>
                            </NavItem>
                            <NavItem>
                                <Link to='/register' className='nav-link'> Register</Link>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar >
            </div >
        )
    }
}
export default Navigation;