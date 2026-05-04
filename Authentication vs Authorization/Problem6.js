const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
app.use(express.json());

const users = [];
const loginAttempts = new Map();

const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 30 * 60 * 1000;

function checkLoginAttempts(email) {
    const data = loginAttempts.get(email);

    if (!data) {
        return { allowed: true };
    }

    if (data.lockUntil && Date.now() < data.lockUntil) {
        const minutesLeft = Math.ceil((data.lockUntil - Date.now()) / 60000);
        return {
            allowed: false,
            message: `Account locked. Try again in ${minutesLeft} minute(s).`
        };
    }

    if (data.lockUntil && Date.now() >= data.lockUntil) {
        loginAttempts.delete(email);
        return { allowed: true };
    }

    return { allowed: true, attemptsLeft: MAX_ATTEMPTS - data.count };
}

function recordFailedAttempt(email) {
    const data = loginAttempts.get(email) || { count: 0, lockUntil: null };

    data.count += 1;

    if (data.count >= MAX_ATTEMPTS) {
        data.lockUntil = Date.now() + LOCKOUT_TIME;
    }

    loginAttempts.set(email, data);

    return {
        count: data.count,
        locked: data.count >= MAX_ATTEMPTS,
        attemptsLeft: Math.max(0, MAX_ATTEMPTS - data.count)
    };
}

function clearAttempts(email) {
    loginAttempts.delete(email);
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
            password: hashedPassword
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

        const attemptCheck = checkLoginAttempts(email);
        if (!attemptCheck.allowed) {
            return res.status(429).json({ error: attemptCheck.message });
        }

        const user = users.find(u => u.email === email);
        if (!user) {
            recordFailedAttempt(email);
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            const result = recordFailedAttempt(email);

            if (result.locked) {
                return res.status(429).json({
                    error: 'Too many failed attempts. Account locked for 30 minutes.'
                });
            }

            return res.status(401).json({
                error: 'Invalid credentials',
                attemptsLeft: result.attemptsLeft
            });
        }

        clearAttempts(email);

        res.json({
            message: 'Login successful',
            user: { id: user.id, username: user.username, email: user.email }
        });

    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});