const Sequelize = require("sequelize");

if (process.env.NODE_ENV === "production") {
  const sequelize = new Sequelize("details", "postgres", "Leviathan6", {
    dialect: "postgres",
    host: "localhost",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    operatorsAliases: false
  });
  module.exports = sequelize;
} else {
  const sequelize = new Sequelize("details", "postgres", "Leviathan6", {
    dialect: "postgres",
    host: "localhost",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    operatorsAliases: false
  });
  module.exports = sequelize;
}
