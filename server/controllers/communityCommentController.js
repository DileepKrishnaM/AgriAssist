const CommunityComment = require("../models/CommunityComment");
const CommunityPost = require("../models/CommunityPost");

// ==========================================
// CREATE COMMENT / REPLY
// ==========================================

const createComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const { content, parentCommentId } = req.body;

        // Check content
        if (!content || !content.trim()) {
            return res.status(400).json({
                success: false,
                message: "Comment cannot be empty",
            });
        }

        // Check whether post exists
        const post = await CommunityPost.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        // If this is a reply, check parent comment
        if (parentCommentId) {
            const parentComment =
                await CommunityComment.findById(parentCommentId);

            if (!parentComment) {
                return res.status(404).json({
                    success: false,
                    message: "Parent comment not found",
                });
            }

            // Make sure parent belongs to the same post
            if (
                parentComment.postId.toString() !==
                postId.toString()
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid parent comment",
                });
            }
        }

        // Create comment or reply
        const comment = new CommunityComment({
            postId: postId,
            userId: req.user._id,
            content: content.trim(),
            parentCommentId: parentCommentId || null,
        });

        const savedComment = await comment.save();

        // Add user information
        await savedComment.populate(
            "userId",
            "name email"
        );

        res.status(201).json({
            success: true,
            message: parentCommentId
                ? "Reply added successfully"
                : "Comment added successfully",
            comment: savedComment,
        });

    } catch (error) {
        console.error("Create Comment Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to add comment",
        });
    }
};


// ==========================================
// GET COMMENTS / REPLIES
// ==========================================

const getComments = async (req, res) => {
    try {
        const { postId } = req.params;

        // Check whether post exists
        const post = await CommunityPost.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        const comments = await CommunityComment.find({
            postId: postId,
        })
            .populate("userId", "name email")
            .sort({ createdAt: 1 });

        res.status(200).json({
            success: true,
            comments,
        });

    } catch (error) {
        console.error("Get Comments Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch comments",
        });
    }
};


// ==========================================
// LIKE COMMENT / REPLY
// ==========================================

const likeComment = async (req, res) => {
    try {
        const { commentId } = req.params;

        const comment =
            await CommunityComment.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found",
            });
        }

        // Prevent duplicate like
        if (comment.likes.includes(req.user._id)) {
            return res.status(400).json({
                success: false,
                message: "You already liked this comment",
            });
        }

        comment.likes.push(req.user._id);

        await comment.save();

        res.status(200).json({
            success: true,
            message: "Comment liked successfully",
            likesCount: comment.likes.length,
        });

    } catch (error) {
        console.error("Like Comment Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to like comment",
        });
    }
};


// ==========================================
// UNLIKE COMMENT / REPLY
// ==========================================

const unlikeComment = async (req, res) => {
    try {
        const { commentId } = req.params;

        const comment =
            await CommunityComment.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found",
            });
        }

        comment.likes = comment.likes.filter(
            (userId) =>
                userId.toString() !==
                req.user._id.toString()
        );

        await comment.save();

        res.status(200).json({
            success: true,
            message: "Comment unliked successfully",
            likesCount: comment.likes.length,
        });

    } catch (error) {
        console.error("Unlike Comment Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to unlike comment",
        });
    }
};

// DELETE COMMENT / REPLY
const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;

        const comment =
            await CommunityComment.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found",
            });
        }

        // Only the farmer who created the comment can delete it
        if (
            comment.userId.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message: "You can delete only your own comment",
            });
        }

        // Delete this comment and all replies under it
        const deleteReplies = async (parentId) => {
            const replies =
                await CommunityComment.find({
                    parentCommentId: parentId,
                });

            for (const reply of replies) {
                await deleteReplies(reply._id);
            }

            await CommunityComment.deleteMany({
                parentCommentId: parentId,
            });
        };

        await deleteReplies(comment._id);

        await CommunityComment.findByIdAndDelete(
            commentId
        );

        res.status(200).json({
            success: true,
            message: "Comment deleted successfully",
        });

    } catch (error) {
        console.error("Delete Comment Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete comment",
        });
    }
};
const updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { content } = req.body;

        const comment = await CommunityComment.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found",
            });
        }

        // Only the owner can edit the comment/reply
        if (
            comment.userId.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message: "You can edit only your own comment",
            });
        }

        // Content cannot be empty
        if (!content || !content.trim()) {
            return res.status(400).json({
                success: false,
                message: "Comment content cannot be empty",
            });
        }

        comment.content = content.trim();

        const updatedComment = await comment.save();

        res.status(200).json({
            success: true,
            message: "Comment updated successfully",
            comment: updatedComment,
        });

    } catch (error) {
        console.error("Update Comment Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update comment",
        });
    }
};


module.exports = {
    createComment,
    getComments,
    likeComment,
    unlikeComment,
    deleteComment,
     updateComment,
};