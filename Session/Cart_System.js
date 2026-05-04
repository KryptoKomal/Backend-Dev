const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: true
}));

app.post("/add-to-cart", (req, res) => {
    const { item } = req.body;

    if (req.session.user) {
        
        if (!req.session.cart) req.session.cart = [];
        req.session.cart.push(item);

        res.send("Item added to session cart");
    } else {
        
        let cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
        cart.push(item);

        res.cookie("cart", JSON.stringify(cart));
        res.send("Item added to cookie cart");
    }
});

app.get("/cart", (req, res) => {
    if (req.session.user) {
        return res.send({
            type: "session",
            cart: req.session.cart || []
        });
    } else {
        const cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
        return res.send({
            type: "cookie",
            cart: cart
        });
    }
});

app.post("/login", (req, res) => {
    const { username } = req.body;

    req.session.user = username;

    if (req.cookies.cart) {
        const cookieCart = JSON.parse(req.cookies.cart);

        if (!req.session.cart) req.session.cart = [];
        req.session.cart = [...req.session.cart, ...cookieCart];

        res.clearCookie("cart");
    }

    res.send("Login successful, cart migrated");
});

app.get("/logout", (req, res) => {
    req.session.destroy();
    res.send("Logged out");
});

app.listen(3000, () => {
    console.log("Server running ");
});