import React, { useState, useEffect } from 'react';
import Select from 'react-select';

import './Login.css';
const jwt = require('jsonwebtoken');

const apiURL =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:8888/'
        : 'https://project-backend-api.jespernyhlenjs.me/';

const Profile = () => {
    const [balance, setBalance] = useState(0);
    const [deposit, setDeposit] = useState(0);
    const [message, setMessage] = useState('');

    const options = [
        { type: '100', label: '100' },
        { type: '75', label: '75' },
        { type: '50', label: '50' },
        { type: '25', label: '25' },
        { type: '10', label: '10' }
    ];
    const handleSubmit = e => {
        e.preventDefault();
        if (deposit !== 0) {
            setDeposit(0);
            updateBalance(parseInt(balance) + parseInt(deposit));
        }
    };
    useEffect(() => {
        getUserBalance();
    }, []);

    const getUserBalance = () => {
        let email = jwt.decode(localStorage.getItem('token')).email;
        let token = localStorage.getItem('token');

        fetch(apiURL + 'balance/' + email, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        })
            .then(res => res.json())
            .then(response => {
                if (response.data) {
                    setBalance(response.data.balance);
                } else {
                    console.log('something when wrong with balance request');
                }
            });
    };

    const updateBalance = amount => {
        let email = jwt.decode(localStorage.getItem('token')).email;
        let token = localStorage.getItem('token');

        fetch(apiURL + 'balance', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify({
                email: email,
                balance: amount
            })
        })
            .then(res => res.json())
            .then(response => {
                if (response.data) {
                    setMessage(
                        '$' +
                            deposit +
                            ' was successfully added to your account'
                    );
                    getUserBalance();
                    const timer = setTimeout(() => {
                        setMessage('');
                    }, 2000);
                    return () => clearTimeout(timer);
                } else {
                    console.log('something when wrong with balance deposit');
                }
            });
    };

    const handleSelect = e => {
        setDeposit(e.type);
    };

    return (
        <div className='login-form' id='profile'>
            <p className='form-logo'>&#xf201;</p>

            <h1>Stocktrader</h1>
            <p className='sub-header'>Deposit money and visit trading page</p>
            <br></br>
            <h2>Balance: ${balance}</h2>
            <br></br>
            <p style={{ textAlign: 'center', padding: '0 0 1em ' }}>
                {message}
            </p>

            <Select
                key={message}
                placeholder='Choose balance to deposit'
                options={options}
                onChange={handleSelect}
            />
            <div>
                <button
                    onClick={handleSubmit}
                    className='submit-btn'
                    type='submit'
                >
                    Deposit
                </button>
            </div>
        </div>
    );
};

export default Profile;
