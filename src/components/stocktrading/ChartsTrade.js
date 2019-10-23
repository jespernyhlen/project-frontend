import React, { useEffect, useState } from 'react';
import ChartsTradeItem from './ChartsTradeItem';
import './Charts.css';

const jwt = require('jsonwebtoken');

const apiURL =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:1338/'
        : 'https://project-api.jespernyhlenjs.me/';

const ChartsTrade = props => {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [data, setData] = useState(props.datasets);

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        setLoading(data[0].data.length > 2 ? false : true);
        let tradeItems = [];
        data.map((item, index) => {
            tradeItems.push(
                <ChartsTradeItem
                    key={index}
                    item={item}
                    userInfo={userInfo}
                    updateAccount={updateAccount}
                />
            );
        });
        setItems(tradeItems);
    }, [props]);

    const updateAccount = (stockname, balance, amount) => {
        let newAccountDetails = userInfo;
        newAccountDetails.balance = balance;
        newAccountDetails[stockname] = amount;

        let email = jwt.decode(localStorage.getItem('token')).email;
        let token = localStorage.getItem('token');
        fetch(apiURL + 'buystock', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify({
                email: email,
                userinfo: newAccountDetails
            })
        })
            .then(res => res.json())
            .then(response => {
                if (response.data) {
                    getUser();
                    console.log('deposit succes');
                } else {
                    console.log('something when wrong with balance deposit');
                }
            });
    };

    const getUser = () => {
        let email = jwt.decode(localStorage.getItem('token')).email;
        let token = localStorage.getItem('token');

        fetch(apiURL + 'users/' + email, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        })
            .then(res => res.json())
            .then(response => {
                if (response.data) {
                    setUserInfo(response.data);
                } else {
                    console.log('something when wrong with balance request');
                }
            });
    };

    return (
        <div className='chart'>
            {!loading ? (
                <React.Fragment>
                    <div>
                        {' '}
                        <h1>Balance: ${userInfo.balance}</h1>
                    </div>

                    <div
                        className='chart-contain'
                        style={{
                            heigth: '100px',
                            display: 'flex',
                            justifyContent: 'space-around'
                        }}
                    >
                        <div>Units: {userInfo.gold}</div>
                        <div>Units: {userInfo.silver}</div>
                        <div>Units: {userInfo.bronze}</div>
                        <div>Units: {userInfo.stone}</div>
                    </div>
                </React.Fragment>
            ) : null}
            <div
                className='chart-row'
                style={{
                    heigth: '100px',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: '0.5em auto'
                }}
            >
                {' '}
                {!loading ? (
                    items
                ) : (
                    <div
                        style={{
                            margin: '2em auto'
                        }}
                    >
                        <h3>
                            Collecting data for marketprices, wait a second..
                        </h3>
                    </div>
                )}
            </div>
        </div>
    );
};
export default ChartsTrade;
