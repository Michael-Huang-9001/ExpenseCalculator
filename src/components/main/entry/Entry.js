import React, { Component } from "react";
import "./Entry.css";

class Entry extends Component {

  render() {
    return (
      <div className="Entry">
        <p><u>{this.props.entry_name}</u></p>
        <br />
        <p><u>{this.props.date}</u></p> <span />
        <p><u>{this.props.cost}</u></p>
        <hr />
      </div>
    );
  }
}

export default Entry;