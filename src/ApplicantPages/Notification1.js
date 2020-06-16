import React, { Component } from "react";
import axios from "axios";
import moment from 'moment';
import { Table } from 'reactstrap';

export default class Notification extends Component {
  state = {
    nots: [],
    curTime: "",
    selectedNotification: "",
    title: "",
    note:"",
    from:"",
    date:""

  };

  takeNotifications = async () => {
    await axios({
      url: "http://commerchant.herokuapp.com/notifications/",
      method: "GET",
      headers: {
        //   Authorization: window.localStorage.getItem("token"),
        Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWNjb3VudCIsImRhdGEiOnsicm9sZSI6InN1IiwiX2lkIjoiNWVkM2RhZDA2M2M4YjQyOTZhNTJiMTVhIiwiZmlyc3RuYW1lIjoiU3VsZXltYW4iLCJtaWRkbGVuYW1lIjoiIiwibGFzdG5hbWUiOiJUYXJzdXNsdSIsImVtYWlsIjoic3VsZXltYW5AZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkTm4ucktxdktwMmtTZWx6MFRLM01CLnIxWVlSYUNQVk5TaFBpUTkwQVhOT0NUWjZDY3Mwd3EiLCJwaG9uZSI6IjUzNTA4MDk1OTAiLCJhZGRyZXNzIjoiR3VsYmFoY2UgTWFoYWxsZXNpIDQzNC5zb2thayBubzoyNiIsIl9fdiI6MH0sImlhdCI6MTU5MTI5MTEwNywiZXhwIjoxNTkxMzc3NTA3fQ.-hxmQVkSYBZmyI4jbuxDCXu_hdO4WbIZuFi2U2Ar7N8"      },
    })
      .then((response) =>
         (this.setState({ nots: response.data.payload.notifications }),
         this.setState({ title: response.data.payload.notifications[0].title }),
         this.setState({ note: response.data.payload.notifications[0].note }),
         this.setState({ from: response.data.payload.notifications[0].from }),
         this.setState({ date: response.data.payload.notifications[0].date })
         )
      )
      .catch(() => console.log("Profil gösterilemedi"));
  };


  selectANot = (aNotification) => {
    this.setState({ selectedNotification: aNotification });
    this.setState({ title: aNotification.title });
    this.setState({ note: aNotification.note });
    this.setState({ from: aNotification.from });
    this.setState({ date: aNotification.date })
  };



  deleteNot = async (id) =>{
   
    await axios({
        
        url: "http://commerchant.herokuapp.com/notifications/"+id,
        method: "DELETE",
        headers: {
            Authorization: window.localStorage.getItem("token"),
          },
      })
        .then((response) =>
           (this.setState({ nots: response.data.payload.notifications })
           )
        )
        .catch(() => console.log("Notifications are Couldn't be shown"));
  }

  showSelectedNote = () => {
    try{
      return (
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">
                {this.state.title}
              </h4>
              <p className="card-category">
                {this.state.from}
              </p>
            </div>
            <div className="card-body">
              <div className="typography-line">
                <p>{this.state.note}</p>
              </div>
            </div>
            <div className="card-body">
              <div className="typography-line">
                <p>{moment(this.state.date).format("dddd, MMM DD,  HH:mm ")}</p>
                
              </div>
            </div>
          </div>
        </div>
      );
    
}catch(e){
    if(e){
        return ""
    }
}
  };



  componentWillMount=async()=> {
    await this.takeNotifications();
    this.setState({ curTime: new Date().toLocaleString() });
  
  }

  render() {

    return (
      <div class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="card  card-tasks">
                                <div class="card-header ">
                                    <h4 class="card-title">Tasks</h4>
                                    <p class="card-category">Backend development</p>
                                </div>
                                <div class="card-body ">
                                    <div class="table-full-width">
                                        <table class="table">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div class="form-check">
                                                            <label class="form-check-label">
                                                                <input class="form-check-input" type="checkbox" value=""/>
                                                                <span class="form-check-sign"></span>
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td>Sign contract 
                                                    </td>
                                                    <td class="td-actions text-right">
                                                        <button type="button" rel="tooltip" title="" class="btn btn-info btn-simple btn-link" data-original-title="Edit Task">
                                                            <i class="fa fa-edit"></i>
                                                        </button>
                                                        <button type="button" rel="tooltip" title="" class="btn btn-danger btn-simple btn-link" data-original-title="Remove">
                                                            <i class="fa fa-times"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="form-check">
                                                            <label class="form-check-label">
                                                                <input class="form-check-input" type="checkbox" value="" checked=""/>
                                                                <span class="form-check-sign"></span>
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td>Lines From Great Russian Literature? Or E-mails From My Boss?
                                                    </td>
                                                    <td class="td-actions text-right">
                                                        <button type="button" rel="tooltip" title="" class="btn btn-info btn-simple btn-link" data-original-title="Edit Task">
                                                            <i class="fa fa-edit"></i>
                                                        </button>
                                                        <button type="button" rel="tooltip" title="" class="btn btn-danger btn-simple btn-link" data-original-title="Remove">
                                                            <i class="fa fa-times"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="form-check">
                                                            <label class="form-check-label">
                                                                <input class="form-check-input" type="checkbox" value="" checked=""/>
                                                                <span class="form-check-sign"></span>
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td>Flooded: One year later, assessing what was lost and what was
                                                        found when a ravaging rain swept through metro Detroit
                                                    </td>
                                                    <td class="td-actions text-right">
                                                        <button type="button" rel="tooltip" title="" class="btn btn-info btn-simple btn-link" data-original-title="Edit Task">
                                                            <i class="fa fa-edit"></i>
                                                        </button>
                                                        <button type="button" rel="tooltip" title="" class="btn btn-danger btn-simple btn-link" data-original-title="Remove">
                                                            <i class="fa fa-times"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="form-check">
                                                            <label class="form-check-label">
                                                                <input class="form-check-input" type="checkbox" checked=""/>
                                                                <span class="form-check-sign"></span>
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td>Create 4 Invisible User Experiences you Never Knew About</td>
                                                    <td class="td-actions text-right">
                                                        <button type="button" rel="tooltip" title="" class="btn btn-info btn-simple btn-link" data-original-title="Edit Task">
                                                            <i class="fa fa-edit"></i>
                                                        </button>
                                                        <button type="button" rel="tooltip" title="" class="btn btn-danger btn-simple btn-link" data-original-title="Remove">
                                                            <i class="fa fa-times"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="form-check">
                                                            <label class="form-check-label">
                                                                <input class="form-check-input" type="checkbox" value=""/>
                                                                <span class="form-check-sign"></span>
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td>Read "Following makes Medium better"</td>
                                                    <td class="td-actions text-right">
                                                        <button type="button" rel="tooltip" title="" class="btn btn-info btn-simple btn-link" data-original-title="Edit Task">
                                                            <i class="fa fa-edit"></i>
                                                        </button>
                                                        <button type="button" rel="tooltip" title="" class="btn btn-danger btn-simple btn-link" data-original-title="Remove">
                                                            <i class="fa fa-times"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="form-check">
                                                            <label class="form-check-label">
                                                                <input class="form-check-input" type="checkbox" value="" disabled="" />
                                                                <span class="form-check-sign"></span>
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td>Unfollow 5 enemies from twitter</td>
                                                    <td class="td-actions text-right">
                                                        <button type="button" rel="tooltip" title="" class="btn btn-info btn-simple btn-link" data-original-title="Edit Task">
                                                            <i class="fa fa-edit"></i>
                                                        </button>
                                                        <button type="button" rel="tooltip" title="" class="btn btn-danger btn-simple btn-link" data-original-title="Remove">
                                                            <i class="fa fa-times"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="card-footer ">
                                    <hr/>
                                    <div class="stats">
                                        <i class="now-ui-icons loader_refresh spin"></i> Updated 3 minutes ago
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="card">
                                <div class="card-header">
                                    <h4 class="card-title">Light Bootstrap Table Heading</h4>
                                    <p class="card-category">Created using Montserrat Font Family</p>
                                </div>
                                <div class="card-body">
                                    <div class="typography-line">
                                        <p>
                                            <span>Paragraph</span>
                                            I will be the leader of a company that ends up being worth billions of
                                            dollars, because I got the answers. I understand culture. I am the nucleus.
                                            I think that’s a responsibility that I have, to push possibilities, to show
                                            people, this is the level that things could be at.
                                        </p>
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

