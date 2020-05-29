const path = require('path');

module.exports = {
  client:{
    port:8000,
    host:"127.0.0.1",
    clientDistDir:path.resolve(__dirname, './public')
  },
  server:{
    host:"127.0.0.1",
    port: 3000
  }
}
