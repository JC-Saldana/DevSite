const mongoose = require('mongoose');
const Schema = mongoose.Schema

const commentSchema = new Schema ({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }, 
    comment :{
        type: String
    }
}, {timestamps: true})

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment