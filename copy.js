var ncp = require('ncp').ncp;

ncp.limit = 16;

ncp('./projects/ngx-ez/src/lib/css', 'dist/ngx-ez/css', function (err) {
  if (err) {
    return console.error(err);
  }
  console.log('css copy done!');
});
