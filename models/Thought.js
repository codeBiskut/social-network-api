const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId:{
      type:Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody:{  
      type: String,
      required: 'Reaction must have content',
      maxLength: 280
    },
    username:{
      type: String,
      required: 'Reaction must originate from someone'
    },
    createdAt:{
      type: Date,
      default: Date.now
      // get the date and format it
      // Use a getter method to format the timestamp on query
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
)

// Schema to create thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type:String,
      required: 'Thought must have content',
      minLength: 1,
      maxLength: 280
    },
    createdAt: {
      type:Date,
      default: Date.now,
      // need to get the date somehow and format it
      // Use a getter method to format the timestamp on query
    },
    username: {
      type:String,
      required: 'Thought must originate from someone'
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    },
    id:false
  }
)



// virtual for reaction count
thoughtSchema.virtual('reactionCount').get(function(){
  return this.reactions.length
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;