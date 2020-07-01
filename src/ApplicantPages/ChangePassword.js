import React, { Component } from 'react'
import axios from "axios";

export default class ChangePassword extends Component {
  state={
    password:null,
    newPassword:null
  }

  changePasswordHandle=async()=>{

    const payload = {
      old: this.state.password,
      new: this.state.newPassword,
    };

    await axios({
      url: "http://commerchant.herokuapp.com/accounts/password",
      method: "PATCH",
      data: payload,
      headers: {
        Authorization: this.props.token,
      },
    })
    .then((response) => {alert(response.data.message)})
    .catch((err) => {alert(err.response.data.message)});
  }

  handlechange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    });
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
                    <h4 className="card-title">Edit Password</h4>
                  </div>
                  <div className="card-body" >
                  
                      <div className="row">
                       
                        <div className="col-md-6 pr-1">
                          <div className="form-group">
                            <label>Current Password</label>
                            <input
                              type="password"
                              className="form-control"
                              name="password"
                              onChange={this.handlechange}
                            />
                          </div>
                        </div>
                        <div className="col-md-6 pl-1">
                          <div className="form-group">
                            <label>New Password</label>
                            <input
                              type="password"
                              className="form-control"
                              name="newPassword"
                              onChange={this.handlechange}
                            />
                          </div>
                   
                      
                    
                    </div>
                    <button
                        style={{marginLeft:"20px"}}
                       
                        className="btn btn-info btn-fill pull-right"
                        onClick={this.changePasswordHandle}
                      >
                        Update Password
                      </button>
                    
                      <div className="clearfix"></div>
                      </div>
                  
                  </div>
                  </div>
                </div>
              </div>
            
             
            
          </div>
        </div>
      </div>
        )
    }
}
