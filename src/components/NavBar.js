import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let loginLogout;

        if (this.props.userLoggedIn) {
            loginLogout = (
                <React.Fragment>
                    <li>
                        <Link to='/profile'>Profile</Link>
                    </li>
                    <li>
                        <Link to='/chart'>Trading</Link>
                    </li>
                    <li>
                        <Link to='/logout'>Logout</Link>
                    </li>
                </React.Fragment>
            );
        } else {
            loginLogout = (
                <React.Fragment>
                    <li>
                        <Link to='/login'>Logga in</Link>
                    </li>

                    <li>
                        <Link to='/register'>Registrera</Link>
                    </li>
                </React.Fragment>
            );
        }
        return (
            <nav>
                <ul>{loginLogout}</ul>
            </nav>
        );
    }
}

export default NavBar;
