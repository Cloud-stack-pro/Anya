const app = require('express')();
app.all('/', ( req, res ) => {
  res.status(200).send("Family");
});
const Alive = {
  async run( port ) {
    app.listen( port );
  }
};
module.exports = { Alive };