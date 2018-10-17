import React, { Component } from "react";
import "./Main.css";

class Main extends Component {
  render() {
    return (
      <div className="Main col-auto">
        <img src="https://i.stack.imgur.com/L8d0H.jpg" alt="" className="img-fluid"></img>
        <br/>
        <p style={{textAlign: "right"}}><b>Total expenditure: $XXX.XX</b></p>
      </div>
    );
  }
}

export default Main;