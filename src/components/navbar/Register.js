import React, { Component } from 'react';
import 'bootstrap';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            email: '',
            password: '',
            confirm_password: ''

        };
    }

    // If you make the handle functions into arrow functions, you don't have to bind them.
    handleUsernameChange = (event) => {
        event.preventDefault();
        //console.log(event.target.value);
        this.setState({ 'username': event.target.value });
    }

    handleEmailChange = (event) => {
        event.preventDefault();
        //console.log(event.target.value);
        this.setState({ 'email': event.target.value });
    }

    handlePasswordChange = (event) => {
        event.preventDefault();
        //console.log(event.target.value);
        this.setState({ 'password': event.target.value });
    }

    handleConfirmPasswordChange = (event) => {
        event.preventDefault();
        //console.log(event.target.value);
        this.setState({ 'confirm_password': event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if (this.state.password !== this.state.confirm_password) {
            alert('Passwords do not match.');
        } else {
            let data = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                confirm_password: this.state.confirm_password
            };

            console.log(data);

            fetch("/api/register", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: "same-origin"
            }).then(function (res) {
                return res.json();
            }).then((data) => {
                if (!data.success) {
                    alert(data.msg);
                } else {
                    alert('User created! Please log in.');
                    document.getElementById('register').hide();
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    render() {
        return (
            <div className="modal fade" id="register" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Register</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body input-group-sm">
                            <form method="POST" onSubmit={this.handleSubmit}>

                                <input required name="register_username" type="text"
                                    className="form-control" placeholder="Username"
                                    onChange={this.handleUsernameChange}
                                    title="Username characters are alphanumeric, may contain . (dot/period) and _ (underscore)."
                                />

                                <br />

                                <input required name="register_email" type="email"
                                    className="form-control" placeholder="Email"
                                    onChange={this.handleEmailChange}
                                />

                                <br />

                                <input required name="register_password" type="password"
                                    className="form-control" placeholder="Password"
                                    onChange={this.handlePasswordChange} minLength="7"
                                />

                                <br />

                                <input required name="register_confirm_password" type="password"
                                    className="form-control" placeholder="Confirm Password"
                                    onChange={this.handleConfirmPasswordChange} minLength="7"
                                />

                                <br />
                                <button type="submit" className="btn btn-primary">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;