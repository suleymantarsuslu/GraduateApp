import React, { Component } from 'react'
import axios from "axios";
import moment from 'moment';

export default class GradschoolPrograms extends Component {
    state= {
        programs:[],
        masters:[],
        doctorals:[]
    }

    newProgramHandler=()=>{
    this.props.setCurrentPage("OpenProgram")
    }

    EditProgramHandler=(programId)=>{
        this.props.setProgram(programId)
        this.props.setCurrentPage("EditProgram")

    }


    componentWillMount = async() => {
        await this.jwtHandler();
        this.seperate();
      }
    
    
      jwtHandler = async () => {
        await axios({
          url: "http://commerchant.herokuapp.com/programs/all",
          method: "GET",
        })
          .then((response) =>
            this.setState({ programs: response.data.payload.programs }),
            
          )
          .catch(() => console.log("Programlar gösterilemedi"));
      };
    
    

seperate=()=>{
    var tempMasters=[];
    var tempDoctorals = []
    this.state.programs.map((aProgram) =>{
        if(aProgram.degree ===  "Master"){
            tempMasters.push(aProgram)
        }else{
            tempDoctorals.push(aProgram)
        }
    }
    )

    this.setState({masters : tempMasters})
    this.setState({doctorals: tempDoctorals})
}

    render() {

        return (
            <div className="wrapper">
                <div className="content">
                <div className="container-fluid">
                    <p onClick={this.newProgramHandler} style={{color:"blue", textAlign:"right", cursor:"pointer"}}>Add a new program</p>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card strpied-tabled-with-hover">
                                <div className="card-header ">
                                    <h4 className="card-title">Master's Degrees</h4>
                                 
                                </div>
                                <div className="card-body table-full-width table-responsive">
                                    <table className="table table-hover table-striped">
                                        <thead>
                                            <tr>
                                                <th>Program</th>
                                                <th>Department</th>
                                                <th>Anounce Date</th>
                                                <th>Application Deadline</th>
                                              
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.masters.map((aProgram) => (
                                           
                                            <tr  key={aProgram._id} onClick={()=>this.EditProgramHandler(aProgram._id)} style={{cursor:"pointer"}}>
                                              
                                                <td >{aProgram.name}</td>
                                                <td>{aProgram.department}</td>
                                                <td>{ moment(aProgram.announceDate).format("dddd, MMM DD   HH:mm ")}</td>
                                                <td>{ moment(aProgram.applicationDeadline).format("dddd, MMM DD   HH:mm ")}</td>
                                               
                                            </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card strpied-tabled-with-hover">
                                <div className="card-header ">
                                    <h4 className="card-title">Doctoral Degrees</h4>
                                   
                                </div>
                                <div className="card-body table-full-width table-responsive">
                                    <table className="table table-hover table-striped">
                                        <thead>
                                            <tr>
                                                <th>Program</th>
                                                <th>Department</th>
                                                <th>Anounce Date</th>
                                                <th>Application Deadline</th>
                                              
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.doctorals.map((aProgram) => (
                                           
                                            <tr  key={aProgram._id} onClick={()=>this.EditProgramHandler(aProgram._id)} style={{cursor:"pointer"}}>
                                              
                                                <td >{aProgram.name}</td>
                                                <td>{aProgram.department}</td>
                                                <td>{ moment(aProgram.announceDate).format("dddd, MMM DD   HH:mm ")}</td>
                                                <td>{ moment(aProgram.applicationDeadline).format("dddd, MMM DD   HH:mm ")}</td>
                                               
                                            </tr>
                                            ))}
                                        </tbody>
                                    </table>
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
