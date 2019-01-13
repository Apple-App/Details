const nano = require('nano')('http://localhost:5984');

const details = nano.db.use('details');

module.exports = details;

// details.insert({ MovieId: 200 }, "movie").then(body => {
//   console.log(body);
// });

// details.get("movies").then(body => {
//   console.log(body);
// });
