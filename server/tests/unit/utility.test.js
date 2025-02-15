const bcrypt = require('bcrypt');

describe('Password Hashing', () => {
  it('should hash the password correctly', async () => {
    const password = 'password123';
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    expect(hashedPassword).not.toBe(password);
  });
});