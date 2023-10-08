module.exports = {
  port: 3005,
  jwtSecret: "!!CryptoCat@!!",
  jwtExpirationInSeconds: 60 * 60, // 1 hour
  roles: {
    USER: "user",
    ADMIN: "admin",
  },
};
