import React, { Component } from "react";
import "./Main.css";
import Entry from "./entry/Entry"
import 'bootstrap'; // NEED TO IMPORT THIS LOCALLY IF YOU ARE GOING TO USE BOOTSTRAP
import New from './New';
import Chart from './chart/Chart';

class Main extends Component {

  // Constructor is almost the same as componentWillMount, set init states
  constructor() {
    super();
    this.state = { entries: [] };
  }

  // Best place to fetch as componentWillMount may render empty data waiting for callback
  componentDidMount() {
    // console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token")) {
      fetch(`/api/entries`, {
        method: "GET",
        headers: {
          token: localStorage.getItem("token")
        }
      }).then((res) => {
        if (res.status !== 200) {
          if (res.status === 403) {
            localStorage.removeItem("token");
          }
          return [];
        } else {
          return res.json();
        }
      }).then((json) => {
        json = json.sort((a, b) => {
          return a.date < b.date;
        });
        // entries is a list of jsons
        this.setState({ entries: json });
        this.refreshChart(); // This call in the parent forces the child to refresh
      });
    }
  }

  refreshChart = () => {
    this.setState({ refreshChart: !this.state.refreshChart });
  }

  addEntry = (entry) => {
    let list = this.state.entries;
    entry.entry_index = list.length;
    list.push(entry);
    this.setState({ entries: list });
    this.refreshChart();
  }

  // Used to calc total expense
  calc_total() {
    let total = 0;
    this.state.entries.forEach((entry) => {
      total += Number(entry.cost);
    });
    return Math.round(total * 100) / 100;
  }

  render() {
    return (
      <div className="Main col-auto">

        <Chart entries={this.state.entries} refresh={this.refreshChart}></Chart>

        <hr />
        <div className="row" style={{ textAlign: "center" }}>
          <div className="col-5">
            <button className="btn-xs btn-primary" style={{ float: "left" }} data-toggle="modal" data-target="#new_entry">
              <i className="fas fa-plus"></i> Add new
            </button>
          </div>
          <div className="col-5" style={{ float: "right" }}>
            <p style={{ textAlign: "right", float: "right" }}><b>Total expenditure: ${this.calc_total()}</b></p>
          </div>
        </div>

        <New addEntry={this.addEntry}></New>

        <table className="table">
          <thead>
            <tr>
              <th>Expense name</th>
              <th>Date</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {this.state.entries.map((entry, index) => (
              // Makes the entry here for every element
              <Entry key={index} entry_index={index} data={entry}></Entry>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;