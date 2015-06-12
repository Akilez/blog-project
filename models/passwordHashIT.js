// not a real password hash. used for class.
// I would want to replace this with a hashing algorithim that is secure

module.exports = function(password, seed) {
  return password + seed;
}
