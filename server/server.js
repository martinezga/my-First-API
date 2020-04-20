const { createUsers, modifyUsers } = require('./functions');
const { verifyUserAndMail, validateUserAndPass, verifyProducts, createProducts, getProducts, modifyProducts, createCustomers, getCustomers, loginUser} = require('./mysql2');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome')
});

app.post('/products', createProducts);

app.get('/products', getProducts);

app.get('/products/:productsName', verifyProducts);

//app.put('products/:productsName', verifyProducts, modifyProducts)

app.post('/customers', verifyUserAndMail, createCustomers);

app.get('/customers', getCustomers);

app.put('/customers/:email', modifyUsers);

app.post('/login', validateUserAndPass, loginUser);

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