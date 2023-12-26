const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const secret = crypto.randomBytes(64).toString('hex');

const app = express();
const port = 3000;

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));

const dummyUser = {
    username: 'dzaja',
    password: 'dzaja'
};

const isAuthenticated = (req, res, next) => {
    if (req.session.authenticated) {
        next();
    } else {
        res.redirect('/login');
    }
};

app.get('/', isAuthenticated, (req, res) => {
    res.send('Dobrodošli!!');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === dummyUser.username && password === dummyUser.password) {
        req.session.authenticated = true;
        res.redirect('/');
    } else {
        res.send('Netačni podaci');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});