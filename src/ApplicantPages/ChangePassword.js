import React, { Component } from 'react'

export default class ChangePassword extends Component {
    render() {
        return (
            <div className="wrapper">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Edit Profile</h4>
                  </div>
                  <div className="card-body">
                    <form onSubmit={this.submit}>
                      <div className="row">
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
                      
                    
                    </div>
                      <p/>
                      <button
                        type="submit"
                        className="btn btn-info btn-fill pull-right"
                      >
                        Update Profile
                      </button>
                      <div className="clearfix"></div>
                      </div>
                    </form>
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
