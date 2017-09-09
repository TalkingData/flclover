const Flclover = require('../');

const app = Flclover({
  baseDir: __dirname,
});

app.proxy = true;

app.listen(3000);
