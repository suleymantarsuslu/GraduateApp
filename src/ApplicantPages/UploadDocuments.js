import React, { Component } from "react";
import axios from "axios";
import image1 from "../assets/img/faces/face-0.jpg";
import { relativeTimeThreshold } from "moment";

export default class Profile extends Component {
  state = {
    program:{
      alesReq: null,
    sgk: null,
    experience: null,
    ALESResult: null,
    englishExamResult: null,
    referenceLetter: null,
    referenceLetter2: null,
    statementOfPurpose: null,
    ALESResultInput: null,
    experinceInput: null,
    passport: null,
    passportInput: null,
    permissionLetter: null,
    permissionLetterInput: null,
    mastersTranscriptInput: null,
    image: image1,
    underTrans:null,
    },
    alesReq: null,
    sgk: null,
    experience: null,
    ALESResult: null,
    englishExamResult: null,
    referenceLetter: null,
    referenceLetter2: null,
    statementOfPurpose: null,
    ALESResultInput: null,
    experinceInput: null,
    passport: null,
    passportInput: null,
    permissionLetter: null,
    permissionLetterInput: null,
    mastersTranscriptInput: null,
    image: image1,
    underTrans:null,
  };



  upload = async (event) => {
    const target = event.target;
    const name = target.name;
    var fileInput = event.target.files[0];
    var fileName = event.target.files[0].name;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", this.props.token);

    var formdata = new FormData();
    formdata.append("title", name);
    formdata.append("document", fileInput, fileName);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("http://commerchant.herokuapp.com/documents", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  submit = () => {};

  render() {
    return (
      <div className="wrapper">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">UPLOAD DOCUMENTS</h4>
                  </div>
                  <div className="card-body">
                    <form onSubmit={this.submit}>
                      <table className="table">
                        <tbody>
                          <tr>
                            <td>
                              <p> Undergrad Transcript</p>
                            </td>

                            <td>
                              <form>
                                <div className="form-group rounded">
                                  <input
                                    type="file"
                                    name="underTrans"
                                    onChange={this.upload}
                                    fileInput={this.state.underTrans}
                                  />
                                </div>
                              </form>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table className="table">
                        <tbody>
                          <tr>
                            <td className="col-md-8">
                              <p> Are you applying with ALES requirements ?</p>
                            </td>

                            <td>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  name="alesReq"
                                  type="radio"
                                  id="radio1"
                                  onChange={this.ALESReqHandle}
                                  value="Yes"
                                />
                                Yes
                                <label
                                  className="form-check-label"
                                  for="radio1"
                                ></label>
                              </div>

                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  name="alesReq"
                                  onChange={this.ALESReqHandle}
                                  type="radio"
                                  id="radio2"
                                  value="No"
                                />
                                No
                                <label
                                  className="form-check-label"
                                  for="radio2"
                                ></label>
                              </div>
                            </td>
                          </tr>

                          <tr id="ALES">
                            <td>
                              <p> ALES result file</p>
                            </td>

                            <td>
                              <form>
                                <div className="form-group rounded">
                                  <p
                                    id="AlesChooseWarning"
                                    style={{ color: "red" }}
                                  ></p>
                                  <p
                                    id="alesInputWarning"
                                    style={{ color: "red" }}
                                  ></p>
                                  <input
                                    id="alesInput"
                                    type="file"
                                    name="AlesResult"
                                    onChange={this.upload}
                                  />
                                </div>
                              </form>
                            </td>
                          </tr>

                          <tr id="experienced">
                            <td>
                              <p>
                                Do you have at least 1250 days of working
                                experience documented by the relevant government
                                body (in Turkey, SGK)
                              </p>
                            </td>

                            <td>
                              <div className="form-check form-check-inline">
                                <p
                                  id="AlesChooseWarning2"
                                  style={{ color: "red" }}
                                ></p>
                                <p
                                  id="AlesRatioWarning"
                                  style={{ color: "red" }}
                                ></p>
                                <input
                                  className="form-check-input"
                                  name="sgk"
                                  onChange={this.experienceHandle}
                                  type="radio"
                                  id="AlesRatio1"
                                  value="Yes"
                                />
                                Yes
                                <label
                                  className="form-check-label"
                                  for="radio1"
                                ></label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  name="sgk"
                                  onChange={this.experienceHandle}
                                  type="radio"
                                  id="AlesRatio2"
                                  value="No"
                                />
                                No
                                <label
                                  className="form-check-label"
                                  for="radio2"
                                ></label>
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td>
                              <p>Working Experience Document</p>
                            </td>

                            <td>
                              <form>
                                <div className="form-group rounded">
                                  <p
                                    id="AlesChooseWarning3"
                                    style={{ color: "red" }}
                                  ></p>
                                  <p
                                    id="AlesChooseWarning4"
                                    style={{ color: "red" }}
                                  ></p>
                                  <p
                                    id="ExperienceWarning"
                                    style={{ color: "red" }}
                                  ></p>
                                  <input
                                    type="file"
                                    onChange={this.upload}
                                    name="experience"
                                    id="experienceInput"
                                  />
                                </div>
                              </form>
                            </td>
                          </tr>

                          <tr>
                            <td>
                              <p>English exam result</p>
                            </td>

                            <td>
                              <form>
                                <div className="form-group rounded">
                                  <input
                                    type="file"
                                    onChange={this.upload}
                                    name="englishExamResult"
                                    id="file-upload"
                                  />
                                </div>
                              </form>
                            </td>
                          </tr>

                          <tr>
                            <td>
                              <p>Reference letters</p>
                            </td>

                            <td>
                              <form>
                                <div className="form-group rounded">
                                  <input
                                    type="file"
                                    onChange={this.upload}
                                    name="referenceLetter"
                                    id="file-upload"
                                  />
                                </div>

                                <div className="form-group rounded">
                                  <input
                                    type="file"
                                    onChange={this.upload}
                                    name="referenceLetter2"
                                    id="file-upload"
                                  />
                                </div>
                              </form>
                            </td>
                          </tr>

                          <tr>
                            <td>
                              <p>Statement of purpose</p>
                            </td>

                            <td>
                              <form>
                                <div className="form-group rounded">
                                  <input
                                    type="file"
                                    onChange={this.upload}
                                    name="statementOfPurpose"
                                    id="file-upload"
                                  />
                                </div>
                              </form>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table className="table">
                        <tbody className="add-remove">
                          <tr className="passport-after">
                            <td className="col-md-8">
                              <p>Nationality</p>
                            </td>

                            <td>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  name="radioOptions3"
                                  type="radio"
                                  id="radio3"
                                  value="Turkish"
                                />{" "}
                                Turkish
                                <label
                                  className="form-check-label"
                                  for="radio3"
                                ></label>
                              </div>

                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  name="radioOptions3"
                                  type="radio"
                                  id="radio4"
                                  value="Other"
                                />{" "}
                                Other
                                <label
                                  className="form-check-label"
                                  for="radio4"
                                ></label>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p>Passport</p>
                            </td>

                            <td>
                              <form>
                                <div className="form-group rounded">
                                  <input
                                    type="file"
                                    onChange={this.upload}
                                    name="passport"
                                    id="file-upload"
                                  />
                                </div>
                              </form>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p>Are you working</p>
                            </td>

                            <td>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  name="radioOptions1"
                                  type="radio"
                                  id="radio5"
                                  value="Yes"
                                />{" "}
                                Yes
                                <label
                                  className="form-check-label"
                                  for="radio5"
                                ></label>
                              </div>

                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  name="radioOptions1"
                                  type="radio"
                                  id="radio6"
                                  value="No"
                                />{" "}
                                No
                                <label
                                  className="form-check-label"
                                  for="radio6"
                                ></label>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p>Permission Letter</p>
                            </td>

                            <td>
                              <form>
                                <div className="form-group rounded">
                                  <input
                                    type="file"
                                    onChange={this.upload}
                                    name="permissionLetter"
                                    id="file-upload"
                                  />
                                </div>
                              </form>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table className="table">
                        <tbody className="add-remove">
                          <tr className="masters-transcript-after">
                            <td className="col-md-8">
                              <p>Which degree to apply ?</p>
                            </td>

                            <td>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  name="radioOptions4"
                                  type="radio"
                                  id="radio7"
                                  value="PhD"
                                />{" "}
                                PhD
                                <label
                                  className="form-check-label"
                                  for="radio7"
                                ></label>
                              </div>

                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  name="radioOptions4"
                                  type="radio"
                                  id="radio8"
                                  value="Master"
                                />{" "}
                                Master
                                <label
                                  className="form-check-label"
                                  for="radio8"
                                ></label>
                              </div>

                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  name="radioOptions4"
                                  type="radio"
                                  id="radio9"
                                  value="PhD Without Master Degree"
                                />
                                PhD Without Master Degree
                                <label
                                  className="form-check-label"
                                  for="radio9"
                                ></label>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p>Masters Transcript</p>
                            </td>

                            <td>
                              <form>
                                <div className="form-group rounded">
                                  <input
                                    type="file"
                                    onChange={this.upload}
                                    name="mastersTranscript"
                                    id="file-upload"
                                  />
                                </div>
                              </form>
                            </td>
                          </tr>
                        </tbody>

                        <div class="card-footer">
                          <div class="row float-right"></div>
                        </div>
                      </table>

                      <div className="clearfix"></div>
                    </form>
                  

                    <button
                      type="submit"
                      class="btn btn-info btn-fill pull-right"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>

              {/* Right  */}
              <div className="col-md-4">
                <div className="card card-user">
                  <div className="card-image">
                    <img
                      src="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                      alt="..."
                    />
                  </div>
                  <div className="card-body">
                    <div className="author">
                      <div class="image-upload"   >
                        <label for="file-input">

                          <img
                         style={{ cursor: "pointer"}}
                            className="avatar border-gray"
                            src={this.state.image}
                            alt="..."
                          />
                          <a>
                            <p className="description text-center"  style={{ cursor: "pointer"}}>
                              Upload a Photo
                            </p>
                          </a>
                        </label>

                        <input
                          name="photo"
                          onChange={this.upload}
                          hidden
                          id="file-input"
                          type="file"
                        />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="button-container mr-auto ml-auto">
                    <button
                      href="#"
                      className="btn btn-simple btn-link btn-icon"
                    >
                      <i className="fa fa-facebook-square"></i>
                    </button>
                    <button
                      href="#"
                      className="btn btn-simple btn-link btn-icon"
                    >
                      <i className="fa fa-twitter"></i>
                    </button>
                    <button
                      href="#"
                      className="btn btn-simple btn-link btn-icon"
                    >
                      <i className="fa fa-google-plus-square"></i>
                    </button>
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
