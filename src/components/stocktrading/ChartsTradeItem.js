import React, { useEffect, useState } from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import './Charts.css';

const roundNr = number => {
    return Math.round(number * 100) / 100;
};

const ChartsTradeItem = ({ item, userInfo, updateAccount }) => {
    const [buyAmount, setBuyAmount] = useState(0);
    const [buyTotal, setBuyTotal] = useState(0);
    const [message, setMessage] = useState('');
    useEffect(() => {
        setBuyTotal(roundNr(buyAmount * item.data[item.data.length - 1]));
    });

    const onSliderChange = e => {
        setBuyAmount(e);
    };

    const onClickBuy = () => {
        if (buyTotal > userInfo.balance) {
            transactionMessage('Not enough credits');
        } else if (buyTotal < 1) {
            transactionMessage('Transaction at zero is not allowed');
        } else if (buyTotal / buyAmount < 4) {
            transactionMessage('No bids at this price');
        } else {
            transactionMessage('Successful transaction');
            let newBalance = parseInt(userInfo.balance) - parseInt(buyTotal);
            let stockName = item.label.toLowerCase();
            let newStockAmount =
                parseInt(userInfo[item.label]) + parseInt(buyAmount);
            updateAccount(stockName, newBalance, newStockAmount);
            setBuyAmount(0);
        }
    };

    const transactionMessage = message => {
        setMessage(message);
        setTimeout(() => {
            setMessage('');
        }, 3000);
    };

    const onClickSell = () => {
        if (buyAmount > userInfo[item.label]) {
            transactionMessage('Not enough units to sell');
        } else if (buyAmount < 1) {
            transactionMessage('Transaction at zero is not allowed');
        } else {
            transactionMessage('Successful transaction');
            let newBalance = parseInt(userInfo.balance) + parseInt(buyTotal);
            let stockName = item.label.toLowerCase();
            let newStockAmount =
                parseInt(userInfo[item.label]) - parseInt(buyAmount);
            updateAccount(stockName, newBalance, newStockAmount);

            setBuyAmount(0);
        }
    };

    const getDiff = () => {
        let stockItem;
        let label = item.label;
        let values = item.data;
        if (values.length > 2) {
            let diff = values[values.length - 1] - values[values.length - 2];
            let diffRound = roundNr(diff);
            stockItem = (
                <div className='trade-item' key={label}>
                    <div className='trade-item-label'>
                        {label.toUpperCase()}
                    </div>
                    <div
                        className={
                            diffRound >= 0
                                ? 'trade-item-diff green'
                                : 'trade-item-diff red'
                        }
                    >
                        {(diffRound >= 0 ? '+' : '') + diffRound}
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                    >
                        <p style={{ color: '#aaa' }}>Volume:</p>
                        <p style={{ fontWeight: '500' }}>{buyAmount}</p>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                    >
                        <p style={{ color: '#aaa' }}>Cost:</p>
                        <p style={{ fontWeight: '500' }}>${buyTotal}</p>
                    </div>

                    <InputRange
                        maxValue={10}
                        minValue={0}
                        value={roundNr(buyAmount)}
                        onChange={e => onSliderChange(e)}
                    />
                    <p
                        style={{
                            textAlign: 'center',
                            padding: '2em 0 1.5em',
                            lineHeight: '0',
                            zIndex: '100'
                        }}
                    >
                        {message}
                    </p>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                    >
                        {' '}
                        <button
                            onClick={onClickBuy}
                            className='trade-btn btn-buy'
                        >
                            Buy
                        </button>
                        <button
                            onClick={onClickSell}
                            className='trade-btn btn-sell'
                        >
                            Sell
                        </button>
                    </div>
                </div>
            );
        }
        return stockItem;
    };

    return item.data.length > 2 ? getDiff() : null;
};
export default ChartsTradeItem;
