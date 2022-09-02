function generateId() {
  const gen = () => Math.floor(Date.now() * Math.random()).toString(36);
  return `${gen()}-${gen()}-${gen()}-${gen()}`;
}

module.exports = generateId;
