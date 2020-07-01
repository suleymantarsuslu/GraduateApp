import React, { Component } from "react";
import axios from "axios";

import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import ChangePassword from "./ChangePassword";
export default class Profile extends Component {
  state = {
    myProfile: { },
    applicationFile:null,
    program:null
  };

  handlechange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    });
  };

  submit = async (event) => {
    event.preventDefault();
    const payload = {
      name: this.state.name,
      middlename: this.state.middlename,
      surname: this.state.surname,
      phone: this.state.phone,
      address: this.state.address,

    };
    await axios({
      url: "http://commerchant.herokuapp.com/accounts/profile",
      method: "PATCH",
      data: payload,
      headers: {
          Authorization : this.props.token
           },
    })
      .then(
        (response) => (
          this.setState({ datas: response }), alert(response.data.message)
        )
      )
      .catch((err) => {alert(err.response.data.message)});
  };


  handlePasswordChange=()=>{
    this.props.setCurrentPage("ChangePassword")
}


  componentWillMount= async()=>{
    await this.getProfile()
    // await this.getApplicationFile()
  }

  // getApplicationFile = async () => {
  //   await axios({
  //     url: "http://commerchant.herokuapp.com/applications",
  //     method: "GET",
  //     headers: {
  //       Authorization : this.props.token
  //      },
  //   })
  //       .then((response) =>(
  //       this.setState({ applicationFile: response.data.payload.application })
  //       )
  //     )
  //     .catch((err) => console.log(err));
  //     console.log(this.state.applicationFile)
  // };


 
  

  getProfile = async () => {
    await axios({
      url: "http://commerchant.herokuapp.com/accounts/profile",
      method: "GET",
      headers: {
        // Authorization: window.localStorage.getItem("token"),
        Authorization : this.props.token
        },
    })
      .then((response) =>
        this.setState({ myProfile: response.data.payload.account })

      )
      .catch(() => console.log("Profil gösterilemedi"));
     
  };

  render() {
    return (
        <div className="wrapper">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Profile</h4>
                  </div>
                  <div className="card-body">
                    <form onSubmit={this.submit}>
                      <div className="row">
                        <div className="col-md-6 pr-1">
                          <div className="form-group">
                            <label>First Name</label>
                            <input
                            disabled="disabled" 
                              type="text"
                              className="form-control"
                              placeholder={this.state.myProfile.name}
                              name="name"
                              onChange={this.handlechange}
                            />
                          </div>
                        </div>
                      
                        <div className="col-md-6 pl-1">
                          <div className="form-group">
                            <label >
                              Last Name
                            </label>
                            <input
                            disabled="disabled" 
                              type="text"
                              className="form-control"
                              placeholder={this.state.myProfile.surname}
                             name= "surname"
                             onChange={this.handlechange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 ">
                          <div className="form-group">
                            <label>Email</label>
                            <input
                              type="email"
                              className="form-control"
                              disabled="disabled" 
                              placeholder={this.state.myProfile.email}
                              name="email"
                              onChange={this.handlechange}
                            />
                          </div>
                        </div>
                      
                    
                  <div className="col-md-6 " >
                    <div className="form-group">
                      <Label for="email">Phone</Label>
                      <Input
                        type="text"
                        name="phone"
                        placeholder={this.state.myProfile.phone}
                        onChange={this.handlechange}
                      />
                    </div>
                  </div>
                </div>

                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>Address</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder={this.state.myProfile.address}
                              name="address"
                              onChange={this.handlechange}
                            />
                          </div>
                        </div>
                      </div>
                      <p/>

                      <p onClick={this.handlePasswordChange} style={{color:"blue", cursor:"pointer"}}>Change Password</p>
                      <p/>
                      <button
                        type="submit"
                        className="btn btn-info btn-fill pull-right"
                      >
                        Update Profile
                      </button>
                      <div className="clearfix"></div>

                    </form>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card card-user">
                  <div className="card-image">
                    <img
                      src="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                      alt="..."
                    />
                  </div>
                  <div className="card-body">
                    <div className="author">
                      <a href="#">
                        <img
                          className="avatar border-gray"
                          src={require("../assets/img/faces/face-0.jpg")}
                          alt="..."
                        />
                        <p/>
                        <p/>
                        <p/>
                    
                        <h5 className="title">{this.state.myProfile.name + "  "+ this.state.myProfile.surname }</h5>
                      </a>
                      <p className="description">{this.state.myProfile.email}</p>
                    </div>
                    <p className="description text-center">
                      
                    </p>
                  </div>
                  <hr />
                  <div className="button-container mr-auto ml-auto">
                    <button href="#" className="btn btn-simple btn-link btn-icon">
                      <i className="fa fa-facebook-square"></i>
                    </button>
                    <button href="#" className="btn btn-simple btn-link btn-icon">
                      <i className="fa fa-twitter"></i>
                    </button>
                    <button href="#" className="btn btn-simple btn-link btn-icon" >
                      <i className="fa fa-google-plus-square"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
