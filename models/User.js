const { Schema, model } = require('mongoose');
const emailRegex = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: emailRegex,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Create a virtual property `fullName` with a getter function that ______ TODO: or FIXME:
userSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends.length;
  })
  // Setter to set the first and last name
//   .set(function (v) {
//     const first = v.split(' ')[0];
//     const last = v.split(' ')[1];
//     this.set({ first, last });
//   });


// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
