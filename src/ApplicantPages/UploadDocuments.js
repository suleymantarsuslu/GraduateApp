import React, { Component } from "react";
import axios from "axios";
import image1 from "../assets/img/faces/face-0.jpg";
import imageUpload from "../assets/img/indir.png";
import imageUploadRed from "../assets/img/indirRed.png";

import { relativeTimeThreshold } from "moment";

export default class Profile extends Component {
  state = {
    applicationFile: null,
    alesReq: null,
    sgk: null,
    experience: null,
    photo: null,
    alesResult: null,
    englishExamResult: null,
    referenceLetters: null,
    statementOfPurpose: null,
    passportCopy: null,
    doesWork: null,
    permissionLetter: null,
    image: image1,
    imageUpload: imageUpload,
    imageUploadRed: imageUploadRed,
    undergradTranscript: null,
    masterTranscript: null,
    documentsTitles: [
      "photo",
      "undergradTranscript",
      "alesResult",
      "englishExamResult",
      "referenceLetters",
      "statementOfPurpose",
      "nationality",
      "passportCopy",
      "permissionLetter",
      "masterTranscript",
    ],
    undergradTranscriptUpload: null,
    alesResultUpload: null,
    englishExamResultUpload: null,
    referenceLettersUpload: null,
    statementOfPurposeUpload: null,
    passportCopyUpload: null,
    permissionLetterUpload: null,
    masterTranscriptUpload: null,
    updated: false,
    status:{created:"created", edited:"edited", submited:"submited", checked:"checked", updateRequested:"updateRequested", updated:"updated", confirmed:"confirmed", rejected:"rejected", assessed:"assessed", accepted:"accepted", announced:"accepted"},
    currentStatus:"updated"
  };

  componentWillMount = async () => {
    await this.getApplicationFile();
    await this.documentHandler();
    await this.uploadImage();
  };

  uploadImage = () => {
    if (this.state.photo !== null) {
      document.getElementById("photo").src = "http://commerchant.herokuapp.com/"+this.state.photo.source;
    }

    if (this.state.applicationFile.status === "created" || this.state.applicationFile.status === "updateRequested") {
      this.setState({ alesResultUpload: this.state.imageUpload });
      this.setState({ undergradTranscriptUpload: this.state.imageUpload });
      this.setState({ englishExamResultUpload: this.state.imageUpload });
      this.setState({ referenceLettersUpload: this.state.imageUpload });
      this.setState({ statementOfPurposeUpload: this.state.imageUpload });
      this.setState({ passportCopyUpload: this.state.imageUpload });
      this.setState({ permissionLetterUpload: this.state.imageUpload });
      this.setState({ masterTranscriptUpload: this.state.imageUpload });
      this.setState({ englishExamResultUpload: this.state.imageUpload });
      document.getElementById("englishExamResultInput").disabled = true;

    } else {
      this.setState({ alesResultUpload: this.state.imageUploadRed });
      document.getElementById("alesResultInput").disabled = true;

      document.getElementById("file-input").disabled = true;

      this.setState({ undergradTranscriptUpload: this.state.imageUploadRed });
      document.getElementById("undergradTranscriptInput").disabled = true;

      this.setState({ englishExamResultUpload: this.state.imageUploadRed });
      document.getElementById("englishExamResultInput").disabled = true;

      this.setState({ referenceLettersUpload: this.state.imageUploadRed });
      document.getElementById("referenceLettersInput").disabled = true;

      this.setState({ statementOfPurposeUpload: this.state.imageUploadRed });
      document.getElementById("statementOfPurposeInput").disabled = true;

      this.setState({ passportCopyUpload: this.state.imageUploadRed });
      document.getElementById("passportCopyInput").disabled = true;

      this.setState({ permissionLetterUpload: this.state.imageUploadRed });
      document.getElementById("permissionLetterInput").disabled = true;

      this.setState({ masterTranscriptUpload: this.state.imageUploadRed });
      document.getElementById("masterTranscriptInput").disabled = true;
    }
  };

  getApplicationFile = async () => {
    await axios({
      url: "http://commerchant.herokuapp.com/applications",
      method: "GET",
      headers: {
        Authorization: this.props.token,
      },
    })
      .then((response) =>
        this.setState({ applicationFile: response.data.payload.application })
      )
      .catch((err) => alert(err.response.data.message));

      this.state.documentsTitles.map((aTitle) => {
        for (var aDocument in this.state.applicationFile) {
          if (
            Object.prototype.hasOwnProperty.call(
              this.state.applicationFile,
              aDocument
            )
          ) {
            if (aDocument === aTitle) {
              // this.setState({
              //   [aTitle]: aDocument,
                
              // });
              console.log(this.state.applicationFile[aDocument])
              this.documentBringer(this.state.applicationFile[aDocument],aDocument)
              
            }
          }
        }
      });
  };

