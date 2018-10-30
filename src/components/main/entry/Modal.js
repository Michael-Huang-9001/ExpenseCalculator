import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import './Modal.css';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.data.id,
            date: moment(this.props.data.date),
            category: this.props.data.category,
            entry_name: this.props.data.entry_name
        };
    }

    handleDateChange(date) {
        this.setState({
            date: date
        });
    }

    handleCategoryChange = (event) => {
        event.preventDefault();
        this.setState({ category: event.target.value })
    }

    handleEntryNameChange = (event) => {
        event.preventDefault();
        this.setState({ entry_name: event.target.value })
    }

    handleCostChange = (event) => {
        event.preventDefault();
        this.setState({ cost: event.target.value })
    }

    handleNotesChange = (event) => {
        event.preventDefault();
        this.setState({ notes: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault();

        let data = {
            entry_name: this.state.entry_name,
            cost: this.state.cost,
            date: this.state.date,
            category: this.state.category,
            notes: this.state.notes
        }

        fetch(`/api/entries/update`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            },
            credentials: "same-origin"
        });
    }

    render() {
        return (
            <div className="modal fade" id={`entry_modal_${this.props.entry_id}`} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{this.props.data.entry_name}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body input-group-sm">
                            <form method="POST"
                                onSubmit={event => this.handleSubmit(event)}
                            >
                                <b>Date</b>
                                <DatePicker
                                    className="form-control"
                                    todayButton={"Today"}
                                    selected={this.state.date}
                                    onChange={this.handleDateChange}
                                    dateFormat="LL">
                                </DatePicker>

                                <br />

                                <b>Category</b>

                                <select className="form-control">
                                    <option></option>
                                </select>

                                <br />

                                <b>Expense</b>
                                <input
                                    type="text" className="form-control"
                                    value={this.props.data.entry_name}
                                    onChange={this.handleEntryNameChange}>
                                </input>

                                <br />

                                <b>Cost</b>
                                <input className="form-control"
                                    type="number"
                                    step="0.01"
                                    value={this.props.data.cost}
                                    onChange={this.handleCostChange}>
                                </input>

                                <br />

                                <b>Notes</b>
                                <textarea
                                    className="form-control"
                                    rows="5" cols="10"
                                    placeholder="No notes"
                                    value={this.props.data.notes}
                                    onChange={this.handleNotesChange}>
                                </textarea>

                                <br />
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary">Save</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal;