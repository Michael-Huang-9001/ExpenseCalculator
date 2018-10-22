import React, { Component } from "react";
import "./Entry.css";
import DatePicker from 'react-datepicker';

class Entry extends Component {
  constructor() {
    super();
    this.state = { collapsed: false, editing: false };
  }

  // Make a variable an arrow function
  click = () => {
    let collapsed = !this.state.collapsed;
    this.setState({ collapsed: collapsed });
    //console.log(`Component ${this.props.data.entry_name} is ${collapsed}`);
  }

  // Pass in here
  render() {
    let category = this.props.data.category ? this.props.data.category : 'Unspecified';
    return (
      <React.Fragment>
        <tr data-toggle="collapse" data-target={`#entry_${this.props.entry_id}`} className="tr-hover">
          <td>{this.props.data.entry_name}</td>
          <td>{category}</td>
          <td>{this.props.data.cost}</td>
        </tr>
        <tr>
          <td colSpan="3" className="details">
            <div id={`entry_${this.props.entry_id}`} className="collapse">
              <br />
              <button className="btn-sm" data-toggle="modal" data-target="#modal">Edit</button>
              <b>Date:</b> {this.props.data.date}
              <br />
              <b>Category:</b> {category}
              <br />
              <b>Expense:</b> {this.props.data.entry_name}
              <br />
              <b>Cost:</b> {this.props.data.cost}
              <br />
              <b>Notes:</b><br />{this.props.data.notes}
              <br />
              <br />
            </div>


          </td>
        </tr>
      </React.Fragment>
    );
  }
}

export default Entry;