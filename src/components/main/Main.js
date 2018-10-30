import React, { Component } from "react";
import "./Main.css";
import Entry from "./entry/Entry"
import 'bootstrap'; // NEED TO IMPORT THIS LOCALLY IF YOU ARE GOING TO USE BOOTSTRAP

class Main extends Component {

  // Constructor is almost the same as componentWillMount, set init states
  constructor() {
    super();
    this.state = { entries: [], entries_loaded: false };
  }

  // Best place to fetch as componentWillMount may render empty data waiting for callback
  componentDidMount() {
    //console.log(localStorage.getItem("token"));
    fetch(`/api/entries`, {
      method: "GET",
      headers: {
        token: localStorage.getItem("token")
      }
    }).then((res) => {
      return res.json();
    }).then((json) => {
      // entries is a list of jsons
      this.setState({ entries: json, entries_loaded: true });
      console.log(this.state.entries);
    });
  }

  calc_total() {
    let total = 0;
    this.state.entries.forEach((entry) => {
      total += entry.cost
    });
    return Math.round(total * 100) / 100;
  }

  render() {
    return (
      <div className="Main col-auto">
        <img src="https://i.stack.imgur.com/L8d0H.jpg" alt="" className="img-fluid"></img>
        <br />
        <p style={{ textAlign: "right" }}><b>Total expenditure: ${this.calc_total()}</b></p>

        <table className="table">
          <thead>
            <tr>
              <th>Expense name</th>
              <th>Category</th>
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