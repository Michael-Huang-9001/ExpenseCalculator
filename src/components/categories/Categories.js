import React, { Component } from "react";
import "./Categories.css";

class Categories extends Component {
  render() {
    return (
      <div className="Categories col-sm">
          Monthly limit?<br />
          <input type="number" placeholder="Limit"></input>
      </div>
    );
  }
}

export default Categories;