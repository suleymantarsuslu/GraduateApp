import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import axios from "axios";

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
        backgroundColors:{created:"#F08080", edited:"#F7DC6F", submited:"#F7DC6F", checked:"#F7DC6F", updateRequested:"#00FFFF", updated:"#F7DC6F", confirmed:"#6BC608", rejected:"#F08080", assessed:"#A569BD", accepted:"#F4F6F7 ", announced:"#F4F6F7"},
 

    applicationFiles: [],
    applicantsNeeded: [],
  };

  checkApplicant = (anApplicationFile) => {
    this.props.setApplicationFile(anApplicationFile);
    this.props.setCurrentApplicant(anApplicationFile);
    this.props.setCurrentPage("Documents");
  };

  componentWillMount = async () => {
    await this.getApplicants();
   
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
        this.setState({ applicationFiles: response.data.payload.applications }
        )
      )
      .catch((err) => console.log(err));
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
                          <th>Status</th>
                          <th>Email</th>
                          <th>Program</th>
                        
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.applicationFiles.map((anApplication) => (
                          <tr
                            key={anApplication._id}
                            onClick={() => this.checkApplicant(anApplication)}
                            style={{cursor:"pointer", backgroundColor:this.state.backgroundColors[anApplication.status]}}
                          >
                            <td>
                              {anApplication.applicant.name}{" "}
                              {anApplication.applicant.surname}
                            </td>
                            <td>
                              {anApplication.status}
                            </td>
                            <td>{anApplication.applicant.email}</td>

                            <td>{anApplication.program.name}</td>
                          </tr>
                        ))}
                          
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
