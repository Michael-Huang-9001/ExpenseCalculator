import React, { Component } from "react";
import "./Entry.css";
// import DatePicker from 'react-datepicker';
import Modal from './Modal';

class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.data._id,
      date: this.props.data.date,
      category: this.props.data.category,
      entry_name: this.props.data.entry_name,
      cost: this.props.data.cost,
      notes: this.props.data.notes
    };
  }

  update = (payload) => {
    this.setState(payload);
  }

  // Make a variable an arrow function
  click = () => {
    this.setState({ collapsed: !this.state.collapsed });
    //console.log(`Component ${this.props.data.entry_name} is ${collapsed}`);
  }

  // Pass in here
  render() {
    return (
      <React.Fragment>
        <tr data-toggle="collapse" onClick={this.click} data-target={`#entry_${this.props.entry_index}`} className="tr-hover">
          <td>{this.state.entry_name}</td>
          <td>{this.state.date.substring(0, 10)}</td>
          <td>{this.state.cost}</td>
        </tr>
        <tr>
          <td colSpan="3" className="details">
            <div id={`entry_${this.props.entry_index}`} className="collapse">
              <br />
              <button className="btn-sm" data-toggle="modal" data-target={`#entry_modal_${this.props.entry_index}`}>Edit</button>
              <b>Date:</b> {this.state.date.substring(0, 10)}
              <br />
              <b>Category:</b> {this.state.category}
              <br />
              <b>Entry Name:</b> {this.state.entry_name}
              <br />
              <b>Cost:</b> {this.state.cost}
              <br />
              <b>Notes:</b><br />{this.state.notes}
              <br />
              <br />

              <Modal entry_index={this.props.entry_index} update={this.update} key={this.props.entry_index} data={this.state}></Modal>

            </div>
          </td>
        </tr>
      </React.Fragment>
    );
  }
}

export default Entry;