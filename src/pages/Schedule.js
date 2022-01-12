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


//TEST
import { withStyles } from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";


const DAYS = [
    {
        key: "sunday",
        label: "S"
    },
    {
        key: "monday",
        label: "M"
    },
    {
        key: "tuesday",
        label: "T"
    },
    {
        key: "wednesday",
        label: "W"
    },
    {
        key: "thursday",
        label: "T"
    },
    {
        key: "friday",
        label: "F"
    },
    {
        key: "saturday",
        label: "S"
    }
];

const StyledToggleButtonGroup = withStyles(theme => ({
    grouped: {
        margin: theme.spacing(2),
        padding: theme.spacing(0, 1),
        "&:not(:first-child)": {
            border: "1px solid",
            borderColor: "#692B7C",
            borderRadius: "50%"
        },
        "&:first-child": {
            border: "1px solid",
            borderColor: "#692B7C",
            borderRadius: "50%"
        }
    }
}))(ToggleButtonGroup);

const StyledToggle = withStyles({
    root: {
        color: "#692B7C",
        "&$selected": {
            color: "white",
            background: "#692B7C"
        },
        "&:hover": {
            borderColor: "#BA9BC3",
            background: "#BA9BC3"
        },
        "&:hover$selected": {
            borderColor: "#BA9BC3",
            background: "#BA9BC3"
        },
        minWidth: 32,
        maxWidth: 32,
        height: 32,
        textTransform: "unset",
        fontSize: "0.75rem"
    },
    selected: {}
})(ToggleButton);





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
            Status: false,
            pattern: '',
            Day: [0, 2, 4],
        };
        this.onChangeValue = this.onChangeValue.bind(this);
    }

    componentDidMount() {
        var token = localStorage.getItem("token");
        this.setState({ userToken: token });
        console.log("token : " + this.state.userToken);

        var device = localStorage.getItem("device");
        this.setState({ Device: device });
        console.log("device : " + this.state.Device);
    }

    handleDayChange(day) {
        this.setState({ Date: day });
    }

    handleDayChange2(event, value) {
        this.setState({ Day: value })
    }

    onChangeValue(event) {
        console.log(event.target.value);
        this.setState({ Sound: event.target.value });
    }

    // START TIME HANDLING
    optionChanged = value => {
        console.log(value);
        this.setState({ selectedValue: value });
    };

    //PATTERN HANDLING
    patternChanged = event => {
        console.log(event.target.value);
        this.setState({ pattern: event.target.value });
    };

    // END TIME HANDLING
    optionChanged1 = value1 => {
        console.log(value1);
        this.setState({ selectedValue1: value1 });
    };

    handleSubmit = event => {
        console.log(this.state.userToken);
        console.log(this.state.Device);
        console.log("Date : " + JSON.stringify(this.state.Date));
        alert("Date : " + JSON.stringify(this.state.Date));
        alert("Date : " + JSON.stringify(this.state.Date).slice(1,5));
        alert("Date : " + JSON.stringify(this.state.Date).slice(6,8));
        alert("Date : " + JSON.stringify(this.state.Date).slice(9,11));
        console.log(this.state.selectedValue);
        console.log(this.state.selectedValue1);
        console.log(this.state.Sound);
        console.log(this.state.Status);

        if (this.state.userToken == '') {
            console.log("Please login first");
            alert("Please login first");
        }
        else {
            axios.post(`http://165.227.123.50:5000/api/addSchedule`, {
                Device: this.state.Device,
                Date: {"Year":JSON.stringify(this.state.Date).slice(1,5),"Month":JSON.stringify(this.state.Date).slice(6,8),"Day":JSON.stringify(this.state.Date).slice(9,11)},
                Start_Time: this.state.selectedValue,
                End_Time: this.state.selectedValue1,
                Pattern: this.state.pattern,
                Sound: this.state.Sound,
                Status: this.state.Status,
                Day: this.state.Day,
            })
                .then(res => {
                    if (res.status == 200) {
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

                <Card style={{ marginTop: '4%' }}>
                    <Card.Body className="justify-content-md-center">
                        <Card.Title>Select Date</Card.Title>
                        <DayPickerInput onDayChange={this.handleDayChange} style={{ marginTop: '0.5%' }} placeholder="DD/MM/YYYY" format="DD/MM/YYYY" />
                    </Card.Body>
                </Card>

                <Card style={{ marginTop: '2%', }}>
                    <Card.Body className="justify-content-md-center">
                        <Card.Title>Start Time</Card.Title>
                        <TimePicker style={{ width: '40%', marginLeft: '30%' }} value={this.state.selectedValue}
                            onChange={this.optionChanged} start="00:00" end="23:59" step={30} />
                    </Card.Body>
                </Card>

                <Card style={{ marginTop: '2%', }}>
                    <Card.Body className="justify-content-md-center">
                        <Card.Title>End Time</Card.Title>
                        <TimePicker style={{ width: '40%', marginLeft: '30%' }} value={this.state.selectedValue1}
                            onChange={this.optionChanged1} start="00:00" end="23:59" step={30} />
                    </Card.Body>
                </Card>

                <Card style={{ marginTop: '2%', }}>
                    <div onChange={this.onChangeValue}>
                        <input type="radio" value="On" name="sound" /> Sound On
                        <br />
                        <input type="radio" value="Off" name="sound" /> Sound Off
                    </div>
                </Card>

                <Card style={{ marginTop: '2%', }}>
                    <input type="text" value={this.state.pattern} onChange={this.patternChanged} enable style={{ width: '30%', alignSelf: 'center', marginTop: '1%', marginBottom: '1%' }} placeholder=" Name Pattern" />
                </Card>

                <Card style={{ marginTop: '2%', }}>
                    <Card.Body>
                        <Card.Title>Select days to repeat (if any)</Card.Title>
                        {/* <ToggleDays /> */}



                        <>
                            <StyledToggleButtonGroup
                                size="small"
                                arial-label="Days of the week"
                                value={this.state.Day}
                                onChange={(event, value) => this.setState({ Day: value })}
                            >
                                {DAYS.map((day, index) => (
                                    <StyledToggle key={day.key} value={index} aria-label={day.key}>
                                        {day.label}
                                    </StyledToggle>
                                ))}
                            </StyledToggleButtonGroup>
                        </>



                        <Dropdown style={{ marginTop: '0.5%', marginBottom: '0.5%' }}>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                Repeat Schedule
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-3" onClick={() => { this.setState({ Status: false }) }} >Every week</Dropdown.Item>
                                <Dropdown.Item href="#/action-2" onClick={() => { this.setState({ Status: true }) }}>Every Week After</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Card.Body>
                </Card>

                <div style={{ marginTop: '3%', marginBottom: '2%' }}>
                    <Button variant="primary" onClick={this.handleSubmit.bind(this)}>Save Pattern</Button>
                </div>
            </Container >
        )
    }
}
