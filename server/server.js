const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
const socket = require('socket.io');
const http = require('http');

// Import your routes and socket.io logic
const myIo = require('./sockets/io');
const routes = require('./routes/routes');

// Initialize the app and HTTP server
const app = express();

const server = http.createServer(app);
const io = socket(server);

// Export the server for Vercel serverless function
module.exports = (req, res) => {
  server.emit('request', req, res);
};


// Handle WebSocket connections (existing code)
games = {};
myIo(io);

console.log("WebSocket server started.");

// Set up Handlebars
const Handlebars = handlebars.create({
  extname: '.html',
  partialsDir: path.join(__dirname, '..', 'front', 'views', 'partials'),
  defaultLayout: false,
  helpers: {}
});
app.engine('html', Handlebars.engine);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '..', 'front', 'views'));

// Static files setup
app.use('/public', express.static(path.join(__dirname, '..', 'front', 'public')));

// Initialize routes
routes(app);

