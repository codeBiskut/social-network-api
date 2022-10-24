const { Schema, model } = require('mongoose');

// Schema to create a new user model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: 'Username is required',
      trim: true
    },
    email: {
      type: string,
      required: 'Valid email address is required',
      unique: true,
      validate: {
        // validate the email somehow
      }
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
)

// friendCount virtual
userSchema.virtual('friendCount').get(function(){
  return this.friends.length
})

const User = model('User', userSchema);

module.exports = User;