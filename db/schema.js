// sequelize below //////////////////////////////////////////////////////////////////

const Sequelize = require('sequelize');
const sequelize = new Sequelize('details', 'postgres', 'Leviathan6', {
  dialect: 'postgres',
  host: 'localhost',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false
});
const Movie = sequelize.define('movie', {
  MovieId: Sequelize.STRING,
  Title: Sequelize.STRING,
  Theater: Sequelize.STRING,
  Showtimes: Sequelize.JSONB,
  TheaterDetails: Sequelize.JSONB,
  Trailer: Sequelize.JSONB,
  Photos: Sequelize.JSONB,
  Info: Sequelize.JSONB,
  Cast: Sequelize.ARRAY(Sequelize.JSONB)
});

// uncomment to create table
// sequelize.sync().then(() => {});

module.exports = Movie;

// raw sql below //////////////////////////////////////////////////////////////////

// const pg = require("pg");
// const sql = require("sql");

// const client = new pg.Client({
//   user: "postgres",
//   host: "localhost",
//   database: "details",
//   password: "Leviathan6",
//   port: 5432
// });

// client.connect();

// let table = `CREATE TABLE IF NOT EXISTS movies (
//             Movieid int,
//             Title varchar(255),
//             Theater varchar(255),
//             Showtimes jsonb,
//             TheaterDetails varchar(100) [],
//             Trailer jsonb,
//             Casts jsonb[],
//             Photos jsonb,
//             Info jsonb
//   );`;

// client.query(table, (err, res) => {
//   console.log(err, res);
// });

// let Movie = sql.define({
//   name: "movies",
//   columns: [
//     "movieid",
//     "title",
//     "theater",
//     "showtimes",
//     "theaterdetails",
//     "trailer",
//     "photos",
//     "info",
//     "cast"
//   ]
// });

// module.exports = {
//   client: client,
//   Movie: Movie
// };
