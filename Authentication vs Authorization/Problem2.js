const express = require('express');
const session = require('express-session');
const app = express();
app.use(express.json());

app.use(session({
    secret: 'cart-secret',
    resave: false,
    saveUninitialized: false
}));

const products = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Mouse', price: 29 },
    { id: 3, name: 'Keyboard', price: 79 }
];

const initCart = (req, res, next) => {
    if (!req.session.cart) {
        req.session.cart = [];
    }
    next();
};

app.use(initCart);

app.post('/cart/add', (req, res) => {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
        return res.status(400).json({ error: 'productId and quantity are required' });
    }

    const product = products.find(p => p.id === productId);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    const existingItem = req.session.cart.find(item => item.productId === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        req.session.cart.push({
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity
        });
    }

    res.json({
        message: 'Item added to cart',
        cart: req.session.cart
    });
});

app.put('/cart/update/:productId', (req, res) => {
    const productId = parseInt(req.params.productId);
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
        return res.status(400).json({ error: 'Valid quantity is required' });
    }

    const item = req.session.cart.find(i => i.productId === productId);
    if (!item) {
        return res.status(404).json({ error: 'Item not found in cart' });
    }

    item.quantity = quantity;

    res.json({
        message: 'Cart updated',
        cart: req.session.cart
    });
});

app.delete('/cart/remove/:productId', (req, res) => {
    const productId = parseInt(req.params.productId);

    const index = req.session.cart.findIndex(i => i.productId === productId);
    if (index === -1) {
        return res.status(404).json({ error: 'Item not found in cart' });
    }

    req.session.cart.splice(index, 1);

    res.json({
        message: 'Item removed from cart',
        cart: req.session.cart
    });
});

app.get('/cart', (req, res) => {
    const cart = req.session.cart;

    const total = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    res.json({
        cart: cart,
        total: total,
        itemCount: cart.length
    });
});

app.delete('/cart/clear', (req, res) => {
    req.session.cart = [];
    res.json({ message: 'Cart cleared' });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});