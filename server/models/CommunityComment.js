const mongoose = require("mongoose");

const communityCommentSchema = new mongoose.Schema(
    {
        // Which post does this comment belong to?
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CommunityPost",
            required: true,
        },

        // Which farmer created the comment?
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        // Comment text
        content: {
            type: String,
            required: true,
            trim: true,
        },

        // If null → comment directly on post
        // If an ID → reply to that comment
        parentCommentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CommunityComment",
            default: null,
        },

        // Users who liked this comment/reply
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "CommunityComment",
    communityCommentSchema
);