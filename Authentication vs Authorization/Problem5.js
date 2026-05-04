const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const JWT_SECRET = 'my-jwt-secret-key';

app.use(session({
    secret: 'session-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

app.use(passport.initialize());
app.use(passport.session());

const users = [];

passport.use('local', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
        try {
            const user = users.find(u => u.email === email);
            if (!user) {
                return done(null, false, { message: 'User not found' });
            }

            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
                return done(null, false, { message: 'Incorrect password' });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

passport.use('jwt', new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET
    },
    (payload, done) => {
        try {
            const user = users.find(u => u.id === payload.id);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (error) {
            return done(error, false);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = users.find(u => u.id === id);
    if (user) {
        done(null, { id: user.id, username: user.username, email: user.email });
    } else {
        done(new Error('User not found'));
    }
});

app.post('/auth/register', async (req, res) => {
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

app.post('/auth/login',
    (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return res.status(500).json({ error: 'Something went wrong' });
            }
            if (!user) {
                return res.status(401).json({ error: info.message || 'Login failed' });
            }

            req.logIn(user, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Login failed' });
                }

                res.json({
                    message: 'Login successful (session)',
                    user: { id: user.id, username: user.username, email: user.email }
                });
            });
        })(req, res, next);
    }
);

app.post('/auth/api-login',
    (req, res, next) => {
        passport.authenticate('local', { session: false }, (err, user, info) => {
            if (err) {
                return res.status(500).json({ error: 'Something went wrong' });
            }
            if (!user) {
                return res.status(401).json({ error: info.message || 'Login failed' });
            }

            const token = jwt.sign(
                { id: user.id, email: user.email, role: user.role },
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.json({
                message: 'Login successful (JWT)',
                token: token,
                user: { id: user.id, username: user.username, email: user.email }
            });
        })(req, res, next);
    }
);

app.get('/dashboard', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: 'Please login with session auth' });
    }

    res.json({
        message: 'Welcome to dashboard',
        user: req.user,
        authMethod: 'session'
    });
});

app.get('/api/profile',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json({
            message: 'Profile accessed via JWT',
            user: {
                id: req.user.id,
                username: req.user.username,
                email: req.user.email
            },
            authMethod: 'jwt'
        });
    }
);

app.post('/auth/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ error: 'Logout failed' });
        }
        req.session.destroy();
        res.json({ message: 'Logged out successfully' });
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});