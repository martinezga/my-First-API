const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken')

const seq = new Sequelize('mysql://Da8Y4VxBu2:ZUr59t4Fgf@remotemysql.com:3306/Da8Y4VxBu2');

seq.authenticate()
    .then(console.log('Connection has been established successfully.')
    )
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const mySignature = 'q2wEsup3rPAssword075';

module.exports = {
   createProduct: (req, res) => {
        const foundProduct = seq.query('SELECT productName FROM products WHERE productName = :productName', 
        { replacements: req.body, type: seq.QueryTypes.SELECT })
        .then(results => {
            const {productName} = results[0] || {}
            if ( productName === req.body.productName) {
                res.status(201).end('Product already exist.')
            } else {
                seq.query( 'INSERT INTO products (productName, price, units) VALUES (:productName, :price, :units) ', 
                    { replacements: req.body })
                    .then(res.status(201).end('Product successfully created.') )
                    .catch(error => console.log(error) || res.status(400).end('Invalid data') )
            }
        })
    },

    getProducts: (req, res) => 
        seq.query('SELECT * FROM products').then(rows => res.status(200).json(rows[0])),

    verifyProductId: (req, res) => {
        s
    },
    
    getProductById: (req, res) => {
        seq.query('SELECT * FROM products WHERE productId = :productId ', 
            { replacements: req.params, type: seq.QueryTypes.SELECT })
            .then(results => res.status(200).json(results) )
    },

    updateProducts: (req, res) => {
        seq.query('UPDATE products SET price = :price, units = :units WHERE productId = :productId ', 
            { replacements: { productId: req.params.productId, price: req.body.price, units: req.body.units } })
            .then(results => res.status(201).json('Price and units successfully updated') )
            .catch(error => res.status(400).end('Invalid data'))
    },

    deleteProducts: (req, res) => {
        seq.query('DELETE FROM products WHERE productId = :productId ',
            { replacements: req.params })
            .then(results => res.status(201).json('Product successfully deleted'))
    },

    createCustomers: (req, res) => {
        seq.query( 'INSERT INTO customers (username, fullname, email, phone, address, password) VALUES (:username, :fullname, :email, :phone, :address, :password) ', 
            { replacements: req.body })
            .then(results => console.log(results) || res.status(201).end('Account successfully created. Thank you for your registration!') )
            .catch(error => console.log(error) || res.status(400).end('Invalid data') )
    },
    
    getCustomers: (req, res) => 
        seq.query('SELECT * FROM customers', { type: seq.QueryTypes.SELECT })
            .then(rows => res.status(200).json(rows)),  
    
    
    //testfinder:,
    
    validateUserAndPass: (req, res, next) => seq.query('SELECT username, password, userRole FROM customers where username = ":username"', { type: seq.QueryTypes.SELECT })
        .then(results => {
            // if( !results.find( customerUsername => customerUsername.username === req.body.username ) ) {
            //     return res.status(401).send('Cannot login. User')
            // }
            const { username, password, isAdmin } = results[0] || {}
            if(password === req.body.usersPassword) {
                req.user = { username, isAdmin }
                next()
            }
            if( !results.find( customerPass => customerPass.usersPassword === req.body.usersPassword ) ) {
                return res.status(401).send('Cannot login. Pass')
            } else {
                console.log('User verified')
                next()
            }
        }),
    
    qqqverifyProducts: (req, res) => {
        const { productsName } = req.params;
        const foundProduct = seq.query('SELECT productName FROM products', { type: seq.QueryTypes.SELECT } )
            .then(results => {
                console.log(results);/*
                if( results.find( productList => productList.productsName === productsName )) {
                    console.log(productsName)
                    return res.status(404).send('Product not found.')
                }*/
            })
    },
    

    
    qqqverifyUserAndMail: (req, res, next) => seq.query('SELECT username, email FROM customers', { type: seq.QueryTypes.SELECT })
    .then(results => {
        if(results.find( customerEmail => customerEmail.email === req.body.email ) ) {
            return res.status(404).send('Cannot create account, email address is already used.')
        }
        if( results.find( customerUsername => customerUsername.username === req.body.username ) ) {
            return res.status(404).send('Cannot create account, username is already used.')
        } else {
            next()
        }
    }),

    verifyUserAndMail: (req, res, next) => {
        const { username } = req.body;
        const foundUser = seq.query('SELECT email FROM customers WHERE username = ":username"', 
            { type: seq.QueryTypes.SELECT } )
            .then(results => console.log(results) || res.status(200).end('lll'))
            .catch(error => console.log(error) || res.status(400).end('Invalid user.') )
    },

    loginUser: (req, res) => {
        const token = jwt.sign( req.user, mySignature );
        return res.json({ token })
        /* const { username } = req.user; 
        const token = jwt.sign( { username }, mySignature );
        res.json({ token }) 
        //=> sessionStorage.setItem('')*/
    },
    authenticateUser: (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            console.log(token)
            const user = jwt.verify(token, mySignature);
            if(user.isAdmin) {
                req.user = user;
                return next()
            }
        }
        catch(err) {
            res.status(401).json({ error: 'Error. Cant validate'})
        }
    },
}