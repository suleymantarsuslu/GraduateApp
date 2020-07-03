import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import axios from "axios";
import moment from "moment";

export default class Applicants extends Component {
  state = {
    applicants: [
      {
        name: "",
        username: "",
        email: "",
        contact: "",
        password: "",
      },
    ],

    applicationFiles: [],
    settedInterview: -1,
    interviews: [],
    applicantsAndInterviews: [],
    backgroundColors: {
      created: "#F08080",
      edited: "#F08080",
      submited: "#F08080",
      checked: "#F08080",
      updateRequested: "#F08080",
      updated: "#F08080",
      confirmed: "#F7DC6F",
      rejected: "#F08080",
      assessed: "#6BC608",
      accepted: "#6BC608",
      announced: "#6BC608",
      interviewSetted: "#F7DC6F",
    },
  };

  checkApplicant = (anApplicationandInterview) => {
    this.props.setCurrentApplicant(anApplicationandInterview.applicant);
    this.props.setCurrentInterview(anApplicationandInterview.interview);
    if (anApplicationandInterview.interviewDate === "") {
      this.props.setCurrentPage("CreateInterview");
    } else {
      this.props.setCurrentPage("EditInterview");
    }
  };

  componentWillMount = async () => {
    await this.interviewBringer();
    await this.takeInterviews();
    await this.checkInterviews();
  };

  takeInterviews = async () => {
    await axios({
      url: "http://commerchant.herokuapp.com/interviews/all",
      method: "GET",
      headers: {
        Authorization: this.props.token,
      },
    })
      .then(
        (response) =>
          this.setState({ interviews: response.data.payload.interviews }) |
          console.log(response)
      )
      .catch((err) => console.log(err));
    console.log(this.state.interviews);
  };

  c;

  checkInterviews = (anApplicant) => {
    this.state.applicationFiles.map((anApplication) => {
      this.setState({ settedInterview: -1 });
      this.state.interviews.map((anInterview) => {
        if (anInterview.applicant === anApplication.applicant._id) {
          this.setState({ settedInterview: anInterview });
        }
      });
      if (this.state.settedInterview === -1) {
        const obj = {
          grade: "",
          status: anApplication.status,
          applicant: anApplication.applicant,
          interviewDate: "",
          interviewLocation: "",
          interview: "",
        };
        this.setState({
          applicantsAndInterviews: [...this.state.applicantsAndInterviews, obj],
        });
      } else {
        var grade = "";
        if (anApplication.assessmentResult !== null) {
          grade = anApplication.assessmentResult;
        }
        const obj = {
          grade: grade,
          status: anApplication.status,
          applicant: anApplication.applicant,
          // interviewDate: moment(this.state.settedInterview.date).format(
          //   "dddd, MMM DD,  HH:mm "
          // ),
          interviewDate: this.state.settedInterview.date,
          interviewLocation: this.state.settedInterview.location,
          interview: this.state.settedInterview,
        };
        this.setState({
          applicantsAndInterviews: [...this.state.applicantsAndInterviews, obj],
        });
      }
    });
  };

  interviewBringer = async () => {
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
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  render() {
    return (
      <div>
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card strpied-tabled-with-hover">
                  <div className="card-header ">
                    <h4 className="card-title">Applicants</h4>
                  </div>
                  <div className="card-body table-full-width table-responsive">
                    <table className="table table-hover table-striped">
                      <thead>
                        <tr>
                          <th>Applicant</th>
                          <th>Interview Date</th>
                          <th>Interview Location</th>
                          <th>Interview Grade</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.applicantsAndInterviews.map(
                          (anApplicationandInterview) => (
                            <tr
                              key={anApplicationandInterview.applicant._id}
                              onClick={() =>
                                this.checkApplicant(anApplicationandInterview)
                              }
                            >
                              <td
                                style={{
                                  cursor: "pointer",
                                  backgroundColor: this.state.backgroundColors[
                                    anApplicationandInterview.status
                                  ],
                                }}
                              >
                                {anApplicationandInterview.applicant.name}{" "}
                                {anApplicationandInterview.applicant.surname}
                              </td>
                              <td>{anApplicationandInterview.interviewDate}</td>
                              <td>
                                {anApplicationandInterview.interviewLocation}
                              </td>
                              <td>{anApplicationandInterview.grade}</td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    );
  }
}
