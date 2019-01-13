// mongo
// const MovieSchema = require('../db/mongoSchema.js');
// module.exports = (movieId, cb) => {
//   console.log('id: ', movieId);
//   MovieSchema.findById(movieId, (err, movie) => {
//     console.log('data: ', movie);
//     cb(err, movie);
//   });
// };

// postgres
const MovieSchema = require('../db/schema.js');
module.exports = (movieId, cb) => {
  MovieSchema.findById(movieId).then(data => {
    cb(null, data.dataValues);
  });
};

// rawsql if i could load csv
// 'select movieid,title,theater,showtimes,theaterdetails,trailer,photos,info,cast from movies where id = $1'

// couchdb
// const MovieSchema = require('../db/noSQLschema.js');
// module.exports = (movieId, cb) => {
//   MovieSchema.get(movieId.toString())
//     .then(body => {
//       cb(null, body);
//     })
//     .catch(err => {
//       cb(err);
//     });
// };
