const path = require('path');
const express = require('express');
const db = require('../database/index');
const bcrypt = require('bcrypt');
require('dotenv').config()


const app = express();

app.use(express.static(path.join(__dirname, '..', '/client/dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/register', async(req, res) => {
  if (!req.body) {
    res.status(401).send('Error: Must supply body parameters');
  } else {
    let {firstname, lastname, email, password, username} = req.body;

    let errors = [];

    if (!firstname || !lastname || !email || !password || !username) {
      errors.push({message: "Please enter all fields"})
    };

    if (password.length < 6) {
      errors.push({message: "Password should be at least 6 characters"})
    };

    if (errors.length>0) {
      res.status(200).send({errors})
    } else {
  // form validation passed

   console.log('passed validation!')

    let hashedPassword = await bcrypt.hash(password, 10 )
    req.body.password = hashedPassword

    console.log(hashedPassword)

    db.checkUser(email)
    .then((results) => {
      if (results.rows.length>0 ){
        errors.push({message: "Email associated with an existing account"})
        res.status(200).send({errors})
      } else {
        db.checkUsername(username)
        .then((results) => {
          if (results.rows.length>0 ){
            errors.push({message: "Username taken"})
            res.status(200).send({errors})
          } else {
            db.postUser(req.body)
            .then((result) => {
              res.status(201).send(result.rows);
            })
            .catch((err) => {
              res.status(404).send(`Error: Could not add the given user. Data received: ${err}`);
            });
          }
        })
      }
    })
   }
  }
});


app.post('/authenticate', (req, res) => {

  let {username, password} = req.body
  if (!username) {username = 'robinwood'; password = 'password'}
  db.checkUsername(username)
    .then((result) => {
      if (result.rows.length>0 ){
        const user = result.rows[0];
        bcrypt.compare(password, user.passcode, (err, isMatch)=>{
          if (isMatch) {
            console.log('match!')
            res.status(200).send({message:'Success', userID: user.id})
          } else {
            res.status(200).send('Invalid Credentials')
          }
        })
      } else {
        console.log('no user found')
        res.status(200).send('User is not registered')
      }
    })
})

app.put('/updateStockQuantity', (req, res) => {

  db.checkInventory(req.body)
    .then((results) => {
      if (results.rows.length>0 ) {
        db.updateInventory(req.body)
        .then((result) => {
          res.status(201).send(result.rows);
        })
        .catch((err) => {
          res.status(404).send(`Error: Could not update stock quantity. Data received: ${err}`);
        });
      } else {
        db.buyOrSellStocks(req.body)
          .then((result) => {
            res.status(201).send(result.rows);
          })
          .catch((err) => {
            res.status(404).send(`Error: Could not buy stock. Data received: ${err}`);
          });
      }
    })
});

app.get('/getStocks/:user_id', (req, res) => {

  db.getStocks(req.params)
    .then((result) => {
      res.status(201).send(result.rows);
    })
    .catch((err) => {
      res.status(404).send(`Error: Could not get stock. Data received: ${err}`);
    });
})

app.delete('/deleteStock/:stock_id/:user_id', (req, res) => {

  db.deleteStock(req.params)
    .then((result) => {
      res.status(201).send(result.rows);
    })
    .catch((err) => {
      res.status(404).send(`Error: Could not delete stock. Data received: ${err}`);
    });
})


app.get('/', (req, res) => {
  res.send('Server says hello!');
  console.log('get /, server says hello')
});


app.listen((process.env.PORT ||9000), () => {
  console.log('connected to server at ' + (process.env.PORT || 9000) );
});





