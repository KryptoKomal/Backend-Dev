const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
app.use(express.json());

const ACCESS_SECRET = 'access-secret';
const REFRESH_SECRET = 'refresh-secret';

const users = [];
const refreshTokens = new Set();

function generateAccessToken(user) {
    return jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        ACCESS_SECRET,
        { expiresIn: '15m' }
    );
}

function generateRefreshToken(user) {
    return jwt.sign(
        { id: user.id, email: user.email },
        REFRESH_SECRET,
        { expiresIn: '7d' }
    );
}

app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (users.find(u => u.email === email)) {
            return res.status(409).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            id: users.length + 1,
            username: username,
            email: email,
            password: hashedPassword,
            role: 'user'
        };

        users.push(newUser);

        res.status(201).json({
            message: 'User registered successfully',
            user: { id: newUser.id, username: newUser.username, email: newUser.email }
        });

    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        refreshTokens.add(refreshToken);

        res.json({
            message: 'Login successful',
            accessToken: accessToken,
            refreshToken: refreshToken,
            user: { id: user.id, username: user.username, email: user.email }
        });

    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

app.post('/token/refresh', (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ error: 'Refresh token is required' });
    }

    if (!refreshTokens.has(refreshToken)) {
        return res.status(403).json({ error: 'Invalid refresh token' });
    }

    try {
        const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
        const user = users.find(u => u.id === decoded.id);

        if (!user) {
            return res.status(403).json({ error: 'User not found' });
        }

        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        refreshTokens.delete(refreshToken);
        refreshTokens.add(newRefreshToken);

        res.json({
            message: 'Token refreshed',
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        });

    } catch (error) {
        refreshTokens.delete(refreshToken);
        return res.status(403).json({ error: 'Refresh token expired or invalid' });
    }
});

app.post('/logout', (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ error: 'Refresh token is required' });
    }

    refreshTokens.delete(refreshToken);

    res.json({ message: 'Logged out successfully' });
});

app.get('/protected', (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Access token required' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, ACCESS_SECRET);
        const user = users.find(u => u.id === decoded.id);

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        res.json({
            message: 'Protected route accessed successfully',
            user: { id: user.id, username: user.username, email: user.email }
        });

    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired access token' });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});