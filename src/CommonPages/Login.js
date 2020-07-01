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

      .catch((err) =>  alert(err.response.data.message));

    }
  };
  



verificationHandler=async(event)=>{
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
      url: "http://commerchant.herokuapp.com/accounts/resend",
      method: "POST",
      data: payload,
    })
    .then((response) =>(alert(response.data.message)))
    .catch((err) => alert(err.response.data.message));

    }
}



passwordForgetHandler=async(event)=>{
  event.preventDefault();
 
  const payload = {
    email: this.state.email,
    password: this.state.password,
  };

  await axios({
    url: "http://commerchant.herokuapp.com/accounts/forgetpass",
    method: "POST",
    data: payload,
  })
    .then((response) =>(alert(response.data.message + "\n \n You can change you password from Profile page")))
    .catch((err) => alert(err.response.data.message));
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
                <p onClick={this.passwordForgetHandler} id="forgetPassword" style={{ float:"left", fontSize:"12px", paddingLeft:"10px",paddingRight:"5px",cursor:"pointer"}}>  Forget Password</p>  <p onClick={this.verificationHandler}  id="verification" style={{  float:"left", fontSize:"12px", paddingLeft:"10px",cursor:"pointer"}}>Resend Verification mail</p>

              </div>
              <Label>{this.state.isSuccess}</Label>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
