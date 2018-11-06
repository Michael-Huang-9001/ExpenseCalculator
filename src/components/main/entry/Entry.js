import React, { Component } from "react";
import "./Entry.css";
// import DatePicker from 'react-datepicker';
import Modal from './Modal';

class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }

  // Make a variable an arrow function
  click = () => {
    this.setState({ collapsed: !this.state.collapsed });
    console.log(this.props);
    //console.log(`Component ${this.props.data.entry_name} is ${collapsed}`);
  }

  // Pass in here
  render() {
    let category = this.props.data.category ? this.props.data.category : 'Unspecified';
    return (
      <React.Fragment>
        <tr data-toggle="collapse" onClick={this.click} data-target={`#entry_${this.props.entry_index}`} className="tr-hover">
          <td>{this.props.data.entry_name}</td>
          <td>{category}</td>
          <td>{this.props.data.cost}</td>
        </tr>
        <tr>
          <td colSpan="3" className="details">
            <div id={`entry_${this.props.entry_index}`} className="collapse">
              <br />
              <button className="btn-sm" data-toggle="modal" data-target={`#entry_modal_${this.props.entry_index}`}>Edit</button>
              <b>Date:</b> {this.props.data.date.substring(0, 10)}
              <br />
              <b>Category:</b> {category}
              <br />
              <b>Entry Name:</b> {this.props.data.entry_name}
              <br />
              <b>Cost:</b> {this.props.data.cost}
              <br />
              <b>Notes:</b><br />{this.props.data.notes}
              <br />
              <br />

              <Modal entry_index={this.props.entry_index} key={this.props.entry_index} data={this.props.data}></Modal>

            </div>
          </td>
        </tr>
      </React.Fragment>
    );
  }
}

export default Entry;