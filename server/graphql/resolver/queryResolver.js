const taskModels = require('../../model/users');

module.exports = {
    RootQuery: {
        taskList: async() => {
            try {
                const gettask = await taskModels.find();
                return gettask;
            } catch (error) {
                return error;
            }
        }
    }
}