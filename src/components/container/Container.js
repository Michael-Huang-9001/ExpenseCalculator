import React, { Component } from "react";
import "./Container.css";
import Settings from "../settings/Settings";
import Main from "../main/Main";
import Categories from "../categories/Categories";

class Container extends Component {
    render() {
        return (
            <div className="Container">
                <div className="row">
                    <Settings />
                    <Main />
                    <Categories />
                </div>
            </div>
        );
    }
}

export default Container;