import React, { Component } from 'react'
import axios from "axios";



export default class CreateInterview extends Component {
    state={
        applicant: "",
        date: "",
        location: ""
    }
    
    handleProgram = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
    
        this.setState({
          [name]: value,
        });
      };


    submit = async (event) => {
        event.preventDefault();
        if (
          this.state.date === "" ||
          this.state.location === "" 
        ) {
          document.getElementById("EmptySpaces").innerHTML =
            "Please fill the empty fields and try again!";
        } else {
         
            const payload = {
                applicant: this.props.currentApplicant._id,
                date: this.state.date,
                location: this.state.location,
          
            };
            console.log("gönderilen veri: ", payload)
            
            await axios({
              url: "http://commerchant.herokuapp.com/interviews",
              method: "POST",
              headers: {
                // Authorization: window.localStorage.getItem("token"),
                Authorization: this.props.token,
                   },
              data: payload,
            })
              .then(
                (response) => (
                  this.setState({ datas: response })| alert(response.data.message)
                )
              )
              .catch((err) => console.log(err));
          
        }
      };


    render() {
        return (
            <div>
                 <div class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-header">
                                    <h4 class="card-title">New Interview</h4>
                                </div>
                                <div class="card-body">
                                    <form>
                                        

                                        <div class="row">
                                            <div class="col-md-10 pr-1">
                                                <div class="form-group">
                                                    <label>Date</label>
													<input type="datetime-local" required="required" class="form-control" name="date" onChange={this.handleProgram}/><br/><br/>																		
                                                </div>
                                            </div>
                                        </div>
										<div class="row" >
                                            <div class="col-md-10 pr-1" >
                                                <div class= "form-group" >
                                                    <label>Location</label>									
													​<textarea id="txtArea" rows="12" cols="74" name="location" onChange={this.handleProgram} ></textarea>	
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <p style={{ color: "red" }} id="EmptySpaces"></p>
                                        
                                        <div class="clearfix"></div>
										<button type="submit" class="btn btn-info btn-fill pull-right" value="Submit" onClick={this.submit}>Submit</button>	
                                    </form>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
