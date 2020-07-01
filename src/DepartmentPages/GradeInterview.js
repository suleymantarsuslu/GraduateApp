import React, { Component } from "react";
import axios from "axios";
import moment from "moment";

export default class EditInterview extends Component {
  state = {
    grade: "",
    applicationFiles:[],
    currentApplicationFile:null
  };
  
  componentWillMount(){
      this.getApplicants()
  }

  handleProgram = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    });

  };

  getApplicants = async () => {
    await axios({
      url: "http://commerchant.herokuapp.com/applications/all",
      method: "GET",
      headers: {
        Authorization: this.props.token,
      },
    })
      .then((response) =>
        this.setState({ applicationFiles: response.data.payload.applications })
      )
      .catch((err) => console.log(err));


        this.state.applicationFiles.map((anApplication)=>{
            if(anApplication.applicant._id === this.props.currentInterview.applicant){
                this.setState({currentApplicationFile: anApplication})
            }

        })



  };



  submit = async (event) => {
    event.preventDefault();


  const payload = {
    assessmentResult: this.state.grade,
  };


await axios({
url: "http://commerchant.herokuapp.com/applications/assess/"+ this.state.currentApplicationFile._id,
method: "POST",
headers: {
  Authorization:this.props.token,

},
data: payload,
})
.then(
  (response) => alert(response.data.message) 
//   | this.sendNotification()
  )

.catch((err) => alert(err.response.data.message));



const data={
    status: "assessed",
}

await axios({
    url:
      "http://commerchant.herokuapp.com/applications/" +
      this.state.currentApplicationFile._id,
    method: "PATCH",
    data: data,
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

 
  render() {
    return (
      <div>
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">
                     Grade Interview :
                       {/* {this.props.currentApplicant.name}{" "}
                      {this.props.currentApplicant.surname} */}
                    </h4>
                  </div>
                  <div className="card-body">
                    <form>
                      
                      <div className="row">
                        <div className="col-md-10 pr-1">
                          <div className="form-group">
                            <label>Grade </label>​
                            <input
                              id="number"
                              name="grade"
                              min="0"
                               max="100"
                              onChange={this.handleProgram}
                            ></input>
                          </div>
                        </div>
                      </div>


                      <div className="clearfix"></div>
                      <button
                        type="submit"
                        className="btn btn-info btn-fill pull-right"
                        value="Submit"
                        onClick={this.submit}
                      >
                        Submit
                      </button>
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

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // submit=async()=>{

    //     const payload = {
    //       assessmentResult: this.state.grade,
    //       };
    //       await axios({
    //         url: "http://commerchant.herokuapp.com/applications/assess/5ee6305e4ef0ae000477ada0",
    //         method: "POST",
    //         headers: {
    //           // Authorization: window.localStorage.getItem("token"),
    //           Authorization: this.props.token,
    //         },
    //         data: payload,
    //       })
    //         .then((response) => alert(response.data.message))
    //         .catch((err) => alert(err.response.data.message));
    