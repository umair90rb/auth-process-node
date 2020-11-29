const Joi = require('joi');
const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    body:{
        required: true,
        type: String
    },
    user:{
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const commentSchema = new mongoose.Schema({
    body:{
        required: true,
        type: String
    },
    replies:{
        type: [replySchema]
    },
    user:{
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const postSchema = new mongoose.Schema({
    body:{
        type: String,
        required: true
    },
    image:{
        type: String,
    },
    user:{
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments:{
        type: [commentSchema],
    }
});

const Post = mongoose.model('Post', postSchema);

function validatePost(post) {
    const schema = {
        body: Joi.string().required(),
        image: Joi.string(),    
        user: Joi.objectId().required()
    };

    return Joi.validate(post, schema);
}

function validateComment(comment) {
    const schema = {
        body: Joi.string().required(),
        replies: Joi.string(),
        user: Joi.objectId().required()
    };

    return Joi.validate(comment, schema);
}

function validateReply(reply) {
    const schema = {
        body: Joi.string().required(),
        user: Joi.objectId().required()
    };

    return Joi.validate(reply, schema);
}

exports.Post = Post;
exports.validate = validatePost;
exports.validateComment = validateComment;
exports.validateReply = validateReply;