const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const jwt = require("jsonwebtoken");

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nric: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dob: {
    type: DataTypes.DATE,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  gender: {
    type: DataTypes.ENUM('Male', 'Female', 'Other'),
    allowNull: false
  },
}, {
  timestamps: false,
  tableName: 'users',
});

User.prototype.generateAuthToken = function () {
  const payload = { username: this.username };
  const secretKey = process.env.JWT_SECRET_KEY;
  const options = { expiresIn: '1h' };

  return jwt.sign(payload, secretKey, options);
};

module.exports = User;