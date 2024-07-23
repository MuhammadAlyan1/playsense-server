const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  // sorted profile ids
  conversationId: 'string',
  profiles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]
});

module.exports = mongoose.model('Conversation', conversationSchema);
