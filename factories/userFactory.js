// factories/userFactory.js
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

async function createUserData(overrides = {}) {
  const firstName = overrides.firstName || faker.person.firstName();
  const lastName = overrides.lastName || faker.person.lastName();
  const userName = overrides.userName || faker.internet.displayName().toLowerCase().replace(/\s/g, '_');
  const email = overrides.email || faker.internet.email().toLowerCase();
  const isEmailVerified = overrides.isEmailVerified || [true, false][Math.floor(Math.random() * 2)];
  // Generate a random email and password
  const plainPassword = 'Password';
  const passwordHash = await bcrypt.hash(plainPassword, 10);
  const phone = overrides.phone || faker.phone.number();
  const isPhoneVerified = overrides.isPhoneVerified || [true, false][Math.floor(Math.random() * 2)];
  const isActive = overrides.isActive || [true, false][Math.floor(Math.random() * 2)];
  const isAccountVerified = overrides.isAccountVerified || [true, false][Math.floor(Math.random() * 2)];
  const accountType = overrides.accountType || ['Player', 'Parent', 'Talent', 'Supervisor', 'Organization'][Math.floor(Math.random() * 5)];
  const metaData = overrides.metaData || {};
  return {
    firstName,
    lastName,
    userName,
    email,
    isEmailVerified,
    passwordHash,
    phone,
    isPhoneVerified,
    isActive,
    isAccountVerified,
    accountType,
    metaData,
    ...overrides, // Merge any additional fields
  };
}

module.exports = { createUserData };
