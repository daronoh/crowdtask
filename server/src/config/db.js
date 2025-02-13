const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.PG_HOST,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB,
  port: process.env.PG_PORT || 5432,
});

sequelize.authenticate()
  .then(() => {
    console.log('Connected to PostgreSQL with Sequelize');
  })
  .catch(err => {
    console.error('Error connecting to PostgreSQL:', err.stack);
  });

module.exports = sequelize;
