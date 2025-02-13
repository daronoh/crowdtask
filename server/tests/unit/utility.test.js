const bcrypt = require('bcrypt');
const sinon = require('sinon');

describe('Password Hashing', () => {
  it('should hash the password correctly', async () => {
    const password = 'password123';
    const saltRounds = 10;

    const hashSpy = sinon.spy(bcrypt, 'hash');

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    expect(hashedPassword).not.toBe(password);

    hashSpy.restore();
  });
});