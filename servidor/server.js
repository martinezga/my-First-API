const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post('/algo', (req, res) => {
    res.json(req.body);
})

app.get('/', (req, res) => {
    res.send('welcome')
});

const cars = [
    {
        id: 1,
        model: 'toyota'
    }, {
        id: 2,
        model: 'ford'
    },
]

app.get('/cars', (req, res) => {
    res.json(cars);
});

app.post('/cars', (req, res) => {
    cars.push(req.body);
    console.log('New car pushed to array');
    res.json(req.body);
})

app.get('/cars/:indice', (req, res) => {
    const { indice } = req.params;
    console.log(indice)
    const findCarID = cars.find(item => item.id == indice);
    console.log(findCarID)
    if (!findCarID) {
        return res.status(404).send('Car not found');
    }
    res.send(findCarID)
})

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