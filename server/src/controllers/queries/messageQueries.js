const { Message } = require('../../models/mongoModels');

module.exports.getMessagesByParticipants = async function (participants) {
  return Message.aggregate([
    {
      $lookup: {
        from: 'conversations',
        localField: 'conversation',
        foreignField: '_id',
        as: 'conversationData',
      },
    },
    {
      $match: {
        'conversationData.participants': { $all: participants },
      },
    },
    { $sort: { createdAt: 1 } },
    {
      $project: {
        '_id': 1,
        'sender': 1,
        'body': 1,
        'conversation': 1,
        'createdAt': 1,
        'updatedAt': 1,
      },
    },
  ]);
};

module.exports.getLastMessagesByUser = async function (userId) {
  return Message.aggregate([
    {
      $lookup: {
        from: 'conversations',
        localField: 'conversation',
        foreignField: '_id',
        as: 'conversationData',
      },
    },
    { $unwind: '$conversationData' },
    { $match: { 'conversationData.participants': userId } },
    { $sort: { createdAt: -1 } },
    {
      $group: {
        _id: '$conversationData._id',
        sender: { $first: '$sender' },
        text: { $first: '$body' },
        createAt: { $first: '$createdAt' },
        participants: { $first: '$conversationData.participants' },
        blackList: { $first: '$conversationData.blackList' },
        favoriteList: { $first: '$conversationData.favoriteList' },
      },
    },
  ]);
};

module.exports.createMessage = async function ({ sender, body, conversation }) {
  const message = new Message({
    sender,
    body,
    conversation,
  });
  return await message.save();
};
