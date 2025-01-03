const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
const socket = require('socket.io');
const http = require('http');

// Import your routes and socket.io logic
const myIo = require('./sockets/io');
const routes = require('./routes/routes');

// Initialize the app and HTTP server
const app = express(),
      server = http.Server(app),
      io = socket(server);
server.listen("https://chess-room-front.vercel.app");


// Handle WebSocket connections
games = {};
myIo(io);

console.log('WebSocket server started.');


// Set up Handlebars for templating
const Handlebars = handlebars.create({
  extname: '.html',
  partialsDir: path.join(__dirname, '..', 'front', 'views', 'partials'),
  defaultLayout: false,
  helpers: {},
});
app.engine('html', Handlebars.engine);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '..', 'front', 'views'));

// Serve static files
app.use('/public', express.static(path.join(__dirname, '..', 'front', 'public')));

// Initialize routes
routes(app);

export default server