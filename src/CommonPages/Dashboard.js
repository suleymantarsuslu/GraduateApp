import React, { Component } from 'react'
import "../assets/css/bootstrap.min.css";
import "../assets/css/light-bootstrap-dashboard.css?v=2.0.0 ";
export default class Dashboard extends Component {
    render() {
        return (
            <div>
                 <div class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title" align="center">GRADUATION APPLICATION</h4>
                            </div>
                            <div class="card-body">
                                <p class="text-style">
                                    Entry requirements for graduate programs vary depending on each department or graduate school. Therefore, make sure that you fuifill the requirements of the related program through consuiting with the
                                    contact person from the relevant graduate school. To see what procedure applies to the program, please visit the page of the program you are interested in.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title" align="center">Who Can Apply</h4>
                            </div>
                            <div class="card-body">
                                <p>
                                    Applicants who wish to pursue a degree at the Graduate School must hold;<br />
                                    For Master of Science (M. S.) & Master of Arts(M. A.) applications, a bachelor's degree or awaiting graduation degree from bachelor<br />
                                    For Doctorate (PhD) on Bachelor of Science (B.S.) applications, a bachelor's degree or awaiting graduation degree from bachelor<br />
                                    For PhD application, an M.S./M.A.(or an equivalent) degree or awaiting graduation from M.S./M.A.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title" align="center">How to Apply</h4>
                            </div>
                            <div class="card-body">
                                <p>
                                    Application to IZTECH Graduate School programs will be made online in the link provided below. https://msphd.iyte.edu.tr/Ms_Phd_Applications/<br />
                                    1. Log in to the MS_PhD Applications and fill out the requiered fields in the Application Forms.<br />
                                    2. Submit the Online Application Form and the application process is complete. You can check your application status on the Main Page by logging in with your email address and password.<br />
                                    Please note: After finalizing your application, you are encouraged to check out the website of related Graduate School and the Program for the interview dates and last-munites information.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        
                    </div>
                    <div class="col-md-6" align="center">
                        <div class="card">
                            <div class="card-body" >
                                <img src= {require("../assets/img/graduate.jpg" )}alt="Avatar" class="avatar" style={{width: "100px", height: "100px"}}/> 
                                <p style={{fontsize :"10px"}}>
                                    Graduate Programs
                                </p>
                             
                                <div >
                                    <a href="https://en.iyte.edu.tr/academic/graduate-programs/">Read Me 
                                        <i class="fa fa-arrow-right"> </i>
                                    </a>    
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        
                    </div>
                </div>
                </div>
            </div>
        </div>
    
        )
    }
}
