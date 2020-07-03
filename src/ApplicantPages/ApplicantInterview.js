import React, { Component } from 'react'
import axios from "axios";
import moment from "moment";
export default class ApplicantInterview extends Component {
    state={
        interview:{}
    }

    componentWillMount(){
        this.takeNotifications()
    }

    setted=(avalue)=>{
      if(avalue){
        document.getElementById("notSet").hidden=true
        document.getElementById("date").hidden=false
        document.getElementById("location").hidden=false
      }else{
        document.getElementById("notSet").hidden=false
        document.getElementById("date").hidden=true
        document.getElementById("location").hidden=true
      }

    }


    takeNotifications = async () => {
        await axios({
          url: "http://commerchant.herokuapp.com/interviews",
          method: "GET",
          headers: {
            Authorization: this.props.token},
        })
          .then(
            (response) => (
              this.setState({ interview: response.data.payload.interview }) | this.setted(true)
            )
          )
          .catch((err) => console.log(err) | this.setted(false));
      };
    render() {
        return (
          <div>
            <div>
                <p id="notSet" style={{color:"red"}}>Your Interview Has Been Not Set Yet!</p>
            </div>
            <div>
                <p id="date" hidden>Your Interview date: {this.state.interview.date}</p>
                <p id="location" hidden>Your Interview Location is: {this.state.interview.location}</p>
            </div>
            </div>
        )
    }
}
