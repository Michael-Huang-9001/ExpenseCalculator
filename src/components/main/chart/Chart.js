import React, { Component } from 'react';
import 'bootstrap';
import './Chart.css';
import { Bar, Line } from 'react-chartjs-2';
import moment from 'moment';

class Chart extends Component {
    constructor(props) {
        super(props);

        let date = new Date();
        this.state = {
            entries: this.props.entries,
            labels: [],
            daily_sums: [],
            cumulative: [],
            mode: 'a',
            date: date,
            first: new Date(date.getFullYear(), date.getMonth(), 0),
            last: new Date(date.getFullYear(), date.getMonth() + 1, 0)
        }
    }

    // If the parent changes, change this prop and propagate change to child
    componentWillReceiveProps(props) {
        // This forces a refresh of this component because the parent has changed its props passing down
        if (this.props.refresh !== this.state.refresh) {
            this.setState({ refresh: !this.props.refresh });
            this.mapData('a');
        }
    }

    mapData(mode) {
        this.setState({ mode: mode });

        // Filter based on mode: show all, this year only, this month only, last 7 days, etc.
        let filtered = this.props.entries;
        if (mode === 'y') {
            filtered = filtered.filter((entry) => {
                return entry.date.startsWith(this.state.first.getFullYear());
            });
        } else if (mode === 'm') {
            filtered = filtered.filter((entry) => {
                return entry.date >= this.state.first.toISOString() && entry.date < this.state.last.toISOString();
            });
        } else if (mode === 'w') {
            let today = moment();
            let l7d = moment().subtract(8, 'd');

            filtered = filtered.filter((entry) => {
                return entry.date >= l7d.toISOString() && entry.date < today.toISOString();
            });
        }

        let daily_sums = {};

        filtered.forEach((entry) => {
            let date = entry.date.substring(0, 10);

            if (daily_sums[date]) {
                daily_sums[date] += Number(entry.cost);
            } else {
                daily_sums[date] = Number(entry.cost);
            }
        });

        let labels = [];
        let daily_sums_sorted = {};

        // Sorts the daily sums
        Object.keys(daily_sums).sort().forEach((key) => {
            labels.push(key);
            daily_sums_sorted[key] = Number(daily_sums[key]);
        })

        daily_sums = daily_sums_sorted;
        this.setState({ daily_sums: Object.values(daily_sums) });

        let cumulative = {};
        let total = 0;

        Object.keys(daily_sums).forEach((key) => {
            total += Number(daily_sums[key]);
            cumulative[key] = total;
        });

        this.setState({ labels: labels });

        this.setState({ cumulative: Object.values(cumulative) });
        // console.log(`mapdata/cum:`);
        // console.log(cumulative);
    }

    mapAll = () => {
        this.mapData('a');
    }

    mapYear = () => {
        this.mapData('y');
    }

    mapMonth = () => {
        this.mapData('m');
    }

    mapWeek = () => {
        this.mapData('w');
    }

    render() {
        let payload = {
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
                    backgroundColor: 'rgba(244, 137, 66,0.4)',
                    borderColor: 'rgba(244, 137, 66,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(244, 137, 66,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(244, 137, 66,1)',
                    pointHoverBorderColor: 'rgba(244, 137, 66,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.state.cumulative
                }
            ]
        };

        return (
            <div>
                <br />
                <Line
                    width={900}
                    height={300}
                    data={payload}
                />
                <br />
                <div className="row justify-content-center" style={{ margin: '0px !important' }}>
                    <button className="btn-sm btn" onClick={this.mapAll}>All</button>
                    <button className="btn-sm btn" onClick={this.mapYear}>This year</button>
                    <button className="btn-sm btn" onClick={this.mapMonth}>This month</button>
                    <button className="btn-sm btn" onClick={this.mapWeek}>Last 7 days</button>
                </div>
            </div>
        );
    }
}

export default Chart;