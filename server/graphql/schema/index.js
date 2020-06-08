/* building GraphQL Schema */
module.exports = `
type taskData{
    _id: ID!
    title: String!
    duedate: String!
    label: String!
	status: String!
}

input taskInput{
    title: String!
    duedate: String!
    label: String!
	status: String!
}

type RootQuery {
    taskList: [taskData!]!
}

type DeleteRes{
    response:String!
}
type RootMutation {
    createTask(newTask: taskInput): taskData!
    deleteTask(title: String!): DeleteRes!
}

type Subscription{
    task: taskData!
}

schema {
    query: RootQuery
    mutation: RootMutation
    subscription: Subscription
}
`;
