import React, { Component } from "react";
import axios from "axios";

export default class SendNotification extends Component {
  state = {
    to: "",
    title: "",
    note: "",
  };

  handleProgram = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    });
  };

  submit = async (event) => {
    event.preventDefault();
    if (
      this.state.to === "" ||
      this.state.title === "" ||
      this.state.note === ""
    ) {
      document.getElementById("EmptySpaces").innerHTML =
        "Please fill the empty fields and try again!";
    } else {
      const payload = {
        to: this.state.to,
        title: this.state.title,
        note: this.state.note,
      };
      console.log("gönderilen veri: ", payload);
      await axios({
        url: "http://commerchant.herokuapp.com/notifications",
        method: "POST",
        headers: {
          // Authorization: window.localStorage.getItem("token"),
          Authorization: this.props.token,
        },
        data: payload,
      })
        .then((response) => alert(response.data.message))
        .catch((err) => alert(err.response.data.message));
    }
  };

  render() {
    return (
      <div>
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Send Notification</h4>
                  </div>
                  <div className="card-body">
                    <form>
                      <div className="row">
                        <div className="col-md-10 pr-1">
                          <div className="form-group">
                            <label>To:</label>
                            <input
                              type="email"
                              required="required"
                              className="form-control"
                              placeholder="email"
                              name="to"
                              onChange={this.handleProgram}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-10 pr-1">
                          <div className="form-group">
                            <label>Subject</label>
                            <input
                              type="text"
                              required="required"
                              className="form-control"
                              name="title"
                              onChange={this.handleProgram}
                            />
                            <br />
                            <br />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-10 pr-1">
                          <div className="form-group">
                            <label>Message</label>​
                            <textarea
                              id="txtArea"
                              rows="12"
                              cols="74"
                              name="note"
                              onChange={this.handleProgram}
                            ></textarea>
                          </div>
                        </div>
                      </div>

                      <p style={{ color: "red" }} id="EmptySpaces"></p>

                      <div className="clearfix"></div>
                      <button
                        type="submit"
                        className="btn btn-info btn-fill pull-right"
                        value="Submit"
                        onClick={this.submit}
                      >
                        Submit
                      </button>
                    </form>
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
