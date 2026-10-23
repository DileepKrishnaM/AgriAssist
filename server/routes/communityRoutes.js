const express = require("express");

const {
    createPost,
    getPosts,
    likePost,
    unlikePost,
    deletePost,
    updatePost,
} = require("../controllers/communityController");
const {
    createComment,
    getComments,
    likeComment,
    unlikeComment,
     deleteComment,
      updateComment,
} = require("../controllers/communityCommentController");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/posts", protect, upload.single("media"), createPost);

router.get("/posts", protect, getPosts);
router.post("/posts/:postId/like", protect, likePost);

router.post("/posts/:postId/unlike", protect, unlikePost);
// Add comment
router.post(
    "/posts/:postId/comments",
    protect,
    createComment
);

// Get comments
router.get(
    "/posts/:postId/comments",
    protect,
    getComments
);
router.post(
    "/comments/:commentId/like",
    protect,
    likeComment
);

// Unlike comment/reply
router.post(
    "/comments/:commentId/unlike",
    protect,
    unlikeComment
);
// Delete own post
router.delete(
    "/posts/:postId",
    protect,
    deletePost
);

// Delete own comment/reply
router.delete(
    "/comments/:commentId",
    protect,
    deleteComment
);
// Edit own post
router.put(
    "/posts/:postId",
    protect,
    upload.single("media"),
    updatePost
);
// Edit own comment/reply
router.put(
    "/comments/:commentId",
    protect,
    updateComment
);
module.exports = router;