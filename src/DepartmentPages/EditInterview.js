import React, { Component } from "react";
import axios from "axios";
import moment from "moment";

export default class EditInterview extends Component {
  state = {
    applicant: "",
    date: "",
    location: "",
    editDate: false,

  };


  gradeInterviewHandler=()=>{
    this.props.
    setCurrentPage("GradeInterview")
    }
componentWillMount=()=>{
    this.setState({date:this.props.currentInterview.date})
    this.setState({location:this.props.currentInterview.location})
}

  handleProgram = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    });

    console.log(name + " : " + value)

  };

  handleDate =()=>{
      if(this.state.editDate){
      document.getElementById("dateInput").hidden=true
      this.setState({editDate:false})
      }else{
        document.getElementById("dateInput").hidden=false
        this.setState({editDate:true})
      }
  }

  submit = async (event) => {
    event.preventDefault();


  const payload = {
    applicant: this.props.currentApplicant._id,
    date: this.state.date,
    location: this.state.location,

  };

await axios({
url: "http://commerchant.herokuapp.com/interviews/"+ this.props.currentInterview._id,
method: "PUT",
headers: {
  Authorization: this.props.token,
},
data: payload,
})
.then(
  (response) => alert(response.data.message) | this.sendNotification()
  )

.catch((err) => alert(err.response.data.message));
    
  };

 



  sendNotification = async () => {
     
    
    const payload = {
      to: this.props.currentApplicant.email,
      title: "Interview Has Been Updated",
      note: " Date: " + this.state.date + "\nLocation:"+ this.state.location
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
      .then(
        (response) => ( console.log(response.data.message)
        )
      )
      .catch((err) => console.log(err));
  };




  render() {
    return (
      <div>
        <div className="content">
          <div className="container-fluid">
          <p onClick={this.gradeInterviewHandler} style={{color:"blue", textAlign:"right", cursor:"pointer"}}>Grade Interview</p>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">
                      Edit Interview : {this.props.currentApplicant.name}{" "}
                      {this.props.currentApplicant.surname}
                    </h4>
                  </div>
                  <div className="card-body">
                    <form>
                      <div className="row">
                        <div className="col-md-10 pr-1">
                          <div className="form-group">
                            <label>Date</label>
                            <br />
                            {moment(this.props.currentInterview.date).format("dddd, MMM DD,  HH:mm ")} 
                            <p
                              onClick={this.handleDate}
                              style={{ color: "blue", cursor: "pointer" }}
                            >
                              (Edit The Date)
                            </p>
                            <input
                              id="dateInput"
                              type="datetime-local"
                              required="required"
                              className="form-control"
                              name="date"
                              hidden
                              placeholder={moment(this.props.currentInterview.date).format("dddd, MMM DD,  HH:mm ")}
                              onChange={this.handleProgram}
                            />
                    
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-10 pr-1">
                          <div className="form-group">
                            <label>Location</label>​
                            <textarea
                              id="txtArea"
                              rows="5"
                              cols="74"
                              name="location"
                              placeholder={this.props.currentInterview.location}
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
