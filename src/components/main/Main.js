import React, { Component } from "react";
import "./Main.css";
import Entry from "./entry/Entry"

class Main extends Component {

  // Constructor is almost the same as componentWillMount, set init states
  constructor() {
    super();
    this.state = { entries: [] };
  }

  // Best place to fetch as componentWillMount may render empty data waiting for callback
  componentDidMount() {
    fetch(`/api/test`)
      .then(res => res.json())
      .then(json => this.setState({ entries: json }))
      .then(console.log(this.state.entries));
  }


  render() {
    console.log(this.state);
    return (
      <div className="Main col-auto">
        <img src="https://i.stack.imgur.com/L8d0H.jpg" alt="" className="img-fluid"></img>
        <br />
        <p style={{ textAlign: "right" }}><b>Total expenditure: $XXX.XX</b></p>
        <hr></hr>

        {this.state.entries.map(el => (
          // Will add props from state as next step
          <Entry ></Entry>
        ))}
      </div>
    );
  }
}

export default Main;