import React, { Component } from "react";
import axios from "axios";
import { Label, Input } from "reactstrap";
import moment from "moment";

export default class EditProgram extends Component {
  state = {
    programId: this.props.programId,
    currentProgram: {
        name: "",
        department:"" ,
        degree: "",
        coordinator: "",
        description: "",
        announceDate: "",
        applicationDeadline: "",
        alesRequirement: "",
        sgkRequirement: "",
        masterRequirement: "",
        quota: 0
    },
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
    name: null,
    departmentString: "",
    departmentArray: [],
    degree: null,
    quota: 0,
    description: "",
    alesRequirement: false,
    sgkRequirement: false,
    masterRequirement: false,
    announceDate: "yyyy-mm-dd",
    applicationDeadline: "yyyy-mm-dd",
    checkedDepartments: [],
    changeDepartmentArray: [],
    changeArray: [],
    start: true,
  };

  handleCoordinator = async (event) => {
    var e = document.getElementById("vcoordinator");
    var input = e.options[e.selectedIndex].value;

    console.log("the input is ", input);

    await this.setState({
      coordinator: input,
    });
  };

  handlechange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    const temp = this.state.changeArray;
    temp.push({
      propName: [name],
      value: value,
    });
    this.setState({
      changeArray: temp,
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
    var what,
      a = array,
      L = a.length,
      ax;
    while (L > 1 && array.length) {
      what = a[--L];
      while ((ax = array.indexOf(what)) !== -1) {
        array.splice(ax, 1);
      }
    }
    return array;
  };

  checkDepartments = (aDepartment) => {
    if (this.start) {
      if (this.changeDepartmentArray.includes(aDepartment))
        document.getElementById(aDepartment).checked = true;
    }
  };

  handleDepartment = (event) => {
    const target = event.target;
    
    const temp = this.state.changeDepartmentArray;
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

  infoHandler = async () => {
    await this.setState({
      name: this.state.currentProgram.name,
      departmentArray: this.state.currentProgram.department.split(","),
      changeDepartmentArray: this.state.currentProgram.department.split(","),
      degree: this.state.currentProgram.degree,
      quota: this.state.currentProgram.quota,
      description: this.state.currentProgram.description,
      alesRequirement: this.state.currentProgram.alesRequirement,
      sgkRequirement: this.state.currentProgram.sgkRequirement,
      masterRequirement: this.state.currentProgram.masterRequirement,
      announceDate: this.state.currentProgram.announceDate,
      applicationDeadline: this.state.currentProgram.applicationDeadline,
    });
  };

  componentWillMount = async () => {
    await this.jwtHandler();
    await this.infoBringer();
    await this.infoHandler();
    this.setState({ start: false });
  };

  jwtHandler = async () => {
    await axios({
      url: "http://commerchant.herokuapp.com/accounts/coordinators",
      method: "GET",
      headers: {
        // Authorization: window.localStorage.getItem("token"),
        Authorization:this.props.token
        
            },
    })
      .then((response) =>
        this.setState({
          coordinators: response.data.payload.accounts ,
        })
      )
      .catch(() => console.log("Instructor Knowledge couldn't be get!"));
  };

  infoBringer = async () => {
    await axios({
      url: "http://commerchant.herokuapp.com/programs/" + this.props.program,
      method: "GET",
      headers: {
        // Authorization: window.localStorage.getItem("token"),
        Authorization:this.props.token
       
           },
    })
      .then((response) =>
        this.setState({
          currentProgram: response.data.payload.program,
        }),
       
      )
      .catch(() => console.log("Program Knowledge couldn't be get!"));
      console.log(this.state.currentProgram)
  };

  submit = async (event) => {
    event.preventDefault();

    const payload = {
      coordinator: this.state.coordinator,
      name: this.state.name,
      department: this.state.department,
      degree: this.state.degree,
      quota: this.state.quota,
      description: this.state.description,
      alesRequirement: this.state.alesRequirement,
      sgkRequirement: this.state.sgkRequirement,
      masterRequirement: this.state.masterRequirement,
    };

    await axios({
      url:
        "http://commerchant.herokuapp.com/programs" +
        this.state.currentProgram._id,
      method: "PUT",
      data: payload,
    })
      .then(
        (response) => (
          this.setState({ datas: response }), alert(response.data.message)
        )
      )
      .catch(() => console.log("Edit Failed!"));
  };

  render() {
    return (
      <div classNameName="wrapper">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Edit Program</h4>
                  </div>
                  <div className="card-body">
                    <form onSubmit={this.submit}>
                      <div className="row">
                        <div className="col-md-8 pr-1">
                          <div className="form-group">
                            <label>Program Name</label>
                            <input
                              name="name"
                              onChange={this.handleChange}
                              type="text"
                              className="form-control"
                              placeholder={this.state.currentProgram.name}
                            />
                          </div>
                        </div>
                        <div className="col-md-4 pr-1">
                          <div className="form-group">
                            <label>Quota</label>
                            <input
                              type="number"
                              name="quota"
                              onChange={this.handleChange}
                              className="form-control"
                              placeholder="Quota"
                              min="1"
                              max="100"
                              placeholder={this.state.currentProgram.quota}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Announce Date</label>
                            <input
                              type="date"
                              name="announceDate"
                              onChange={this.handleChange}
                              className="form-control"
                              placeholder={moment(
                                this.state.currentProgram.announceDate
                              ).format("YYYY-MM-DD")}
                            />
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Application Deadline Date</label>
                            <input
                              type="date"
                              name="applicationDeadline"
                              onChange={this.handleChange}
                              className="form-control"
                              placeholder={moment(
                                this.state.currentProgram.applicationDeadline
                              ).format("YYYY-MM-DD")}
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
                              placeholder={
                                this.state.currentProgram.coordinator
                              }
                            >
                              {this.state.coordinators.map((aCoordinator) => (
                                <option key={aCoordinator.email}>
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
                                id={aDepartment}
                                name="departmentCheckBoc"
                                checked="true"
                                onChange={
                                  (this.handleDepartment,
                                  this.checkDepartments(aDepartment)
                                  )
                                  
                                }
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
                          value="Photonics"
                          onChange={this.handleRequirements}
                        />
                        <label for="sgkRequirement"> SGK Requirement</label>
                        <br />
                        <input
                          type="checkbox"
                          id="sc3"
                          name="masterRequirement"
                          value="Chemistry"
                          onChange={this.handleRequirements}
                        />
                        <label for="masterRequirement">
                          {" "}
                          Master Requirement
                        </label>
                        <br />
                        <Label for="exampleText">Description</Label>
                        <Input
                          type="textarea"
                          name="description"
                          id="exampleText"
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
