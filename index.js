const argv = require('yargs').argv;
const path = require('path');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();
const cors = require('cors');

const port = argv.port || 8081;

server.use(cors());

server.use(
    jsonServer.rewriter({
        '/api/*': '/$1'
    })
);

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use(router);
server.listen(port, () => {
    console.log('JSON Server is running');
});