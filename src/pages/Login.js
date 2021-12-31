import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

import "bootstrap/dist/css/bootstrap.min.css";

import axios from 'axios';

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setemailError] = useState("");
  const history = useHistory();


  const handleValidation = (event) => {
    let formIsValid = true;

    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      formIsValid = false;
      setemailError("Email Not Valid");
      return false;
    } else {
      setemailError("");
      formIsValid = true;
    }

    if (!password.match(/^[a-zA-Z]{8,22}$/)) {
      formIsValid = false;
      setpasswordError(
        "Only Letters and length must best min 8 Chracters"
      );
      return false;
    } else {
      setpasswordError("");
      formIsValid = true;
    }

    return formIsValid;
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    handleValidation();

    if(handleValidation()){
      global.token = email;
      global.auth = true;

      localStorage.setItem("token", global.token);
  
      console.log(global.token+global.auth);
  
      history.push("/home");
    }

    // login();

    if(handleValidation()) {
      axios.post('http://localhost:5000/api/login/', {
        email: email,
        password: password
      }).then(res => {
          console.log("after login success",res.data)
      }).catch(err => {
          console.log("login Error",err.response)
        })
    }

    // console.log(resp);

    // axios.post('http://137.184.54.1:5000/api/login', {
    //   params: {
    //     email: "faizkhan2811997@gmail.com",
    //     password: "FaizKhan"
    //   },
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Accept": "application/json"
    //   }}).then((response) => {
    //   console.log(response.data);
    // });

  //   if(true) {
  //     // login();

      // try {
      //   let response = await fetch('http://137.184.54.1:5000/api/login/', {
      //     method: "POST",
      //     mode: "no-cors",
      //     headers: {
      //       "Content-Type": "application/json",
      //       "Accept": "application/json"
      //     },
      //     body: JSON.stringify({
      //       email: 'faizkhan2811997@gmail.com',
      //       password: 'FaizKhan'
      //     })
      //   })
      //   console.log(response);
      //   let result = response.json();
      //   if (response.ok) {
      //     console.log("login successful");
      //     window.alert("login succesful");
      //   } else {
      //     console.log("login failed");
      //     window.alert("login failed");
      //   }
      // } catch (error) {
      //   console.error(error);
      // }
  // }
  };

  async function login() {
    let item = { email, password };

    console.log(item);

    let resp = await fetch ('http://137.184.54.1:5000/api/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(item)
    })

    resp = await resp.json();
    console.log(resp.ok);
  }

  return (
    <Container className="App">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <Card className="col-md-4" style={{marginTop: '2%'}}>
            <legend>
                <Card.Title style={{marginTop: '1%'}}>Login</Card.Title>
            </legend>
            <form id="loginform">
              <div className="form-group">
                {/* <label>Email address</label> */}
                <input
                  type="email"
                  className="form-control"
                  id="EmailInput"
                  name="EmailInput"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={(event) => setEmail(event.target.value)}
                />
                <small id="emailHelp" className="text-danger form-text">
                  {emailError}
                </small>
              </div>
              <div className="form-group" style={{marginTop: '2%'}}>
                {/* <label>Password</label> */}
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <small id="passworderror" className="text-danger form-text">
                  {passwordError}
                </small>
              </div>
              {/* <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label">Check me out</label>
              </div> */}
              <a href="/home" style={{marginTop: '2%', marginBottom: '2%'}} onClick={loginSubmit} type="submit" className="btn btn-primary">
                Login
              </a>
            </form>
            <a href="/signup" style={{marginBottom: '2%'}}>Signup</a>
          </Card>
        </div>
      </div>
    </Container>
  );
}
export default Login;
