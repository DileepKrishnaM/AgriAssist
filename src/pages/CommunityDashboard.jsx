import { useEffect, useRef, useState } from "react";
import axios from "axios";


const styles = {
    page: {
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f4faf5 0%, #eef6ef 45%, #f8fbf8 100%)",
        padding: "34px 20px 100px",
        fontFamily: "Inter, Segoe UI, Arial, sans-serif",
        color: "#243328",
    },

    heading: {
        textAlign: "center",
        color: "#14532d",
        fontSize: "clamp(32px, 5vw, 46px)",
        fontWeight: "800",
        letterSpacing: "-1px",
        margin: "8px 0 8px",
    },

    subtitle: {
        textAlign: "center",
        color: "#64748b",
        fontSize: "16px",
        margin: "0 auto 32px",
        maxWidth: "620px",
        lineHeight: "1.6",
    },

    createCard: {
        maxWidth: "760px",
        margin: "0 auto 30px",
        background: "rgba(255,255,255,0.96)",
        padding: "26px",
        borderRadius: "24px",
        border: "1px solid #dcebdd",
        boxShadow: "0 14px 40px rgba(34, 84, 48, 0.10)",
        scrollMarginTop: "30px",
    },

    createTitle: {
        color: "#166534",
        margin: "0 0 18px",
        fontSize: "21px",
        fontWeight: "750",
    },

    textarea: {
        width: "100%",
        minHeight: "115px",
        padding: "16px 18px",
        borderRadius: "16px",
        border: "1px solid #d7e3d8",
        background: "#fbfdfb",
        resize: "vertical",
        fontSize: "15px",
        lineHeight: "1.6",
        boxSizing: "border-box",
        outline: "none",
        color: "#26352b",
        fontFamily: "inherit",
    },

    createBottom: {
        marginTop: "16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "15px",
        flexWrap: "wrap",
    },

    mediaSection: {
        flex: 1,
        minWidth: "220px",
    },

    postButton: {
        background: "linear-gradient(135deg, #15803d, #16a34a)",
        color: "white",
        border: "none",
        padding: "12px 26px",
        borderRadius: "12px",
        fontSize: "15px",
        fontWeight: "750",
        boxShadow: "0 7px 18px rgba(22,163,74,0.22)",
    },

    selectedFile: {
        color: "#64748b",
        fontSize: "13px",
        marginTop: "9px",
        marginBottom: 0,
        maxWidth: "450px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },

    postCard: {
        maxWidth: "760px",
        margin: "0 auto 24px",
        background: "rgba(255,255,255,0.98)",
        padding: "22px",
        borderRadius: "22px",
        border: "1px solid #e1ebe2",
        boxShadow: "0 10px 30px rgba(31, 70, 40, 0.08)",
    },

    userName: {
        color: "#1f2937",
        textAlign: "left",
        margin: "0 0 16px",
        paddingBottom: "14px",
        borderBottom: "1px solid #edf2ee",
        fontSize: "16px",
        fontWeight: "750",
    },

    postContent: {
        textAlign: "left",
        fontSize: "16px",
        color: "#374151",
        lineHeight: "1.7",
        margin: "0 0 16px",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
    },

    image: {
        width: "100%",
        maxHeight: "540px",
        objectFit: "cover",
        borderRadius: "16px",
        display: "block",
        border: "1px solid #e5ece6",
    },

    video: {
        width: "100%",
        maxHeight: "540px",
        borderRadius: "16px",
        display: "block",
        background: "#111827",
    },

    postActions: {
        display: "flex",
        alignItems: "center",
        gap: "9px",
        marginTop: "16px",
        paddingTop: "14px",
        borderTop: "1px solid #edf2ee",
        flexWrap: "wrap",
    },

    likeButton: {
        border: "1px solid #e5e7eb",
        padding: "9px 15px",
        borderRadius: "999px",
        fontSize: "14px",
        fontWeight: "700",
        cursor: "pointer",
        transition: "0.2s ease",
    },

    likeCount: {
        color: "#6b7280",
        fontSize: "13px",
        marginRight: "4px",
    },

    commentsButton: {
        border: "1px solid #d7ead9",
        padding: "9px 15px",
        borderRadius: "999px",
        background: "#f0fdf4",
        color: "#15803d",
        fontSize: "14px",
        fontWeight: "700",
        cursor: "pointer",
    },

    commentCount: {
        color: "#6b7280",
        fontSize: "13px",
    },

    commentsSection: {
        marginTop: "18px",
        padding: "18px",
        background: "#f7faf7",
        borderRadius: "18px",
        border: "1px solid #e0e9e1",
    },

    commentsTitle: {
        margin: "0 0 16px",
        color: "#166534",
        fontSize: "18px",
        fontWeight: "750",
    },

    newCommentContainer: {
        display: "flex",
        gap: "9px",
        marginBottom: "18px",
    },

    commentInput: {
        flex: 1,
        padding: "11px 15px",
        borderRadius: "999px",
        border: "1px solid #d5dfd6",
        background: "white",
        outline: "none",
        fontSize: "14px",
        color: "#374151",
    },

    commentSubmitButton: {
        border: "none",
        background: "#15803d",
        color: "white",
        padding: "10px 17px",
        borderRadius: "999px",
        fontWeight: "700",
        cursor: "pointer",
    },

    loadingComments: {
        textAlign: "center",
        color: "#64748b",
        padding: "15px",
    },

    noComments: {
        textAlign: "center",
        color: "#94a3b8",
        padding: "15px",
        fontSize: "14px",
    },

    commentWrapper: {
        marginBottom: "10px",
    },

    commentCard: {
        background: "white",
        padding: "13px 14px",
        borderRadius: "15px",
        border: "1px solid #e3eae4",
        boxShadow: "0 3px 10px rgba(31,70,40,0.035)",
    },

    commentUser: {
        fontWeight: "750",
        color: "#334155",
        fontSize: "13px",
        marginBottom: "6px",
    },

    commentContent: {
        color: "#475569",
        fontSize: "14px",
        lineHeight: "1.55",
        wordBreak: "break-word",
    },

    commentActions: {
        display: "flex",
        alignItems: "center",
        gap: "7px",
        marginTop: "9px",
        flexWrap: "wrap",
    },

    commentActionButton: {
        border: "none",
        padding: "6px 10px",
        borderRadius: "999px",
        fontSize: "12px",
        fontWeight: "700",
        cursor: "pointer",
    },

    commentLikeCount: {
        color: "#94a3b8",
        fontSize: "12px",
    },

    replyButton: {
        border: "none",
        background: "transparent",
        color: "#15803d",
        fontSize: "12px",
        fontWeight: "700",
        cursor: "pointer",
        padding: "6px 8px",
    },

    replyInputContainer: {
        display: "flex",
        gap: "8px",
        marginTop: "10px",
    },

    replyInput: {
        flex: 1,
        padding: "8px 12px",
        borderRadius: "999px",
        border: "1px solid #d5dfd6",
        background: "#fff",
        outline: "none",
        fontSize: "13px",
    },

    replySubmitButton: {
        border: "none",
        background: "#166534",
        color: "white",
        padding: "7px 13px",
        borderRadius: "999px",
        fontSize: "12px",
        fontWeight: "700",
        cursor: "pointer",
    },

    repliesContainer: {
        marginTop: "8px",
    },

    editPostButton: {
        border: "1px solid #dbeafe",
        padding: "9px 14px",
        borderRadius: "999px",
        background: "#eff6ff",
        color: "#0369a1",
        fontSize: "13px",
        fontWeight: "700",
        cursor: "pointer",
    },

    editPostContainer: {
        marginBottom: "15px",
    },

    editPostTextarea: {
        width: "100%",
        minHeight: "110px",
        padding: "14px",
        borderRadius: "14px",
        border: "1px solid #d1d5db",
        background: "#fbfdfb",
        resize: "vertical",
        fontSize: "15px",
        lineHeight: "1.6",
        boxSizing: "border-box",
        outline: "none",
        fontFamily: "inherit",
    },

    editPostActions: {
        display: "flex",
        gap: "9px",
        marginTop: "10px",
        flexWrap: "wrap",
    },

    saveEditButton: {
        border: "none",
        padding: "9px 15px",
        borderRadius: "999px",
        background: "#15803d",
        color: "white",
        fontSize: "13px",
        fontWeight: "700",
        cursor: "pointer",
    },

    cancelEditButton: {
        border: "none",
        padding: "9px 15px",
        borderRadius: "999px",
        background: "#f1f5f9",
        color: "#475569",
        fontSize: "13px",
        fontWeight: "700",
        cursor: "pointer",
    },

    deletePostButton: {
        border: "1px solid #fecaca",
        padding: "9px 14px",
        borderRadius: "999px",
        background: "#fff1f2",
        color: "#b91c1c",
        fontSize: "13px",
        fontWeight: "700",
        cursor: "pointer",
    },

    editCommentContainer: {
        marginTop: "4px",
    },

    editCommentInput: {
        width: "100%",
        boxSizing: "border-box",
        padding: "9px 12px",
        borderRadius: "12px",
        border: "1px solid #cbd5e1",
        background: "#fff",
        outline: "none",
        fontSize: "14px",
        color: "#334155",
    },

    editCommentActions: {
        display: "flex",
        gap: "7px",
        marginTop: "8px",
    },

    saveCommentButton: {
        border: "none",
        background: "#15803d",
        color: "white",
        padding: "6px 11px",
        borderRadius: "999px",
        fontSize: "12px",
        fontWeight: "700",
        cursor: "pointer",
    },

    cancelCommentButton: {
        border: "none",
        background: "#f1f5f9",
        color: "#475569",
        padding: "6px 11px",
        borderRadius: "999px",
        fontSize: "12px",
        fontWeight: "700",
        cursor: "pointer",
    },

    editCommentButton: {
        border: "none",
        background: "#eff6ff",
        color: "#0369a1",
        fontSize: "12px",
        fontWeight: "700",
        cursor: "pointer",
        padding: "6px 10px",
        borderRadius: "999px",
    },

    deleteButton: {
        border: "none",
        background: "#fff1f2",
        color: "#b91c1c",
        fontSize: "12px",
        fontWeight: "700",
        cursor: "pointer",
        padding: "6px 10px",
        borderRadius: "999px",
    },

    empty: {
        maxWidth: "760px",
        margin: "35px auto",
        padding: "45px 20px",
        textAlign: "center",
        color: "#64748b",
        background: "white",
        borderRadius: "22px",
        border: "1px solid #e1ebe2",
        boxShadow: "0 8px 25px rgba(31,70,40,0.06)",
    },

    loading: {
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#166534",
        fontFamily: "Inter, Segoe UI, Arial, sans-serif",
    },

    floatingPostButton: {
        position: "fixed",
        right: "26px",
        bottom: "26px",
        padding: "13px 20px",
        border: "none",
        borderRadius: "999px",
        color: "white",
        fontSize: "15px",
        fontWeight: "750",
        cursor: "pointer",
        background: "linear-gradient(135deg, #15803d, #16a34a)",
        boxShadow: "0 10px 28px rgba(21,128,61,0.30)",
        zIndex: 1000,
    },

    editMediaSection: {
        marginTop: "12px",
        padding: "13px",
        border: "1px solid #dce5dd",
        borderRadius: "14px",
        background: "#f8fbf8",
    },

    editMediaLabel: {
        display: "block",
        fontWeight: "700",
        marginBottom: "8px",
        color: "#334155",
        fontSize: "13px",
    },

    editMediaInput: {
        width: "100%",
        padding: "8px",
        boxSizing: "border-box",
    },

    editMediaPreview: {
        marginTop: "12px",
    },

    editMediaPreviewText: {
        marginBottom: "8px",
        fontSize: "13px",
        color: "#64748b",
    },

    editMediaPreviewImage: {
        width: "100%",
        maxWidth: "400px",
        maxHeight: "300px",
        objectFit: "cover",
        borderRadius: "12px",
    },

    editMediaPreviewVideo: {
        width: "100%",
        maxWidth: "400px",
        maxHeight: "300px",
        borderRadius: "12px",
    },

    removeEditMediaButton: {
        marginTop: "8px",
        padding: "7px 12px",
        border: "none",
        borderRadius: "999px",
        cursor: "pointer",
        background: "#fff1f2",
        color: "#b91c1c",
        fontWeight: "700",
    },
};
function CommentItem({
    comment,
    postId,
    depth = 0,
    editingComment,
    setEditingComment,
    editCommentContent,
    setEditCommentContent,
    updatingComment,
    handleUpdateComment,
    likingComment,
    handleCommentLikeToggle,
    commentText,
    setCommentText,
    getCurrentUserId,
    deletingComment,
    handleDeleteComment,
    handleAddComment,
}) {
        const replyKey = comment._id;

        return (
            <div
                style={{
                    ...styles.commentWrapper,
                    marginLeft:
                        depth === 0
                            ? "0px"
                            : `${Math.min(depth, 5) * 28}px`,
                }}
            >
                <div style={styles.commentCard}>

                    {/* COMMENT USER */}

                    <div style={styles.commentUser}>
                        👨‍🌾{" "}
                        {comment.userId?.name || "Farmer"}
                    </div>

                    {/* COMMENT TEXT */}

                     {editingComment === comment._id ? (
    <div style={styles.editCommentContainer}>
        <input
            type="text"
            value={editCommentContent}
            onChange={(e) =>
                setEditCommentContent(e.target.value)
            }
            style={styles.editCommentInput}
            disabled={
                updatingComment === comment._id
            }
        />

        <div style={styles.editCommentActions}>
            <button
                onClick={() =>
                    handleUpdateComment(comment._id)
                }
                disabled={
                    updatingComment === comment._id
                }
                style={{
                    ...styles.saveCommentButton,
                    opacity:
                        updatingComment === comment._id
                            ? 0.6
                            : 1,
                }}
            >
                {updatingComment === comment._id
                    ? "Saving..."
                    : "💾 Save"}
            </button>

            <button
                onClick={() => {
                    setEditingComment(null);
                    setEditCommentContent("");
                }}
                disabled={
                    updatingComment === comment._id
                }
                style={styles.cancelCommentButton}
            >
                Cancel
            </button>
        </div>
    </div>
) : (
    <div style={styles.commentContent}>
        {comment.content}
    </div>
)}

                    {/* COMMENT ACTIONS */}

                    <div style={styles.commentActions}>

                        <button
                            onClick={() =>
                                handleCommentLikeToggle(
                                    postId,
                                    comment._id,
                                    comment.isLiked
                                )
                            }
                            disabled={
                                likingComment === comment._id
                            }
                            style={{
                                ...styles.commentActionButton,
                                color: comment.isLiked
                                    ? "#e11d48"
                                    : "#555",
                                background:
                                    comment.isLiked
                                        ? "#ffe4e6"
                                        : "#f3f4f6",
                                opacity:
                                    likingComment ===
                                    comment._id
                                        ? 0.6
                                        : 1,
                            }}
                        >
                            {comment.isLiked
                                ? "❤️ Liked"
                                : "🤍 Like"}
                        </button>

                        <span style={styles.commentLikeCount}>
                            {comment.likes?.length || 0}
                        </span>

                        <button
                            onClick={() =>
                                setCommentText(
                                    (previous) => ({
                                        ...previous,
                                        [`show-${comment._id}`]:
                                            !previous[
                                                `show-${comment._id}`
                                            ],
                                    })
                                )
                            }
                            style={
                                styles.replyButton
                            }
                        >
                            💬 Reply
                        </button>


                      {comment.userId?._id?.toString() === getCurrentUserId()?.toString() && (
    <>
        {editingComment !== comment._id && (
            <button
                onClick={() => {
                    setEditingComment(comment._id);
                    setEditCommentContent(comment.content);
                }}
                disabled={deletingComment === comment._id}
                style={styles.editCommentButton}
            >
                ✏️ Edit
            </button>
        )}

        <button
            onClick={() =>
                handleDeleteComment(
                    postId,
                    comment._id
                )
            }
            disabled={
                deletingComment === comment._id ||
                updatingComment === comment._id
            }
            style={{
                ...styles.deleteButton,
                opacity:
                    deletingComment === comment._id
                        ? 0.6
                        : 1,
                cursor:
                    deletingComment === comment._id
                        ? "not-allowed"
                        : "pointer",
            }}
        >
            {deletingComment === comment._id
                ? "Deleting..."
                : "🗑️ Delete"}
        </button>
    </>
)}

                    </div>

                    {/* REPLY INPUT */}

                    {commentText[
                        `show-${comment._id}`
                    ] && (

                        <div style={styles.replyInputContainer}>

                            <input
                                type="text"
                                placeholder="Write a reply..."
                                value={
                                    commentText[
                                        replyKey
                                    ] || ""
                                }
                                onChange={(e) =>
                                    setCommentText(
                                        (previous) => ({
                                            ...previous,
                                            [replyKey]:
                                                e.target.value,
                                        })
                                    )
                                }
                                style={styles.replyInput}
                            />

                            <button
                                onClick={() =>
                                    handleAddComment(
                                        postId,
                                        comment._id
                                    )
                                }
                                style={
                                    styles.replySubmitButton
                                }
                            >
                                Reply
                            </button>

                        </div>
                    )}

                </div>

                {/* NESTED REPLIES */}

                {comment.replies &&
                    comment.replies.length > 0 && (

                        <div style={styles.repliesContainer}>

                            {comment.replies.map(
                                (reply) => (
                                    <CommentItem
                                        key={reply._id}
                                        comment={reply}
                                        postId={postId}
                                        depth={depth + 1}
                                        editingComment={editingComment}
                                        setEditingComment={setEditingComment}
                                        editCommentContent={editCommentContent}
                                        setEditCommentContent={setEditCommentContent}
                                        updatingComment={updatingComment}
                                        handleUpdateComment={handleUpdateComment}
                                        likingComment={likingComment}
                                        handleCommentLikeToggle={handleCommentLikeToggle}
                                        commentText={commentText}
                                        setCommentText={setCommentText}
                                        getCurrentUserId={getCurrentUserId}
                                        deletingComment={deletingComment}
                                        handleDeleteComment={handleDeleteComment}
                                        handleAddComment={handleAddComment}
                                    />
                                )
                            )}

                        </div>
                    )}
            </div>
        );
    };

function CommunityDashboard() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Create post
    const [content, setContent] = useState("");
    const [media, setMedia] = useState(null);
    const [uploading, setUploading] = useState(false);

    // Post likes
    const [likingPost, setLikingPost] = useState(null);

    // Comments
    const [commentsByPost, setCommentsByPost] = useState({});
    const [expandedPosts, setExpandedPosts] = useState({});
    const [loadingComments, setLoadingComments] = useState(null);

    // Comment/reply text
    const [commentText, setCommentText] = useState({});

    // Comment likes
    const [likingComment, setLikingComment] = useState(null);

    // Delete post / comment
    const [deletingPost, setDeletingPost] = useState(null);
    const [deletingComment, setDeletingComment] = useState(null);
    const [editingComment, setEditingComment] = useState(null);
const [editCommentContent, setEditCommentContent] = useState("");
const [updatingComment, setUpdatingComment] = useState(null);

    // Edit post
    const [editingPost, setEditingPost] = useState(null);
    const [editPostContent, setEditPostContent] = useState("");
    const [updatingPost, setUpdatingPost] = useState(null);
    const [editingPostMedia, setEditingPostMedia] = useState(null);

    const fileInputRef = useRef(null);
    const createPostRef = useRef(null);

    // ==========================================
    // CURRENT USER
    // ==========================================

    const getCurrentUserId = () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));

            return user?._id || user?.id || null;

        } catch (error) {
            console.error("Failed to read user:", error);
            return null;
        }
    };

    // ==========================================
    // FETCH POSTS
    // ==========================================

    const fetchPosts = async () => {
        try {
            const token = localStorage.getItem("token");
            const currentUserId = getCurrentUserId();

            const response = await axios.get(
                "http://localhost:5000/api/community/posts",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const fetchedPosts = response.data.posts.map((post) => {
                const isLiked = post.likes?.some(
                    (userId) =>
                        userId?.toString() ===
                        currentUserId?.toString()
                );

                return {
                    ...post,
                    isLiked,
                };
            });

            setPosts(fetchedPosts);

        } catch (error) {
            console.error(
                "Failed to fetch posts:",
                error.response?.data || error.message
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // ==========================================
    // MEDIA SELECTION
    // ==========================================

    const handleMediaChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        if (
            !file.type.startsWith("image/") &&
            !file.type.startsWith("video/")
        ) {
            alert("Please select an image or video.");
            e.target.value = "";
            return;
        }

        if (file.size > 100 * 1024 * 1024) {
            alert("File size must be less than 100 MB.");
            e.target.value = "";
            return;
        }

        setMedia(file);
    };

    // ==========================================
    // CREATE POST
    // ==========================================

    const handleCreatePost = async () => {
        if (uploading) return;

        if (!content.trim() && !media) {
            alert("Please write something or select an image/video.");
            return;
        }

        try {
            setUploading(true);

            const token = localStorage.getItem("token");

            const formData = new FormData();

            formData.append("content", content);

            if (media) {
                formData.append("media", media);
            }

            const response = await axios.post(
                "http://localhost:5000/api/community/posts",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const newPost = {
                ...response.data.post,
                isLiked: false,
            };

            setPosts((previousPosts) => [
                newPost,
                ...previousPosts,
            ]);

            setContent("");
            setMedia(null);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            alert("Post created successfully!");

        } catch (error) {
            console.error(
                "Create post error:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to create post."
            );

        } finally {
            setUploading(false);
        }
    };

    // ==========================================
    // POST LIKE / UNLIKE
    // ==========================================

    const handleLikeToggle = async (postId, isLiked) => {
        if (likingPost === postId) return;

        const currentUserId = getCurrentUserId();

        if (!currentUserId) {
            alert("User information not found. Please login again.");
            return;
        }

        try {
            setLikingPost(postId);

            const token = localStorage.getItem("token");

            const endpoint = isLiked
                ? `http://localhost:5000/api/community/posts/${postId}/unlike`
                : `http://localhost:5000/api/community/posts/${postId}/like`;

            const response = await axios.post(
                endpoint,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const newLikesCount = response.data.likesCount;

            setPosts((previousPosts) =>
                previousPosts.map((post) => {
                    if (post._id !== postId) {
                        return post;
                    }

                    let updatedLikes = [...(post.likes || [])];

                    if (isLiked) {
                        updatedLikes = updatedLikes.filter(
                            (userId) =>
                                userId?.toString() !==
                                currentUserId.toString()
                        );
                    } else {
                        updatedLikes.push(currentUserId);
                    }

                    return {
                        ...post,
                        likes: updatedLikes.slice(
                            0,
                            newLikesCount
                        ),
                        isLiked: !isLiked,
                    };
                })
            );

        } catch (error) {
            console.error(
                "Post like error:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to update like."
            );

        } finally {
            setLikingPost(null);
        }
    };

    // ==========================================
    // DELETE POST
    // ==========================================

    const handleDeletePost = async (postId) => {
        if (deletingPost === postId) return;
        if (!window.confirm("Are you sure you want to delete this post?")) return;

        try {
            setDeletingPost(postId);
            const token = localStorage.getItem("token");

            await axios.delete(
                `http://localhost:5000/api/community/posts/${postId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setPosts((previous) => previous.filter((post) => post._id !== postId));
            setCommentsByPost((previous) => { const updated = { ...previous }; delete updated[postId]; return updated; });
            setExpandedPosts((previous) => { const updated = { ...previous }; delete updated[postId]; return updated; });
            alert("Post deleted successfully!");
        } catch (error) {
            console.error("Delete post error:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Failed to delete post.");
        } finally {
            setDeletingPost(null);
        }
    };

    // ==========================================
    // EDIT POST
    // ==========================================

    const startEditingPost = (post) => {
        setEditingPost(post._id);
        setEditPostContent(post.content || "");
    };

    const cancelEditingPost = () => {
        setEditingPost(null);
        setEditPostContent("");
         setEditingPostMedia(null);
    };

   const handleUpdatePost = async (postId) => {
    if (updatingPost === postId) return;

    if (!editPostContent.trim()) {
        alert("Post content cannot be empty.");
        return;
    }

    try {
        setUpdatingPost(postId);

        const token = localStorage.getItem("token");

        // Create FormData for text + image/video
        const formData = new FormData();

        formData.append(
            "content",
            editPostContent.trim()
        );

        // Add new image/video only if selected
        if (editingPostMedia) {
            formData.append(
                "media",
                editingPostMedia
            );
        }

        const response = await axios.put(
            `http://localhost:5000/api/community/posts/${postId}`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const updatedPost = response.data.post;

        setPosts((previousPosts) =>
            previousPosts.map((post) =>
                post._id === postId
                    ? {
                          ...post,
                          ...updatedPost,
                          isLiked: post.isLiked,
                      }
                    : post
            )
        );

        setEditingPost(null);
        setEditPostContent("");
        setEditingPostMedia(null);

        alert("Post updated successfully!");

    } catch (error) {
        console.error(
            "Update post error:",
            error.response?.data ||
            error.message
        );

        alert(
            error.response?.data?.message ||
            "Failed to update post."
        );

    } finally {
        setUpdatingPost(null);
    }
};

    // ==========================================
    // LOAD COMMENTS
    // ==========================================

    const loadComments = async (postId) => {
        try {
            setLoadingComments(postId);

            const token = localStorage.getItem("token");
            const currentUserId = getCurrentUserId();

            const response = await axios.get(
                `http://localhost:5000/api/community/posts/${postId}/comments`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const comments = response.data.comments.map(
                (comment) => ({
                    ...comment,
                    isLiked: comment.likes?.some(
                        (userId) =>
                            userId?.toString() ===
                            currentUserId?.toString()
                    ),
                })
            );

            setCommentsByPost((previous) => ({
                ...previous,
                [postId]: comments,
            }));

        } catch (error) {
            console.error(
                "Failed to load comments:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to load comments."
            );

        } finally {
            setLoadingComments(null);
        }
    };

    // ==========================================
    // TOGGLE COMMENTS
    // ==========================================

    const toggleComments = async (postId) => {
        const isOpen = expandedPosts[postId];

        setExpandedPosts((previous) => ({
            ...previous,
            [postId]: !isOpen,
        }));

        if (!isOpen && !commentsByPost[postId]) {
            await loadComments(postId);
        }
    };

    // ==========================================
    // ADD COMMENT / REPLY
    // ==========================================

    const handleAddComment = async (
        postId,
        parentCommentId = null
    ) => {
        const key = parentCommentId || `post-${postId}`;

        const text = commentText[key]?.trim();

        if (!text) {
            alert(
                parentCommentId
                    ? "Please write a reply."
                    : "Please write a comment."
            );
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(
                `http://localhost:5000/api/community/posts/${postId}/comments`,
                {
                    content: text,
                    parentCommentId: parentCommentId || null,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const newComment = {
                ...response.data.comment,
                isLiked: false,
            };

            setCommentsByPost((previous) => ({
                ...previous,
                [postId]: [
                    ...(previous[postId] || []),
                    newComment,
                ],
            }));

            setCommentText((previous) => ({
                ...previous,
                [key]: "",
            }));

        } catch (error) {
            console.error(
                "Add comment error:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to add comment."
            );
        }
    };

    // ==========================================
    // COMMENT LIKE / UNLIKE
    // ==========================================

    const handleCommentLikeToggle = async (
        postId,
        commentId,
        isLiked
    ) => {
        if (likingComment === commentId) return;

        const currentUserId = getCurrentUserId();

        if (!currentUserId) {
            alert("User information not found. Please login again.");
            return;
        }

        try {
            setLikingComment(commentId);

            const token = localStorage.getItem("token");

            const endpoint = isLiked
                ? `http://localhost:5000/api/community/comments/${commentId}/unlike`
                : `http://localhost:5000/api/community/comments/${commentId}/like`;

            const response = await axios.post(
                endpoint,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const newLikesCount = response.data.likesCount;

            setCommentsByPost((previous) => ({
                ...previous,
                [postId]: (
                    previous[postId] || []
                ).map((comment) => {

                    if (comment._id !== commentId) {
                        return comment;
                    }

                    let updatedLikes = [
                        ...(comment.likes || []),
                    ];

                    if (isLiked) {
                        updatedLikes = updatedLikes.filter(
                            (userId) =>
                                userId?.toString() !==
                                currentUserId.toString()
                        );
                    } else {
                        updatedLikes.push(currentUserId);
                    }

                    return {
                        ...comment,
                        likes: updatedLikes.slice(
                            0,
                            newLikesCount
                        ),
                        isLiked: !isLiked,
                    };
                }),
            }));

        } catch (error) {
            console.error(
                "Comment like error:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to update comment like."
            );

        } finally {
            setLikingComment(null);
        }
    };

    // ==========================================
    // DELETE COMMENT / REPLY
    // ==========================================

    const handleDeleteComment = async (postId, commentId) => {
        if (deletingComment === commentId) return;
        if (!window.confirm("Are you sure you want to delete this comment?")) return;

        try {
            setDeletingComment(commentId);
            const token = localStorage.getItem("token");

            await axios.delete(
                `http://localhost:5000/api/community/comments/${commentId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setCommentsByPost((previous) => {
                const comments = previous[postId] || [];
                const ids = new Set([commentId]);
                let changed = true;
                while (changed) {
                    changed = false;
                    comments.forEach((comment) => {
                        const parentId = comment.parentCommentId?.toString();
                        if (parentId && ids.has(parentId) && !ids.has(comment._id)) {
                            ids.add(comment._id);
                            changed = true;
                        }
                    });
                }
                return { ...previous, [postId]: comments.filter((comment) => !ids.has(comment._id)) };
            });
            alert("Comment deleted successfully!");
        } catch (error) {
            console.error("Delete comment error:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Failed to delete comment.");
        } finally {
            setDeletingComment(null);
        }
    };
    // ==========================================
// EDIT COMMENT / REPLY
// ==========================================

const handleUpdateComment = async (commentId) => {
    if (updatingComment === commentId) return;

    if (!editCommentContent.trim()) {
        alert("Comment cannot be empty.");
        return;
    }

    try {
        setUpdatingComment(commentId);

        const token = localStorage.getItem("token");

        const response = await axios.put(
            `http://localhost:5000/api/community/comments/${commentId}`,
            {
                content: editCommentContent.trim(),
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const updatedComment = response.data.comment;

        setCommentsByPost((previous) => {
            const updated = { ...previous };

            Object.keys(updated).forEach((postId) => {
                updated[postId] = (updated[postId] || []).map(
                    (comment) =>
                        comment._id === commentId
                            ? {
                                  ...comment,
                                  ...updatedComment,
                              }
                            : comment
                );
            });

            return updated;
        });

        setEditingComment(null);
        setEditCommentContent("");

        alert("Comment updated successfully!");

    } catch (error) {
        console.error(
            "Update comment error:",
            error.response?.data || error.message
        );

        alert(
            error.response?.data?.message ||
            "Failed to update comment."
        );

    } finally {
        setUpdatingComment(null);
    }
};

    // ==========================================
    // BUILD COMMENT TREE
    // ==========================================

    const buildCommentTree = (comments) => {
        const commentMap = {};

        comments.forEach((comment) => {
            commentMap[comment._id] = {
                ...comment,
                replies: [],
            };
        });

        const rootComments = [];

        comments.forEach((comment) => {
            if (
                comment.parentCommentId &&
                commentMap[comment.parentCommentId]
            ) {
                commentMap[
                    comment.parentCommentId
                ].replies.push(
                    commentMap[comment._id]
                );
            } else {
                rootComments.push(
                    commentMap[comment._id]
                );
            }
        });

        return rootComments;
    };

    // ==========================================
    // SCROLL TO CREATE POST
    // ==========================================

    const scrollToCreatePost = () => {
        createPostRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    };



    // ==========================================
    // LOADING SCREEN
    // ==========================================

    if (loading) {
        return (
            <div style={styles.loading}>
                <h2>
                    Loading community posts...
                </h2>
            </div>
        );
    }

    // ==========================================
    // MAIN UI
    // ==========================================

    return (
        <div style={styles.page}>

            <style>
                {`
                    @keyframes vibrantButton {
                        0% {
                            background-position: 0% 50%;
                        }

                        50% {
                            background-position: 100% 50%;
                        }

                        100% {
                            background-position: 0% 50%;
                        }
                    }

                    @keyframes pulseButton {
                        0% {
                            transform: scale(1);
                        }

                        50% {
                            transform: scale(1.05);
                        }

                        100% {
                            transform: scale(1);
                        }
                    }
                `}
            </style>


            {/* ==================================
                HEADING
            ================================== */}

            <h1 style={styles.heading}>
                🌾 AgriAssist Community
            </h1>

            <p style={styles.subtitle}>
                Share farming ideas, experiences and
                knowledge with other farmers.
            </p>


            {/* ==================================
                CREATE POST
            ================================== */}

            <div
                ref={createPostRef}
                style={styles.createCard}
            >

                <h2 style={styles.createTitle}>
                    🌱 Create a Community Post
                </h2>

                <textarea
                    placeholder="What's happening on your farm?"
                    value={content}
                    onChange={(e) =>
                        setContent(e.target.value)
                    }
                    style={styles.textarea}
                    disabled={uploading}
                />

                <div style={styles.createBottom}>

                    <div style={styles.mediaSection}>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*,video/*"
                            onChange={handleMediaChange}
                            disabled={uploading}
                        />

                        {media && (
                            <p style={styles.selectedFile}>
                                📎 {media.name}
                            </p>
                        )}

                    </div>

                    <button
                        onClick={handleCreatePost}
                        disabled={uploading}
                        style={{
                            ...styles.postButton,
                            opacity:
                                uploading
                                    ? 0.6
                                    : 1,
                            cursor:
                                uploading
                                    ? "not-allowed"
                                    : "pointer",
                        }}
                    >
                        {uploading
                            ? "Posting..."
                            : "Post"}
                    </button>

                </div>

            </div>


            {/* ==================================
                POSTS
            ================================== */}

            <div>

                {posts.length === 0 ? (

                    <div style={styles.empty}>

                        <h3>
                            No posts yet 🌱
                        </h3>

                        <p>
                            Be the first farmer to
                            share something!
                        </p>

                    </div>

                ) : (

                    posts.map((post) => {

                        const postComments =
                            commentsByPost[
                                post._id
                            ] || [];

                        const commentTree =
                            buildCommentTree(
                                postComments
                            );

                        return (

                            <div
                                key={post._id}
                                style={styles.postCard}
                            >

                                {/* USER */}

                                <h3
                                    style={
                                        styles.userName
                                    }
                                >
                                    👨‍🌾{" "}
                                    {post.userId?.name ||
                                        "Farmer"}
                                </h3>


                                {/* CONTENT */}

                                {editingPost === post._id ? (
                                    <div style={styles.editPostContainer}>
                                        <textarea
                                            value={editPostContent}
                                            onChange={(e) =>
                                                setEditPostContent(
                                                    e.target.value
                                                )
                                            }
                                            style={styles.editPostTextarea}
                                            disabled={
                                                updatingPost ===
                                                post._id
                                            }
                                        />
                                        <div style={styles.editMediaSection}>
    <label style={styles.editMediaLabel}>
        📎 Replace Image / Video
    </label>

    <input
        type="file"
        accept="image/*,video/*"
        onChange={(e) => {
            const file = e.target.files[0];

            if (!file) return;

            setEditingPostMedia(file);
        }}
        style={styles.editMediaInput}
    />

    {editingPostMedia && (
        <div style={styles.editMediaPreview}>
            <p style={styles.editMediaPreviewText}>
                Selected: {editingPostMedia.name}
            </p>

            {editingPostMedia.type.startsWith("image/") ? (
                <img
                    src={URL.createObjectURL(editingPostMedia)}
                    alt="New media preview"
                    style={styles.editMediaPreviewImage}
                />
            ) : (
                <video
                    src={URL.createObjectURL(editingPostMedia)}
                    controls
                    style={styles.editMediaPreviewVideo}
                />
            )}

            <button
                type="button"
                onClick={() => setEditingPostMedia(null)}
                style={styles.removeEditMediaButton}
            >
                ❌ Remove Selected Media
            </button>
        </div>
    )}
</div>

                                        <div style={styles.editPostActions}>
                                            <button
                                                onClick={() =>
                                                    handleUpdatePost(
                                                        post._id
                                                    )
                                                }
                                                disabled={
                                                    updatingPost ===
                                                    post._id
                                                }
                                                style={{
                                                    ...styles.saveEditButton,
                                                    opacity:
                                                        updatingPost ===
                                                        post._id
                                                            ? 0.6
                                                            : 1,
                                                    cursor:
                                                        updatingPost ===
                                                        post._id
                                                            ? "not-allowed"
                                                            : "pointer",
                                                }}
                                            >
                                                {updatingPost ===
                                                post._id
                                                    ? "Saving..."
                                                    : "💾 Save Changes"}
                                            </button>

                                            <button
                                                onClick={
                                                    cancelEditingPost
                                                }
                                                disabled={
                                                    updatingPost ===
                                                    post._id
                                                }
                                                style={
                                                    styles.cancelEditButton
                                                }
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    post.content && (
                                        <p
                                            style={
                                                styles.postContent
                                            }
                                        >
                                            {post.content}
                                        </p>
                                    )
                                )}


                                {/* IMAGE */}

                                {post.media?.type ===
                                    "image" && (

                                    <img
                                        src={
                                            post.media.url
                                        }
                                        alt="Community post"
                                        style={
                                            styles.image
                                        }
                                    />
                                )}


                                {/* VIDEO */}

                                {post.media?.type ===
                                    "video" && (

                                    <video
                                        src={
                                            post.media.url
                                        }
                                        controls
                                        style={
                                            styles.video
                                        }
                                    />
                                )}


                                {/* POST ACTIONS */}

                                <div
                                    style={
                                        styles.postActions
                                    }
                                >

                                    <button
                                        onClick={() =>
                                            handleLikeToggle(
                                                post._id,
                                                post.isLiked
                                            )
                                        }
                                        disabled={
                                            likingPost ===
                                            post._id
                                        }
                                        style={{
                                            ...styles.likeButton,
                                            background:
                                                post.isLiked
                                                    ? "#ffe4e6"
                                                    : "#f3f4f6",
                                            color:
                                                post.isLiked
                                                    ? "#e11d48"
                                                    : "#555",
                                            opacity:
                                                likingPost ===
                                                post._id
                                                    ? 0.6
                                                    : 1,
                                        }}
                                    >
                                        {post.isLiked
                                            ? "❤️ Liked"
                                            : "🤍 Like"}
                                    </button>

                                    <span
                                        style={
                                            styles.likeCount
                                        }
                                    >
                                        {post.likes
                                            ?.length ||
                                            0}{" "}
                                        {post.likes
                                            ?.length === 1
                                            ? "like"
                                            : "likes"}
                                    </span>

                                    <button
                                        onClick={() =>
                                            toggleComments(
                                                post._id
                                            )
                                        }
                                        style={
                                            styles.commentsButton
                                        }
                                    >
                                        💬 Comments
                                    </button>

                                    {expandedPosts[
                                        post._id
                                    ] && (

                                        <span
                                            style={
                                                styles.commentCount
                                            }
                                        >
                                            {postComments.length}
                                        </span>
                                    )}


                                    {post.userId?._id?.toString() === getCurrentUserId()?.toString() && (
                                        <>
                                            {editingPost !== post._id && (
                                                <button
                                                    onClick={() =>
                                                        startEditingPost(
                                                            post
                                                        )
                                                    }
                                                    disabled={
                                                        deletingPost ===
                                                        post._id
                                                    }
                                                    style={
                                                        styles.editPostButton
                                                    }
                                                >
                                                    ✏️ Edit Post
                                                </button>
                                            )}

                                            <button
                                                onClick={() =>
                                                    handleDeletePost(
                                                        post._id
                                                    )
                                                }
                                                disabled={
                                                    deletingPost ===
                                                    post._id ||
                                                    editingPost ===
                                                        post._id
                                                }
                                                style={{
                                                    ...styles.deletePostButton,
                                                    opacity:
                                                        deletingPost ===
                                                        post._id
                                                            ? 0.6
                                                            : 1,
                                                    cursor:
                                                        deletingPost ===
                                                        post._id ||
                                                        editingPost ===
                                                            post._id
                                                            ? "not-allowed"
                                                            : "pointer",
                                                }}
                                            >
                                                {deletingPost ===
                                                post._id
                                                    ? "Deleting..."
                                                    : "🗑️ Delete Post"}
                                            </button>
                                        </>
                                    )}

                                </div>


                                {/* ==================================
                                    COMMENTS SECTION
                                ================================== */}

                                {expandedPosts[
                                    post._id
                                ] && (

                                    <div
                                        style={
                                            styles.commentsSection
                                        }
                                    >

                                        <h3
                                            style={
                                                styles.commentsTitle
                                            }
                                        >
                                            💬 Community
                                            Discussion
                                        </h3>


                                        {/* ADD TOP-LEVEL COMMENT */}

                                        <div
                                            style={
                                                styles.newCommentContainer
                                            }
                                        >

                                            <input
                                                type="text"
                                                placeholder="Write a comment..."
                                                value={
                                                    commentText[
                                                        `post-${post._id}`
                                                    ] || ""
                                                }
                                                onChange={(
                                                    e
                                                ) =>
                                                    setCommentText(
                                                        (
                                                            previous
                                                        ) => ({
                                                            ...previous,
                                                            [`post-${post._id}`]:
                                                                e
                                                                    .target
                                                                    .value,
                                                        })
                                                    )
                                                }
                                                style={
                                                    styles.commentInput
                                                }
                                            />

                                            <button
                                                onClick={() =>
                                                    handleAddComment(
                                                        post._id
                                                    )
                                                }
                                                style={
                                                    styles.commentSubmitButton
                                                }
                                            >
                                                Comment
                                            </button>

                                        </div>


                                        {/* LOADING COMMENTS */}

                                        {loadingComments ===
                                            post._id ? (

                                            <p
                                                style={
                                                    styles.loadingComments
                                                }
                                            >
                                                Loading
                                                comments...
                                            </p>

                                        ) : commentTree.length ===
                                          0 ? (

                                            <p
                                                style={
                                                    styles.noComments
                                                }
                                            >
                                                No comments
                                                yet. Be the
                                                first to
                                                comment! 🌱
                                            </p>

                                        ) : (

                                            <div>

                                                {commentTree.map(
                                                    (
                                                        comment
                                                    ) => (

                                                        <CommentItem
                                                            key={comment._id}
                                                            comment={comment}
                                                            postId={post._id}
                                                            editingComment={editingComment}
                                                            setEditingComment={setEditingComment}
                                                            editCommentContent={editCommentContent}
                                                            setEditCommentContent={setEditCommentContent}
                                                            updatingComment={updatingComment}
                                                            handleUpdateComment={handleUpdateComment}
                                                            likingComment={likingComment}
                                                            handleCommentLikeToggle={handleCommentLikeToggle}
                                                            commentText={commentText}
                                                            setCommentText={setCommentText}
                                                            getCurrentUserId={getCurrentUserId}
                                                            deletingComment={deletingComment}
                                                            handleDeleteComment={handleDeleteComment}
                                                            handleAddComment={handleAddComment}
                                                        />

                                                    )
                                                )}

                                            </div>
                                        )}

                                    </div>
                                )}

                            </div>
                        );
                    })
                )}

            </div>


            {/* ==================================
                FLOATING POST BUTTON
            ================================== */}

            <button
                onClick={
                    scrollToCreatePost
                }
                style={
                    styles.floatingPostButton
                }
                title="Create a new post"
            >
                ✨ ＋ Post
            </button>

        </div>
    );
}


// ==========================================
// STYLES
// ==========================================



export default CommunityDashboard;                                