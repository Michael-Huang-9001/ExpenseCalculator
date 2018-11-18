import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

class New extends Component {
    constructor() {
        super();
        this.state = {
            date: moment(),
            category: '',
            entry_name: '',
            cost: '',
            notes: ''
        };

        // { _id: 5bee064076dd3b0146fda310,
        //     owner: '5bebfa309ccb8a00b082138d',
        //     entry_name: '12',
        //     cost: 12,
        //     date: '2018-11-15T15:50:17-08:00',
        //     category: '',
        //     notes: '',
        //     __v: 0 }
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
            date: this.state.date.format(),
            category: this.state.category,
            entry_name: this.state.entry_name,
            cost: this.state.cost,
            notes: this.state.notes
        };

        if (localStorage.getItem('token')) {
            fetch(`/api/entries/new`, {
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
            }).then((json) => {
                if (json.msg) {
                    alert("Something went wrong.");
                    console.log(json.msg);
                } else {
                    // Server updated
                    this.props.addEntry(json);
                }
                //document.getElementById("close-create").click();
            }).catch((error) => {
                console.log(error);
            });
        } else {
            // Not logged in
            alert("Please create an account or log in to save your entries.");
            this.props.addEntry(data);
        }

        document.getElementById("close-create").click();
    }

    render() {
        return (
            <div className="modal fade" id="new_entry" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">New Entry</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body input-group-sm">
                            <form method="POST" onSubmit={this.handleSubmit}>

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
                                <input required
                                    type="text" className="form-control"
                                    onChange={this.handleEntryNameChange}>
                                </input>

                                <br />

                                <b>Cost</b>
                                <input className="form-control" required
                                    type="number"
                                    step="0.01"
                                    defaultValue={''}
                                    onChange={this.handleCostChange}>
                                </input>

                                <br />

                                <b>Notes</b>
                                <textarea
                                    className="form-control"
                                    rows="5" cols="10"
                                    placeholder="No notes"
                                    defaultValue={''}
                                    onChange={this.handleNotesChange}>
                                </textarea>

                                <br />
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary">Create</button>
                                    <button id="close-create" type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default New;