const { createProduct, getProducts, getProductById, updateProducts, deleteProducts, verifyUserAndMail, validateUserAndPass,  modifyProducts, createCustomers, getCustomers, loginUser, authenticateUser} = require('./functions');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to my API')
});

app.post('/products', createProduct);/*admin*/

app.get('/products', getProducts);

app.get('/products/:productId', getProductById);

app.put('/products/:productId', updateProducts);/*admin*/

app.delete('/products/:productId', deleteProducts)/*admin*/

app.post('/customers', verifyUserAndMail, createCustomers);

app.get('/customers', getCustomers);/*admin*/

//app.put('/customers/:email', modifyUsers);/*updateUsers*/

app.post('/login', validateUserAndPass, loginUser);

app.post('/verfied', authenticateUser, (req, res) => {
    res.send('autenticado')
})

//app.post('/orders', createOrders)

//app.get('/orders', getOrders)/*admin*/

//app.get('/orders/:orderId', getOrdersById)

//app.put('/orders/:orderId', updateStatus) /*admin*/

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