  documentBringer = async (aDocument, docName) => {
    await axios({
      url: "http://commerchant.herokuapp.com/documents/" + aDocument,
      method: "GET",
      headers: {
        // Authorization: window.localStorage.getItem("token"),
        Authorization: this.props.token,
      },
    })
      .then(
        (response) => (
          this.setState({ [docName]: response.data.payload.document }),

      document.getElementById(docName).innerHTML = response.data.payload.document.originalname
        )
      )
      .catch((err) => console.log(err));
  };

  documentHandler = async () => {
    await axios({
      url: "http://commerchant.herokuapp.com/documents",
      method: "GET",
      headers: {
        Authorization: this.props.token,
      },
    })
      .then((response) =>
        this.setState({ documents: response.data.payload.documents })
      )
      .catch((err) => alert(err.response.data.message));
  };

  upload = async (event) => {
    const target = event.target;
    const name = target.name;

    var fileInput = event.target.files[0];
    var fileName = event.target.files[0].name;

    var formdata = new FormData();
    formdata.append("title", name);
    formdata.append("document", fileInput, fileName);

    await axios({
      url: "http://commerchant.herokuapp.com/documents",
      method: "POST",
      headers: {
        Authorization: this.props.token,
      },
      data: formdata,
    })
      .then(
        (response) =>
          this.updadeApplicationFile(name, response.data.payload.document._id) |
          this.setState({ updated: true })
      )

      .catch((err) => alert(err.response.data.message));
        if(name!=="photo"){document.getElementById(name).innerHTML = fileName;}
    
  };

  updadeApplicationFile = async (name, id) => {
    const payload = {
      [name]: id,
    };

    await axios({
      url: "http://commerchant.herokuapp.com/applications/",
      method: "PUT",
      data: payload,
      headers: {
        Authorization: this.props.token,
      },
    })
      .then((response) => console.log(response.data.message))

      .catch((err) => alert(err.response.data.message));
  };

  updadeStatus = async () => {
    const payload = {
      "status": this.state.currentStatus,
    };

    console.log(payload)

    await axios({
      url: "http://commerchant.herokuapp.com/applications/",
      method: "PATCH",
      data: payload,
      headers: {
        Authorization: this.props.token,
      },
    })
      .then((response) => alert(response.data.message))

      .catch((err) => alert(err.response.data.message));
  };


  submit =  (event) => {
    event.preventDefault();
    console.log("this.state.applicationFile.status"+ this.state.applicationFile.status)
    // if (this.state.updated) {
      if (this.state.applicationFile.status === "created") {
        this.setState({currentStatus: "submited"})
      } else {
        this.setState({currentStatus: "updated"})
      
      }
      this.updadeStatus()
      

    // } else {
    //   alert("There is no change to submit.");
    // }
  };

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
                    <form>
                      <table className="table">
                        <tbody>
                          <tr>
                            <td>
                              <p> Undergrad Transcript</p>
                            </td>

                            <td>
                              <div className="form-group rounded">
                                <label htmlFor="undergradTranscriptInput">
                                  <img
                                    style={{ cursor: "pointer" }}
                                    className="avatar border-gray"
                                    src={this.state.undergradTranscriptUpload}
                                    alt="..."
                                  />
                                </label>

                                <input
                                  hidden
                                  id="undergradTranscriptInput"
                                  type="file"
                                  name="undergradTranscript"
                                  onChange={this.upload}
                                />
                              </div>

                              <p id="undergradTranscript"></p>
                            </td>
                          </tr>

                          
                          

                          <tr id="ALES">
                            <td>
                              <p> ALES result file</p>
                            </td>

                            <td>
                              <div className="form-group rounded">
                                <label htmlFor="alesResultInput">
                                  <img
                                    style={{ cursor: "pointer" }}
                                    className="avatar border-gray"
                                    src={this.state.alesResultUpload}
                                    alt="..."
                                  />
                                </label>

                                <input
                                  hidden
                                  id="alesResultInput"
                                  type="file"
                                  name="alesResult"
                                  onChange={this.upload}
                                />
                              </div>

                              <p id="alesResult" align="left"></p>
                            </td>
                          </tr>

                        

