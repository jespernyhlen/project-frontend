import React, { useEffect, useState } from 'react';
import ChartsTradeItem from './ChartsTradeItem';
import './Charts.css';

const jwt = require('jsonwebtoken');

const apiURL =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:8888/'
        : 'https://project-backend-api.jespernyhlenjs.me/';

const roundNr = number => {
    return Math.round(number * 100) / 100;
};

const ChartsTrade = props => {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [data, setData] = useState(props.datasets);
    const [balanceFlash, setBalanceFlash] = useState('');

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        setLoading(data[0].data.length > 2 ? false : true);
        let tradeItems = [];
        data.forEach((item, index) => {
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
    }, [props, userInfo, data]);

    const balanceFlashMessage = message => {
        setBalanceFlash(message);
        setTimeout(() => {
            setBalanceFlash('');
        }, 1000);
    };

    const updateAccount = (stockname, balance, amount) => {
        let oldBalance = userInfo.balance;
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
                    if (oldBalance > balance) {
                        balanceFlashMessage('balance-decrease');
                    } else {
                        balanceFlashMessage('balance-increase');
                    }
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
                <h1
                    className='chart-section-label'
                    style={{ marginTop: '-1em' }}
                >
                    MARKET
                </h1>
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
                        class='loading-data'
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
            {!loading ? (
                <React.Fragment>
                    <h1 className='chart-section-label'>PORTFOLIO</h1>
                    <div>
                        {' '}
                        <h1 className={'chart-balance ' + balanceFlash}>
                            Balance: ${userInfo.balance}
                        </h1>
                    </div>
                    <div
                        className='chart-contain'
                        style={{
                            padding: '1em 0'
                        }}
                    >
                        <div
                            className='chart-contain'
                            style={{
                                heigth: '100px',
                                display: 'flex',
                                justifyContent: 'space-around',
                                fontFamily: 'Roboto, FontAwesome',
                                padding: '0'
                            }}
                        >
                            {data.map((value, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={index > 0 ? 'brd-left' : ''}
                                        style={{
                                            width: '25%',
                                            padding: '0 1em'
                                        }}
                                    >
                                        <h1 className='trade-item-label'>
                                            {value.label.toUpperCase()}
                                        </h1>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between'
                                            }}
                                        >
                                            <p style={{ color: '#aaa' }}>
                                                Units:
                                            </p>
                                            <p style={{ fontWeight: '500' }}>
                                                {userInfo[value.label]}
                                            </p>
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between'
                                            }}
                                        >
                                            <p style={{ color: '#aaa' }}>
                                                Value:
                                            </p>
                                            <p style={{ fontWeight: '500' }}>
                                                $
                                                {roundNr(
                                                    userInfo[value.label] *
                                                        value.data.slice(-1)[0]
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </React.Fragment>
            ) : null}
        </div>
    );
};
export default ChartsTrade;
