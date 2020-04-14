const { showUsers, verifyEmail, createUsers, modifyUsers } = require('./functions');

const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

const app = express();
const seq = new Sequelize('mysql://root:@localhost:3306/databasetest');

seq
  .authenticate().then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome')
});

app.get('/users', showUsers);

app.post('/users', verifyEmail, createUsers);

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