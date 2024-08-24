const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: { 
            type: Schema.Types.ObjectId
            // default: () => new Types.ObjectId(), 
        },
        reactionBody: {
            type: String,
            required: true,
            minLength: 1,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true
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
