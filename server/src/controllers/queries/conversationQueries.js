const { Conversation } = require('../../models/mongoModels');
const BadRequestError = require('../../errors/BadRequestError');
const NotFoundError = require('../../errors/NotFoundError');

module.exports.findOrCreateConversation = async function (participants) {
  return await Conversation.findOneAndUpdate(
    { participants },
    { participants, blackList: [false, false], favoriteList: [false, false] },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
      useFindAndModify: false,
    },
  );
};

module.exports.updateConversationFlag = async function (participants, userId, listName, flag) {
  const userIndex = participants.indexOf(userId);
  if (userIndex === -1) {
    throw new BadRequestError('Invalid user in participants');
  }
  const predicate = `${listName}.${userIndex}`;
  const chat = await Conversation.findOneAndUpdate(
    { participants },
    { $set: { [predicate]: flag } },
    { new: true },
  );
  if (!chat) {
    throw new NotFoundError('Conversation not found');
  }
  return chat;
};
