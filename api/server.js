const { createProduct, getProducts, verifyProductId, getProductById, updateProduct, deleteProduct, verifyUserAndMail, createUser, getUsers, updateUser, validateUserAndPass, loginUser, authenticateUser, authenticateAdmin, createOrder, getOrders, getOrderByUserId, updateStatusbyOrderId, deleteOrderById} = require('./functions');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to my API')
});

app.post('/products', authenticateAdmin, createProduct);/*authenticateAdmin*/

app.get('/products', getProducts);

app.get('/products/:productId', verifyProductId, getProductById);

app.put('/products/:productId', authenticateAdmin, verifyProductId, updateProduct);/*authenticateAdmin*/

app.delete('/products/:productId', authenticateAdmin, verifyProductId, deleteProduct)/*authenticateAdmin*/

app.post('/customers', verifyUserAndMail, createUser);

app.get('/customers', authenticateAdmin, getUsers);/*authenticateAdmin*/

app.put('/customers/:email', authenticateUser, updateUser);/*authenticateUser*/

app.post('/login', validateUserAndPass, loginUser);

app.post('/verified', authenticateUser, (req, res) => {
    res.send('autenticado')
})

app.post('/orders', authenticateUser, createOrder)/*authenticateUser*/

app.get('/orders', authenticateAdmin, getOrders)/*authenticateAdmin*/

app.get('/orders/:userId', authenticateUser, getOrderByUserId)/*authenticateUser*/

app.put('/orders/:orderId', authenticateAdmin, updateStatusbyOrderId) /*authenticateAdmin*/

app.delete('/orders/:orderId', authenticateAdmin, deleteOrderById) /*authenticateAdmin*/

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