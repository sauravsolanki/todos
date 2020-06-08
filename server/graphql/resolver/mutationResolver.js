const taskModels = require('../../model/users');
const { pubsub } = require('../helper');
// const LRU = require("lru-cache");
// var ObjectID = require("bson-objectid");

// const cache = LRU({ max: 50, maxAge: 1000 * 60 * 60 });


module.exports = {
    RootMutation: {
        createTask: async(parent, args, ctx, info) => {
            try {
                console.log(' Task creation ===============> ', args);
                let query = { 'title': args.newTask.title };
                const createTaskDetails = await taskModels.findOneAndUpdate(query, args.newTask, { upsert: true, new: true });
                console.log('Task created ===============> ', createTaskDetails);
                pubsub.publish('taskTopic', {
                    task: createTaskDetails
                });
                return createTaskDetails;
            } catch (error) {
                return error;
            }
        },
        deleteTask: async(parent, args, ctx, info) => {
            let responseMSG = {};
            try {
                let query = { 'title': args.title };
                const deleteTaskDetails = await taskModels.findOneAndDelete(query);
                console.log('deleteTaskDetails ===============> ', deleteTaskDetails);
                if (deleteTaskDetails == null) {
                    responseMSG.response = "No User found for this opertaion";
                    return responseMSG;
                } else {
                    responseMSG.response = "Success";
                    return responseMSG;
                }

            } catch (error) {
                responseMSG.response = "Fail";
                return responseMSG;
            }
        }
    }
}