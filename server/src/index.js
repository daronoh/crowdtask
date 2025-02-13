const express = require('express');
require('dotenv').config();
const cors = require('cors');
const sequelize = require('./config/db');
const User = require('./models/userModel');
const userRoute = require('./routes/user_route');

const app = express();
const port = process.env.PORT;

const corsOptions = {
  origin:'*',
  credentials:true,
  optionSuccessStatus:200,
}


app.use(express.json());
app.use(cors(corsOptions));
app.use("/users", userRoute);

sequelize.sync({force: false})
  .then(() => {
    console.log('User model synced successfully');
  })
  .catch(err => {
    console.error('Error syncing the User model:', err);
  });


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})

module.exports = sequelize;