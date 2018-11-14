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
            _id: this.props.data._id,
            date: moment(this.props.data.date),
            category: this.props.data.category,
            entry_name: this.props.data.entry_name,
            cost: this.props.data.cost,
            notes: this.props.data.notes
        };
    }

    handleDateChange = (date) => {
        this.setState({
            date: date
        });
    }

    handleCategoryChange = (event) => {
        event.preventDefault();
        this.setState({ category: event.target.value });
    }

    handleEntryNameChange = (event) => {
        event.preventDefault();
        this.setState({ entry_name: event.target.value });
    }

    handleCostChange = (event) => {
        event.preventDefault();
        this.setState({ cost: event.target.value });
    }

    handleNotesChange = (event) => {
        event.preventDefault();
        this.setState({ notes: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let data = {
            _id: this.props.data._id,
            entry_name: this.state.entry_name,
            cost: this.state.cost,
            date: this.state.date.format(),
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
        }).then((res) => {
            return res.json();
        }).then(json => {
            console.log(json);

            let new_state = {
                _id: json._id,
                category: json.category,
                entry_name: json.entry_name,
                cost: json.cost,
                notes: json.notes
            }
            this.setState(new_state);
            this.setState({ date: moment(json.date) });

            // For entry row
            new_state.date = json.date;
            this.props.update(new_state);

            document.getElementById(`close_modal_${this.props.entry_index}`).click();
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="modal fade" id={`entry_modal_${this.props.entry_index}`} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
                                onSubmit={this.handleSubmit}
                            >
                                <b>Date</b>
                                <br />

                                <DatePicker
                                    className="form-control"
                                    todayButton={"Today"}
                                    selected={this.state.date}
                                    onChange={this.handleDateChange}
                                    dateFormat="LL">
                                </DatePicker>

                                <br />
                                <br />

                                <b>Category</b>

                                <select className="form-control">
                                    <option></option>
                                </select>

                                <br />

                                <b>Entry Name</b>
                                <input
                                    type="text" className="form-control"
                                    defaultValue={this.props.data.entry_name}
                                    onChange={this.handleEntryNameChange}>
                                </input>

                                <br />

                                <b>Cost</b>
                                <input className="form-control"
                                    type="number"
                                    step="0.01"
                                    defaultValue={this.props.data.cost}
                                    onChange={this.handleCostChange}>
                                </input>

                                <br />

                                <b>Notes</b>
                                <textarea
                                    className="form-control"
                                    rows="5" cols="10"
                                    placeholder="No notes"
                                    defaultValue={this.props.data.notes}
                                    onChange={this.handleNotesChange}>
                                </textarea>

                                <br />

                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary">Update</button>
                                    <button id={`close_modal_${this.props.entry_index}`} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default Modal;