const http = require('http');
const app = require('./app');
require('./dbMongo/mongoose');
const ws = require('./socketInit');

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
server.listen(PORT, () => console.log(`Example app listening on port ${ PORT }!`));
ws.createConnection(server);


