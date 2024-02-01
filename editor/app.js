const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const {response} = require("express");
const secret = crypto.randomBytes(64).toString('hex');
const fs = require('node:fs');

const app = express();
const port = 3000;

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended: true}));
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

app.post('/spremi', express.raw({type: '*/*'}), isAuthenticated, (req, res) => {
    let ime = JSON.parse(req.body.toString()).ime
    fs.writeFileSync("public/test_data/" + ime + ".json", req.body.toString(), err => {
        console.log(err)
    })

    let index = fs.readFileSync("public/test_data/index.json")
    let indexObj = JSON.parse(index);

    if (!indexObj.testovi.includes(ime + ".json", 0)) {
        indexObj.testovi.push(ime + ".json")
    } else {
        console.log("fajl postoji")
    }

    fs.writeFileSync("public/test_data/index.json", JSON.stringify(indexObj), err => {
        console.log(err)
    })

    fs.rmSync("../test_data/", {recursive: true, force: true});
    fs.cpSync("public/test_data/", "../test_data/", {recursive: true});
    res.sendStatus(200);
})

app.post('/obrisi', express.raw({type: '*/*'}), isAuthenticated, (req, res) => {
    let imeFajla = JSON.parse(req.body.toString()).ime

    console.log(JSON.parse(req.body.toString()).ime)

    fs.rmSync("public/test_data/" + imeFajla)

    let index = fs.readFileSync("public/test_data/index.json")
    let indexObj = JSON.parse(index);

    indexObj.testovi = indexObj.testovi.filter((file) => file !== imeFajla.trim())

    fs.writeFileSync("public/test_data/index.json", JSON.stringify(indexObj), err => {
        console.log(err)
    })

    fs.rmSync("../test_data/", {recursive: true, force: true});
    fs.cpSync("public/test_data/", "../test_data/", {recursive: true});
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