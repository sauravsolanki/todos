import React, { useState } from "react";

import { signInWithGoogle, auth } from "../firebase";
import { Link } from "@reach/router";
import { Button, Form, Container, Card, Row, Col, Alert } from 'react-bootstrap';

function AlertDismissible(props) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        {props.error}
      </Alert>
    );
  }
}

const SignIn = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).then(
      localStorage.setItem('userloggedin', true)
    ).catch(error => {
      setError("Error signing in with password and email!");
      console.error("Error signing in with password and email", error);
      localStorage.removeItem('userloggedin');
    });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === 'userEmail') {
      setEmail(value);
    }
    else if (name === 'userPassword') {
      setPassword(value);
    }
  };

  return (
    <>
    {error !== null && <AlertDismissible error={error}/>}
      <Container style={{ marginTop: 5 }}>
        {error !== null && <AlertDismissible error={error}/>}
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Card style={{ width: '28rem', boxShadow: "3px 3px 3px 3px #9E9E9E" }}>
              <Card.Header>
                Please Login with your email and password.
              </Card.Header>
              <Card.Img variant="left" style={{ width: "50%", height: "3%", alignSelf: "center" }} src="https://us.123rf.com/450wm/tvectoricons/tvectoricons1808/tvectoricons180807789/107679826-login-vector-icon-isolated-on-transparent-background-login-logo-concept.jpg?ver=6" />
              <Card.Body>

         
                  <Form>
                    <Container fluid>

                      <Form.Group as={Row} controlId="formBasicEmail">
                        <Form.Label column sm="4">Email address</Form.Label>
                        <Col sm="8">
                          <Form.Control type="email" value={email} name="userEmail" placeholder="Enter email" onChange={(event) => onChangeHandler(event)} />
                          <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row} controlId="formBasicPassword">
                        <Form.Label column sm="4">Password</Form.Label>
                        <Col sm="8">
                          <Form.Control type="password" value={password} name="userPassword" placeholder="Password" onChange={(event) => onChangeHandler(event)} />
                        </Col>
                      </Form.Group>

                      <Button variant="primary" size="sm" block type="submit" onClick={(event) => { signInWithEmailAndPasswordHandler(event, email, password) }}>Submit</Button>
                        
                        <br/>
                      or
                        <hr/>
                        
                        <Button variant="primary" size="sm" block onClick={() => { signInWithGoogle(props); }}>Sign in with Google</Button>
                
                      </Container>
                  </Form>
              </Card.Body>

              <Card.Footer>
                <Container fluid>
                  <Row>
                  <Col xs={6}>
                    <Link to="passwordReset">Forgot Password?</Link>
                    </Col>
                    <Col xs={6}>
                    Don't have an account?{" "}
                  <Link to="signUp" >Sign up here</Link>
                    </Col>
                  
                  </Row>
                </Container>
              </Card.Footer>
            </Card>
          </Col>
          
        </Row>
      </Container>

    </>
  )
  return (
    <div>
      <h1 >Sign In</h1>
      <div >
        {error !== null && <div className="py-4 bg-red-600 w-full text-white text-center mb-3">{error}</div>}
        <form>
          <label htmlFor="userEmail" className="block">
            Email:
          </label>
          <input
            type="email"
            className="my-1 p-1 w-full"
            name="userEmail"
            value={email}
            placeholder="E.g: faruq123@gmail.com"
            id="userEmail"
            onChange={(event) => onChangeHandler(event)}
          />
          <label htmlFor="userPassword" className="block">
            Password:
          </label>
          <input
            type="password"
            className="mt-1 mb-3 p-1 w-full"
            name="userPassword"
            value={password}
            placeholder="Your Password"
            id="userPassword"
            onChange={(event) => onChangeHandler(event)}
          />
          <button className="bg-green-400 hover:bg-green-500 w-full py-2 text-white" onClick={(event) => { signInWithEmailAndPasswordHandler(event, email, password) }}>
            Sign in
          </button>
        </form>
        <p className="text-center my-3">or</p>
        <button
          className="bg-red-500 hover:bg-red-600 w-full py-2 text-white"
          onClick={() => {
            signInWithGoogle(props);
          }}
        >
          Sign in with Google
        </button>
        <p className="text-center my-3">
          Don't have an account?{" "}
          <Link to="signUp" className="text-blue-500 hover:text-blue-600">
            Sign up here
          </Link>{" "}
          <br />{" "}
          <Link to="passwordReset" className="text-blue-500 hover:text-blue-600">
            Forgot Password?
          </Link>
        </p>
      </div>
      <hr></hr>



    </div>
  );
};

export default SignIn;
