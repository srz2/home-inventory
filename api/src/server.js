const app = require('./app');
const http = require('http');

const server = http.createServer(app); 

console.log('Starting api on port 8000...');
server.listen(8000, () => {
    console.log('Started API Server!');
})