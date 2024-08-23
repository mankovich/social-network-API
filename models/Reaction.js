const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        // reactionId: { /* WHY do I need this prop at all????? doesn't mongoose set the _id automatically anyway?*/
            // type: Schema.Types.ObjectId,
            // default: () => new Types.ObjectId(), /* why would I even need to set this default like this */
        // },
        reactionBody: {
            type: String,
            // required: true,
            minLength: 1,
            maxlength: 280,
        },
        username: {
            type: String,
            // required: true
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false,
    }
);

reactionSchema.virtual('reactionCreated').get(function () {
        return this.createdAt.toLocaleString('en-US');
    })

module.exports = reactionSchema;
