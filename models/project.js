const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  images: {
    type: [String],
    required: [true, 'At leeast one image is required']
  },
  description: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  skills: {
    type: [String],
    enum: ["JavaScript", "Node", "MongoDb", "Express"],
    required: true
  }
}, { timestamps: true })

const Project = mongoose.model('Project', projectSchema)
module.exports = Project
