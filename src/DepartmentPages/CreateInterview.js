import React, { Component } from "react";
import axios from "axios";

export default class CreateInterview extends Component {
  state = {
    applicant: "",
    date: "",
    location: "",
    applicationFiles:[],
    currentApplicationFile:null
  };

  componentWillMount(){
this.getApplicants()
  }
  handleProgram = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    });
  };

  getApplicants = async () => {
    await axios({
      url: "http://commerchant.herokuapp.com/applications/all",
      method: "GET",
      headers: {
        Authorization: this.props.token,
      },
    })
      .then((response) =>
        this.setState({ applicationFiles: response.data.payload.applications })
      )
      .catch((err) => console.log(err));


        this.state.applicationFiles.map((anApplication)=>{
            if(anApplication.applicant._id === this.props.currentApplicant._id){
                this.setState({currentApplicationFile: anApplication})
            }

        })



  };

  submit = async (event) => {
    event.preventDefault();
    if (this.state.date === "" || this.state.location === "") {
      document.getElementById("EmptySpaces").innerHTML =
        "Please fill the empty fields and try again!";
    } else {
      const payload = {
        applicant: this.props.currentApplicant._id,
        date: this.state.date,
        location: this.state.location,
      };
      console.log("gönderilen veri: ", payload);

      await axios({
        url: "http://commerchant.herokuapp.com/interviews",
        method: "POST",
        headers: {
          // Authorization: window.localStorage.getItem("token"),
          Authorization: this.props.token,
        },
        data: payload,
      })
        .then(
          (response) =>
            this.setState({ datas: response }) |
            alert(response.data.message) |
            this.sendNotification()
        )
        .catch((err) => console.log(err));
    }



    const data={
      status: "interviewSetted",
  }
  
  await axios({
      url:
        "http://commerchant.herokuapp.com/applications/" +
        this.state.currentApplicationFile._id,
      method: "PATCH",
      data: data,
      headers: {
        Authorization: this.props.token,
      },
    })
      .then(
        (response) =>
          console.log(response.data.message) |
          this.setState({ status: this.state.currentStatus })
      )
      .catch((err) => alert(err.response.data.message));
  

  };

  

  sendNotification = async () => {
    const payload = {
      to: this.props.currentApplicant.email,
      title: "Interview Has Been Set",
      note: " Date: " + this.state.date + "\nLocation:" + this.state.location,
    };
    await axios({
      url: "http://commerchant.herokuapp.com/notifications",
      method: "POST",
      headers: {
        // Authorization: window.localStorage.getItem("token"),
        Authorization: this.props.token,
      },
      data: payload,
    })
      .then((response) => console.log(response.data.message))
      .catch((err) => console.log(err));
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
                    <h4 className="card-title">New Interview</h4>
                  </div>
                  <div className="card-body">
                    <form>
                      <div className="row">
                        <div className="col-md-10 pr-1">
                          <div className="form-group">
                            <label>Date</label>
                            <input
                              type="datetime-local"
                              required="required"
                              className="form-control"
                              name="date"
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
                            <label>Location</label>​
                            <textarea
                              id="txtArea"
                              rows="12"
                              cols="74"
                              name="location"
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
