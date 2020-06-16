import React, { Component } from "react";
import axios from "axios";
import { Label, Input } from "reactstrap";
import moment from "moment";

export default class EditProgram extends Component {
  state = {
    programId: this.props.programId,
    currentProgram: {
      name: "",
      department: "",
      degree: "",
      coordinator: "",
      description: "",
      announceDate: "",
      applicationDeadline: "",
      alesRequirement: "",
      sgkRequirement: "",
      masterRequirement: "",
      quota: 0,
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
    changedAlesRequirement:null,
    changedSgkRequirement:null,
    changedMasterRequirement:null,
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

  DepartmentHandle = () => {
    document.getElementById("currentDepartments").hidden = true;
    document.getElementById("changeDepartments").hidden = false;
  };

  ChangeRequirements=()=>{
    document.getElementById("currentRequirements").hidden = true;
    document.getElementById("requirements").hidden = false;
  }

  handleDepartment = (event) => {
    const target = event.target;
    const temp = this.state.changeDepartmentArray;
    if (target.checked) {
      temp.push(target.value);
      this.setState({
        changeDepartmentArray: temp,
      });
    } else {
      this.setState({
        departmentArray: this.removeElement(
          this.state.changeDepartmentArray,
          target.value
        ),
      });
    }
  };

  infoHandler = async () => {
    await this.setState({
      coordinator: this.state.currentProgram.coordinator,
      name: this.state.currentProgram.name,
      departmentArray: this.state.currentProgram.department.split(","),
      degree: this.state.currentProgram.degree,
      description: this.state.currentProgram.description,
      announceDate: this.state.currentProgram.announceDate,
      applicationDeadline: this.state.currentProgram.applicationDeadline,
      alesRequirement: this.state.currentProgram.alesRequirement,
      sgkRequirement: this.state.currentProgram.sgkRequirement,
      masterRequirement: this.state.currentProgram.masterRequirement,
      quota: this.state.currentProgram.quota,
    });
   
  };


  componentWillMount = async () => {
    await this.jwtHandler();
    await this.infoBringer();
    await this.infoHandler();
  };

  jwtHandler = async () => {
    await axios({
      url: "http://commerchant.herokuapp.com/accounts/coordinators",
      method: "GET",
      headers: {
        // Authorization: window.localStorage.getItem("token"),
        Authorization: this.props.token,
      },
    })
      .then((response) =>
        this.setState({
          coordinators: response.data.payload.accounts,
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
        Authorization: this.props.token,
      },
    })
      .then((response) =>
        this.setState({
          currentProgram: response.data.payload.program,
        })
      )
      .catch(() => console.log("Program Knowledge couldn't be get!"));
    console.log(this.state.currentProgram);
  };

  submit = async (event) => {
    event.preventDefault();
    var departments;
    var masterRequirement;
    var alesRequirement;
    var sgkRequirement;

    if(this.state.changeDepartmentArray.length===0){
      departments= this.state.departmentArray
    }else{
      departments=this.state.changeDepartmentArray
    }

    if(this.state.changedAlesRequirement===null){
      alesRequirement= this.state.alesRequirement
    }else{
      alesRequirement=this.state.changedAlesRequirement
    }


    if(this.state.changedMasterRequirement===null){
      alesRequirement= this.state.masterRequirement
    }else{
      alesRequirement=this.state.changedMasterRequirement
    }


    if(this.state.changedSgkRequirement===null){
      alesRequirement= this.state.sgkRequirement
    }else{
      alesRequirement=this.state.changedSgkRequirement
    }


    const payload = {
      coordinator: this.state.coordinator,
      name: this.state.name,
      department: departments.toString(),
      degree: this.state.degree,
      description: this.state.description,
      announceDate:this.state.announceDate,
      applicationDeadline:this.state.applicationDeadline,
      alesRequirement: alesRequirement,
      sgkRequirement: sgkRequirement,
      masterRequirement: masterRequirement,
      quota: this.state.quota,
    };

    await axios({
      url:
        "http://commerchant.herokuapp.com/programs" +
        this.state.currentProgram._id,
      method: "PUT",
      headers: {
        // Authorization: window.localStorage.getItem("token"),
        Authorization: this.props.token,
      },
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
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Edit Program</h4>
                  </div>
                  <div className="card-body">
                    <form>
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
                              ).format("DD-MM-YYYY")}
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
                              ).format("DD-MM-YYYY")}
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
                          <label>
                            Departments{" "}
                            <h13
                              onClick={this.DepartmentHandle}
                              style={{ color: "blue", cursor: "pointer" }}
                            >
                              (Change Department)
                            </h13>
                          </label>
                          <div id="currentDepartments">
                            {this.state.departmentArray.map((aDepartment) => (
                              <div>
                                <p>{aDepartment}</p>
                              </div>
                            ))}
                          </div>
                          <div id="changeDepartments" hidden>
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
                              <option value={this.state.degree}>
                                {this.state.degree}
                              </option>
                              <option value="master">Master</option>
                              <option value="doctorate">Doctorate</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="form-group">
                        <label>Requirements</label>
                        <h6></h6>
                        <h13
                              onClick={this.ChangeRequirements}
                              style={{ color: "blue", cursor: "pointer" }}
                            >
                              (Change Department)
                            </h13>
                        <div id="currentRequirements">
                            
                              {this.state.alesRequirement &&
                              < p>Ales Required</p>
                              }
                               {this.state.sgkRequirement &&
                              < p>SGK Required</p>
                              }
                               {this.state.masterRequirement &&
                              < p>Master Required</p>
                              }
                          
                          </div>


                        <div id="requirements" hidden>
                        <input
                          type="checkbox"
                          id="sc1"
                          name="changedAlesRequirement"
                          value="True"
                          onChange={this.handleRequirements}
                        />

                        <label for="alesRequirement"> Ales Reqiurement</label>
                        <br />
                        <input
                          type="checkbox"
                          id="sc2"
                          name="changedSgkRequirement"
                          value="Photonics"
                          onChange={this.handleRequirements}
                        />
                        <label for="sgkRequirement"> SGK Requirement</label>
                        <br />
                        <input
                          type="checkbox"
                          id="sc3"
                          name="changedMasterRequirement"
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
                          placeholder={this.state.currentProgram.description}
                          type="textarea"
                          name="description"
                          id="exampleText"
                        />
                        </div>
                        <br />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-info btn-fill pull-right"
                        onClick={()=>this.submit}
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
