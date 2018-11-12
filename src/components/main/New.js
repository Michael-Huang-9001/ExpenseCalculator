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
            entry_name: this.state.entry_name,
            cost: this.state.cost,
            date: this.state.date,
            category: this.state.category,
            notes: this.state.notes
        }

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
            //console.log(json);
            if (!json.success) {
                alert("Please create an account or log in to save your entries.");
            }
            document.getElementById("close-create").click();
        }).catch((error) => {
            console.log(error);
        });

        this.props.addEntry(data);
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
                                    onChange={this.handleCostChange}>
                                </input>

                                <br />

                                <b>Notes</b>
                                <textarea
                                    className="form-control"
                                    rows="5" cols="10"
                                    placeholder="No notes"
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