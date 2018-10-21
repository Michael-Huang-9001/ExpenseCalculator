import React, { Component } from "react";
import "./Entry.css";

class Entry extends Component {
  constructor() {
    super();
    this.state = { collapsed: false, editing: false };
  }

  // Make a variable an arrow function
  click = () => {
    let collapsed = !this.state.collapsed;
    this.setState({ collapsed: collapsed });
    console.log(`Component ${this.props.data.entry_name} is ${collapsed}`);
  }

  // Pass in here
  render() {
    return (
      <React.Fragment>
        <tr data-toggle="collapse" data-target={`#entry_${this.props.entry_id}`} className="clickable">
          <td>{this.props.data.entry_name}</td>
          <td>{this.props.data.cost}</td>
        </tr>
        <tr>
          <td colSpan="2">
            <div id={`entry_${this.props.entry_id}`} className="collapse">
              {this.props.data.date}
            </div>
          </td>
        </tr>
      </React.Fragment>
    );
  }
}

export default Entry;