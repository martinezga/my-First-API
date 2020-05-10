const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken')

const seq = new Sequelize('mysql://Da8Y4VxBu2:ZUr59t4Fgf@remotemysql.com:3306/Da8Y4VxBu2');

seq.authenticate()
    .then(console.log('Connection has been established successfully.')
    )
    .catch(error => {
        console.error('Unable to connect to the database:', error);
    });

const mySignature = 'q2wEsup3rPAssword075';

module.exports = {
   createProduct: (req, res) => {
        seq.query( 'INSERT INTO products (productName, price, units) VALUES (:productName, :price, :units) ', 
            { replacements: req.body })
            .then(res.status(201).end('Product successfully created.') )
            .catch(res.status(400).end('Error') )
    },

    getProducts: (req, res) => 
        seq.query('SELECT * FROM products')
            .then(rows => res.status(200).json(rows[0]))
            .catch(error => res.status(400).end('Error')),

    verifyProductId: (req, res) => {
        console.log('verifiedId')
    },
    
    getProductById: (req, res) => {
        seq.query('SELECT * FROM products WHERE productId = :productId ', 
            { replacements: req.params, type: seq.QueryTypes.SELECT })
            .then(results => res.status(200).json(results) )
            .catch(error => res.status(400).end('Invalid data'))
    },

    updateProduct: (req, res) => {
        seq.query('UPDATE products SET price = :price, units = :units WHERE productId = :productId ', 
            { replacements: { productId: req.params.productId, price: req.body.price, units: req.body.units } })
            .then(results => res.status(201).json('Price and units successfully updated') )
            .catch(error => res.status(400).end('Invalid data'))
    },

    deleteProduct: (req, res) => {
        seq.query('DELETE FROM products WHERE productId = :productId ',
            { replacements: req.params })
            .then(results => res.status(201).json('Product successfully deleted'))
            .catch(error => res.status(400).end('Invalid data'))
    },

    verifyUserAndMail: (req, res, next) => {
        seq.query('SELECT username FROM customers WHERE username = :username', 
            { replacements: req.body, type: seq.QueryTypes.SELECT } )
            .then(results => {
                const {username} = results[0] || {}
                if (username === req.body.username) {
                    return res.status(401).end('Cannot create account, username is already used.')
                } else {
                    seq.query('SELECT email FROM customers WHERE email = :email',
                    { replacements: req.body, type: seq.QueryTypes.SELECT } )
                    .then(results => {
                        const {email} = results[0] || {}
                        if (email === req.body.email) {
                            return res.status(401).end('Cannot create account, email address is already used.')
                        } else {
                            next()
                        }
                    })
                }
            })
            .catch( error => res.status(400).json({ error: 'Invalid data'}) )
    },

    createUser: (req, res) => {
        seq.query( 'INSERT INTO customers (username, fullname, email, phone, address, password) VALUES (:username, :fullname, :email, :phone, :address, :password) ', 
            { replacements: req.body })
            .then(res.status(201).end('Account successfully created. Thank you for your registration!') )
            .catch(res.status(401).end('Error') )
    },
    
    getUsers: (req, res) => 
        seq.query('SELECT * FROM customers', { type: seq.QueryTypes.SELECT })
            .then(rows => res.status(200).json(rows)),  
    
    updateUser:(req, res) => {
        seq.query('UPDATE customers SET fullname = :fullname, phone = :phone, address = :address WHERE email = :email ', 
            { replacements: { email: req.params.email, fullname: req.body.fullname, phone: req.body.phone, address: req.body.address } })
            .then(results => res.status(201).json('Full name, phone and address successfully updated') )
            .catch( error => res.status(400).end('Invalid data') )
    },
       
    validateUserAndPass: (req, res, next) => seq.query('SELECT username, password, userRole FROM customers WHERE username = :username', 
        { replacements: req.body, type: seq.QueryTypes.SELECT })
        .then(results => {
            const { username, password, userRole } = results[0]
            if(password === req.body.password) {
                req.user = { username, userRole }
                next()
            } else {
                res.status(401).json({ error: 'Invalid data'})
            }
        })
        .catch( error => res.status(401).json({ error: 'Invalid data'}) ),

    loginUser: (req, res) => {
        console.log(req.user)
        const token = jwt.sign( req.user, mySignature );
        return res.json({ token })
    },
    authenticateUser: (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const user = jwt.verify(token, mySignature);
            return next()
        }
        catch(err) {
            res.status(401).json({ error: 'Error'})
        }
    },
    authenticateAdmin: (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const user = jwt.verify(token, mySignature);
            console.log(user.userRole)
            if(user.userRole) {
                req.user = user;
                return next()
            } else {
                res.status(401).json({ error: 'Access denied'})
            }
        }
        catch(err) {
            res.status(401).json({ error: 'Access denied'})
        }
    },
    createOrder: (req, res) => {
    },
}