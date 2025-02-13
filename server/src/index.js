const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = process.env.PORT;

const corsOptions = {
  origin:'*',
  credentials:true,
  optionSuccessStatus:200,
}

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

app.use(express.json());
app.use(cors(corsOptions));


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})