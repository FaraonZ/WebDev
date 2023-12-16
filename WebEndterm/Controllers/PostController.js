import mongoose

const mongoose= require("mongoose")

const Posts = require("../Models/PostModel")

// Middleware for JWT authorization
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.sendStatus(401);
  
    jwt.verify(token, 'super-secure-secret-key', (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
};

//function declaration
const login = async(req, res) => {
    try {
        const { username, password } = req.body;

        if (username === 'exampleuser' && password === 'examplepassword') {
            const user = { name: username };
            const accessToken = jwt.sign(user, 'super-secure-secret-key', { expiresIn: '30m' });
            res.json({ accessToken: accessToken });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch(error) {
        res.status(400).json({"error":error});
    }
}

const getPosts = async(req, res) => {
    try {
        const posts = await Posts.find();
        res.status(200).json(posts);
    } catch(error) {
        res.status(400).json({"error":error});
    }
}

const createPost = async (req,res) => {
    const post = new Post({
        title: req.body.title,
        text: req.body.text,
        author: req.user.name,
      });

    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch(e) {
        console.log(e);
    }
}

const getPost = async(req, res) => {
    const {id} = req.params;
    try {
        const post = await Posts.findById(id);
        res.status(200).json(post);
    } catch(error) {
        res.status(400).json({"error":error});
    }
}

const deletePost = async(req, res) => {
    const {id} = req.params;
    try {
        const post = await Post.findByIdAndDelete(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post)
    } catch(error) {
        res.status(400).json({"error":"Couldn't delete the post"});
    }
}

const updatePost = async(req, res) => {
    const {id} = req.params;
    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        post.title = req.body.title || post.title;
        post.text = req.body.text || post.text;

        const updatedPost = await post.save();
        res.json(updatedPost);
    } catch {
        res.status(400).json({"error":"Couldn't udpate the post"});
    }
}



//export the function to be import on routes
module.exports={
    getPosts,
    createPost,
    getPost,
    deletePost,
    updatePost
}