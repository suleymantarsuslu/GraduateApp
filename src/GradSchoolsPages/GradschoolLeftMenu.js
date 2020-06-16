import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import "../assets/img/apple-icon.png";
import "../assets/img/favicon.ico";
import "../assets/css/bootstrap.min.css";
import "../assets/css/light-bootstrap-dashboard.css?v=2.0.0 ";

export default class GradschoolLeftMenu extends Component {
state={
  lastPage:"",
 
}

  homeHandle=()=>{
    this.props.setCurrentPage("")
  }

  accountHandler=()=>{
    this.props.setCurrentPage("Profile")
    this.setActive("account")
  }

  applicantsHandler=()=>{
    this.props.setCurrentPage("Applicants")
    this.setActive("applicants")
  }

  programsHandler=()=>{
    this.props.setCurrentPage("GradschoolPrograms")
    this.setActive("gradschoolPrograms")
  }

  notificationHandler=()=>{
    this.props.setCurrentPage("GradSchoolNotifications")
    
    this.setActive("notification")
  }


  setActive=(value)=>{
    if(this.state.lastPage===""){
      document.getElementById(value).className="nav-item active"
  
  }else{
    document.getElementById(value).className="nav-item active"
    document.getElementById(this.state.lastPage).classList.remove("nav-item")
    document.getElementById(this.state.lastPage).classList.remove("active")
  }

    
    this.setState({lastPage:value})
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
                style={{cursor:"pointer"}}
                  src={require("../assets/img/iyte_logo-tur.png")}
                  alt=""
                  width="200"
                  height="200"
                  onClick={this.homeHandle}
                />
              </a>
              <a  onClick={this.homeHandle} style={{cursor:"pointer"}} className="simple-text">
                IZTECH Graduate Addmissions
              </a>
            </div>
            <ul className="nav">
              <li id="applicants"  onClick={this.applicantsHandler}>
                <a className="nav-link" >
                  <i className="nc-icon nc-circle-09"></i>
                  <p >Applicants</p>
                </a>
              </li>
              <li id="gradschoolPrograms"  onClick={this.programsHandler}>
                <a className="nav-link">
                  <i className="nc-icon nc-badge"></i>
                  <p>Programs</p>
                </a>
              </li>
              <li id="notification" onClick={this.notificationHandler}>
                <a  className="nav-link" >
                  <i className="nc-icon nc-bell-55"></i>
                  <p>Notifications</p>
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