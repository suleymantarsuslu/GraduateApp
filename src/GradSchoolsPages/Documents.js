import React, { Component } from "react";
import axios from "axios";

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
  };

  componentWillMount() {
    this.setState({ anApplicant: this.props.currentApplicant });
    this.documentHandler();
  }

  documentHandler = async () => {
    await axios({
      url: "http://commerchant.herokuapp.com/documents/all",
      method: "GET",
      headers: {
        Authorization: this.props.token,
      },
    })
      .then((response) =>
        this.setState({
          documents: response.data.payload.documents.filter(
            (aDocument) =>
              aDocument.originalname === this.state.anApplicant.applicant._id
          ),
        })
      )
      .catch((err) => console.log(err));
    console.log("Documents are ", this.state.documents);

    this.state.documents.map((aDocument) => {
      this.state.documentsTitles.map((aTitle) => {
        if (aDocument.title === aTitle) {
          this.setState({
            [aTitle]: aDocument.storename,
          });
        }
      });
    });
  };

  
  rejectDocument=async(event)=>{
    

        const payload = {
          to: this.state.anApplicant.applicant.email,
          title: "Rejection",
          note:" Your document is rejected",
      
        };
        console.log("gönderilen veri: ", payload)
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



}

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
                              {this.state.anApplicant.applicant.name}{" "}
                              {this.state.anApplicant.applicant.surname}
                            </b>
                          </td>
                          <td>{this.state.photo}</td>
                        </tr>
                        <tr>
                          <td>
                            <b>Email</b>
                          </td>
                          <td>{this.state.anApplicant.applicant.email}</td>
                        </tr>
                        <tr>
                          <td>
                            <b>Applied For</b>
                          </td>
                          <td>{this.state.applicationProgram} </td>
                          
                        </tr>
                        <tr>
                          <td>
                            <b>Undergrand Transcript</b>
                          </td>
                          <td>
                            <a href={"http://commerchant.herokuapp.com/" + this.state.undergradTranscript}>
                              {this.state.undergradTranscript}
                            </a>
                          </td>
                     
                          <td>
                          <button className="btn btn-info btn-fill pull-right" value="undergradTranscript" onClick={this.rejectDocument}>
                              Reject 
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Permission Letter</b>
                          </td>
                          <td>
                          <a href={"http://commerchant.herokuapp.com/" + this.state.permissionLetter}>
                              {this.state.permissionLetter}
                            </a>
                          </td>
                         
                          <td>
                          <button className="btn btn-info btn-fill pull-right" value="permissionLetter" onClick={this.rejectDocument}>
                              Reject
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Ales Result File</b>
                          </td>
                          <td>
                          <a href={"http://commerchant.herokuapp.com/" + this.state.alesResult}>
                              {" "}
                              {this.state.alesResult}
                            </a>
                          </td>
                         
                          <td>
                          <button className="btn btn-info btn-fill pull-right" value="alesResult" onClick={this.rejectDocument}>
                              Reject
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>English Exam Result</b>
                          </td>
                          <td>
                          <a href={"http://commerchant.herokuapp.com/" + this.state.englishExamResult}>
                              {this.state.englishExamResult}
                            </a>
                          </td>
                       
                          <td>
                          <button className="btn btn-info btn-fill pull-right" value="englishExamResult" onClick={this.rejectDocument}>
                              Reject
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Reference Letter</b>
                          </td>
                          <td>
                          <a href={"http://commerchant.herokuapp.com/" + this.state.referenceLetters}>
                              {this.state.referenceLetters}
                            </a>
                          </td>
                          
                          <td>
                          <button className="btn btn-info btn-fill pull-right" value="referenceLetters" onClick={this.rejectDocument}>
                              Reject
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Statement of Purpose</b>
                          </td>
                          <td>
                          <a href={"http://commerchant.herokuapp.com/" + this.state.statementOfPurpose}>
                              {this.state.statementOfPurpose}
                            </a>
                          </td>
                      
                          <td>
                          <button className="btn btn-info btn-fill pull-right" value="statementOfPurpose" onClick={this.rejectDocument}>
                              Reject
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Passport</b>
                          </td>
                          <td>
                          <a href={"http://commerchant.herokuapp.com/" + this.state.passportCopy}>
                              {this.state.passportCopy}{" "}
                            </a>
                          </td>
                         
                          <td>
                          <button className="btn btn-info btn-fill pull-right" value="passportCopy" onClick={this.rejectDocument}>
                              Reject
                            </button>
                          </td>
                        </tr>

                        <tr>
                        <td>
                            <b></b>
                          </td>

                         

                        <td>
                          <button className="btn btn-info btn-fill pull-right" >
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
