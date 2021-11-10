const { Pool } = require('pg');

const pool = new Pool({
  user: 'booradley',
  host: 'localhost',
  database: 'robinwood',
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
  // console.log(psqlStatementArray);
  return pool.query(psqlStatementArray, paramsArray)
};

const checkUser= (email) => {
  const psqlStatementArray = `SELECT * FROM
  users WHERE email = $1`;
  return pool.query(psqlStatementArray, [email])
  .then((result) => {
    return result;
  });
};

const checkUsername= (username) => {
  const psqlStatementArray = `SELECT * FROM
  users WHERE username = $1`;
  return pool.query(psqlStatementArray, [username])
  .then((result) => {
    return result;
  });
};


// const getHome = (callback) => {
//   const psqlStatement = 'SELECT NOW()';
//   pool.query(psqlStatement, callback);
// };



// const getReviewMetaRatings = (params) => {
//   const psqlStatement = `SELECT
//   json_object_agg(
//     to_char(results.rating, 'FM9999'),
//     to_char(results.count, 'FM9999')) AS ratings
//   FROM
//   (SELECT reviews.rating,
//   COUNT(*)
//   FROM reviews
//   WHERE product_id = ${params[0]}
//   GROUP BY 1
//   ORDER BY 1) results
//   `;
//   return pool.query(psqlStatement);
// };

// const getReviewMetaRecs = (params) => {
//   const psqlStatement = `SELECT
//   json_build_object(
//   'false', to_char(SUM(CASE WHEN "recommend" = false THEN 1 ELSE 0 END), 'FM9'),
//   'true', to_char(SUM(CASE WHEN "recommend" = true THEN 1 ELSE 0 END), 'FM9')
//   ) AS recommended
//   FROM reviews
//   WHERE reviews.product_id = ${params[0]}
//   GROUP BY reviews.product_id
//   `;
//   return pool.query(psqlStatement);
// };



// const postReviewPhotos = (reviewId, photos) => {
//   // console.log('photos', photos);
//   if (photos === undefined || photos.length === 0) {
//     return null;
//   }
//   const photosSQL = photos.map((url, index) => {
//     if (index === photos.length - 1) {
//       return `(${reviewId}, '${url}')`;
//     }
//     return `(${reviewId}, '${url}'), `;
//   }).join(' ');
//   // console.log('photosSQL', photosSQL);
//   const psqlStatement = `INSERT INTO
//   reviews_photos (review_id, url)
//   VALUES ${photosSQL};`;
//   // console.log('psqlStatement', psqlStatement);

//   return pool.query(psqlStatement);
// };



// const markHelpful = (reviewId) => {
//   const psqlStatement = `UPDATE reviews
//   SET "helpfulness" = CASE
//     WHEN helpfulness IS NULL THEN 1
//     ELSE helpfulness + 1
//     END
//   WHERE id = ${reviewId}
//   RETURNING id
//   `;
//   return pool.query(psqlStatement)
//     .then((result) => {
//       // If no rows were updated, the row doesn't exist
//       if (result.rows.length === 0) {
//         throw new Error('Error: Could not mark the review as helpful.');
//       }
//       return result;
//     });
// };



module.exports = {
  postUser, checkUser, checkUsername

};
