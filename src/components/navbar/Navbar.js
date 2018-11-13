import React, { Component } from "react";
import "./Navbar.css";
import Login from './Login';
import Register from './Register';
import New from './New';

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      logged_in: false
    }
  }

  navbar_logged_in = (value) => {
    this.setState({ logged_in: value });
    //console.log(`Logged in @ Navbar: ${this.state.logged_in}`);
  }

  logout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    alert(`Logged out successfully.\nEl Psy Kongroo.`);
    window.location.reload();
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ logged_in: true });
    } else {
      this.setState({ logged_in: false });
    }
  }

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

            {/* <button className="btn btn-primary" data-toggle="modal" data-target="#new_entry">
              <i className="fas fa-plus"></i> Add new
            </button> */}
          </div>

          <div className={`pull-right ${this.state.logged_in ? 'hidden' : ''}`}>
            <button className="btn btn-sm btn-primary" data-toggle="modal" data-target="#register">Register</button>
            &nbsp;
            <button className="btn btn-sm btn-info" data-toggle="modal" data-target="#sign-in">Sign in</button>
          </div>

          <div className={`pull-right ${this.state.logged_in ? '' : 'hidden'}`}>
            <button className="btn btn-sm btn-danger" onClick={this.logout}>Logout</button>
          </div>

          <Login navbar_logged_in={this.navbar_logged_in}></Login>
          <Register></Register>
          {/* <New></New> */}
        </nav>
      </div>
    );
  }
}

export default Navbar;