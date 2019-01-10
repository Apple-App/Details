const fs = require("fs");
// const Movie = require("../schema.js");
const now = require("performance-now");
const mockarooData = fs.readFileSync("./MOCK_DATA.json");
const movieData = JSON.parse(mockarooData.toString());
const videos = require("./youtubeLinks.js");

const format = require("pg-format");
const client = require("../schema.js").client;
const Movie = require("../schema.js").Movie;

var movieId = 1;
var dataToEnterTheDB = [];

const adjustData = b => {
  var possibleDetails = [
    "Closed Caption",
    "Accessibility Devices Available",
    "Dolby Cinema @ AMC",
    "Recliner Seats",
    "Seat Side Service",
    "Reserved Seating",
    "Intermission"
  ];

  var ratings = ["G", "PG", "PG-13", "R"];
  for (var a = 0; a < b; a++) {
    for (var i = 0; i < movieData.length; i++) {
      let movie = JSON.parse(JSON.stringify(movieData[i]));
      //MOVIE ID
      movie.MovieId = movieId++;
      //THEATER DETAILS
      let amountOfDetails = Math.floor(
        Math.random() * (possibleDetails.length - 2) + 2
      );
      let details = [];
      for (var x = 0; x < amountOfDetails; x++) {
        details.push(possibleDetails[x]);
      }
      movie["TheaterDetails"] = details;

      //MOVIE RATING
      let randomIndexRating = Math.floor(Math.random() * ratings.length);
      movie.Info["Rating"] = ratings[randomIndexRating];

      //MOVIE RUNTIME
      let runtime = Math.floor(Math.random() * (130 - 85) + 85);
      movie.Info["Runtime"] = runtime + " min";

      //PHOTOS
      for (var k = 0; k < movie.Photos.links.length; k++) {
        const rand = Math.floor(Math.random() * 10000);
        movie.Photos.links[k] = `https://picsum.photos/300/300/?random?${rand}`;
      }
      movie.Cast[0].Photo = "https://picsum.photos/300/300/?random";
      movie.Cast[1].Photo = "https://picsum.photos/300/300/?random";

      //MOVIES
      for (var y = 0; y < movie.Trailer.links.length; y++) {
        let randomIndexMovie = Math.floor(Math.random() * videos.length);
        movie.Trailer.links[y] = videos[randomIndexMovie];
      }

      dataToEnterTheDB.push(movie);
    }
  }
  console.log(movieId);
  return dataToEnterTheDB;
};

async function insertData() {
  const j = 1;
  for (let i = 0; i < j; i++) {
    await client.query(
      Movie.insert(
        adjustData(1).map(movie => {
          return {
            movieid: movie.MovieId,
            title: movie.Title,
            theater: movie.Theater,
            showtimes: movie.Showtimes,
            theaterdetails: movie.TheaterDetails,
            trailer: movie.Trailer,
            photos: movie.Photos,
            info: movie.Info,
            casts: movie.Cast
          };
        })
      ).toQuery()
    );
  }
}

// async function insertData() {
//   const j = 10000;
//   for (let i = 0; i < j; i++) {
//     await Movie.bulkCreate(
//       adjustData(10).map(movie => {
//         return {
//           MovieId: movie.MovieId,
//           Title: movie.Title,
//           Theater: movie.Theater,
//           Showtimes: movie.Showtimes,
//           TheaterDetails: movie.TheaterDetails,
//           Trailer: movie.Trailer,
//           Photos: movie.Photos,
//           Info: movie.Info,
//           Cast: movie.Cast
//         };
//       })
//     );
//   }
// }

async function init() {
  let start = now();
  await insertData();
  let end = now();
  console.log((end - start) / 1000 + " seconds");
}

init();

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
