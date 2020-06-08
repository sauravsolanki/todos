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
export {ADD_TASK,GET_ALL_TASK,SUBSCRIPT_TO_TASK,DELETE_TASK};