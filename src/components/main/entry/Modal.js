import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import './Modal.css';

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: moment(this.props.data.date)
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
            date: date
        });
    }

    handleSUbmit(event) {
        event.preventDefault();
        fetch();
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
                                    onChange={this.handleChange}
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
                                    defaultValue={this.props.data.entry_name}
                                    onChange={(e) => {

                                    }}>
                                </input>

                                <br />

                                <b>Cost</b>
                                <input className="form-control"
                                    type="number"
                                    step="0.01"
                                    defaultValue={this.props.data.cost}>
                                </input>

                                <br />

                                <b>Notes</b>
                                <textarea
                                    className="form-control"
                                    rows="5" cols="10"
                                    placeholder="No notes">
                                    {this.props.data.notes}
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