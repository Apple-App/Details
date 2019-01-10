const MovieSchema = require("../db/schema.js");

module.exports = (movieId, cb) => {
  MovieSchema.findOne({ MovieId: movieId }, (err, movie) => {
    cb(err, movie);
  });
};
