const yup = require('yup');

module.exports.messageSchema = yup.object().shape({
  recipient: yup.number().required('Recipient is required'),
  messageBody: yup.string().trim().min(1, 'Message body cannot be empty').required('Message body is required'),
  interlocutor: yup.object().notRequired(),
});
