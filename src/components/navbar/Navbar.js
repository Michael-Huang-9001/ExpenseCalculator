import React, { Component } from "react";
import "./Navbar.css";
import Login from './Login';

class Navbar extends Component {
  render() {
    return (
      <div className="Navbar">
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
          <a href="/" className="navbar-brand">Ex-Calc</a>
          <div className="collapse navbar-collapse button-array">
            {/* <ul class="navbar-nav">
              <li class="nav-item active">
                <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/">Features</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/">Pricing</a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" href="/">Disabled</a>
              </li>
            </ul> */}

            <button className="btn btn-primary"><i className="fas fa-plus"></i> Add new</button>
          </div>

          <div className="pull-right">
            <button className="btn-sm" data-toggle="modal" data-target="#sign-in">Sign in</button>
            <span></span>
            <button className="btn-sm" data-toggle="modal" data-target="#register">Register</button>
          </div>

          <Login></Login>
        </nav>
      </div>
    );
  }
}

export default Navbar;