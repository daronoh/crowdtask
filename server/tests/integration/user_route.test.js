const request = require('supertest');
const app = require('../../src/index');
const User = require('../../src/models/userModel');
const sequelize = require('../../src/config/db');

describe('POST /register', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: false });
  });
  
  afterAll(async () => {
    await sequelize.close(); 
  });

  afterEach(async () => {
    await User.destroy({ where: { username: 'new_user', nric: 'S1234567A' } });
  });

  it('should register a new user successfully', async () => {
    const response = await request(app)
      .post('/users/register')
      .send({
        username: 'new_user',
        password: 'newpassword123',
        nric: 'S1234567A',
        firstName: 'New',
        lastName: 'User',
        dob: '1990-01-01',
        address: '123 Test St',
        gender: 'Male',
      })
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
        username: 'new_user',
        password: 'password123',
        nric: 'S1234567B',
        firstName: 'Existing',
        lastName: 'User',
        dob: '1990-01-01',
        address: '123 Test St',
        gender: 'Female',
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
        username: 'test_user',
        password: 'password123',
        nric: 'S1234567A',
        firstName: 'Existing',
        lastName: 'User',
        dob: '1990-01-01',
        address: '123 Test St',
        gender: 'Female',
      })
      .expect(409);

      expect(response.body.message).toBe('Username or NRIC already exists');
  });
});