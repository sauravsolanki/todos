const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/* defining users Schema */
const task = new Schema({
    title: {
        type: String
    },
    duedate: {
        type: String
    },
    label: {
        type: String
    },
    status: {
        type: String
    }
});

module.exports = mongoose.model('tasks', task);