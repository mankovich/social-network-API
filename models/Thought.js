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
        default: Date.now,
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
thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    console.log(`===============\n\nI'm hoping this attempt to count the reachtions worked: ${this.reactions.length}.\n\n===============`)
    return this.reactions.length;
  })
  .set(function (count) {
    const reactionCount = count;
    this.set({ reactionCount }) /* I have no clue if this is anywhere close to correct */
  })

//create a virtual property 'thoughtTimestamp' using a getter method to format the createdAt new date on query
thoughtSchema
  .virtual('thoughtTimestamp')
  .get(function () {
    console.log(`===============\n\nI'm hoping this attempt to format the timestamp works: ${this.createdAt.toLocaleString('en-US')}.\n\n===============`)
    
    return this.createdAt.toLocaleString('en-US');
  })
  .set(function (t) {
    const timestamp = t;
    this.set({ createdAt: timestamp }); /* DITTO: no clue if this is even approaching what I'm supposed to do */
  });

// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;