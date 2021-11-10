const LocalStrategy = require('passport-local').Strategy;
const db = require('./database/index');
const bcrypt = require('bcrypt');

function initialize(passport) {

  const authenticatUser = (username, password, done)=>{
    db.checkUsername(username)
    .then((results) => {
      if (results.rows.length>0 ){
        const user = results.row[0];
        bcrypt.compare(password, user.password, (err, isMatch)=>{
          if (err) {throw err;}
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, {message: 'Invalid Credentials'})
          }
        })
      } else {
        return done(null, false, {message: 'Email is not registered'})
      }
    })

  }
  passport.use(new LocalStrategy({
    usernameField: "username",
    passwordField: "passcode"
  }, authenticatUser))

  passport.serializeUser((user, done)=>done(null, user.id));
  passport.deserializeUser((user, done)=>{
    db.serialize(id)
    .then((results) => {
      return done(null,results.row[0])
      })
  });
}

module.exports = {
  initialize

};