                          <tr>
                            <td>
                              <p>English exam result</p>
                            </td>

                            <td>
                              <div className="form-group rounded">
                                <label htmlFor="englishExamResultInput">
                                  <img
                                    style={{ cursor: "pointer" }}
                                    className="avatar border-gray"
                                    src={this.state.englishExamResultUpload}
                                    alt="..."
                                  />
                                </label>

                                <input
                                  hidden
                                  id="englishExamResultInput"
                                  type="file"
                                  name="englishExamResult"
                                  onChange={this.upload}
                                />
                              </div>

                              <p id="englishExamResult"></p>
                            </td>
                          </tr>

                          <tr>
                            <td>
                              <p>Reference letters</p>
                            </td>

                            <td>
                              <div className="form-group rounded">
                                <label htmlFor="referenceLettersInput">
                                  <img
                                    style={{ cursor: "pointer" }}
                                    className="avatar border-gray"
                                    src={this.state.referenceLettersUpload}
                                    alt="..."
                                  />
                                </label>

                                <input
                                  hidden
                                  id="referenceLettersInput"
                                  type="file"
                                  name="referenceLetters"
                                  onChange={this.upload}
                                />
                              </div>

                              <p id="referenceLetters"></p>
                            </td>
                          </tr>

                          <tr>
                            <td>
                              <p>Statement of purpose</p>
                            </td>

                            <td>
                              <div className="form-group rounded">
                                <label htmlFor="statementOfPurposeInput">
                                  <img
                                    style={{ cursor: "pointer" }}
                                    className="avatar border-gray"
                                    src={this.state.statementOfPurposeUpload}
                                    alt="..."
                                  />
                                </label>

                                <input
                                  hidden
                                  id="statementOfPurposeInput"
                                  type="file"
                                  name="statementOfPurpose"
                                  onChange={this.upload}
                                />
                              </div>

                              <p id="statementOfPurpose"></p>
                            </td>
                          </tr>
                          
                          <tr>
                            <td>
                              <p>Passport</p>
                            </td>

                            <td>
                            <h7>Needed only if you are foreign!</h7>
                              <div className="form-group rounded">
                                
                                <label htmlFor="passportCopyInput">
                                  <img
                                    style={{ cursor: "pointer" }}
                                    className="avatar border-gray"
                                    src={this.state.passportCopyUpload}
                                    alt="..."
                                  />
                                </label>

                                <input
                                  hidden
                                  id="passportCopyInput"
                                  type="file"
                                  name="passportCopy"
                                  onChange={this.upload}
                                />
                              </div>

                              <p id="passportCopy"></p>
                            </td>
                          </tr>
                          
                          <tr>
                            <td>
                              <p>Permission Letter</p>
                            </td>

                            <td>
                              <div className="form-group rounded">
                                <label htmlFor="permissionLetterInput">
                                  <img
                                    style={{ cursor: "pointer" }}
                                    className="avatar border-gray"
                                    src={this.state.permissionLetterUpload}
                                    alt="..."
                                  />
                                </label>

                                <input
                                  hidden
                                  id="permissionLetterInput"
                                  type="file"
                                  name="permissionLetter"
                                  onChange={this.upload}
                                />
                              </div>

                              <p id="permissionLetter"></p>
                            </td>
                          </tr>

                  
                          <tr>
                            <td>
                              <p>Masters Transcript</p>
                            </td>

                            <td>
                              <div className="form-group rounded">
                                <label htmlFor="masterTranscriptInput">
                                  <img
                                    style={{ cursor: "pointer" }}
                                    className="avatar border-gray"
                                    src={this.state.masterTranscriptUpload}
                                    alt="..."
                                  />
                                </label>

                                <input
                                  hidden
                                  id="masterTranscriptInput"
                                  type="file"
                                  name="masterTranscript"
                                  onChange={this.upload}
                                />
                              </div>

                              <p id="masterTranscript"></p>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <div className="clearfix"></div>
                    </form>

                    <button type="submit" className="btn btn-info btn-fill pull-right" value="Submit" onClick={this.submit}>Submit</button>	
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
                      <div className="image-upload">
                        <label htmlFor="file-input">
                          <img
                            id="photo"
                            style={{ cursor: "pointer" }}
                            className="avatar border-gray"
                            src={this.state.image}
                            alt="..."
                          />
                          <a>
                            <p
                              className="description text-center"
                              style={{ cursor: "pointer", color: "blue" }}
                            >
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
                 
                  <hr />
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
