import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import axios from "axios";

export default class Applicants extends Component {
  state = {
    applicants: [
      {
        name: "Faruk Karadas",
        username: "faruk",
        email: "faruk@faruk.com",
        contact: "+905350809590",
        password: "123",
      },
    ],

    applicationFiles: [],

    interviews: [],
  };

  checkApplicant = (anApplicant) => {
    this.props.setCurrentApplicant(anApplicant.applicant);
    this.props.setCurrentPage("CreateInterview");
  };

  componentWillMount = async () => {
    await this.jwtHandler();
    await this.takeInterviews();
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
          this.setState({ interviews: response.data.payload.interview }) |
          console.log(response)
      )
      .catch((err) => console.log(err));
  };

  checkInterviewDate = (anApplicant) => {
    this.state.interviews.map((anInterview) => {
      if (anInterview.applicant._id === anApplicant._id) {
        return (anInterview.date
        );
      }
    });
  };

  checkInterviewLocation = (anApplicant) => {
    this.state.interviews.map((anInterview) => {
      if (anInterview.applicant._id === anApplicant._id) {
        return (anInterview.location
        );
      }
    });
  };

  jwtHandler = async () => {
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
    console.log(this.state.applicationFiles);
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
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.applicationFiles.map((anApplication) =>
                          // this.checkInterview(anApplication.applicant)
                          <tr onClick={() => this.checkApplicant(anApplication)}>
                          <td>{anApplication.applicant.name}</td>
                          <td>{this.checkInterviewDate(anApplication.applicant)}</td>
                          <td>{this.checkInterviewLocation(anApplication.applicant)}</td>
                        </tr>
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
