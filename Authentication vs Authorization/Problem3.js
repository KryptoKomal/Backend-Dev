const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const app = express();
app.use(express.json());

app.use(session({
    secret: 'auth-secret',
    resave: false,
    saveUninitialized: false
}));

const users = [
    { id: 1, username: 'alice', email: 'alice@example.com', password: '', role: 'user' },
    { id: 2, username: 'bob', email: 'bob@example.com', password: '', role: 'moderator' },
    { id: 3, username: 'charlie', email: 'charlie@example.com', password: '', role: 'admin' }
];

const posts = [
    { id: 1, title: 'First Post', content: 'Hello world', authorId: 1 },
    { id: 2, title: 'Second Post', content: 'Another post', authorId: 1 }
];

const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        req.user = users.find(u => u.id === req.session.userId);
        return next();
    }
    res.status(401).json({ error: 'Please login first' });
};

const requireRole = (role) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const roleOrder = { user: 1, moderator: 2, admin: 3 };

        if (roleOrder[req.user.role] < roleOrder[role]) {
            return res.status(403).json({
                error: 'You do not have permission to do this',
                required: role,
                yours: req.user.role
            });
        }

        next();
    };
};

const isOwnerOrModerator = (req, res, next) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);

    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }

    const roleOrder = { user: 1, moderator: 2, admin: 3 };
    const isModerator = roleOrder[req.user.role] >= roleOrder['moderator'];
    const isOwner = post.authorId === req.user.id;

    if (!isOwner && !isModerator) {
        return res.status(403).json({ error: 'You can only edit your own posts' });
    }

    req.post = post;
    next();
};

app.post('/login', async (req, res) => {
    const { username } = req.body;
    const user = users.find(u => u.username === username);

    if (!user) {
        return res.status(401).json({ error: 'User not found' });
    }

    req.session.userId = user.id;
    res.json({
        message: 'Login successful',
        user: { id: user.id, username: user.username, role: user.role }
    });
});

app.post('/posts', isAuthenticated, (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    const newPost = {
        id: posts.length + 1,
        title: title,
        content: content,
        authorId: req.user.id
    };

    posts.push(newPost);

    res.status(201).json({
        message: 'Post created',
        post: newPost
    });
});

app.put('/posts/:id', isAuthenticated, isOwnerOrModerator, (req, res) => {
    const { title, content } = req.body;

    if (title) req.post.title = title;
    if (content) req.post.content = content;

    res.json({
        message: 'Post updated',
        post: req.post,
        updatedBy: req.user.username
    });
});

app.delete('/posts/:id', isAuthenticated, requireRole('moderator'), (req, res) => {
    const postId = parseInt(req.params.id);
    const index = posts.findIndex(p => p.id === postId);

    if (index === -1) {
        return res.status(404).json({ error: 'Post not found' });
    }

    posts.splice(index, 1);

    res.json({
        message: 'Post deleted',
        deletedBy: req.user.username
    });
});

app.get('/admin/users', isAuthenticated, requireRole('admin'), (req, res) => {
    res.json({
        message: 'User list - admin only',
        users: users.map(u => ({ id: u.id, username: u.username, role: u.role }))
    });
});

app.get('/posts', (req, res) => {
    res.json({ posts: posts });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});