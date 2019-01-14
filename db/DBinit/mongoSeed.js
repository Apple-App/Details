const fs = require('fs');
const Movie = require('../mongoSchema.js');
const now = require('performance-now');
const mockarooData = fs.readFileSync('./MOCK_DATA.json');
const movieData = JSON.parse(mockarooData.toString());
const videos = require('./youtubeLinks.js');

// var movieId = 1;

// const adjustData = b => {
//   var dataToEnterTheDB = [];
//   for (var a = 0; a < b; a++) {
//     var possibleDetails = [
//       'Closed Caption',
//       'Accessibility Devices Available',
//       'Dolby Cinema @ AMC',
//       'Recliner Seats',
//       'Seat Side Service',
//       'Reserved Seating',
//       'Intermission'
//     ];

//     var ratings = ['G', 'PG', 'PG-13', 'R'];
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
//       for (var k = 0; k < movie.Photos.links.length; k++) {
//         const rand = Math.floor(Math.random() * 10000);
//         movie.Photos.links[k] = `https://picsum.photos/300/300/?random?${rand}`;
//       }
//       movie.Cast[0].Photo = 'https://picsum.photos/300/300/?random';
//       movie.Cast[1].Photo = 'https://picsum.photos/300/300/?random';

//       //MOVIES
//       for (var y = 0; y < movie.Trailer.links.length; y++) {
//         let randomIndexMovie = Math.floor(Math.random() * videos.length);
//         movie.Trailer.links[y] = videos[randomIndexMovie];
//       }

//       dataToEnterTheDB.push(movie);
//     }
//   }
//   console.log(movieId);
//   return dataToEnterTheDB;
// };

//write new mock data
// fs.writeFileSync(
//   './mongoMock.json',
//   JSON.stringify(
//     adjustData(10).map(movie => {
//       return {
//         MovieId: movie.MovieId,
//         Title: movie.Title,
//         Theater: movie.Theater,
//         Showtimes: {
//           Standard: movie.Showtimes.Standard,
//           Imax: movie.Showtimes.Imax
//         },
//         TheaterDetails: {
//           Standard: movie.TheaterDetails
//         },
//         Trailer: {
//           Links: movie.Trailer.links
//         },
//         Photos: {
//           Links: movie.Photos.links
//         },
//         Info: {
//           Description: movie.Info.Description,
//           Rating: movie.Info.Rating,
//           Genre: movie.Info.Genre,
//           DirectedBy: movie.Info.DirectedBy,
//           WrittenBy: movie.Info.WrittenBy,
//           ReleaseDate: movie.Info.ReleaseDate,
//           Runtime: movie.Info.Runtime,
//           Studio: movie.Info.Studio
//         },
//         Cast: movie.Cast
//       };
//     })
//   )
// );

// check data

// let data = adjustData(1);

// console.log(data);

//insert data

var id = 1;
async function insertData() {
  const j = 10000;
  let start = now();
  for (let i = 0; i < j; i++) {
    let data = await JSON.parse(fs.readFileSync('./mongoMock.json'));
    await Movie.insertMany(
      data.map(movie => {
        return {
          _id: id++,
          Title: movie.Title,
          Theater: movie.Theater,
          Showtimes: {
            Standard: movie.Showtimes.Standard,
            Imax: movie.Showtimes.Imax
          },
          TheaterDetails: {
            Standard: movie.TheaterDetails.Standard
          },
          Trailer: {
            Links: movie.Trailer.Links
          },
          Photos: {
            Links: movie.Photos.Links
          },
          Info: {
            Description: movie.Info.Description,
            Rating: movie.Info.Rating,
            Genre: movie.Info.Genre,
            DirectedBy: movie.Info.DirectedBy,
            WrittenBy: movie.Info.WrittenBy,
            ReleaseDate: movie.Info.ReleaseDate,
            Runtime: movie.Info.Runtime,
            Studio: movie.Info.Studio
          },
          Cast: movie.Cast
        };
      })
    );
    let end = now();
    console.log(id);
  }
}

async function init() {
  let start = now();
  await insertData();
  let end = now();
  console.log((end - start) / 1000 + ' seconds');
}

init();

// 1000 X 1 - .997
// 10000 x 1 - 5.93
// 50000 x 1 - 29.337
// 100000 x 1 - FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory

// 156.845709856 seconds

// 5065.709953836 seconds for 10m
