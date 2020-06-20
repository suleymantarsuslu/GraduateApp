import React, { Component } from "react";
import { Label, Input } from "reactstrap";
import axios from "axios";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    datas: {},
    token: "",
    profile: {},
    isSuccess: "",
  };



  handleLogin= async (data)=>{
    this.setState({datas:data})
    if (this.state.datas.data.success === true) {
      await window.localStorage.setItem(
        "token",
        this.state.datas.data.payload.token,
       
      );
      this.setState({isSuccess : "Login is Successful"});
      this.props.setLogin()
      this.props.setToken(this.state.datas.data.payload.token)
      this.getProfile()
      }

  }

  handleError=(err)=>{
    document.getElementById("loginEmptyField").innerHTML="Wrong Email or Password"
  }

  

  getProfile= async ()=>{
    await axios({
      url: "http://commerchant.herokuapp.com/accounts/profile",
      method: "GET",
      headers: {
       Authorization: window.localStorage.getItem("token"),
        },
    })
      .then((response) =>(
       
      this.props.setCurrentPage(""),
        this.props.setProfile( response.data.payload.account ))

      )
      .catch(() => console.log("Profil gösterilemedi"));
;
}

  submit = async (event) => {
    event.preventDefault();
    if (
      this.state.email === "" ||
      this.state.password === "" 
    ){
      document.getElementById("loginEmptyField").innerHTML =
      "Please fill the empty fields and try again!";
    }else {
    const payload = {
      email: this.state.email,
      password: this.state.password,
    };

    await axios({
      url: "http://commerchant.herokuapp.com/accounts/login",
      method: "POST",
      data: payload,
    })
      .then((data) =>(this.handleLogin(data)))

      .catch((err) => this.handleError(err));

    }
  };
  





  
  

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
      <div>
        <div className="card"  style={{paddingRight: "1px", width: "90%"}}>
          <div className="card-header">
            <h4 className="card-title">Login</h4>
          </div>
          <div className="card-body">
            <form onSubmit={this.submit}>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      value={this.state.email}
                      name="email"
                      placeholder="Enter Your Email"
                      onChange={this.handlechange}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      type="password"
                      value={this.state.password}
                      name="password"
                      placeholder="Enter Your Password!"
                      onChange={this.handlechange}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                <p style={{ color: "red" }} id="loginEmptyField"></p>
                  <button
                    type="submit"
                    className="btn btn-info btn-fill pull-right"
                  >
                    Login
                  </button>
                  <div className="clearfix"></div>
                </div>

              </div>
              <Label>{this.state.isSuccess}</Label>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
