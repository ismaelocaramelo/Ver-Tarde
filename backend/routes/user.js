const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const debug = require('debug')('server:router:user');
const { body, validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');
const { hash }= require('bcrypt');
const passport = require('passport');

const router = express.Router();

router.post('/',[
  body('username').exists(),
  body('password').exists(),
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  const { username, password } = matchedData(req);
  debug('password hashed -> start');
  const passwordHashed = await hash(password, 10);
  debug('password hashed -> end');
  try {
    await User.create({ username , password: passwordHashed });
    res.json({ message: 'ok'});
  } catch (e) {
    next(e);
  }
});

router.post('/movies/favorites',[
  body('user').exists(),
], async (req, res, next) => {
  const { user }      = matchedData(req);
  debug(user, 'movies/fav..');
  try {
    const movies = await User.getFavoriteMovies(user._id);
    res.json({ movies });
  } catch (e) {
    next(e);
  }
});

router.post('/favorites', [
  body('movieDBId').exists(),
  body('user').exists(),
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  
  const { user }      = matchedData(req)
  const { movieDBId } = matchedData(req);

  try {
    await User.addFavoriteMovie(user, movieDBId);
    res.json({ message: 'ok' });
  } catch (e) {
    console.log(e);
    next(e);
  }
});


module.exports = router;
