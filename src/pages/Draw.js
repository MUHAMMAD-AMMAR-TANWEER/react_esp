import React, { Component } from 'react';
import axios from 'axios';

// import '../components/Context/GV';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Dropdown from 'react-bootstrap/Dropdown';
import Card from 'react-bootstrap/Card';

import Xslider from '../components/Sliders/Xslider';
import Yslider from '../components/Sliders/Yslider';

// import Iframe from 'react-iframe'

import Canvas from '../components/canva/Canvas';

export class Draw extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userToken: ''
        }
    }

    componentDidMount() {
        var token = localStorage.getItem("token");
        this.setState({ userToken: token });
        console.log("token : " + this.state.userToken);
    }

    handleAxis() {
        console.log("X : " + global.axis0);
        console.log("Y : " + global.axis1);
    }

    handleSubmit = async (event) => {
        console.log(this.state.userToken);
        console.log(global.xcord);
        console.log(global.ycord);

        if (this.state.userToken == '') {
            console.log("Please login first");
            alert("Please login first");
        }
        else {
            await axios.post(`http://137.184.54.1:5000/api/addPattern`, {
                Device: localStorage.getItem("device"),
                Pattern: "pattern1",
                email: this.state.userToken,
                x: global.xcord,
                y: global.ycord,

            })
                .then(res => {
                    if (res.status == 200) {
                        console.log("Pattern Saved Successful");
                        alert("Pattern Saved Successful");
                    }
                    else {
                        alert("Pattern Failed");
                    }
                    console.log(res);
                    console.log(res.data);
                })

            global.xcord = [];
            global.ycord = [];
        }
    }

    render() {

        return (
            <div className="App" style={{ height: '100%' }}>
                <h3><Badge bg="secondary">Draw Pattern</Badge></h3>

                <Card className="col-md-12" style={{ alignItems: 'center', marginTop: '5%' }}>
                    <div className="row" style={{ justifyContent: 'space-between' }}>
                        <Card.Title>Set Axis</Card.Title>
                        <Card className="col-md-5">
                            <label>X-axis</label>
                            <Xslider />
                        </Card>
                        <Card className="col-md-5">
                            <label>Y-axis</label>
                            <Yslider />
                        </Card>
                    </div>
                    <Button style={{ marginTop: '1%', marginBottom: '1%' }} onClick={this.handleAxis}>Set Axis</Button>
                </Card>

                <Card className="col-md-12" style={{ marginTop: '2%', }}>
                    <Canvas />
                </Card>

                <Card className="col-md-12" style={{ marginTop: '2%' }}>
                    <Dropdown style={{ marginTop: '0.5%', marginBottom: '0.5%' }}>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            Speed
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Slow</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Medium</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Fast</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Card>

                <Card className="col-md-12" style={{ marginTop: '2%', }}>
                    <input disabled style={{ width: '30%', alignSelf: 'center', marginTop: '1%', marginBottom: '1%' }} placeholder="Name Pattern" />
                </Card>

                <div className="col-md-12" style={{ marginTop: '2%' }}>
                    <Button style={{ marginBottom: '10%' }} onClick={this.handleSubmit.bind(this)}>Save Pattern</Button>
                </div>

            </div>
        )
    }
}

export default Draw;
