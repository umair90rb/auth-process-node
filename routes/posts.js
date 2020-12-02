const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const _ = require('lodash');
const {Post, validate, validateComment, validateReply} = require('../models/post');
const express = require('express');
const router = express.Router();

router.get('/:page/:size', auth, async (req, res) => {
  
        page = parseInt(req.params.page);
        size = parseInt(req.params.size);
        const post = await Post.find()
                                .populate('user', 'email location -_id')
                                .skip((page - 1) * size)
                                .limit(size)
                                .select('-__v');
        res.send(post);
    
});


router.get('/:id', auth, async (req, res) => {
    
        const post = await Post.findById(req.params.id).populate('user', 'email location -_id');
        res.send(post);
   
});

router.post('/', auth, async (req, res) => {
    
    p = _.pick(req.body, ['body', 'image']);
    p.user = req.user._id;
    const { error } = validate(p);
    if(error) return res.status(400).send(error.details[0].message);
    // console.log(msg);
    post = new Post(p);
    
    await post.save();

    res.send(post);

});

router.put('/:id', auth, async (req, res) => {

    
    p = _.pick(req.body, ['body', 'image']);
    p.user = req.user._id;

    const result = await Post.update({ _id: req.params.id}, p);
    
    // const post = await Post.findById(req.params.id);
    // if(!post) return res.status(404).send('Document not found!');

    // const { error } = validate(p);
    // if(error) return res.status(400).send(error.details[0].message);
    // console.log(p);
    
    // post.set(p);
    
    // await post.save();
    console.log(result);
    if(!result.nModified) return res.send('Document updated failed.');
    
    res.send('Document updated.');

});

router.put('/:post/comments', auth, async (req, res) => {
    
    c = _.pick(req.body, 'body');
    c.user = req.user._id;

    const { error } = validateComment(c);
    if(error) return res.status(400).send(error.details[0].message);

    const post = await Post.findById(req.params.post);
    if(!post) return res.status(404).send('Document not found!');
 
    post.comments.push(c);
    
    await post.save();

    res.send(post);

});

router.put('/:post/:comment/replies', auth, async (req, res) => {
    
    r = _.pick(req.body, 'body');
    r.user = req.user._id;

    const { error } = validateReply(r);
    if(error) return res.status(400).send(error.details[0].message);

    const post = await Post.findById(req.params.post);
    if(!post) return res.status(404).send('Document not found!');

    const comment = await post.comments.id(req.params.comment);
    if(!comment) return res.status(404).send('Comment not found!');
    
    comment.replies.push(r);
    
    await post.save();

    res.send(post);

});

router.delete('/:id', [auth, admin], async (req, res) => {

    const result = await Post.deleteOne({_id:req.params.id});
    if(result.n && result.ok) return res.send('Document deleted.');

    res.send('Something wrong.');

});

module.exports = router;