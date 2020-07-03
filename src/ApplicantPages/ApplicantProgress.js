import React, { Component } from 'react'
import axios from "axios";

export default class ApplicantProgress extends Component {
    state={
        applicationFile:null,
        step:null
    }


    componentWillMount(){
        this.getApplicationFile()
    }

    getApplicationFile = async () => {
        await axios({
          url: "http://commerchant.herokuapp.com/applications",
          method: "GET",
          headers: {
            Authorization: this.props.token,
            step:null
          },
        })
          .then((response) =>
            this.setState({ applicationFile: response.data.payload.application })
          )
          .catch((err) => alert(err.response.data.message));

          this.setState({step: this.stepBringer()})
      };

      stepBringer=()=>{
        
            switch (this.state.applicationFile.status) {
              case "created":
                return 3 ;
              case "submited":
                return 4;
              case "updateRequested":
                return 3;
              case "edited":
                return 4;
              case "confirmed":
                return 5;
                case "assessed":
                    return 8;
                    case "updated":
                        return 4;
                case "rejected":
                return 8;
                case "interviewSetted":
                return 6;
                case "accepted":
                return 8;
                case "announced":
                    return 8;
              default:
                return 0;
         
      }
    }

    render() {
        return (
            <div>
                <h1 style={{color:"red"}}> You Are At Step {this.state.step}</h1>
            <img src= {require("../assets/img/road.png" )}alt="Avatar" className="avatar" style={{width: "100%", height: "100%"}}/> 
        </div>
        )
    }
}
