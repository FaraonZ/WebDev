import express

const express = require("express");
const {login, getPosts, createPost, getPost, deletePost, updatePost} = require("../Controllers/PostController");

const router = express.Router();

//Routes
router.get("/test", (req,res)=>{
    res.status(200).json({"message":"Hello World"})   //Basic testing function
})

router.login("/", login)

router.get("/", getPosts) 

router.post("/", createPost);         

router.get("/:id", getPost);

router.delete("/:id", deletePost);

router.put("/:id",updatePost);


module.exports = router