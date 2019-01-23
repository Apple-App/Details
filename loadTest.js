const randomizer = function(context, event, done) {
  let randomId = parseInt(Math.floor(Math.random() * 10000000));
  context.vars = randomId;
  return done();
};

module.exports = {
  randomizer: randomizer
};
