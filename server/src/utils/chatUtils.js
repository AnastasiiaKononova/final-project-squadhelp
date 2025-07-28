const Conversation = require('../models/mongoModels/conversation');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');

function getSortedParticipants(userId, interlocutorId) {
  return [userId, interlocutorId].sort((a, b) => a - b);
}

function getInterlocutorId(participants, userId) {
  return participants.find(p => p !==userId);
}

function formatUser(user) {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    displayName: user.displayName,
    avatar: user.avatar,
  };
}

async function updateConversationFlag(participants, userId, listName, flag) {
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
}

function buildPreview({ conversation, userId, messageBody, messageCreatedAt, participants, interlocutorData }) {
  return {
    _id: conversation._id,
    sender: userId,
    text: messageBody,
    createAt: messageCreatedAt,
    participants,
    blackList: conversation.blackList,
    favoriteList: conversation.favoriteList,
    interlocutor: interlocutorData,
  };
}

module.exports = {
  getSortedParticipants,
  getInterlocutorId,
  formatUser,
  updateConversationFlag,
  buildPreview,
};
