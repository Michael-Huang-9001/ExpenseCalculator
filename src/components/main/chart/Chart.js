import React, { Component } from 'react';
import 'bootstrap';
import './Chart.css';
import moment from 'moment';
import { Bar, Line } from 'react-chartjs-2';

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entries: this.props.entries,
            labels: [],
            daily_sums: [],
            cumulative: []
        }
    }

    componentWillReceiveProps(props) {
        if (this.props.refresh !== this.state.refresh) {
            this.setState({ refresh: !this.props.refresh });
            this.mapData();
        }
    }

    mapData() {
        let daily_sums = {};

        // This is for cumulative
        this.props.entries.forEach((entry) => {
            let date = entry.date.substring(0, 10);

            if (daily_sums[date]) {
                daily_sums[date] += entry.cost;
            } else {
                daily_sums[date] = entry.cost;
            }
        });

        this.setState({ daily_sums: Object.values(daily_sums) });

        let labels = [];
        let cumulative = {};
        let prev_key = '';
        Object.keys(daily_sums).sort().forEach((key) => {
            labels.push(key);
            if (prev_key) {
                cumulative[key] = daily_sums[key] + daily_sums[prev_key];
            } else {
                prev_key = key;
                cumulative[key] = daily_sums[key];
            }
            console.log(cumulative[key]);
        });

        this.setState({ labels: labels });

        this.setState({ cumulative: Object.values(cumulative) });
        console.log(`mapdata/cum:`);
        console.log(cumulative);
    }

    render() {
        let lol = {
            labels: this.state.labels,
            datasets: [
                {
                    label: 'Daily expenditure',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.state.daily_sums
                },
                {
                    label: 'Cumulative expenditure',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.state.cumulative
                }
            ]
        };

        return (
            <div>
                Chart Component
                <Line
                    width={900}
                    height={300}
                    data={lol}
                />
            </div>
        );
    }
}

export default Chart;