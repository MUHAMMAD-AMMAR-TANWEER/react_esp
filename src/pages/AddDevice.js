    import React, { Component } from 'react';
    import axios from 'axios';

    import Container from 'react-bootstrap/Container';
    import Button from 'react-bootstrap/Button';
    import Badge from 'react-bootstrap/Badge';

    export default class AddDevice extends Component {

        constructor(props) {
            super(props);
            this.state={
                userToken: '',
                device: ''
            }
        }

        componentDidMount() {
            var token = localStorage.getItem("token");
            this.setState({ userToken: token });
            console.log("token : "+this.state.userToken);
        }

        handleChange = event => {
            this.setState({ device: event.target.value });
          }
        
          handleSubmit = event => {
            event.preventDefault();
        
            const user = {
              Device: this.state.device,
              email: this.state.userToken
            };

            localStorage.setItem("device", user.Device);

            if(user.Device == '') {
                console.log("Enter Device");
                alert("Enter Device");
            }
            else if(user.email == '') {
                console.log("Please Login First");
                alert("Please Login First");
            }
            else {
                axios.post(`http://137.184.54.1:5000/api/addDevice/`, { user })
                .then(res => {
                    if(res.status == 200) {
                        console.log("Signup Successful");
                        alert("Signup Successful");
                    }
                    else {
                        alert("Signup Failed");
                    }
                  console.log(res);
                  console.log(res.data);
                })
            }
          }

        render() {
            return (
                <Container>
                    <h3><Badge bg="secondary">Add Device</Badge></h3>

                    <form onSubmit={this.handleSubmit}>
                        <div style={{marginTop: '4%'}}>
                            <input type="text" name="name" onChange={this.handleChange} placeholder="input your ssid" />
                        </div>

                        <div style={{marginTop: '2%'}}>
                            <Button type="submit" variant="primary">Add</Button>
                        </div>
                    </form>
                </Container>
            )
        }
    }
