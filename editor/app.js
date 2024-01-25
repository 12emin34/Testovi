const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const {response} = require("express");
const secret = crypto.randomBytes(64).toString('hex');

const app = express();
const port = 3000;

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.raw());
app.use(express.static("public"));

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

app.post('/spremi', isAuthenticated, (req, res) => {
    console.log(req.body)
    res.sendStatus(200);
})

app.get('/editor', isAuthenticated, (req, res) => {
    res.sendFile(__dirname + '/pocetnaEditor.html');
})

app.get('/', isAuthenticated, (req, res) => {
    res.redirect('/editor');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.post('/login', (req, res) => {
    const {username, password} = req.body;

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