import React, { Component } from "react";
import "./Main.css";
import Entry from "./entry/Entry"
import 'bootstrap'; // NEED TO IMPORT THIS LOCALL IF YOU ARE GOING TO USE BOOTSTRAP

class Main extends Component {

  // Constructor is almost the same as componentWillMount, set init states
  constructor() {
    super();
    this.state = { entries: [], entries_loaded: false };
  }

  // Best place to fetch as componentWillMount may render empty data waiting for callback
  componentDidMount() {
    fetch(`/api/test`)
      .then(res => res.json())
      .then(json => this.setState({ entries: json, entries_loaded: true }),
        error => this.setState({ entries_loaded: true, error })
      );
  }


  render() {
    return (
      <div className="Main col-auto">
        <img src="https://i.stack.imgur.com/L8d0H.jpg" alt="" className="img-fluid"></img>
        <br />
        <p style={{ textAlign: "right" }}><b>Total expenditure: $XXX.XX</b></p>

        <table className="table">
          <thead>
            <th>Expense name</th>
            <th>Cost</th> 
          </thead>
          <tbody>
            {this.state.entries.map((entry, index) => (
              // Makes the entry here for every element
              <Entry key={index} entry_id={index} data={entry}></Entry>
            ))}
          </tbody>
        </table>

      </div>
    );
  }
}

export default Main;