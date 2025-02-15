const request = require('supertest');
const app = require('../../src/index');
const User = require('../../src/models/userModel');
const sequelize = require('../../src/config/db');
const bcrypt = require('bcrypt');

describe('POST /register', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: false });
  });

  afterEach(async () => {
    await User.destroy({ where: { username: 'new_user', nric: 'S1234567A' } });
  });

  it('should register a new user successfully', async () => {
    const response = await request(app)
      .post('/users/register')
      .send({
        "formData": {
          "username": "new_user",
          "password": "newpassword123",
          "nric": "S1234567A",
          "firstName": "New",
          "lastName": "User",
          "dob": "1990-01-01",
          "address": "123 Test St",
          "gender": "Male"
        }
      }
      )
      .expect(201);

    const user = await User.findOne({ where: { username: 'new_user' } });
    expect(user).not.toBeNull();
    expect(user.username).toBe('new_user');
  });

  it('should return an error for duplicate username', async () => {
    await User.create({
      username: 'new_user',
      password: 'password123',
      nric: 'S1234567A',
      firstName: 'Existing',
      lastName: 'User',
      dob: '1990-01-01',
      address: '123 Test St',
      gender: 'Female',
    });

    const response = await request(app)
      .post('/users/register')
      .send({
        "formData": {
          "username": "new_user",
          "password": "newpassword123",
          "nric": "S1234567B",
          "firstName": "New",
          "lastName": "User",
          "dob": "1990-01-01",
          "address": "123 Test St",
          "gender": "Male"
        }
      })
      .expect(409);

      expect(response.body.message).toBe('Username or NRIC already exists');
  });

  it('should return an error for duplicate nric', async () => {
    await User.create({
      username: 'new_user',
      password: 'password123',
      nric: 'S1234567A',
      firstName: 'Existing',
      lastName: 'User',
      dob: '1990-01-01',
      address: '123 Test St',
      gender: 'Female',
    });

    const response = await request(app)
      .post('/users/register')
      .send({
        "formData": {
          "username": "test_user",
          "password": "newpassword123",
          "nric": "S1234567A",
          "firstName": "New",
          "lastName": "User",
          "dob": "1990-01-01",
          "address": "123 Test St",
          "gender": "Male",
        }
      })
      .expect(409);

      expect(response.body.message).toBe('Username or NRIC already exists');
  });
});

describe('POST /login', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: false });
  });
  
  afterAll(async () => {
    await sequelize.close(); 
  });

  afterEach(async () => {
    await User.destroy({ where: { username: 'new_user', nric: 'S1234567A' } });
  });

  it('should login an existing user successfully', async () => {
    const hashedPassword = await bcrypt.hash('password123', 10);
    await User.create({
      username: 'new_user',
      password: hashedPassword,
      nric: 'S1234567A',
      firstName: 'Existing',
      lastName: 'User',
      dob: '1990-01-01',
      address: '123 Test St',
      gender: 'Female',
    });

    await request(app)
      .post('/users/login')
      .send({
        "formData": {
          "username": "new_user",
          "password": "password123",
        }
      }
      )
      .expect(200);
  });

  it('should reject incorrect login information', async () => {
    const hashedPassword = await bcrypt.hash('password123', 10);
    await User.create({
      username: 'new_user',
      password: hashedPassword,
      nric: 'S1234567A',
      firstName: 'Existing',
      lastName: 'User',
      dob: '1990-01-01',
      address: '123 Test St',
      gender: 'Female',
    });

    await request(app)
      .post('/users/login')
      .send({
        "formData": {
          "username": "newuser",
          "password": "password123",
        }
      }
      )
      .expect(401);

      await request(app)
      .post('/users/login')
      .send({
        "formData": {
          "username": "new_user",
          "password": "wrongpassword123",
        }
      }
      )
      .expect(401);
  });
})
