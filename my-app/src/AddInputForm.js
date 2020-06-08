import React, { useContext, useState, useEffect, useRef } from 'react';
import 'react-calendar/dist/Calendar.css';
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import { GET_ALL_TASK, ADD_TASK, DELETE_TASK } from './gql-query'
import { labelList, statusList } from "./constant"
import "./index.css"

import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';

// import { Router } from "@reach/router";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import ProfilePage from "./Components/ProfilePage";
import { UserContext } from "./providers/UserProvider";
import PasswordReset from "./Components/PasswordReset";
import { Router } from "@reach/router";
import { Container, Alert, Row, Col, ListGroup, Button, Form } from 'react-bootstrap';


function getTodayFormattedDate() {
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth() + 1;
  if (month < 10)
    month = "0" + month;

  var date = today.getDate();
  if (date < 10)
    date = "0" + date;

  return "" + year + "-" + month + "-" + date;
}
var today_formatted_date = getTodayFormattedDate();

function SyncingSpiner(params) {
  return (
    <Spinner animation="border" role="status">
      <span className="sr-only"></span>
    </Spinner>
  )
}
function TaskItem(props) {
  const [title, setTitle] = useState(props.title)
  const [duedate, setDuedate] = useState(props.duedate)
  const [status, setStatus] = useState(props.status)
  const [label, setLabel] = useState(props.label)
  const [buttonClick, setButtonClick] = useState(1);

  return (
    <Container fluid style={{ padding: 0 }}>
      <Form style={{ padding: 0 }} onSubmit={e => {
        e.preventDefault();
        if (buttonClick == 1) {
          let newtask = { title: title, duedate: duedate, label: label, status: status };
          if (props.type == "New") {
            props.addTodo(newtask);
          } else {
            props.updateTodo(props.index, newtask);
          }

        } else {
          props.deleteTodo(props.index)
        }
      }}>
        <Row style={{ width: "100%" }}>
          <Col xs={3} style={{ padding:"15,10"}}> 
            <Form.Group controlId="form.task">
              <Form.Control placeholder="enter a new task ... " value={title} type="text" onChange={(e) => { setTitle(e.target.value) }} />
            </Form.Group>
          </Col>

          <Col xs={3}>
            <Form.Group controlId="form.duedate">
              <Form.Control placeholder="DueDate" onChange={(e) => { setDuedate(e.target.value) }} type="date" value={duedate} />
            </Form.Group>
          </Col>

          <Col xs={2}>
            <Form.Group controlId="form.label">
              <Form.Control as="select" value={label}
                onChange={e => {
                  setLabel("" + e.target.value);
                }}>
                {labelList.map(label => (
                  <option key={label.id} value={label.name}>
                    {label.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>

          <Col xs={2}>
            <Form.Group controlId="form.status">
              <Form.Control as="select" value={status}
                onChange={e => {
                  setStatus(e.target.value)
                }}>
                {statusList.map(status => (
                  <option key={status.id} value={status.name}>
                    {status.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>

          <Col xs={2}>
            <Row >
              <Button block={props.type != "Update"} style={{ marginRight: 2 }} type="submit" variant="primary" size="sm" id="add_or_update" onClick={() => { setButtonClick(1) }}>
                {props.type}
              </Button>

              <br />
              {props.type == "Update" ?
                <Button variant="primary" size="sm" type="submit" id="delete" onClick={() => { setButtonClick(2) }}> Delete </Button> : <></>}
            </Row>
          </Col>
        </Row>
      </Form>
    </Container>
  )
}


function TaskLists(props) {

  if (props.searchText != "" && props.tosearch) {
    const filtered_todos = props.todos.filter(({ _id, title, duedate, label, status}) => (title.toLowerCase()).search(props.searchText.toLowerCase())>=0 )
    console.log(filtered_todos)
    
    return filtered_todos.map(({ _id, title, duedate, label, status }, index) => {
      return (
        <Col xs={12} key={index} style={{ padding: 0 }}>
          <ListGroup.Item style={{ padding: 0, borderWidth: 0 }}>
            <TaskItem title={title} duedate={duedate} label={label} status={status} index={index} type={"Update"} updateTodo={props.updateTodo} deleteTodo={props.deleteTodo} />
          </ListGroup.Item>
        </Col>
  
      );
    });
    
  }
  else{
    return props.todos.map(({ _id, title, duedate, label, status }, index) => {
      return (
        <Col xs={12} key={index} style={{ padding: 0,marginBottom:5}}>
          <ListGroup.Item style={{ padding:0, borderWidth: 0, borderRadius:10,boxShadow: "3px 3px 3px 3px #9E9E9E" }}>
            <TaskItem title={title} duedate={duedate} label={label} status={status} index={index} type={"Update"} updateTodo={props.updateTodo} deleteTodo={props.deleteTodo} />
          </ListGroup.Item>
        </Col>
  
      );
    });
  }

  
}

const testtask1 = { title: "Sample Todo 1", duedate: today_formatted_date, label: "String", status: "String" }
const testtask2 = { title: "Sample Todo 2", duedate: "2020-05-10", label: "String", status: "String" }
const testtask3 = { title: "Sample Todo 3", duedate: "2020-05-10", label: "String", status: "String" }



//using React Hook
function TodoApp() {

  const { loading, error, data, refetch, networkStatus } = useQuery(GET_ALL_TASK, { notifyOnNetworkStatusChange: true, });
  const [addTask, { loading: updateLoading, data: dataAfterUpdate }] = useMutation(ADD_TASK);
  const [deleteTask, { loading: deleteLoading, data: dataAfterDeletion }] = useMutation(DELETE_TASK);

  const user = useContext(UserContext);
  const isUserLoggedIn = localStorage.getItem('userloggedin');

  const [searchText, setSearchText] = useState('')
  const [tosearch,setToSearch] = useState(false)

  function searchTask(e) {
    if (e.key == 'Enter' && e.target.value != '') {
      console.log("start searching..");
      setToSearch(true);
    }else if(e.target.value == ''){
      setToSearch(false);
    }
  }

  // every item has {title:String,duedate:Date,label:String!,status:String!}
  const [todos, setTodos] = useState([])
  useEffect(() => {
    // console.log("isUserLoggedIn");
    // console.log(isUserLoggedIn);
    // console.log("use effect called");
  }, [todos]);//only rerun if todos changes

  // if (networkStatus === 4) return 'Refetching!';
  if (loading) return <p><Spinner /> Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (data && data.taskList != todos) {
    // console.log("updating todos");
    setTodos(data.taskList)
  }

  function updateTodo(idx, modifiedTask) {
    //update in server and then update state
    // const newArray = [...todos];
    // let itemsToUpdated = newArray[idx];
    // newArray[idx] = modifiedTask;
    // setTodos(newArray);

    addTask({ variables: modifiedTask }).then(() => {
      refetch();
    })

  }

  function addTodo(task) {
    //add in server and then update state
    addTask({ variables: task }).then(() => {
      refetch();
    })
  }

  function deleteTodo(idx) {
    let title = [...todos][idx]["title"];
    deleteTask({ variables: { title: title } }).then(() => {
      refetch();
    });

    // const newArray = [...todos]
    // let itemsToDelete = newArray[idx];
    // newArray.splice(idx, 1);
    // setTodos(newArray);
  }


  return (
    (isUserLoggedIn)
      ?
      <Container fluid>
        {(networkStatus == 4 || updateLoading || deleteLoading || loading) && <SyncingSpiner style={{ float: "right" }} />}
        <Row className="justify-content-md-center">
          <Col xs={12}>
            <h1>Todo Task</h1>
          </Col>
        </Row>

        <Row>
          <Col className="justify-content-md-center" xs={8} style={{ marginBottom: 10 }}>
            <Form.Control xs={12} style={{ width: "100%" }} placeholder="search task ..." value={searchText} onChange={(e) => setSearchText(e.target.value)} onKeyDown={searchTask} type="text" />
          </Col>
        </Row>

        <Row>
          <Col xs={8}>
            <Container fluid>
              <Row>
                <Col xs={12} style={{ width: '100%', border: "none" }}>
                  <ListGroup variant="flush" style={{ width: '100%', border: "none" }}>
                    <TaskLists updateTodo={updateTodo} deleteTodo={deleteTodo} todos={todos} searchText={searchText} tosearch={tosearch} />
                  </ListGroup>
                </Col>
              </Row>

              <Row className="justify-content-md-center">

                <Col xs={12}>
                  <h3>Add Task:</h3>
                  <TaskItem type={"New"} addTodo={addTodo} duedate={today_formatted_date} />
                </Col>
              </Row>
            </Container>
          </Col>

          <Col xs={4}>
            <center>
              <ProfilePage />
            </center>
          </Col>

        </Row>

      </Container>


      :
      <Router>
        {console.log(user)}
        <SignUp path="signUp" />
        <SignIn path="/" />
        <PasswordReset path="passwordReset" />
      </Router>

  )
}


export default TodoApp;