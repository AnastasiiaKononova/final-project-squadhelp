const ws = require('../socketInit');
const userQueries = require('./queries/userQueries');
const messageQueries = require('./queries/messageQueries');
const conversationQueries = require('./queries/conversationQueries');
const { getSortedParticipants, getInterlocutorId, formatUser, buildPreview } = require('../utils/chatUtils');

module.exports.addMessage = async (req, res, next) => {
  try {
    const { userId } = req.tokenData;
    const { recipient, messageBody, interlocutor: interlocutorFromClient } = req.body;

    const participants = getSortedParticipants(userId, recipient);

    const conversation = await conversationQueries.findOrCreateConversation(participants);

    const message = await messageQueries.createMessage({
      sender: userId,
      body: messageBody,
      conversation: conversation._id,
    });

    const messageForSend = {
      ...message.toObject(),
      participants,
    };

    const interlocutorId = getInterlocutorId(participants, userId);

    const senderInfo = {
      id: userId,
      firstName: req.tokenData.firstName,
      lastName: req.tokenData.lastName,
      displayName: req.tokenData.displayName,
      avatar: req.tokenData.avatar,
      email: req.tokenData.email,
    };

    const previewForInterlocutor = buildPreview({
      conversation,
      userId,
      messageBody,
      messageCreatedAt: message.createdAt,
      participants,
      interlocutorData: senderInfo,
    });

    const previewForSender = buildPreview({
      conversation,
      userId,
      messageBody,
      messageCreatedAt: message.createdAt,
      participants,
      interlocutorData: interlocutorFromClient,
    });

    ws.getChatController().emitNewMessage(interlocutorId, {
      message: messageForSend,
      preview: previewForInterlocutor,
    });

    res.status(200).send({
      message: messageForSend,
      preview: previewForSender,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getChat = async (req, res, next) => {
  try {
    const { userId } = req.tokenData;
    const interlocutorId = Number(req.params.interlocutorId);

    const participants = getSortedParticipants(userId, interlocutorId);

    const messages = await messageQueries.getMessagesByParticipants(participants);

    const interlocutor = await userQueries.findUser({ id: interlocutorId });

    res.status(200).send({
      messages,
      interlocutor: formatUser(interlocutor),
    });
  } catch (err) {
    next (err);
  }
};

module.exports.getPreview = async (req, res, next) => {
  try {
    const userId = req.tokenData.userId;

    const conversations = await messageQueries.getLastMessagesByUser(userId);

    const interlocutors = conversations.map(conv =>
      getInterlocutorId(conv.participants, userId),
    );

    const senders = await userQueries.getUsersByIds(interlocutors);

    conversations.forEach((conv) => {
      const sender = senders.find(s => conv.participants.includes(s.dataValues.id));
      if (sender) {
        conv.interlocutor = formatUser(sender.dataValues);
      }
    });

    res.status(200).send(conversations);
  } catch (err) {
    next (err);
  }
};

module.exports.blackList = async (req, res, next) => {
  try {
    const { participants, blackListFlag } = req.body;
    const userId = req.tokenData.userId;

    const chat = await conversationQueries.updateConversationFlag(participants, userId, 'blackList', blackListFlag);

    const interlocutorId = getInterlocutorId(participants, userId);
    ws.getChatController().emitChangeBlockStatus(interlocutorId, chat);

    res.status(200).send(chat);
  } catch (err) {
    next (err);
  }
};

module.exports.favoriteChat = async (req, res, next) => {
  try {
    const { participants, favoriteFlag } = req.body;
    const userId = req.tokenData.userId;

    const chat = await conversationQueries.updateConversationFlag(participants, userId, 'favoriteList', favoriteFlag);

    res.status(200).send(chat);
  } catch (err) {
    next(err);
  }
};


