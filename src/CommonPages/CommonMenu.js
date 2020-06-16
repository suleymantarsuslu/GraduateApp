import React, { Component } from "react";
import "../assets/img/apple-icon.png";
import "../assets/img/favicon.ico";
import "../assets/css/bootstrap.min.css";
import "../assets/css/light-bootstrap-dashboard.css?v=2.0.0 ";
import { BrowserRouter, Route, Link , Redirect} from 'react-router-dom';

export default class CommonMenu extends Component {
  state = {};

  loginHandler=()=>{
    this.props.setLogin()
  }

  registerHandler=()=>{
    this.props.setCurrentPage("Register")
  }

  render() {
    return (
      <div style={{ width:"100%" , display: "block" }}>
        <nav className="navbar navbar-expand-lg " color-on-scroll="500">
         
         
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navigation"
          >
        
            <ul className="navbar-nav ml-auto">
            <li className="nav-item" style={{cursor:"pointer"}}>
                <a className="nav-link" style={{cursor:"pointer"}}>
                <span className="no-icon" onClick={ this.registerHandler}  style={{cursor:"pointer"}}>Register</span>
                </a>
              </li>
              <li className="nav-item" style={{cursor:"pointer"}}>
                <a className="nav-link" style={{cursor:"pointer"}}>
                  <span className="no-icon" onClick={ this.loginHandler} style={{cursor:"pointer"}}>Login</span>
                </a>
              </li>
            
        
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
