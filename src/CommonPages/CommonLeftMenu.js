import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import "../assets/img/apple-icon.png";
import "../assets/img/favicon.ico";
import "../assets/css/bootstrap.min.css";
import "../assets/css/light-bootstrap-dashboard.css?v=2.0.0 ";

export default class LeftMenu extends Component {
  state = {
    lastPage: "",
  };

  setActive = (value) => {
    if (this.state.lastPage === "") {
      document.getElementById(value).className = "nav-item active";
    } else {
      document.getElementById(value).className = "nav-item active";
      document.getElementById(this.state.lastPage).classList.remove("nav-item");
      document.getElementById(this.state.lastPage).classList.remove("active");
    }

    this.setState({ lastPage: value });
  };

  programsHandle = () => {
    this.props.setCurrentPage("Programs");
    this.setActive("programs");
  };

  roadMapHandle = () => {
    this.props.setCurrentPage("RoadMap");
    this.setActive("roadMap");
  };

  homeHandle = () => {
    this.props.setCurrentPage("");
  };

  render() {
    return (
      <div className="sidebar">
        <div className="sidebar-wrapper">
          <div className="logo">
            <a className="navbar-brand">
              <img
                style={{ cursor: "pointer" }}
                src={require("../assets/img/iyte_logo-tur.png")}
                alt=""
                width="200"
                height="200"
                onClick={this.homeHandle}
              />
            </a>
            <a
              className="simple-text"
              style={{ cursor: "pointer" }}
              onClick={this.homeHandle}
            >
              IZTECH Graduate Addmissions
            </a>
          </div>
          <ul className="nav">
            <li
              id="programs"
              style={{ cursor: "pointer" }}
              onClick={this.programsHandle}
            >
              <a className="nav-link" style={{ cursor: "pointer" }}>
                <i className="nc-icon nc-bullet-list-67"></i>
                <p style={{ cursor: "pointer" }}>Programs</p>
              </a>
            </li>

            <li
              id="roadMap"
              style={{ cursor: "pointer" }}
              onClick={this.roadMapHandle}
            >
              <a className="nav-link" style={{ cursor: "pointer" }}>
              <i className="nc-icon nc-badge"></i>
                <p style={{ cursor: "pointer" }}>Road Map</p>
              </a>
            </li>
          </ul>
        </div>
      </div>

      // <div>
      //   <h3>{this.props.info.title}</h3>
      //   <ListGroup>
      //     {this.props.menuElements.map((category) => (
      //       <ListGroupItem
      //         onClick={() => this.props.changeCategory(category)}
      //         key={category.CategoryName}
      //       >
      //         {category.CategoryName}
      //       </ListGroupItem>
      //     ))}
      //   </ListGroup>
      // </div>
    );
  }
}
