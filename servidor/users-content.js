const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('welcome')
});

const mySign = 'mySuperPassword';

let usersArray = [
    {
        id: 1,
        userName: 'gaby',
        realName: 'martinez',
        email: 'lalala@gmail.com',
        phone: 1234,
        address: 'lals',
        registerPassword: 'gabyPassword'
    }
];

app.get('/users', (req, res) => {
    res.json(usersArray)
});

app.post('/users', (req, res) => {
    const verifyEmail = usersArray.find(user => user.email === req.body.email);
    if( verifyEmail ) {
        return res.status(404).send('Cannot create user, email address is already used');
    } else {
        usersArray.push(req.body);
        console.log('New user pushed to array');
        res.json(req.body);
    }
});

app.put('/users/:userEmail', (req, res) => {
    const { userEmail } = req.params;
    const newUser = req.body;

    const foundUser = usersArray.find(user => user.email === userEmail);
    if ( !foundUser ) {
        return res.status(404).send('User not found');
    }
    usersArray = usersArray.map(user => user === foundUser? Object.assign({}, foundUser, newUser) : user)
    console.log(usersArray)
    res.status(204).end()
});
//predicate, some

function validateUserAndPassword(user, email) {
    const filterUser = usersArray.find(search => user.search === req.body.userName && search.email === req.body.email )
    if (!filterUser) {
        return false
    }
    return filterUser;
}

app.post('/login', (req, res) => {
    const {userName, registerPassword} = req.body;

    const token = jwt.sign(usersArray, mySign);
    res.json({ token })
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