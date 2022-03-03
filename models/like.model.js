const mongoose = require('mongoose');
const Schema = mongoose.Schema

const likeSchema = new Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'project',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, { timestamps: true })

const Like = mongoose.model('Like', likeSchema)
module.exports = Like

