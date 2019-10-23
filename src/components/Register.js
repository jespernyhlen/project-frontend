import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import ValidateForm from './Validate';
import DateForm from './DateForm';

import './Login.css';

const initialState = () => {
    let initState = {
        firstname: '',
        lastname: '',
        year: '',
        email: '',
        password: '',
        emailError: '',
        passwordError: '',
        message: '',
        firstnameError: '',
        lastnameError: '',
        yearError: '',
        emailError: '',
        passwordError: '',
        message: '',
        registerSuccess: false,
        loading: false
    };
    return initState;
};

const apiURL =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:1338/'
        : 'https://project-backend-api.jespernyhlenjs.me/';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = initialState();
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setLoading(true);

        const validated = ValidateForm(
            this.state.firstname,
            this.state.lastname,
            this.state.email,
            this.state.year,
            this.state.password
        );

        if (validated === true) {
            this.registerUser();
        }

        this.setState({
            firstnameError: validated.firstnameError,
            lastnameError: validated.lastnameError,
            yearError: validated.yearError,
            emailError: validated.emailError,
            passwordError: validated.passwordError
        });
    };

    setLoading(value) {
        this.setState({
            loading: value
        });
    }

    registerUser() {
        fetch(apiURL + 'register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
                date: this.state.year,
                password: this.state.password
            })
        })
            .then(res => res.json())
            .then(response => {
                if (response.data) {
                    this.setState(initialState());
                    this.setState({ registerSuccess: true });

                    localStorage.setItem('token', response.data.token);
                    this.setLoading(false);
                } else {
                    this.transactionMessage('This email is already in use');
                    this.setLoading(false);
                }
            });
    }

    transactionMessage(message) {
        this.setState({
            message: message
        });
        const timer = setTimeout(() => {
            this.setState({
                message: ''
            });
        }, 3000);
    }

    changeYear = newYear => {
        this.setState({
            year: newYear
        });
    };

    render() {
        return (
            <div className='login-form'>
                <h1>Register user</h1>
                <p className='sub-header'> Register a new account</p>

                <form
                    style={{ margin: '2em 0 1em' }}
                    onSubmit={this.handleSubmit}
                >
                    <div>
                        <input
                            required
                            name='firstname'
                            value={this.state.firstname}
                            type='text'
                            onChange={e => {
                                this.setState({
                                    firstname: e.target.value
                                });
                            }}
                            placeholder='Firstname'
                        />
                        <div className='error-text'>
                            {this.state.firstnameError}
                        </div>
                    </div>

                    <div>
                        <input
                            required
                            name='lastname'
                            value={this.state.lastname}
                            type='text'
                            onChange={e => {
                                this.setState({
                                    lastname: e.target.value
                                });
                            }}
                            placeholder='Lastname'
                        />
                        <div className='error-text'>
                            {this.state.lastnameError}
                        </div>
                    </div>

                    <div className='form-group'>
                        <DateForm
                            data={{
                                year: this.state.year,
                                changeYear: this.changeYear
                            }}
                        />
                        <div className='error-text'>{this.state.yearError}</div>
                    </div>

                    <div>
                        <input
                            required
                            name='email'
                            value={this.state.email}
                            type='email'
                            onChange={e => {
                                this.setState({
                                    email: e.target.value
                                });
                            }}
                            placeholder='Email'
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
                                    password: e.target.value
                                });
                            }}
                            placeholder='Password'
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

                    {this.state.registerSuccess ? (
                        <p
                            style={{
                                marginBottom: '1em',
                                position: 'relative'
                            }}
                        >
                            Your Email Address is successfully registred. Please
                            login to access your account!{' '}
                            <Link to={`/login`}>Sign in</Link>
                        </p>
                    ) : null}

                    <div>
                        <button className='submit-btn' type='submit'>
                            Register user
                        </button>
                    </div>
                    <Link to={`/login`}>Sign in</Link>
                </form>
            </div>
        );
    }
}

export default Register;
