let usersArray = [
    {
        id: 1,
        name: 'gaby',
        lastName: 'martinez',
        email: 'lalala@gmail.com',
        password: 'pass'
    }
];
module.exports = {
    showUsers: (req, res) => {
        res.json(usersArray)
    },
    verifyEmail: function(req, res, next) {
        const verifyEmail = usersArray.find(user => user.email === req.body.email);
        if( verifyEmail ) {
            return res.status(404).send('Cannot create user, email address is already used');
        } else {
            next()
        }
    },
    createUsers: (req, res) => {
        usersArray.push(req.body);
        console.log('New user pushed to array.', usersArray);
        res.json(req.body);
    },
    modifyUsers: (req, res) => {
        const { userEmail } = req.params;
        const newUser = req.body;
    
        const foundUser = usersArray.find(user => user.email === userEmail);
        if ( !foundUser ) {
            return res.status(404).send('User not found');
        }
        usersArray = usersArray.map(user => user === foundUser? Object.assign({}, foundUser, newUser) : user)
        console.log(usersArray)
        res.status(204).end()
    }
}