const { pubsub } = require('../helper');
module.exports = {
    Subscription: {
        task: {
            subscribe(parent, args, ctx, info) {
                return pubsub.asyncIterator('taskTopic') //Topic
            }
        }
    }
}