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

    applicationFiles:[]




  };


checkApplicant=(anApplicant)=>{
  this.props.setCurrentApplicant(anApplicant.applicant)
  this.props.setCurrentPage("Documents")
}


  componentWillMount(){
    this.jwtHandler()
  }


  jwtHandler = async () => {
    await axios({
      url: "http://commerchant.herokuapp.com/applications/all",
      method: "GET",
      headers: {
        Authorization : this.props.token
       },
    })
        .then((response) =>(
        this.setState({ applicationFiles: response.data.payload.applications })
        )
      )
      .catch((err) => console.log(err));
      console.log(this.state.applicationFiles)
  };






  render() {
    return (
      <div>
        <div class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-12">
                <div class="card strpied-tabled-with-hover">
                  <div class="card-header ">
                    <h4 class="card-title">Applicants</h4>
                  </div>
                  <div class="card-body table-full-width table-responsive">
                    <table class="table table-hover table-striped">
                      <thead>
                        <tr>
                          <th>Applicant</th>
                          <th>Documents</th>
                          <th>Upload Date</th>
                          <th>Action</th>
                          <th>Details</th>
                        </tr>
                      </thead>
                      <tbody>
                      {this.state.applicationFiles.map((anApplication) => (
                        
                      <tr onClick={()=> this.checkApplicant(anApplication)}>
                          <td>{anApplication.applicant.name} {anApplication.applicant.surname}</td>
                          <td>
                            <img
                              src={require("../assets/img/confirmed.png")}
                              alt=""
                              width="50px"
                              height="25px"
                            />
                          </td>
                          <td>01.02.2020 08:55</td>
                          <td></td>
                          <td>Documents has been checked and confirmed.</td>
                        </tr>



                      ))}
                        <tr>
                          <td>John Doe</td>
                          <td>
                            <img
                              src={require("../assets/img/confirmed.png")}
                              alt=""
                              width="50px"
                              height="25px"
                            />
                          </td>
                          <td>01.02.2020 08:55</td>
                          <td></td>
                          <td>Documents has been checked and confirmed.</td>
                        </tr>
                        <tr>
                          <td>Maie Swift</td>
                          <td>
                            <img
                              src={require("../assets/img/confirmed.png")}
                              alt=""
                              width="40%"
                              height="28%"
                            />
                          </td>
                          <td></td>
                          <td></td>
                          <td>Documents are missing.</td>
                        </tr>
                        
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
