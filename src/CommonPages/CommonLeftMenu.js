import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import "../assets/img/apple-icon.png";
import "../assets/img/favicon.ico";
import "../assets/css/bootstrap.min.css";
import "../assets/css/light-bootstrap-dashboard.css?v=2.0.0 ";

export default class LeftMenu extends Component {

  programsHandle=()=>{
    this.props.setCurrentPage("Programs")
  }

  homeHandle=()=>{
    this.props.setCurrentPage("")
  }

  render() {
    return (

      <div
          className="sidebar"
        >
          <div className="sidebar-wrapper">
            <div className="logo">
              <a className="navbar-brand" >
                <img
                  src={require("../assets/img/iyte_logo-tur.png")}
                  alt=""
                  width="200"
                  height="200"
                  onClick={this.homeHandle}
                />
              </a>
              <a  className="simple-text" onClick={this.homeHandle}>
                IZTECH Graduate Addmissions
              </a>
            </div>
            <ul className="nav">
    
           
              <li>
                <a className="nav-link" >
                  <i className="nc-icon nc-bullet-list-67"></i>
                  <p onClick={this.programsHandle}>Programs</p>
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