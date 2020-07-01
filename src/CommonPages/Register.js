import React, { Component } from "react";
import "../assets/img/apple-icon.png";
import "../assets/img/favicon.ico";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "emailjs-com";

export default class Register extends Component {
  state = {
    name: "",
    surname: "",
    password: "",
    email: "",
    program: "",
    phone: "",
    address: "",
    isVerified: false,
    programs: [],
    password2: "",
  };

  componentWillMount() {
    this.programsBringer();
  }
  componentDidUpdate() {
    console.log(this.state.program);
  }

  handlechange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    });
  };

  handlePaaword = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    document.getElementById("passwordSame").innerHTML = "";
    this.setState({
      [name]: value,
    });
  };

  handleProgram = (event) => {
    const target = event.target;
    const name = target.name;
    const value  = target.value;

    this.setState({
      [name]: value,
    });
  };

  recaptchaLoaded() {
    console.log("reCAPTHA loaded successfuly");
  }

  programsBringer = async () => {
    await axios({
      url: "http://commerchant.herokuapp.com/programs/all",
      method: "GET",
    })
      .then((response) =>
        this.setState({ programs: response.data.payload.programs })
      )
      .catch((err) =>  alert(err.response.data.message));
  };

  change = (event) => {
    this.setState({ programs: event.target.value });
  };

  checkforVerification = (event) => {
    if (this.isVerified) {
      this.submit(event);
    }
  };

  submit = async (event) => {
    event.preventDefault();
    if (
      this.state.name === "" ||
      this.state.surname === "" ||
      this.state.password === "" ||
      this.state.email === "" ||
      this.state.program === "" ||
      this.state.phone === "" ||
      this.state.address === "" ||
      this.state.password2 === ""
    ) {
      document.getElementById("emptyField").innerHTML =
        "Please fill the empty fields and try again!";
    } else {
      if (this.state.password === this.state.password2) {
        const payload = {
          program: this.state.program,
          name: this.state.name,
          surname: this.state.surname,
          email: this.state.email,
          password: this.state.password,
          phone: this.state.phone,
          address: this.state.address,
        };

        await axios.post (
          "http://commerchant.herokuapp.com/accounts/register",payload
          // url: "http://commerchant.herokuapp.com/accounts/register",
          // method: "POST",
          // data: payload,
        )
          .then((response) => {alert(response.data.message +"\n\nVerification mail has been sent.Please check your email and verify your account!")})
          .catch((err) => {alert(err.response.data.message +"\n"+err.response.data.error)});
          
      } else {
        document.getElementById("passwordSame").innerHTML =
          "Passwords are not same!";
      }
    }
  };

  onloadCallback = function () {
    this.setState({ isVerified: true });
  };

  render() {
    return (
      <div className="wrapper">
        <div>
          <div className="card" border-style="double">
            <div className="card-header">
              <h4 className="card-title">Create Account</h4>
            </div>
            <div className="card-body">
              <form onSubmit={this.submit}>
                <div className="row">
                  <div className="col-md-6 pr-1">
                    <div className="form-group">
                      <Label for="name">Name</Label>
                      <Input
                        required
                        type="text"
                        name="name"
                        value={this.state.name}
                        placeholder="Enter Your First Name!"
                        onChange={this.handlechange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 pl-1">
                    <div className="form-group">
                      <Label for="lastname">Surname</Label>
                      <Input
                        type="text"
                        name="surname"
                        value={this.state.username}
                        placeholder="Enter Your Last Name!"
                        onChange={this.handlechange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 pr-1">
                    <div className="form-group">
                      <label for="exampleFormControlSelect1">
                        Program to apply
                      </label>

                      <select
                        className="form-control"
                        id="exampleFormControlSelect1"
                        name="program"
                        onChange={this.handleProgram}
                        required
                      >
                        <option value="" disabled selected>
                          Select your option
                        </option>
                        {this.state.programs.map((aProgram) => (
                          <option value={aProgram._id} key={aProgram._id}>{aProgram.name}</option>
                        ))}
                        ;
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6 pl-1">
                    <div className="form-group">
                      <Label for="email">Email</Label>
                      <Input
                        type="email"
                        name="email"
                        value={this.state.email}
                        placeholder="Enter your e-mail!"
                        onChange={this.handlechange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 pl-1" style={{marginLeft:"10px"}}>
                    <div className="form-group">
                      <Label for="email">Phone</Label>
                      <Input
                        type="tel"
                        name="phone"
                        value={this.state.phone}
                        placeholder="05*********"
                        onChange={this.handlechange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 pr-1">
                    <div className="form-group">
                      <label for="exampleInputEmail1">Password</label>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        id="inputPassword"
                        placeholder="Password"
                        onChange={this.handlechange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6 pl-1">
                    <div className="form-group">
                      <label for="exampleInputEmail1">Validate Password</label>
                      <input
                        name="password2"
                        type="password"
                        className="form-control"
                        id="inputPassword"
                        placeholder="Password"
                        onChange={this.handlePaaword}
                        required
                      />
                    </div>
                  </div>
                  <p style={{ color: "red" }} id="passwordSame"></p>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <Label for="address">Address</Label>
                      <Input
                        type="text"
                        name="address"
                        value={this.state.address}
                        placeholder="Enter Your Address!"
                        onChange={this.handlechange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <ReCAPTCHA
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                  render="explicit"
                  onChange={this.onloadCallback}
                  required
                />
                <p />
                <p style={{ color: "red" }} id="emptyField"></p>
                <button
                  type="submit"
                  className="btn btn-info btn-fill pull-right"
                >
                  Register
                </button>
                <div className="clearfix"></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
