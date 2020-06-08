import React, { Component, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const GET_ALL_TASK = gql`
  {
    taskList{
       title
       duedate
       label
       status
     }
  }
`;
const ADD_TASK = gql`mutation($title:String!,$duedate:String!,$label:String!,$status:String!){
  createTask(newTask: {
    title:$title,
    duedate:$duedate,
    label:$label,
    status:$status
  }),
    {
      _id
     }
}`;

const DELETE_TASK = gql`
mutation($title:String!){
  deleteTask(
  title:$title
  ),{
    response
  }
}`;
const SUBSCRIPT_TO_TASK = gql`
  {
    task{
       title
       duedate
       label
       status
     }
  }
`;

function TodoItems() {
  const { loading, error, data } = useQuery(GET_ALL_TASK);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.taskList.map(({ _id, title, duedate, label, status }) => (
    <li key={_id}>
      {title} | dueDate: {duedate} | label: {label} | status: {status}
    </li>
  ));
}

var today = new Date();
var year = today.getFullYear();
var month = today.getMonth() + 1;
if (month < 10)
  month = "0" + month;

var date = today.getDate() + 1;
if (date < 10)
  date = "0" + date;
var today_formatted_date = year + "-" + month + "-" + date;
const initialState = {
  items: [], text: '', dueDate: today_formatted_date, today: today_formatted_date, label: '', status: '', error: ''
};

class AddTask extends React.Component {
  constructor(props) {
    super(props);
    // console.log(today_formatted_date)
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
  }

  reset() {
    this.setState(initialState);
  }

  render() {
    // const [addTask, { data }] = useMutation(ADD_TASK);
    return (
      <div>
        <form onSubmit={e => {
          e.preventDefault();
          if (this.state.text.length === 0) {
            return;
          }

          // send to cloud
          // addTask({ variables: {
          //   title: this.state.text,
          //   duedate: this.state.dueDate,
          //   label:this.state.label,
          //   status:this.state.status
          // } });

          this.reset();
        }}>

          <label htmlFor="new-todo">
            New Tasks
            </label>
          <input
            id="add-todo"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <label> Due Date: </label>
          <input
            type="date"
            id="task_date"
            min={this.state.today}
            onChange={this.handleChange}
            value={this.state.dueDate} />

          <label> label: </label>
          <input
            id="label"
            onChange={this.handleChange}
            value={this.state.label}
          />

          <label> Status: </label>
          <input
            id="status"
            onChange={this.handleChange}
            value={this.state.dueDate}
          />

          <button>
            Add # {this.state.items.length + 1}
          </button>
          {this.state.error}

        </form>
      </div>
    );
  }

  handleChange(evt) {
    const value = evt.target.value;
    this.setState({
      ...this.state,
      [evt.target.name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text.length === 0) {
      return;
    }

    const newTask = {
      text: this.state.text,
      dueDate: this.state.dueDate,
      label: this.state.label,
      status: this.state.status
    }

    // addTask({ variables: newTask });
    // send to cloud
    this.reset();
  }
}

class TodoApp extends React.Component {

  render() {
    return (
      <div>
        <ul>
          <TodoItems />
          <AddTask />
        </ul>
      </div>
    )
  }
}

export default TodoApp;





// var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
// var today  = new Date();
// // var today_formatted_date = today.toLocaleDateString("en-US");
// var today_formatted_date = (today.getFullYear()+1) +"-"+ (today.getMonth()+1) +"-"+ (today.getDate()+1)
// // console.log(today.toLocaleDateString("en-US")); // 9/17/2016
// console.log(today.toLocaleDateString("en-US", options)); // Saturday, September 17, 2016
// console.log(today.toLocaleDateString("hi-IN", options)); // शनिवार, 17 सितंबर 2016

// class CalendarItem extends Component {
//   state = {
//     date: new Date(),
//   }

//   onChange = date => this.setState({ date })

//   render() {
//     return (
//       <div>
//         <Calendar
//           onChange={this.onChange}
//           value={this.state.date}
//         />
//       </div>
//     );
//   }
// }