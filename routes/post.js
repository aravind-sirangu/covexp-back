const express = require('express')
const { getPosts, createPost, postsByUser, postById, deletePost, isPoster, updatePost, postPhoto, singlePost, like, unlike, comment, uncomment, updateComment } = require('../controllers/post')
const { requireSignin } = require('../controllers/auth')
const { userById } = require('../controllers/user')
const router = express.Router()
const { createPostValidator } = require("../validator")

router.get('/posts', getPosts)

//like
router.put("/post/like", requireSignin, like);
router.put("/post/unlike", requireSignin, unlike);

//comments
router.put("/post/comment", requireSignin, comment)
router.put("/post/uncomment", requireSignin, uncomment)
router.put('/post/updatecomment', requireSignin, updateComment);



router.post('/post/new/:userId', requireSignin, createPost)
router.get('/posts/by/:userId', requireSignin, postsByUser)
router.get('/post/:postId', singlePost);
router.put('/post/:postId', requireSignin, isPoster, updatePost)
router.delete('/post/:postId', requireSignin, isPoster, deletePost)

// photo
router.get("/post/photo/:postId", postPhoto);

//any route containing userID , then this will be executed first
router.param("userId", userById)

//any route containing postID , then this will be executed first
router.param("postId", postById)

module.exports = router