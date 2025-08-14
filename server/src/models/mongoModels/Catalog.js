const { model, Schema } = require('mongoose');

const catalogSchema = new Schema({
  userId: {
    type: Number,
    required: true,
  },
  catalogName: {
    type: String,
    required: true,
  },
  chats: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Conversation',
    },
  ],
});

const Catalog = model('Catalog', catalogSchema);
module.exports = Catalog;


