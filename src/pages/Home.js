import React, { Component } from 'react';
import { useHistory } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state={
            userToken: ''
        }
    }

    componentDidMount() {
        var token = localStorage.getItem("token");
        this.setState({ userToken: token });
        console.log("token : "+this.state.userToken);
    }

    // handleLogout() {
    //     console.log('Logout')
    //     console.log(global.token)
    //     global.token = null;
    //     global.auth = false;

    //     console.log(global.token)
    // }

    render() {
        return (
            <Container>
                <h3><Badge bg="secondary">HOME</Badge></h3>

                <Card>
                    <Card.Body>
                        <div style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <div>
                                <label>User : {this.state.userToken}</label>
                            </div>
                            {/* <div>
                                <label><Button variant="link" onClick={this.handleLogout}>Logout</Button></label>
                            </div> */}
                        </div>
                    </Card.Body>
                </Card>

                <div style={{marginTop: '2%'}}>
                    <Button href="/addDevice">Add Device</Button>
                </div>

                <div style={{marginTop: '4%'}}>
                    <Button href="/laserSchedule">Select Laser Schedule</Button>
                </div>

                <div style={{marginTop: '4%'}}>
                    <Button href="/draw">Draw Pattern</Button>
                </div>
            </Container>
        )
    }
}
