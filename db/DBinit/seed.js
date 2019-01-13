const fs = require('fs');
const Movie = require('../schema.js');
const now = require('performance-now');
const mockarooData = fs.readFileSync('./MOCK_DATA.json');
const movieData = JSON.parse(mockarooData.toString());
const videos = require('./youtubeLinks.js');

//raw sql
// const format = require('pg-format');
// const client = require('../schema.js').client;
// const Movie = require('../schema.js').Movie;

//for creating csv file
// const converter = require('json-2-csv');
// const promisify = require('util').promisify;

//to generate data

// var movieId = 1;

// const adjustData = b => {
//   var dataToEnterTheDB = [];
//   var possibleDetails = [
//     'Closed Caption',
//     'Accessibility Devices Available',
//     'Dolby Cinema @ AMC',
//     'Recliner Seats',
//     'Seat Side Service',
//     'Reserved Seating',
//     'Intermission'
//   ];

//   var ratings = ['G', 'PG', 'PG-13', 'R'];
//   for (var a = 0; a < b; a++) {
//     for (var i = 0; i < movieData.length; i++) {
//       let movie = JSON.parse(JSON.stringify(movieData[i]));
//       //MOVIE ID
//       movie.MovieId = movieId++;
//       //THEATER DETAILS
//       let amountOfDetails = Math.floor(
//         Math.random() * (possibleDetails.length - 2) + 2
//       );
//       let details = [];
//       for (var x = 0; x < amountOfDetails; x++) {
//         details.push(possibleDetails[x]);
//       }
//       movie['TheaterDetails'] = details;

//       //MOVIE RATING
//       let randomIndexRating = Math.floor(Math.random() * ratings.length);
//       movie.Info['Rating'] = ratings[randomIndexRating];

//       //MOVIE RUNTIME
//       let runtime = Math.floor(Math.random() * (130 - 85) + 85);
//       movie.Info['Runtime'] = runtime + ' min';

//       //PHOTOS
//       for (var k = 0; k < movie.Photos.Links.length; k++) {
//         const rand = Math.floor(Math.random() * 10000);
//         movie.Photos.Links[k] = `https://picsum.photos/300/300/?random?${rand}`;
//       }
//       movie.Cast[0].Photo = 'https://picsum.photos/300/300/?random';
//       movie.Cast[1].Photo = 'https://picsum.photos/300/300/?random';

//       //MOVIES
//       for (var y = 0; y < movie.Trailer.Links.length; y++) {
//         let randomIndexMovie = Math.floor(Math.random() * videos.length);
//         movie.Trailer.Links[y] = videos[randomIndexMovie];
//       }

//       dataToEnterTheDB.push(movie);
//     }
//   }
//   console.log(movieId);
//   return dataToEnterTheDB;
// };

//write new mock data
// fs.writeFileSync(
//   './mock.json',
//   JSON.stringify(
//     adjustData(10).map(movie => {
//       return {
//         movieid: movie.MovieId,
//         title: movie.Title,
//         theater: movie.Theater,
//         showtimes: movie.Showtimes,
//         theaterdetails: movie.TheaterDetails,
//         trailer: movie.Trailer,
//         photos: movie.Photos,
//         info: movie.Info,
//         cast: movie.Cast
//       };
//     })
//   )
// );

// write to csv
// var id = 1;
// async function insertData() {
//   let json = await adjustData(1).map(movie => {
//     return {
//       movieid: movie.MovieId,
//       title: movie.Title,
//       theater: movie.Theater,
//       showtimes: movie.Showtimes,
//       theaterdetails: movie.TheaterDetails,
//       trailer: movie.Trailer,
//       photos: movie.Photos,
//       info: movie.Info,
//       casts: movie.Cast
//     };
//   });
//   for (var i in json) {
//     json[i].movieid = id++;
//   }
//   console.log(json);
//   let data = await converter.json2csvAsync(json, {
//     prependHeader: true,
//     keys: [
//       'movieid',
//       'title',
//       'theater',
//       'showtimes',
//       'theaterdetails',
//       'trailer',
//       'cast',
//       'photos',
//       'info'
//     ]
//   });
//   // console.log(data);
//   await fs.writeFileSync('./csv.csv', data, 'utf-8');
// }

// took 822.932187683 seconds to write to csv
// unfortunately it is not formatting properly

// copy csv into postgres

// COPY movies(first_name,last_name,dob,email)
// FROM 'C:\tmp\persons.csv' DELIMITER ',' CSV HEADER;

// let query = `COPY movies FROM 'add.csv' CSV HEADER`;

// client.query(query, (err, res) => {
//   console.log(err, res);
// });

// raw sql - gets bind err message
// async function insertData() {
//   const j = 100000;
//   for (let i = 0; i < j; i++) {
//     await client.query(
//       Movie.insert(
//         adjustData(1).map(movie => {
//           return {
//             movieid: movie.MovieId,
//             title: movie.Title,
//             theater: movie.Theater,
//             showtimes: movie.Showtimes,
//             theaterdetails: movie.TheaterDetails,
//             trailer: movie.Trailer,
//             photos: movie.Photos,
//             info: movie.Info,
//             cast: movie.Cast
//           };
//         })
//       ).toQuery()
//     );
//   }
// }

// sequelize bulkInsert Method
var id = 1;
async function insertData() {
  const j = 10000;
  for (let i = 0; i < j; i++) {
    let data = await JSON.parse(fs.readFileSync('./mock.json'));
    await Movie.bulkCreate(
      data.map(movie => {
        return {
          MovieId: id++,
          Title: movie.title,
          Theater: movie.theater,
          Showtimes: movie.showtimes,
          TheaterDetails: movie.theaterdetails,
          Trailer: movie.trailer,
          Photos: movie.photos,
          Info: movie.info,
          Cast: movie.cast
        };
      })
    );
  }
}

async function init() {
  let start = now();
  for (var i = 0; i < 1; i++) {
    await insertData();
  }
  let end = now();
  console.log((end - start) / 1000 + ' seconds');
}

init();

// 10000000 load time 2202.2265106889995 seconds

// second load 2485.664700439 seconds

// 100 records X 1 - .1152
// 100 records X 10 - .3495
// 100 records X 100 - 1.839
// 100 records X 1000 - 16.874
// 100 records X 10000 - 166.597
// 100 records X 100000 - 1962.752

// 1000 records X 1 - .504
// 1000 records X 10 - 2.763
// 1000 records X 100 - 21.204
// 1000 records X 1000 - 188.65600601699998

// 10000 records x 1 - 2.7936946440000003
// 10000 records x 10 - 26.05197513
// 10000 records x 100 - 278.6569112199999

// 100000 X 1 - 39.057224561000

// 10000 x 1 4.2212

// 10 x 1 - .3133
// 10 x 10 - .1263
// 10 x 100 - .782
// 10 x 1000 - 3.471
// 10 x 10000 - 29.196
