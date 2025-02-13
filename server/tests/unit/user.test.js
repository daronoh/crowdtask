const User = require('../../src/models/userModel')
const jwt = require('jsonwebtoken');
const sinon = require('sinon');
const sequelize = require('../../src/config/db');

describe('User Model', () => {
  describe('generateAuthToken', () => {
    beforeAll(async () => {
      await sequelize.sync({ force: true });
    });
    
    afterAll(async () => {
      await sequelize.close();
    });

    afterEach(async () => {
      await User.destroy({ where: { username: 'john_doe', nric: 'S1234567A' } });
    });

    it('should generate a valid auth token', async () => {
      const user = await User.create({
        username: 'john_doe',
        password: 'password123',
        nric: 'S1234567A',
        firstName: 'John',
        lastName: 'Doe',
        dob: '2000-01-01',
        address: '19 Kent Ridge Road',
        gender: 'Male',
      });

      const token = user.generateAuthToken();

      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      expect(decoded.username).toBe('john_doe');
    });
  });
});