const path = require('path');
const express = require('express');
const db = require('../database/index');
const bcrypt = require('bcrypt');

const app = express();

app.use(express.static(path.join(__dirname, '..', '/client/dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/register', async(req, res) => {
  // console.log('post reviews req.body', req.body);
  if (!req.body) {
    res.status(401).send('Error: Must supply body parameters');
  } else {
    let {firstname, lastname, email, password, username} = req.body;

    let errors = [];

    if (!firstname || !lastname || !email || !password || !username) {
      errors.push({message: "Please enter all fields"})
    }

    if (password.length < 6) {
      errors.push({message: "Password should be at least 6 characters"})
    }


    if (errors.length>0) {
      res.status(200).send({errors})
    } else {

  // form validation passed

      let hashedPassword = await bcrypt.hash(password, 10 )
      req.body.password = hashedPassword

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
        console.log('16',user)
        bcrypt.compare(password, user.passcode, (err, isMatch)=>{
          if (isMatch) {
            console.log('match!')
            res.status(200).send({message:'Success', userID: user.id})
          } else {
            console.log('nah')
            res.status(200).send('Invalid Credentials')
          }
        })
      } else {
        console.log('wtf')
        res.status(200).send('User is not registered')
      }
    })

})

app.post('/updateStockQuantity', (req, res) => {

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

app.post('/getStocks', (req, res) => {

  db.getStocks(req.body)
    .then((result) => {
      res.status(201).send(result.rows);
    })
    .catch((err) => {
      res.status(404).send(`Error: Could not get stock. Data received: ${err}`);
    });
})

app.post('/deleteStock', (req, res) => {

  db.deleteStock(req.body)
    .then((result) => {
      res.status(201).send(result.rows);
    })
    .catch((err) => {
      res.status(404).send(`Error: Could not delete stock. Data received: ${err}`);
    });
})



app.get('/', (req, res) => {
  res.send('Server says hello!');
});

app.listen(9000, () => {
  console.log('connected to server at 9000');
});






// app.get('/', (req, res) => {
//   db.getHome((err, result) => {
//     if (err) {
//       res.status(404).send(err);
//     } else {
//       res.status(200).send(result.rows[0].now);
//     }
//   });
// });

// app.get('/reviews', (req, res) => {
//   // console.log('reviews req.query,', req.query);
//   const productId = req.query.product_id;
//   const sort = req.query.sort || 'relevant';
//   const page = Number.parseInt(req.query.page, 10) || 1;
//   const count = Number.parseInt(req.query.count, 10) || 5;

//   const paramsObj = {
//     productId,
//     sort,
//     page,
//     count,
//   };
//   // console.log('reviews params,', params);

//   db.getReviews(paramsObj, (err, result) => {
//     if (err) {
//       res.status(404).send(`Error: Could not retrieve reviews. Data received: ${err}`);
//     } else {
//       const reviews = {
//         product: productId,
//         page,
//         count,
//         results: result.rows,
//       };
//       res.status(200).send(reviews);
//     }
//   });
// });



// app.post('/reviews', (req, res) => {
//   // console.log('post reviews req.body', req.body);
//   if (!req.body) {
//     res.status(422).send('Error: Must supply body parameters');
//   }
//   db.postReview(req.body)
//     .then(() => {
//       res.status(201).send('Success: Review added.');
//     })
//     .catch((err) => {
//       res.status(404).send(`Error: Could not add the given review. Data received: ${err}`);
//     });
// });

// app.put('/reviews/:review_id/helpful', (req, res) => {
//   const reviewId = req.params.review_id;
//   console.log(req.params)
//   db.markHelpful(reviewId)
//     .then((result) => {
//       res.status(204).send(`Success: Review ${reviewId} marked as helpful. Data received: ${result.rows}`);
//     })
//     .catch(() => {
//       res.status(404).send('An error occurred. If this error persists, contact your instruction team.');
//     });
// });


