const { verifyEmail, createUsers, modifyUsers } = require('./functions');
const { createCustomers, getCustomers } = require('./mysql2');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome')
});

app.post('/customers', createCustomers);

app.get('/customers', getCustomers);

app.put('/users/:userEmail', modifyUsers);

app.get('/error', (req, res) => {
    res.status(500);
    res.json({ error: 'error :('});
});

app.use(function(err, req, res, next) {
    if(!err) return next();
    console.log('Something goes wrong', err);
    res.status(500).send('Error');
});

app.listen(3000, () => {
    console.log('Server init')
});