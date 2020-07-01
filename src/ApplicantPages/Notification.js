import React, { Component } from "react";
import axios from "axios";
import moment from "moment";

export default class Notification extends Component {
  state = {
    nots: [],
    curTime: "",
    selectedNotification: "",
    title: "",
    note: "",
    from: "",
    date: "",
    refresher:false
  };

  takeNotifications = async () => {
    await axios({
      url: "http://commerchant.herokuapp.com/notifications/",
      method: "GET",
      headers: {
        Authorization: this.props.token,},
    })
      .then(
        (response) => (
          this.setState({ nots: response.data.payload.notifications })|
          this.setState({
            title: response.data.payload.notifications[0].title,
          })|
          this.setState({ note: response.data.payload.notifications[0].note })|
          this.setState({ from: response.data.payload.notifications[0].from })|
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
    this.setState({ date: aNotification.date });
  };

  deleteNot = async (aNot) => {
    await axios({
      url: "http://commerchant.herokuapp.com/notifications/" + aNot._id,
      method: "DELETE",
      headers: {
        Authorization: this.props.token,
       },
    })
      .then((response) =>
        document.getElementById("deleted").innerHTML= "The notification is deleted",
        this.props.setCurrentPage("")
      )
      .catch(() => console.log("Notifications are Couldn't be shown"));
  };



  componentWillMount = async () => {
    await this.takeNotifications();
    this.setState({ curTime: new Date().toLocaleString() });
  };


  render() {
    return (
      <div className="wrapper">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4">
                <div className="card  card-tasks">
                  <div className="card-header ">
                    <h4 className="card-title">Notifications</h4>
                   
                  </div>
                  <div className="card-body ">
                    <div className="table-full-width">
                      <table className="table">
                        <tbody>
                          {this.state.nots.map((aNotification) => (
                            <tr
                              onClick={() => this.selectANot(aNotification)}
                              key={aNotification._id}
                              
                            >
                             
                              <td>{aNotification.title}</td>
                              <td className="td-actions text-right">
                                <button
                                  type="button"
                                  className="close"
                                  data-original-title="Remove"
                                  onClick={() => this.deleteNot(aNotification)}
                                  aria-label="Close"
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="card-footer ">
                    <hr />
                    <div className="stats">
                      <i className="now-ui-icons loader_refresh spin"></i>{" "}
                      Updated at {this.state.curTime}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">{this.state.title}</h4>
              <p className="card-category">From : {this.state.from}</p>
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
              <p id="deleted"></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
