const mongoose = require('mongoose');
const { Schema }= mongoose;
const { parseMovie, findByMovieDBId: findMovieById } = require('./movies');
const debug = require('debug')('server:model:user');

const UserSchema = new Schema({
  id: Number,
  username: {
    type: String,
    unique: true,
    index: true,
  },
  password: String,
  favoriteMovies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }]
});

const User = mongoose.model('User', UserSchema);

async function findByName(username) {
  return await User.findOne({ username: username });
}
async function findById(id) {
  return await User.findOne({ _id: id });
}

async function create({ username, password }) {
  const user = new User({ username, password });
  await user.save();
}

async function addFavoriteMovie(user, movieDBId) {
  debug(`user`, user)
  const movie = await findMovieById(movieDBId);
  const _user  =  await User.findOne({ _id: user._id });
  // if no movie found an not found exception will be throw
  _user.favoriteMovies.push(movie._id);
  debug(`saving user ${user._id} with new movie ${movie.id}`);
  return await _user.save();
}

async function getFavoriteMovies(id) {
  const { favoriteMovies } = await User
    .findOne({ _id: id })
    .populate('favoriteMovies');
  return favoriteMovies.map(parseMovie);
}

module.exports = {
  findByName,
  findById,
  create,
  addFavoriteMovie,
  getFavoriteMovies,
};