const mongoose = require("mongoose");

const communityPostSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        content: {
            type: String,
            trim: true,
            default: "",
        },

        media: {
            type: {
                type: String,
                enum: ["image", "video"],
            },
            url: {
                type: String,
            },
        },

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

module.exports = mongoose.model("CommunityPost", communityPostSchema);