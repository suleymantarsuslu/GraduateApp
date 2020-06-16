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

    applicationFiles:[]




  };

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
                        <tr>
                          <td>Bessie Berry</td>
                          <td>
                            <img
                              src={require("../assets/img/confirmed.png")}
                              alt=""
                              width="40%"
                              height="28%"
                            />
                          </td>
                          <td>04.04.2020 13:45</td>
                          <td>
                            <a href="documents.html" />
                            <img
                              src={require("../assets/img/confirmed.png")}
                              alt=""
                              width="50%"
                              height="30%"
                            />
                          </td>
                          <td>Documents are not been checked yet.</td>
                        </tr>
                        <tr>
                          <td>Tony Stark</td>
                          <td>
                            <img
                              src={require("../assets/img/confirmed.png")}
                              alt=""
                              width="40%"
                              height="28%"
                            />
                          </td>
                          <td>05.04.2020 15:30</td>
                          <td>
                            <a href="documents.html" />
                            <img
                              src={require("../assets/img/confirmed.png")}
                              alt=""
                              width="50%"
                              height="30%"
                            />
                          </td>
                          <td>Documents are not been checked yet.</td>
                        </tr>
                        <tr>
                          <td>Merve Celik</td>
                          <td>
                            <img
                              src={require("../assets/img/confirmed.png")}
                              alt=""
                              width="40%"
                              height="28%"
                            />
                          </td>
                          <td>02.02.2020 08:45</td>
                          <td></td>
                          <td>Documents has been checked and confirmed.</td>
                        </tr>
                        <tr>
                          <td>Nick Herasimenka</td>
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
                          <td>Documents are missing!</td>
                        </tr>
                        <tr>
                          <td>Valentin Salmon</td>
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
                          <td>Documents are not valid!</td>
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
