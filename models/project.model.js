const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  images: {
    type: [String],
   /*  required: [true, 'At least one image is required'] */
  },
  description: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    enum: ["javascript", "node", "mongoDb", "express", "typescript", "go", "ruby", "python", "c", "c++", "java" ],
/*     required: true */
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
/*     required: true, */
  },
}, { timestamps: true })

projectSchema.virtual('comments', {
  ref: "Comment",
  localField: "_id",
  foreignField: "project",
  justOne: false
})

const Project = mongoose.model('Project', projectSchema)
module.exports = Project
