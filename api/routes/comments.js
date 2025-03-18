import express from 'express';
import Comment from '../models/CommentModel.js';
import Community from '../models/CommunityModel.js';

const router = express.Router();

// GET /api/comments/:postId - get comments for a given post (including replies)
// We now populate the createdBy field with the user's name
router.get('/:postId', async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId })
            .populate('createdBy', 'name') // populate createdBy with the user's name
            .sort({ createdAt: 1 });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/comments/:postId - add a new comment or reply to a post
router.post('/:postId', async (req, res) => {
    try {
        const { content, createdBy, isAnonymous, parentId } = req.body;
        const newComment = new Comment({
            postId: req.params.postId,
            content,
            createdBy,
            isAnonymous,
            parentId: parentId || null
        });
        await newComment.save();
        // Push the comment id into the corresponding Community (post) document
        await Community.findByIdAndUpdate(req.params.postId, { $push: { comments: newComment._id } });
        // Populate createdBy before returning
        await newComment.populate('createdBy', 'name');
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;