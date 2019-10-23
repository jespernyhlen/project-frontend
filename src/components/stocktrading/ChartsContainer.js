import React, { Component } from 'react';
import Charts from './Charts';
import ChartsTrade from './ChartsTrade';
import './Charts.css';

import io from 'socket.io-client';

const server =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:8777'
        : 'https://project-backend-socket.jespernyhlenjs.me';

class ChartsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'gold',
                        data: []
                    },
                    {
                        label: 'silver',
                        data: []
                    },
                    {
                        label: 'bronze',
                        data: []
                    },
                    {
                        label: 'stone',
                        data: []
                    }
                ]
            }
        };
    }

    componentDidMount() {
        this.socket = io.connect(server);

        let graphs = {};
        let first = true;

        this.socket.on('connect', () => {
            console.log('Connected');
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnected');
        });
        let that = this;
        this.socket.on('stocks', function(values) {
            if (that.state.data) {
                var length = that.state.data.labels.length;
                if (length < 40) {
                    values.map((value, index) => {
                        that.state.data.datasets[index].data.push(
                            values[index].startingPoint
                        );
                    });
                    that.state.data.labels.push(
                        new Date().toLocaleTimeString()
                    );
                    that.setState(that.state);
                } else if (length >= 40) {
                    values.map((value, index) => {
                        that.state.data.datasets[index].data.shift();
                        that.state.data.datasets[index].data.push(
                            values[index].startingPoint
                        );
                    });
                    that.state.data.labels.shift();
                    that.state.data.labels.push(
                        new Date().toLocaleTimeString()
                    );
                    that.setState(that.state);
                }
                // console.log(that.state.data.datasets[0].data);
            }
        });
    }
    componentWillUnmount() {
        this.socket.close();
    }
    // componentWillMount() {
    //     this.getChartData();
    // }

    setGradientColor = (canvas, color) => {
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 20000, 1000);
        gradient.addColorStop(0, color);
        gradient.addColorStop(0.95, 'rgba(133, 255, 144, 0.9)');
        return gradient;
    };

    getChartData = canvas => {
        // Ajax calls here
        // this.setState({});
        const data = this.state.data;
        if (data.datasets) {
            let borderColors = [
                'rgba(250, 200, 70, 1)',
                'rgba(6, 250, 213, 1)',
                'rgba(32, 255, 50, 1)',
                'rgba(132, 55, 250, 1)'
            ];
            let backgroundColors = [
                'rgba(250, 200, 70, 0.01)',
                'rgba(6, 250, 213, 0.01)',
                'rgba(32, 255, 50, 0.01)',
                'rgba(132, 55, 250, 0.01)'
            ];
            data.datasets.forEach((set, i) => {
                set.backgroundColor = this.setGradientColor(
                    canvas,
                    backgroundColors[i]
                );
                set.borderColor = this.setGradientColor(
                    canvas,
                    borderColors[i]
                );
                set.borderWidth = 3;
                set.pointHitRadius = 10;
                set.lineTension = 0;
                set.radius = 1;
            });
        }
        return data;
    };
    render() {
        return (
            <React.Fragment>
                {' '}
                <div>
                    {' '}
                    <Charts chartData={this.getChartData} />
                </div>
                <ChartsTrade datasets={this.state.data.datasets} />
            </React.Fragment>
        );
    }
}
export default ChartsContainer;
