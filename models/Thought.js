const { Schema, model } = require('mongoose');

// Schema to create User model
const thoughtSchema = new Schema(
  {
    thoughtText: {
        type: String,
        required: true,
        validate: {
            minLength: 1,
            maxLength: 280
        }
    },
    createdAt: {
        type: Date, 
        default: Date.now,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [
        {
          reactionId: {
            type: Schema.Types.ObjectId,
            default: new Schema.Types.ObjectId, /*FIXME: */
          },
          reactionBody: {
            type: String,
            required: true,
            validate: {
                maxlength: 280
            },
          },
          username: {
            type: String, 
            required: true
          },
          createdAt: {
            type: Date, 
            default: Date.now,
            required: true,
          }
        }
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property 'reactionCount'
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  })

//create a virtual property 'thoughtTimestamp' to get the unformatted createdAt date and set it as formatted date
thoughtSchema
  .virtual('thoughtTimestamp')
  .get(function () {
    return this.createdAt.toDateString
  })
  .set(function (d) {
    const createdAt = d;
    this.set({ createdAt })
  });

// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;