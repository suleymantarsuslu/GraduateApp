import React, { Component } from "react";
import axios from "axios";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Table } from "reactstrap";
import ReactDOM from "react-dom";
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";

export default class EditProgram1 extends Component {
  state = {
  
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
    
    datas: [],
    
  };

  handlechange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    });
  };

  componentWillMount() {
    this.jwtHandler();
  }

  jwtHandler = async () => {
    await axios({
      url: "http://commerchant.herokuapp.com/programs",
      method: "GET",
    })
      .then((response) =>
        this.setState({ datas: response.data.payload.programs })
      )
      .catch(() => console.log("Profil gösterilemedi"));
  };


  render() {
    return (
      <div>
        <h2> Edit Program</h2>

        <select onChange={this.handlechange} value={this.state.value}>
          {this.state.datas.map((data) => (
            <option value={data} key={data._id}>

              {data.name}

            </option>
          ))}
          ;
        </select>
            
        <Form onSubmit={this.submit}>
        
        <FormGroup check>
            <h5>Ales Requirement</h5>
            <Label check>
              <Input type="radio" name="radio2" />{' '}
             Yes
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radio2" />{' '}
              No
            </Label>
          </FormGroup>
          
          <FormGroup checka>
            
            <h5>SGK Requirenment</h5>
            <Label check>
              <Input type="radio" name="radio3" />{' '}
             Yes
            </Label>
          </FormGroup>
          <FormGroup checka>
            <Label check>
              <Input type="radio" name="radio4" />{' '}
              No
            </Label>
          </FormGroup>
          <h1>  </h1>

          <FormGroup checkb>
            <h5>master Requirenment</h5>
            <Label check>
              <Input type="radio" name="radio5" />{' '}
             Yes
            </Label>
          </FormGroup>
          <FormGroup checkb>
            <Label check>
              <Input type="radio" name="radio6" />{' '}
              No
            </Label>
          </FormGroup>



          <FormGroup>
            <Label for="middlename">Program Name</Label>
            <Input
              type="text"
              name="middlename"
              value={this.state.username}
              placeholder="Program  Name!"
              onChange={this.handlechange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="lastname">Department</Label>
            <Input
              type="text"
              name="lastname"
              value={this.state.username}
              placeholder="Department"
              onChange={this.handlechange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="text">Degree</Label>
            <Input
              type="text"
              name="degree"
              value={this.state.email}
              placeholder="Degree"
              onChange={this.handlechange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="coordinator">Coordinator</Label>
            <Input
              type="coordinator"
              value={this.state.coordinator}
              name="coordinator"
              placeholder="coordinator"
              onChange={this.handlechange}
            />
          </FormGroup>

          <FormGroup row>
        <Label for="exampleText" >Description</Label>
        
          <Input type="textarea" name="text" id="exampleText" />
      
      </FormGroup>

          <Button>Save</Button>
        </Form>
      </div>
    );
  }
}
