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
  buildPreview,
};
