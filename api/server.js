const { createProduct, getProducts, getProductById, updateProduct, deleteProduct, verifyUserAndMail, createUser, getUsers, updateUser, validateUserAndPass, loginUser, authenticateUser, authenticateAdmin} = require('./functions');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to my API')
});

app.post('/products', createProduct);/*authenticateAdmin*/

app.get('/products', getProducts);

app.get('/products/:productId', getProductById);

app.put('/products/:productId', updateProduct);/*authenticateAdmin*/

app.delete('/products/:productId', deleteProduct)/*authenticateAdmin*/

app.post('/customers', verifyUserAndMail, createUser);

app.get('/customers', getUsers);/*authenticateAdmin*/

app.put('/customers/:email', authenticateUser, updateUser);/*authenticateUser*/

app.post('/login', validateUserAndPass, loginUser);

app.post('/verified', authenticateUser, (req, res) => {
    res.send('autenticado')
})
//hasta aqui
//app.post('/orders', createOrder)/*authenticateUser*/

//app.get('/orders', getOrders)/*authenticateAdmin*/

//app.get('/orders/:orderId', getOrderById)/*authenticateUser*/

//app.put('/orders/:orderId', updateStatus) /*authenticateAdmin*/

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