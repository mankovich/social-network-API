const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
        type: Date, 
        default: Date.now(),
    },
    _username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,
  }
);

// Create a virtual property 'reactionCount' and use getter function to tally all reactions to a given thought upon query
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

//create a virtual property 'thoughtTimestamp' using a getter method to format the createdAt new date on query
thoughtSchema.virtual('thoughtCreated').get(function () { 
    return this.createdAt.toLocaleString('en-US');
  })


// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;