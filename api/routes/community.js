import express from 'express';
import Post from '../models/CommunityModel.js';

const router = express.Router();

// GET /api/community - get all posts and populate createdBy with name
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('createdBy', 'name') // Use 'name' instead of username
            .sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/community/:id - get a single post by ID (populate createdBy)
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('createdBy', 'name');
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/community - create a new post, including isAnonymous field
router.post('/', async (req, res) => {
    try {
        const { title, content, tag, createdBy, isAnonymous } = req.body;
        const newPost = new Post({ title, content, tag, createdBy, isAnonymous });
        await newPost.save();
        // Populate createdBy for sending owner's name to frontend
        await newPost.populate('createdBy', 'name');
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PATCH /api/community/:id/upvote - handle upvote
router.patch('/:id/upvote', async (req, res) => {
    try {
        const { userId } = req.body;
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const hasUpvoted = post.upvote.includes(userId);
        const hasDownvoted = post.dowvote.includes(userId);

        if (hasUpvoted) {
            post.upvote = post.upvote.filter(id => id.toString() !== userId);
        } else {
            post.upvote.push(userId);
            if (hasDownvoted) {
                post.dowvote = post.dowvote.filter(id => id.toString() !== userId);
            }
        }

        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PATCH /api/community/:id/downvote - handle downvote
router.patch('/:id/downvote', async (req, res) => {
    try {
        const { userId } = req.body;
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const hasDownvoted = post.dowvote.includes(userId);
        const hasUpvoted = post.upvote.includes(userId);

        if (hasDownvoted) {
            post.dowvote = post.dowvote.filter(id => id.toString() !== userId);
        } else {
            post.dowvote.push(userId);
            if (hasUpvoted) {
                post.upvote = post.upvote.filter(id => id.toString() !== userId);
            }
        }

        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;