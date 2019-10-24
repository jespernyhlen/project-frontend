import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import './Charts.css';

class Charts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: props.chartData
        };
    }

    render() {
        return (
            <div className='chart'>
                <Line
                    data={this.state.chartData}
                    width={500}
                    height={600}
                    options={{
                        layout: {
                            padding: {
                                top: 20,
                                left: 20,
                                right: 20,
                                bottom: 20
                            }
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                        scaleFontColor: '#ccc',
                        scales: {
                            xAxes: [
                                {
                                    display: true,
                                    scaleLabel: {
                                        display: false,
                                        labelString: 'Time',
                                        fontColor: '#eee',
                                        fontSize: 18
                                    },
                                    ticks: {
                                        maxTicksLimit: 15,
                                        beginAtZero: true,
                                        padding: 25,
                                        fontColor: '#aaa'
                                    },
                                    gridLines: {
                                        color: '#1d1d1d'
                                    }
                                }
                            ],
                            yAxes: [
                                {
                                    display: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Price',
                                        fontColor: '#eee',
                                        fontSize: 18
                                    },
                                    ticks: {
                                        beginAtZero: true,
                                        padding: 15,
                                        min: 0,
                                        fontColor: '#ccc'
                                    },
                                    gridLines: {
                                        color: '#1d1d1d'
                                    }
                                }
                            ]
                        },
                        tooltips: {
                            displayColors: false,
                            titleFontSize: 16,
                            bodyFontSize: 14,
                            xPadding: 10,
                            yPadding: 10
                        },
                        title: {
                            display: true,
                            text: 'Stock Chart',
                            fontSize: 25,
                            fontStyle: 300,
                            fontColor: '#ddd'
                        },
                        legend: {
                            display: true,
                            position: 'bottom',
                            fullWidth: true,
                            labels: {
                                boxWidth: 80,
                                fontSize: 18,
                                padding: 30,
                                fontColor: '#ccc'
                            }
                        }
                    }}
                />
            </div>
        );
    }
}
export default Charts;
