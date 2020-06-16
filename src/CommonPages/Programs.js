import React, { Component } from 'react'
import axios from "axios";
import moment from 'moment';

export default class Programs extends Component {
    state= {
        programs:[],
        masters:[],
        doctorals:[]
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
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card strpied-tabled-with-hover">
                                <div className="card-header ">
                                    <h4 className="card-title">Master's Degrees</h4>
                                    <p className="card-category">Here is a subtitle for this table</p>
                                    <p>
                                        The master’s degree generally requires a minimum of one academic year of
                                        study,
                                        while the engineer’s degree requires two years. Admission to MIT for the
                                        master’s degree does not necessarily imply an automatic commitment by
                                        MIT beyond
                                        that level of study.
                                    </p>
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
                                           
                                            <tr  key={aProgram._id}>
                                              
                                                <td>{aProgram.name}</td>
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
                                    <p className="card-category">Here is a subtitle for this table</p>
                                    <p>
                                        A doctoral degree requires the satisfactory completion of an approved
                                        program of advanced study and original research of high quality. The PhD
                                        and
                                        ScD degrees are awarded interchangeably by all departments in the School
                                        of
                                        Engineering and the School of Science except in the fields of biology,
                                        cognitive science, neuroscience, medical engineering, and medical
                                        physics.
                                    </p>
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
                                        {this.state.doctorals.map((aProgram) => (
                                            <tr key={aProgram._id}>
                                                
                                                <td>{aProgram.name}</td>
                                                <td>{aProgram.department}</td>
                                                <td>{moment(aProgram.announceDate).format("dddd, MMM DD    HH:mm ")}</td>
                                                <td>{moment(aProgram.applicationDeadline).format("dddd, MMM DD    HH:mm ")}</td>
                                            </tr>
                                            ))}
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
