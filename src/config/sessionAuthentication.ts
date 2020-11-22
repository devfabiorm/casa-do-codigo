import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import UserDao, { User } from '../app/infra/userDao';
import db from './database';


passport.use(new LocalStrategy(
  {
    usernameField: 'email'
  },
  function(email, password, done) {
    const userDao = new UserDao(db);
    userDao.findByEmail(email)
      .then(user => {
        if(!user || password !== user.password) {
          return done(null, false, { message: 'Credenciais inválidas' })
        }

        return done(null, user);
      })
      .catch(err => done(err));
  }
))

passport.serializeUser(function(user: User, done) {
  const userSession = {
    name: user.full_name,
    email: user.email
  }

  done(null, userSession);
});

passport.deserializeUser(function(userSession, done) {
  done(null, userSession);
});

export default passport;