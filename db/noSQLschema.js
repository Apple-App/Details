const nano = require('nano');

if (process.env === 'production') {
  let db = nano(process.env.COUCH_URI);
  const details = db.use('details');
  module.exports = details;
} else {
  let db = nano('http://localhost:5984');
  const details = db.use('details');
  module.exports = details;
}

// details.insert({ MovieId: 200 }, "movie").then(body => {
//   console.log(body);
// });

// details.get("movies").then(body => {
//   console.log(body);
// });
