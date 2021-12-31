import React, { Component } from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';

import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

import TimePicker from 'react-bootstrap-time-picker';

import ToggleDays from '../components/DayPicker/ToggleDays';


export default class LaserSchedule extends Component {

    constructor() {
        super();
        this.handleDayChange = this.handleDayChange.bind(this);
        this.state = {
          name: "React",
          
          selectedValue: '',
          selectedValue1: '',
          userToken: '',
          Device: '',
            Date: '',
            Sound: '',
            Status: ''
        };
        this.onChangeValue = this.onChangeValue.bind(this);
      }

    componentDidMount() {
        var token = localStorage.getItem("token");
        this.setState({ userToken: token });
        console.log("token : "+this.state.userToken);

        var device = localStorage.getItem("device");
        this.setState({ Device: device });
        console.log("device : "+this.state.Device);
    }

    handleDayChange(day) {
        this.setState({ Date: day });
      }

      onChangeValue(event) {
        console.log(event.target.value);
        this.setState({Sound: event.target.value});
      }

      // START TIME HANDLING
      optionChanged = value => {
        console.log(value);
        this.setState({ selectedValue: value});
      };

        // END TIME HANDLING
    optionChanged1 = value1 => {
        console.log(value1);
        this.setState({ selectedValue1: value1});
      };

      handleSubmit = event => {
        console.log(this.state.userToken);
        console.log(this.state.Device);
        console.log("Date : "+JSON.stringify(this.state.Date));
        console.log(this.state.selectedValue);
        console.log(this.state.selectedValue1);
        console.log(this.state.Sound);
        console.log(this.state.Status);

          if(this.state.userToken == '') {
              console.log("Please login first");
              alert("Please login first");
          }
          else {
              axios.post(`http://137.184.54.1:5000/api/addSchedule`, {
                  Device: this.state.Device,
                  Date: JSON.stringify(this.state.Date),
                  Start_Time: this.state.selectedValue,
                  End_Time: this.state.selectedValue1,
                  Sound: this.state.Sound,
                  Status: this.state.Status
              })
              .then(res => {
                  if(res.status == 200) {
                      console.log("Saved Successful");
                      alert("Saved Successful");
                  }
                  else {
                      alert("Procedure Failed");
                  }
                console.log(res);
                console.log(res.data);
              })
          }
    }

    render() {
        return (
            <Container fluid>
                <h3><Badge bg="secondary">Set Laser Schedule</Badge></h3>

                <Card style={{marginTop: '4%'}}>
                    <Card.Body className="justify-content-md-center">
                        <Card.Title>Select Date</Card.Title>
                        <DayPickerInput onDayChange={this.handleDayChange} style={{marginTop: '0.5%'}} placeholder="           YYYY/MM/DD" format="DD/MM/YYYY" />
                    </Card.Body>
                </Card>

                <Card style={{marginTop: '2%',}}>
                    <Card.Body className="justify-content-md-center">
                        <Card.Title>Start Time</Card.Title>
                        <TimePicker style={{width: '40%', marginLeft: '30%'}} value={this.state.selectedValue}
                            onChange={this.optionChanged} start="00:00" end="23:59" step={30} />
                    </Card.Body>
                </Card>

                <Card style={{marginTop: '2%',}}>
                    <Card.Body className="justify-content-md-center">
                        <Card.Title>End Time</Card.Title>
                        <TimePicker style={{width: '40%', marginLeft: '30%'}} value={this.state.selectedValue1}
                            onChange={this.optionChanged1} start="00:00" end="23:59" step={30} />
                    </Card.Body>
                </Card>

                <Card style={{marginTop: '2%',}}>
                <div onChange={this.onChangeValue}>
                    <input type="radio" value="On" name="sound" /> Sound On
                    <br />
                    <input type="radio" value="Off" name="sound" /> Sound Off
                </div>
                </Card>

                <Card style={{marginTop: '2%',}}>
                    <input disabled style={{width: '30%', alignSelf:'center', marginTop: '1%', marginBottom: '1%'}} placeholder="Name Pattern" />
                </Card>

                <Card style={{marginTop: '2%',}}>
                    <Card.Body>
                        <Card.Title>Select days to repeat (if any)</Card.Title>
                        <ToggleDays />

                        <Dropdown style={{marginTop: '0.5%', marginBottom: '0.5%'}}>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                Select Week(s)
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-3">Every week</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Every Week After</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Card.Body>
                </Card>

                <div style={{marginTop: '3%', marginBottom: '2%'}}>
                    <Button variant="primary" onClick={this.handleSubmit.bind(this)}>Save Pattern</Button>
                </div>
            </Container>
        )
    }
}
