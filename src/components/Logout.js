import React, { Component } from 'react';

import './Login.css';

class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleSubmit = e => {
        e.preventDefault();
        localStorage.removeItem('token');
        this.props.logout();
        this.props.history.push('/login');
    };

    render() {
        return (
            <div className='login-form'>
                <p className='form-logo'>&#xf201;</p>

                <h1>Logout user</h1>
                <p className='sub-header'>
                    Next time you login, you might be a millionare!
                </p>

                <form
                    style={{ margin: '2em 0 1em' }}
                    onSubmit={this.handleSubmit}
                >
                    <div>
                        <button className='submit-btn' type='submit'>
                            Logout
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Logout;
