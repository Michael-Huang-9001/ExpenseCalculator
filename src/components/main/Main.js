import React, { Component } from "react";
import "./Main.css";
import Entry from "./entry/Entry";
import "bootstrap"; // NEED TO IMPORT THIS LOCALLY IF YOU ARE GOING TO USE BOOTSTRAP
import New from "./New";
import Chart from "./chart/Chart";

class Main extends Component {
  // Constructor is almost the same as componentWillMount, set init states
  constructor() {
    super();
    this.state = { entries: [], max_entry_index: 0 };
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
      })
        .then(res => {
          if (res.status !== 200) {
            if (res.status === 403) {
              localStorage.removeItem("token");
            }
            return [];
          } else {
            return res.json();
          }
        })
        .then(json => {
          // entries is a list of jsons
          this.setState({ entries: json, max_entry_index: json.length });
          this.refreshChart(); // This call in the parent forces the child to refresh
        });
    }
  }

  refreshChart = () => {
    this.setState({ refreshChart: !this.state.refreshChart });
  };

  updateEntry = entry => {
    let list = this.state.entries;

    list[entry.entry_index] = entry;
    this.setState({ entries: list });
    this.refreshChart();
  };

  addEntry = entry => {
    let list = this.state.entries;

    entry.entry_index = this.state.max_entry_index;
    list.push(entry);
    this.setState({ entries: list });
    this.setState({max_entry_index: ++this.state.max_entry_index})
    this.refreshChart();

    console.log(this.state.entries);
  };

  deleteEntry = entry => {};

  // Used to calc total expense
  calc_total = () => {
    let total = 0;
    this.state.entries.forEach(entry => {
      total += Number(entry.cost);
    });
    return Math.round(total * 100) / 100;
  };

  render() {
    return (
      <div className="Main col-auto">
        <Chart entries={this.state.entries} refresh={this.refreshChart} />

        {/* <hr /> */}
        <div className="row" style={{ textAlign: "center" }}>
          <div className="col-5">
            {/* <button
              className="btn-xs btn-primary"
              style={{ float: "left" }}
              data-toggle="modal"
              data-target="#new_entry"
            ><i className="fas fa-plus" /> Add new
            </button> */}
          </div>
          {/* <div className="col-5" style={{ float: "right" }}>
            <p style={{ textAlign: "right", float: "right" }}>
              <b>Total expenditure: ${this.calc_total()}</b>
            </p>
          </div> */}
        </div>

        <New addEntry={this.addEntry} />

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
              <Entry
                key={index}
                entry_index={index}
                data={entry}
                updateEntry={this.updateEntry}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;
