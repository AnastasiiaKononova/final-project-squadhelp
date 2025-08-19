const { model, Schema } = require('mongoose');

const messageSchema = new Schema({
  sender: {
    type: Number,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  conversation: {
    type: Schema.Types.ObjectId,
    required: true,
  },
},
{
  timestamps: true,
});

const Message = model('Message', messageSchema);

module.exports = Message;
