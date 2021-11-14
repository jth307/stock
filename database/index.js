const { Pool } = require('pg');
// require('dotenv').config()

// // if (process.env.NODE_ENV === 'production') {
// //   console.log('real')

//   const pool = new Pool({
//   //     user: 'booradley',
//   // host: 'localhost',
//   // database: 'robinwood',
//   // port: 5432,
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//       rejectUnauthorized: false
//     }
//   });
// // } else {
// //   console.log('fake')
// // const pool = new Pool({
// //   user: 'dgyizozmegnlwh',
// //   host: 'ec2-44-198-236-169.compute-1.amazonaws.com',
// //   database: 'dbpa1lo0lbar8o',
// //   port: process.env.PORT || 5432,
// // });
// // }

// const pool = new Pool({
//   user: 'booradley',
//   host: 'localhost',
//   database: 'robinwood',
//   port: 5432,
// });

const pool = new Pool({
  user: 'dgyizozmegnlwh',
  host: 'ec2-44-198-236-169.compute-1.amazonaws.com',
  database: 'dbpa1lo0lbar8o',
  password: '4848d623503d947359d1991733bd55dd374afe84bbc4b88ea12bda920bb82519',
  port: 5432,
});



const postUser= (params) => {
  const paramsArray = [
    params.firstname,
    params.lastname,
    params.email,
    params.password,
    params.username,
  ];
  const psqlStatementArray = `INSERT INTO
  users (first_name, last_name, email, passcode, username)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING id
  `;
  return pool.query(psqlStatementArray, paramsArray)
};

const checkUser= (email) => {
  console.log('r u here')
  const psqlStatementArray = `SELECT * FROM
  users WHERE email = $1`;
  return pool.query(psqlStatementArray, [email])
};

const checkUsername= (username) => {
  const psqlStatementArray = `SELECT * FROM
  users WHERE username = $1`;
  return pool.query(psqlStatementArray, [username])
};

const buyOrSellStocks= (params) => {
  const paramsArray = [
    params.stock,
    params.qty,
    params.userID,
  ];
  const psqlStatementArray = `INSERT INTO
  users_stocks (stock, quantity, user_id)
  VALUES ($1, $2, $3)
  RETURNING id
  `;
  return pool.query(psqlStatementArray, paramsArray)
};

const getStocks= (params) => {
  const paramsArray = [
    params.userID
  ];
  const psqlStatementArray = `SELECT * FROM
  users_stocks WHERE user_id = $1
  `;
  return pool.query(psqlStatementArray, paramsArray)
};

const checkInventory= (params) => {
  const paramsArray = [
    params.stock,
    params.userID
  ];
  const psqlStatementArray = `SELECT * FROM
  users_stocks WHERE stock = $1
  AND user_id = $2`;
  return pool.query(psqlStatementArray, paramsArray)
};

const updateInventory= (params) => {
  const paramsArray = [
    params.stock,
    params.qty,
    params.userID,
  ];
  const psqlStatementArray = `UPDATE users_stocks
  SET quantity = quantity + $2
  WHERE user_id = $3
  AND stock = $1
  `;
  return pool.query(psqlStatementArray, paramsArray)
};

const deleteStock= (params) => {
  const paramsArray = [
    params.stock,
    params.userID
  ];
  const psqlStatementArray = `DELETE FROM users_stocks
  WHERE stock = $1
  AND user_id = $2`;
  return pool.query(psqlStatementArray, paramsArray)
};


module.exports = {
  postUser, checkUser, checkUsername, buyOrSellStocks, getStocks, checkInventory, updateInventory, deleteStock
};
