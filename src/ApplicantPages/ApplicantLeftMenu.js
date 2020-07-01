import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import "../assets/img/apple-icon.png";
import "../assets/img/favicon.ico";
import "../assets/css/bootstrap.min.css";
import "../assets/css/light-bootstrap-dashboard.css?v=2.0.0 ";

export default class ApplicantLeftMenu extends Component {
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

  progressHandler=()=>{
    this.props.setCurrentPage("ApplicantProgress")
    
    this.setActive("account")
   
  }

  documentsHandler=()=>{
    this.props.setCurrentPage("UploadDocuments")
    
    this.setActive("documents")
  }
  notificationHandler=()=>{
    this.props.setCurrentPage("Notification")
    
    this.setActive("notification")
  }

  interviewHandle=()=>{
    this.props.setCurrentPage("ApplicantInterview")
    
    this.setActive("interview")
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
                  src={require("../assets/img/iyte_logo-tur.png")}
                  alt=""
                  width="200"
                  height="200"
                  onClick={this.homeHandle}
                />
              </a>
              <a  onClick={this.homeHandle}  className="simple-text">
                IZTECH Graduate Addmissions
              </a>
            </div>
            <ul className="nav">
              <li id="account"  onClick={this.accountHandler}>
                <a className="nav-link" >
                  <i className="nc-icon nc-circle-09"></i>
                  <p >Account</p>
                </a>
              </li>
              <li id="interview" onClick={this.interviewHandle}>
                <a className="nav-link" >
                  <i className="nc-icon nc-badge"></i>
                  <p>Interview</p>
                </a>
              </li>
              <li id="documents" onClick={this.documentsHandler}>
                <a className="nav-link" >
                  <i className="nc-icon nc-bullet-list-67"></i>
                  <p>Documents</p>
                </a>
              </li>
              <li id="notification" onClick={this.notificationHandler}>
                <a  className="nav-link" >
                  <i className="nc-icon nc-bell-55"></i>
                  <p>Notifications</p>
                </a>
              </li>
              <li className="nav-item active active-pro" id="progress" onClick={this.progressHandler}>
                <a className="nav-link active">
                  <i className="nc-icon nc-paper-2"></i>
                  <p>Application Progress</p>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
  
    );
  }
}