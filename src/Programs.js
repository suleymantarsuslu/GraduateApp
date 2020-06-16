import React, { Component } from "react";
import axios from "axios";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Table } from "reactstrap";
import ReactDOM from "react-dom";

export default class Programs extends Component {
  state = {
    data: {
      alesRequirement: true,
      sgkRequirement: true,
      masterRequirement: true,
      quota: 0,
      _id: "",
      name: "",
      department: "",
      degree: "",
      coordinator: "",
      description: "",
      announceDate: "",
      applicationDeadline: "",
      __v: 0,
    },
    datas: [],
    iter: 0,
    editCategory : {}
  };

  componentWillMount() {
    this.jwtHandler();
  }

  getDatas = () => {
    return this.datas
  }

  jwtHandler = async () => {
    await axios({
      url: "http://commerchant.herokuapp.com/programs",
      method: "GET",
    })
      .then((response) =>
        this.setState({ datas: response.data.payload.programs }),
        this.props.setProgram(this.datas)
      )
      .catch(() => console.log("Programlar gösterilemedi"));
  };

     change = (event)=> {
         this.setState({datas: event.target.value});
     }

  
  render() {
    return (
      <div>
        <h2> Programs</h2>
        <h2> </h2>
        <h2> </h2>
        <h2 onClick={() => this.props.changeCategory({CategoryName:"EditProgram"})}> Edit Program</h2>
        <h2> </h2>
        <h2> </h2>
        <h2> </h2>
        <Table hover>
          <thead>
            <tr>
              <th>Program Name</th>
              <th>Quota</th>
             
            </tr>
          </thead>
          <tbody>
            {this.state.datas.map((data) => (
              <tr key = {data._id}>
                <td>{data.name}</td>
                <td>{data.quota}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}




