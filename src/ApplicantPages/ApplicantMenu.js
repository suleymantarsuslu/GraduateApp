import React, { Component } from "react";
import "../assets/img/apple-icon.png";
import "../assets/img/favicon.ico";
import "../assets/css/bootstrap.min.css";
import "../assets/css/light-bootstrap-dashboard.css?v=2.0.0 ";


export default class ApplicantMenu extends Component {
  state = {};


  accountHandler=()=>{
    this.props.setCurrentPage("Profile")
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
              <li className="nav-item">
                <a className="nav-link" onClick={this.accountHandler} >
    <span className="no-icon">{this.props.profile.name} {this.props.profile.surname}</span>
                </a>
              </li>
             
              <li className="nav-item">
                <a className="nav-link" href="/home" onClick={localStorage.clear()}>
                  <span className="no-icon">Log out</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
