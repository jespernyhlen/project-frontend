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
                        <Link to='/login'>Login</Link>
                    </li>

                    <li>
                        <Link to='/register'>Register</Link>
                    </li>
                </React.Fragment>
            );
        }
        return (
            <nav>
                <div
                    style={{ fontFamily: 'Roboto, FontAwesome' }}
                    className='nav-brand'
                >
                    <Link to='/'>&#xf201;</Link>
                </div>
                <ul>{loginLogout}</ul>
            </nav>
        );
    }
}

export default NavBar;
