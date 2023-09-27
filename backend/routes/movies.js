const movieRouter = require('express').Router();
const { createMovieValidator, deleteMovieValidator } = require('../middlewares/validation');
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

movieRouter.get('/movies', getMovies);

movieRouter.post('/movies', createMovieValidator, createMovie);

movieRouter.delete('/movies/:movieId', deleteMovieValidator, deleteMovie);

module.exports = movieRouter;
