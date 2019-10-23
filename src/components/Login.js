import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ValidateForm from './Validate';

import './Login.css';

const apiURL =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:1338/'
        : 'https://project-api.jespernyhlenjs.me/';

const initialState = () => {
    let initState = {
        email: '',
        password: '',
        emailError: '',
        passwordError: '',
        message: '',
        loading: false
    };
    return initState;
};
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = initialState();
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setLoading(true);

        console.log(this.state.loading);

        const validated = ValidateForm(
            'name',
            'lastname',
            this.state.email,
            '1990-01-01',
            this.state.password
        );

        if (validated === true) {
            this.loginUser();
        }

        this.setState({
            emailError: validated.emailError,
            passwordError: validated.passwordError
        });
    };
    setLoading(value) {
        this.setState({
            loading: value
        });
    }

    loginUser() {
        fetch(apiURL + 'login', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
            .then(res => res.json())
            .then(response => {
                if (response.data) {
                    this.setState(initialState());

                    localStorage.setItem('token', response.data.token);
                    this.props.login();
                    this.setLoading(false);
                    this.props.history.push('/profile');
                } else {
                    this.setState({
                        message: 'No user with provided Email/Password'
                    });
                    this.setLoading(false);
                }
            });
    }

    render() {
        return (
            <div className='login-form'>
                <p className='form-logo'>&#xf201;</p>

                <h1>Stocktrader</h1>
                <p className='sub-header'> Login to access stock trading</p>

                <form
                    style={{ margin: '2em 0 1em' }}
                    onSubmit={this.handleSubmit}
                >
                    <div>
                        <input
                            required
                            name='email'
                            value={this.state.email}
                            type='email'
                            onChange={e => {
                                this.setState({
                                    [e.target.name]: e.target.value
                                });
                            }}
                            placeholder='&#xf0e0;   Email'
                            style={{ fontFamily: 'Roboto, FontAwesome' }}
                        />
                        <div className='error-text'>
                            {this.state.emailError}
                        </div>
                    </div>

                    <div>
                        <input
                            required
                            name='password'
                            value={this.state.password}
                            type='password'
                            onChange={e => {
                                this.setState({
                                    [e.target.name]: e.target.value
                                });
                            }}
                            placeholder='&#xf023;    Password'
                            style={{ fontFamily: 'Roboto, FontAwesome' }}
                        />
                        <div className='error-text'>
                            {this.state.passwordError}
                        </div>
                    </div>
                    <p>{this.state.message}</p>
                    {this.state.loading ? (
                        <div id='loading-bar-spinner' className='spinner'>
                            <div className='spinner-icon'></div>
                        </div>
                    ) : null}
                    <div>
                        <button className='submit-btn' type='submit'>
                            Login
                        </button>
                    </div>
                    <Link to={`/register`}>Register new user</Link>
                </form>
            </div>
        );
    }
}

export default Login;
