import React, { Component } from 'react';
import 'bootstrap';
import './Login.css';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            login: "",
            password: ""
        };
    }

    // If you make the handle functions into arrow functions, you don't have to bind them.
    handleLoginChange = (event) => {
        //console.log(event.target.value);
        this.setState({ 'login': event.target.value });
    }

    handlePasswordChange = (event) => {
        //console.log(event.target.value);
        this.setState({ 'password': event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let data = {
            login: this.state.login,
            password: this.state.password
        };

        fetch("/api/login", {
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
                let token = data.token;
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="modal fade" id="sign-in" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Sign in</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body input-group-sm">
                            <form method="POST" onSubmit={this.handleSubmit}>
                                <input id="login_login" name="login_login" type="text"
                                    className="form-control" placeholder="Username/Email"
                                    value={this.state.login} onChange={this.handleLoginChange}
                                />

                                <input id="login_password" name="login_password" type="password"
                                    className="form-control" placeholder="Password"
                                    value={this.state.password} onChange={this.handlePasswordChange}
                                />
                                <br />
                                <button type="submit">Sign in</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;