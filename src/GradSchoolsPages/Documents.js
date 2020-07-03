import React, { Component } from "react";
import axios from "axios";

import image1 from "../assets/img/faces/face-0.jpg";

export default class Documents extends Component {
  state = {
    anApplicant: { applicant: { _id: "" } },
    photo: "",
    undergradTranscript: "",
    alesResult: "",
    englishExamResult: "",
    referenceLetters: "",
    statementOfPurpose: "",
    nationality: "",
    passportCopy: "",
    permissionLetter: "",
    masterTranscript: "",
    image: image1,
    applicationProgram: "",
    documents: null,
    status: null,
    assessmentResult:null,
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
    applicationFile: {},
    currentStatus: "",
  };

  componentWillMount = async () => {
    await this.setState({ applicationFile: this.props.applicationFile });
    await this.documentHandler();
    // await this.getImage()
  };

  // getImage=()=>{
  //   if (this.state.photo === null) {
  //    document.getElementById("photo").src =this.state.image;

  //     console.log("PHOTO YOK")
  //   }else{
  //     this.setState({image: "http://commerchant.herokuapp.com/"+this.state.photo})
  //     console.log("PHOTO VAR")
  //   }
  //}

  documentHandler = async () => {
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
            console.log(this.state.applicationFile[aDocument]);
            this.documentBringer(
              this.state.applicationFile[aDocument],
              aDocument
            );
          }
        }
      }
    });
    this.setState({ status: this.state.applicationFile["status"] });
    this.setState({ assessmentResult: this.state.applicationFile["assessmentResult"] });
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
      .then((response) =>
        this.setState({ [docName]: response.data.payload.document })
      )
      .catch((err) => console.log(err));

    console.log(docName);
  };

  updadeStatus = async () => {
    const payload = {
      status: this.state.currentStatus,
    };

    console.log(payload);

    await axios({
      url:
        "http://commerchant.herokuapp.com/applications/" +
        this.state.applicationFile._id,
      method: "PATCH",
      data: payload,
      headers: {
        Authorization: this.props.token,
      },
    })
      .then(
        (response) =>
          console.log(response.data.message) |
          this.setState({ status: this.state.currentStatus })
      )
      .catch((err) => alert(err.response.data.message));
  };

  rejectDocument = async (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    const payload = {
      to: this.state.applicationFile.applicant.email,
      title: "Rejected or Missing Document",
      note:
        " You need to update or upload following document:  " +
        value 
    };
    await axios({
      url: "http://commerchant.herokuapp.com/notifications",
      method: "POST",
      headers: {
        // Authorization: window.localStorage.getItem("token"),
        Authorization: this.props.token,
      },
      data: payload,
    })
      .then(
        (response) =>
          this.setState({ currentStatus: "updateRequested" }) |
          alert("Update request sent succesfully") |
          this.updadeStatus()
      )
      .catch((err) => console.log(err));
  };

  rejectOrAccept = async (event) => {
    const name = event.target.name;
    var payload = null;
    var title =null
    var message = null

    if (name === "accepted") {
      payload = {
        status: "accepted",
      };
      title= "Acceptence"
      message = "Congrats! You are accepted to the program"
    } else if (name === "rejected") {
      payload = {
        status: "rejected",
      };
      title= "Rejection"
      message = "We are sorry to inform you, You are not accepted for the program you applied."
    } else if(name === "confirmed"){
      payload = {
        status: "confirmed",
      };
      title= "Documents are confirmed!"
      message = "Your documents are confirmed and accepted!"
    }

  

    await axios({
      url:
        "http://commerchant.herokuapp.com/applications/" +
        this.state.applicationFile._id,
      method: "PATCH",
      data: payload,
      headers: {
        Authorization: this.props.token,
      },
    })
      .then(
        (response) =>
          console.log(response.data.message) |
          this.setState({ status: this.state.currentStatus })
      )
      .catch((err) => alert(err.response.data.message));



      const data = {
        to: this.state.applicationFile.applicant.email,
        title: title,
        note: message
      };

      await axios({
        url: "http://commerchant.herokuapp.com/notifications",
        method: "POST",
        headers: {
          // Authorization: window.localStorage.getItem("token"),
          Authorization: this.props.token,
        },
        data: data,
      })
        .then(
          (response) =>
            this.setState({ currentStatus: "updateRequested" }) |
            alert(title + " message sent succesfully") |
            this.updadeStatus()
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
                    <h4 className="card-title">Documents</h4>
                  </div>
                  <div className="card-body table-full-width table-responsive">
                    <table className="table table-hover table-striped">
                      <tbody>
                        <tr>
                          <td>
                            <b>
                              {this.state.applicationFile.applicant.name}{" "}
                              {this.state.applicationFile.applicant.surname}
                            </b>
                          </td>
                          <td>
                            <a  href={
                              "http://commerchant.herokuapp.com/" +
                              this.state.photo.source 
                            }>
                            <img
                           
                            id="photo"
                            style={{ cursor: "pointer" }}
                            className="avatar border-gray"
                            src={this.state.image}
                            alt="..."
                          /> 
                          </a>
                            {/* {this.state.photo.originalname} */}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Email</b>
                          </td>
                          <td></td>
                          <td>{this.state.applicationFile.applicant.email}</td>
                        </tr>
                        <tr>
                          <td>
                            <b>Applied For</b>
                          </td>
                          <td></td>
                          <td>{this.state.applicationFile.program.name} </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Applicant Status</b>
                          </td>
                          <td></td>
                          <td>{this.state.status} </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Interview Grade</b>
                          </td>
                          <td></td>
                          <td>{this.state.assessmentResult} </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Undergrand Transcript</b>
                          </td>
                          <td>
                            <a
                              href={
                                "http://commerchant.herokuapp.com/" +
                                this.state.undergradTranscript.source
                              }
                            >
                              {this.state.undergradTranscript.originalname}
                            </a>
                          </td>

                          <td>
                            <button
                              className="btn btn-info btn-fill pull-right"
                              value="Undergrad Transcript"
                              name="undergradTranscript"
                              onClick={this.rejectDocument}
                            >
                              Request For Update
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Permission Letter</b>
                          </td>
                          <td>
                            <a
                              href={
                                "http://commerchant.herokuapp.com/" +
                                this.state.permissionLetter.source
                              }
                            >
                              {this.state.permissionLetter.originalname}
                            </a>
                          </td>

                          <td>
                            <button
                              className="btn btn-info btn-fill pull-right"
                              value="permission Letter"
                              name="permissionLetter"
                              onClick={this.rejectDocument}
                            >
                              Request For Update
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Ales Result File</b>
                          </td>
                          <td>
                            <a
                              href={
                                "http://commerchant.herokuapp.com/" +
                                this.state.alesResult.source
                              }
                            >
                              {" "}
                              {this.state.alesResult.originalname}
                            </a>
                          </td>

                          <td>
                            <button
                              className="btn btn-info btn-fill pull-right"
                              value="Ales Result"
                              name="alesResult"
                              onClick={this.rejectDocument}
                            >
                              Request For Update
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>English Exam Result</b>
                          </td>
                          <td>
                            <a
                              href={
                                "http://commerchant.herokuapp.com/" +
                                this.state.englishExamResult.source
                              }
                            >
                              {this.state.englishExamResult.originalname}
                            </a>
                          </td>

                          <td>
                            <button
                              className="btn btn-info btn-fill pull-right"
                              value="English Exam Result"
                              name="englishExamResult"
                              onClick={this.rejectDocument}
                            >
                              Request For Update
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Reference Letter</b>
                          </td>
                          <td>
                            <a
                              href={
                                "http://commerchant.herokuapp.com/" +
                                this.state.referenceLetters.source
                              }
                            >
                              {this.state.referenceLetters.originalname}
                            </a>
                          </td>

                          <td>
                            <button
                              className="btn btn-info btn-fill pull-right"
                              value="referenceLetters"
                              name="referenceLetters"
                              onClick={this.rejectDocument}
                            >
                              Request For Update
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Statement of Purpose</b>
                          </td>
                          <td>
                            <a
                              href={
                                "http://commerchant.herokuapp.com/" +
                                this.state.statementOfPurpose.source
                              }
                            >
                              {this.state.statementOfPurpose.originalname}
                            </a>
                          </td>

                          <td>
                            <button
                              className="btn btn-info btn-fill pull-right"
                              value="statementOfPurpose"
                              name="statementOfPurpose"
                              onClick={this.rejectDocument}
                            >
                              Request For Update
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Passport</b>
                          </td>
                          <td>
                            <a
                              href={
                                "http://commerchant.herokuapp.com/" +
                                this.state.passportCopy.source
                              }
                            >
                              {this.state.passportCopy.originalname}{" "}
                            </a>
                          </td>

                          <td>
                            <button
                              className="btn btn-info btn-fill pull-right"
                              value="Passport Copy"
                              name="passportCopy"
                              onClick={this.rejectDocument}
                            >
                              Request For Update
                            </button>
                          </td>
                        </tr>

                        <tr>
                        
                          <td>
                          <button
                              className="btn btn-info btn-fill pull-right"
                              name="rejected"
                              onClick={this.rejectOrAccept}
                            >
                              Reject Applicant
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-info btn-fill pull-right"
                              name="accepted"
                              onClick={this.rejectOrAccept}
                            >
                              Accept Applicant
                            </button>
                          
                        
                          </td>

                          <td>
                            <button
                              className="btn btn-info btn-fill pull-right"
                              name="checked"
                              onClick={this.rejectOrAccept}
                            >
                              Confirm Documents
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
