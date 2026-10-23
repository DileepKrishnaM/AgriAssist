const CommunityPost = require("../models/CommunityPost");
const cloudinary = require("../config/cloudinary");
const CommunityComment = require("../models/CommunityComment");

const createPost = async (req, res) => {
    try {
        const { content } = req.body;

        // At least text or media must be provided
        if (!content && !req.file) {
            return res.status(400).json({
                success: false,
                message: "Post must contain text or media",
            });
        }

        let media = undefined;

        // Upload file to Cloudinary
        if (req.file) {
            const uploadResult = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: "agriassist/community",
                        resource_type: "auto",
                    },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                );

                uploadStream.end(req.file.buffer);
            });

            media = {
                type: req.file.mimetype.startsWith("video/")
                    ? "video"
                    : "image",
                url: uploadResult.secure_url,
            };
        }

        const post = new CommunityPost({
            userId: req.user._id,
            content: content || "",
            media,
        });

        const savedPost = await post.save();

        res.status(201).json({
            success: true,
            message: "Post created successfully",
            post: savedPost,
        });

    } catch (error) {
        console.error("Create Post Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create post",
        });
    }
};


// Get all community posts
const getPosts = async (req, res) => {
    try {
        const posts = await CommunityPost.find()
            .populate("userId", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            posts,
        });

    } catch (error) {
        console.error("Get Posts Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch posts",
        });
    }
};
// Like a post
const likePost = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await CommunityPost.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        // Check if user already liked the post
        if (post.likes.includes(req.user._id)) {
            return res.status(400).json({
                success: false,
                message: "You already liked this post",
            });
        }

        post.likes.push(req.user._id);

        await post.save();

        res.status(200).json({
            success: true,
            message: "Post liked successfully",
            likesCount: post.likes.length,
        });

    } catch (error) {
        console.error("Like Post Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to like post",
        });
    }
};


// Unlike a post
const unlikePost = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await CommunityPost.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        post.likes = post.likes.filter(
            (userId) => userId.toString() !== req.user._id.toString()
        );

        await post.save();

        res.status(200).json({
            success: true,
            message: "Post unliked successfully",
            likesCount: post.likes.length,
        });

    } catch (error) {
        console.error("Unlike Post Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to unlike post",
        });
    }
};
// DELETE POST
const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await CommunityPost.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        // Only the farmer who created the post can delete it
        if (post.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You can delete only your own post",
            });
        }

        await CommunityPost.findByIdAndDelete(postId);

        // Delete all comments and replies belonging to this post
        await CommunityComment.deleteMany({
            postId: postId,
        });

        res.status(200).json({
            success: true,
            message: "Post deleted successfully",
        });

    } catch (error) {
        console.error("Delete Post Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete post",
        });
    }
};
// EDIT POST
const updatePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { content } = req.body||{};

        const post = await CommunityPost.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        // Only the owner can edit the post
        if (
            post.userId.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message: "You can edit only your own post",
            });
        }

        // Content cannot be empty
        if (!content || !content.trim()) {
            return res.status(400).json({
                success: false,
                message: "Post content cannot be empty",
            });
        }

        // Update text
        post.content = content.trim();

        // If a new image/video was uploaded
        if (req.file) {
            const resourceType =
                req.file.mimetype.startsWith("video/")
                    ? "video"
                    : "image";

            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "agriassist/community",
                    resource_type: resourceType,
                },
                async (error, result) => {
                    if (error) {
                        console.error(
                            "Cloudinary Update Error:",
                            error
                        );

                        return res.status(500).json({
                            success: false,
                            message: "Failed to upload new media",
                        });
                    }

                    post.media = {
                        type: resourceType,
                        url: result.secure_url,
                    };

                    const updatedPost = await post.save();

                    return res.status(200).json({
                        success: true,
                        message: "Post updated successfully",
                        post: updatedPost,
                    });
                }
            );

            uploadStream.end(req.file.buffer);

            return;
        }

        // No new media → keep existing media
        const updatedPost = await post.save();

        res.status(200).json({
            success: true,
            message: "Post updated successfully",
            post: updatedPost,
        });

    } catch (error) {
        console.error("Update Post Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update post",
        });
    }
};


module.exports = {
    createPost,
    getPosts,
     likePost,
    unlikePost,
    deletePost,
    updatePost,
};