import React, { Component } from "react";
import axios from "axios";
import { Label, Input } from "reactstrap";

export default class OpenProgram extends Component {
  state = {
    coordinator: "",
    coordinators: [],
    departments: [
      "Department of Physics",
      "Department of Photonics",
      "Department of Chemistry",
      "Department of Mathematics",
      "Department of Moleculer Biology and Genetics",
      "Department of Bioengineering",
      "department of Chemical Engineering",
      "Department of CIVIL ENGINEERING",
      "Department of CIVIL ENGINEERING ",
      "DEPARTMENT OF ELECTRICAL AND ELECTRONICS ENGINEERING",
      "DEPARTMENT OF ENERGY SYSTEMS ENGINEERING",
      "DEPARTMENT OF ENVIROMENTAL ENGINEERING",
      "Department of FOOD ENGINEERING",
      "Department of DEPARTMENT OF MATERIALS SCIENCE AND ENGINEERING",
      "DEPARTMENT OF MECHANICAL ENGINEERING",
      "DEPARTMENT OF ARCHITECTURE",
      "DEPARTMENT OF CITY AND REGIONAL PLANNING",
      "DEPARTMENT OF INDUSTRIAL DESIGN",
      "DEPARTMENT OF ARCHITECTURAL RESTORATION",
    ],
    name: "",
    departmentArray: [],
    department: "",
    degree: "Master",
    quota: 0,
    description: "",
    alesRequirement: false,
    sgkRequirement: false,
    masterRequirement: false,
    // announceDate:null,
    // applicationDeadline:null
  };

  handleCoordinator = async (event) => {
    var e = document.getElementById("vcoordinator");
    var input = e.options[e.selectedIndex].value;

    console.log("the input is ", input);

    await this.setState({
      coordinator: input,
    });
  };

  handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    });
  };

  handleRequirements = (event) => {
    const target = event.target;
    const name = target.name;
    if (target.checked) {
      this.setState({
        [name]: true,
      });
    } else {
      this.setState({
        [name]: false,
      });
    }
  };

  removeElement = (array, value) => {
    for (var i = 0; i < array.length; i++) {
      if (array[i] === value) {
        array.splice(i, 1);
        i--;
      }
    }

    return array;
  };

  handleDepartment = (event) => {
    const target = event.target;
    const temp = this.state.departmentArray;
    if (target.checked) {
      temp.push(target.value);
      this.setState({
        departmentArray: temp,
      });
    } else {
      this.setState({
        departmentArray: this.removeElement(
          this.state.departmentArray,
          target.value
        ),
      });
    }
  };

  componentWillMount() {
    this.jwtHandler();
  }

  jwtHandler = async () => {
    await axios({
      url: "http://commerchant.herokuapp.com/accounts/all",
      method: "GET",
      headers: {
        // Authorization: window.localStorage.getItem("token"),
        Authorization: this.props.token,
           },
    })
      .then((response) =>
        this.setState({
          coordinators: response.data.payload.accounts.filter(
            (a) => a.role === "gradschool"
          ),
        })
      )
      .catch(() => console.log("Programlar alınamadı"));
  };

  submit = async (event) => {
    event.preventDefault();

    await this.setState({ department: this.state.departmentArray.toString() });

    console.log(this.state.coordinator);

    const payload = {
      coordinator: this.state.coordinator,
      name: this.state.name,
      department: this.state.department,
      degree: this.state.degree,
      description: this.state.description,
      announceDate: this.state.announceDate,
      applicationDeadline: this.state.applicationDeadline,
      alesRequirement: this.state.alesRequirement,
      sgkRequirement: this.state.sgkRequirement,
      masterRequirement: this.state.masterRequirement,
      quota: this.state.quota,
    };

    await axios({
      url: "http://commerchant.herokuapp.com/programs",
      method: "POST",
      data: payload,
      headers: {
        // Authorization: window.localStorage.getItem("token"),
        Authorization: this.props.token,
          },
    })
      .then(
        (response) => (
          this.setState({ datas: response }), alert(response.data.message)
        )
      )
      .catch(() => console.log("Open Program Error!"));
  };

  render() {
    return (
      <div classNameName="wrapper">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">New Program</h4>
                  </div>
                  <div className="card-body">
                    <form onSubmit={this.submit}>
                      <div className="row">
                        <div className="col-md-8 pr-1">
                          <div className="form-group">
                            <label>Program Name</label>
                            <Input
                              type="text"
                              name="name"
                              placeholder="Program Name"
                              onChange={this.handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-4 pr-1">
                          <div className="form-group">
                            <label>Quota</label>
                            <Input
                              type="number"
                              name="quota"
                              onChange={this.handleChange}
                              placeholder="Quota"
                              min="1"
                              max="500"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Announce Date</label>
                            <Input
                              type="date"
                              name="announceDate"
                              onChange={this.handleChange}
                              className="form-control"
                              placeholder="yyyy-mm-dd"
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Application Deadline Date</label>
                            <Input
                              type="date"
                              name="applicationDeadline"
                              onChange={this.handleChange}
                              className="form-control"
                              placeholder="yyyy-mm-dd"
                            />
                          </div>
                        </div>

                        <div className="col-md-8 pr-1">
                          <div className="form-group">
                            <label for="coordinator">Coordinator</label>

                            <select
                              name="coordinator"
                              className="form-control"
                              id="vcoordinator"
                              onChange={this.handleCoordinator}
                            >
                              <option>Select a Coordinator </option>
                              {this.state.coordinators.map((aCoordinator) => (
                                <option
                                  key={aCoordinator.email}
                                  value={aCoordinator._id}
                                >
                                  {aCoordinator.name} {aCoordinator.surname}
                                </option>
                              ))}
                              ;
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-12 pr-1">
                          <label>Departments</label>

                          {this.state.departments.map((aDepartment) => (
                            <div>
                              <input
                                type="checkbox"
                                id="sc1"
                                name="sc1"
                                value={aDepartment}
                                onChange={this.handleDepartment}
                              />
                              <label for="sc1"> {aDepartment}</label>
                              <br />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-4pr-1">
                          <label>Degree</label>
                          <div className="form-group">
                            <select
                              className="form-control"
                              id="exampleFormControlSelect1"
                              name="degree"
                              onChange={this.handleChange}
                            >
                              <option value="master">Master</option>
                              <option value="doctorate">Doctorate</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="form-group">
                        <label>Requirements</label>
                        <h6></h6>
                        <input
                          type="checkbox"
                          id="sc1"
                          name="alesRequirement"
                          value="True"
                          onChange={this.handleRequirements}
                        />
                        <label for="alesRequirement"> Ales Reqiurement</label>
                        <br />
                        <input
                          type="checkbox"
                          id="sc2"
                          name="sgkRequirement"
                          value="True"
                          onChange={this.handleRequirements}
                        />
                        <label for="sgkRequirement"> SGK Requirement</label>
                        <br />
                        <input
                          type="checkbox"
                          id="sc3"
                          name="masterRequirement"
                          value="True"
                          onChange={this.handleRequirements}
                        />
                        <label for="masterRequirement">
                          {" "}
                          Master Requirement
                        </label>
                        <br />

                        <label for="exampleText">Description</label>
                        <Input
                              type="text"
                              name="description"
                              placeholder="Description"
                              onChange={this.handleChange}
                            />
                        <br />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-info btn-fill pull-right"
                      >
                        Save Changes
                      </button>
                      <div className="clearfix"></div>
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
