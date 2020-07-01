import React, { Component } from "react";
import axios from "axios";

export default class applicationFile extends Component {
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

    applicationProgram: "",
    documents: null,
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
  };

  componentWillMount = async () => {
    await this.setState({ applicationFile: this.props.applicationFile });
    await this.documentHandler();
  };

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
            this.setState({
              [aTitle]: aDocument,
            });
          }
        }
      }
    });

    for (var aDocument in this.state.applicationFile) {
      if (
        Object.prototype.hasOwnProperty.call(
          this.state.applicationFile,
          aDocument
        )
      ) {
        if (this.state.documentsTitles.includes([aDocument])) {
          this.documentBringer(aDocument,aDocument);
        }
      }
    }
  };

  documentBringer = async (aDocument,docName) => {
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
          this.setState({ [docName]: response.data.payload.document }),console.log(response))
      )
      .catch((err) => console.log(err));
  };

  rejectDocument = async (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    const payload = {
      to: this.state.anApplicant.applicant.email,
      title: "Document Rejection",
      note: " Your " + value + " document is rejected"
    };
    console.log("gönderilen veri: ", payload);
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
        (response) => (
          this.setState({ datas: response }), alert(response.data.message)
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
                    <h4 class="card-title">Documents</h4>
                  </div>
                  <div class="card-body table-full-width table-responsive">
                    <table class="table table-hover table-striped">
                      <tbody>
                        <tr>
                          <td>
                            <b>
                              {this.state.applicationFile.applicant.name}{" "}
                              {this.state.applicationFile.applicant.surname}
                            </b>
                          </td>
                          <td> </td>
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
                            <b>Undergrand Transcript</b>
                          </td>
                          <td>
                            <a
                              href={
                                "http://commerchant.herokuapp.com/" +
                                this.state.undergradTranscript
                              }
                            >
                              {this.state.undergradTranscript}
                            </a>
                          </td>

                          <td>
                            <button
                              className="btn btn-info btn-fill pull-right"
                              value="Undergrad Transcript"
                              name="undergradTranscript"
                              onClick={this.rejectDocument}
                            >
                              Reject
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
                                this.state.permissionLetter
                              }
                            >
                              {this.state.permissionLetter}
                            </a>
                          </td>

                          <td>
                            <button
                              className="btn btn-info btn-fill pull-right"
                              value="permission Letter"
                              name="permissionLetter"
                              onClick={this.rejectDocument}
                            >
                              Reject
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
                                this.state.alesResult
                              }
                            >
                              {" "}
                              {this.state.alesResult}
                            </a>
                          </td>

                          <td>
                            <button
                              className="btn btn-info btn-fill pull-right"
                              value="Ales Result"
                              name="alesResult"
                              onClick={this.rejectDocument}
                            >
                              Reject
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
                                this.state.englishExamResult
                              }
                            >
                              {this.state.englishExamResult}
                            </a>
                          </td>

                          <td>
                            <button
                              className="btn btn-info btn-fill pull-right"
                              value="English Exam Result"
                              name="englishExamResult"
                              onClick={this.rejectDocument}
                            >
                              Reject
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
                                this.state.referenceLetters
                              }
                            >
                              {this.state.referenceLetters}
                            </a>
                          </td>

                          <td>
                            <button
                              className="btn btn-info btn-fill pull-right"
                              value="referenceLetters"
                              name="referenceLetters"
                              onClick={this.rejectDocument}

                            >
                              Reject
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
                                this.state.statementOfPurpose
                              }
                            >
                              {this.state.statementOfPurpose}
                            </a>
                          </td>

                          <td>
                            <button
                              className="btn btn-info btn-fill pull-right"
                              value="statementOfPurpose"
                              name="statementOfPurpose"
                              onClick={this.rejectDocument}
                            >
                              Reject
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
                                this.state.passportCopy
                              }
                            >
                              {this.state.passportCopy}{" "}
                            </a>
                          </td>

                          <td>
                            <button
                              className="btn btn-info btn-fill pull-right"
                              value="Passport Copy"
                              name="passportCopy"
                              onClick={this.rejectDocument}
                            >
                              Reject
                            </button>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <b></b>
                          </td>

                          <td>
                            <button className="btn btn-info btn-fill pull-right">
                              Accept Applicant
                            </button>
                          </td>
                          <td>
                            <button className="btn btn-info btn-fill pull-right">
                              Reject Applicant
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
