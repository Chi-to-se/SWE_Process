const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const mysql = require('mysql2');
const multer = require('multer');
const fs = require('fs');

const app = express();
const router = express.Router();

app.use(router);
app.use('/', router);
dotenv.config();

// Setup Multer 
const storage = multer.memoryStorage();
const upload = multer( { storage: storage });

// For post method
router.use(express.json());
router.use(express.urlencoded({ extended : true }));

// Static Middleware
app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'public')));

// MySQL Create Connection
const connection = mysql.createConnection
    (
        {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        }
    );

// Connet to MySQL Server
connection.connect( err =>
    {
        if (err) throw err;
        console.log('Connected to MySQL')
    }
)

// SQL table
app.get('/api/records', (req, res) => {
    connection.query('SELECT * FROM TRAINRECORD', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// SQL table get to pre-fill
// router.get('/api/records/:id', (req, res) => {
//     const trainId = req.params.id;
//     console.log(`T_ID:${trainId}`);
//     connection.query('SELECT * FROM TRAINRECORD WHERE T_ID  = ?', [trainId], (err, results) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).send({ error: 'Database query failed' });
//         }
//         res.json(results[0]); // Send only the first record
//     });
// });

// SQL table get to pre-fill
router.get('/api/records/:id', (req, res) => {
    const trainId = req.params.id;
    console.log(trainId);
    connection.query('SELECT * FROM TRAINRECORD WHERE T_ID = ?', [trainId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: 'Database query failed' });
        }
        // Return the first matching record
        res.json(results[0]);
    });
});

// SQL table update
router.post('/api/update', (req, res) => {
    console.log(req.body);
    const trainID = req.body.id;
    const trainDepart = req.body.depart;
    const trainArrive = req.body.arrive;
    const trainPrice = req.body.price;
    const trainSeat = req.body.seat;
    const trainStart = req.body.start;
    const trainDestination = req.body.destination;
    console.log(trainDepart);
    
    
    const updateQuery = `
        UPDATE TRAINRECORD
        SET T_START = ?, T_DESTINATION = ?, T_DETIME = ?, T_ARTIME = ?, T_TICKETPRICE = ?, T_SEAT = ?
        WHERE T_ID = ?
    `;
    
    connection.query(updateQuery, [trainStart, trainDestination, trainDepart, trainArrive, trainPrice, trainSeat,trainID], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Failed to update train data');
        }
        res.send('Train data updated successfully');
    });
});


// login
router.post('/login-check', (req, res) => {
    const username = req.body.user;
    const password = req.body.password;
    console.log(req.body);
    console.log(typeof(username));
    

    const query = 'SELECT * FROM STAFF WHERE S_USERNAME = ? AND S_PASSWORD = ?';
    connection.query(query,[username, password],  (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server error');
        }

        if (results.length > 0) {
            console.log('Login successful');
            res.redirect('/show')
        } else {
            console.log('Login unsuccessful');
        }
    });
});


router.get('/edit', (req,res) => 
    {
        console.log(`Request at ${req.originalUrl}`);
        res.sendFile(path.join(`${__dirname}/public/edit.html`));
    }
)

router.get('/show', (req,res) => 
    {
        console.log(`Request at ${req.originalUrl}`);
        res.sendFile(path.join(`${__dirname}/public/show.html`));
    }
)

router.get('/login', (req,res) => 
    {
        console.log(`Request at ${req.originalUrl}`);
        res.sendFile(path.join(`${__dirname}/public/login.html`));
    }
)

    
const port = process.env.port;
app.listen(port, () => 
    {
        console.log(`Server listening on port: ${port}`);
    }
)

