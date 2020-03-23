const socketio = require('socket.io');
const connections = [];
const parseStringLowerCase = require('../src/utils/parseStringAsArray');
const calculateDistance = require('../src/utils/calculateDistance');
let io;
exports.setupWebsocket = (server) => {
  console.log('aplicação iniciada');

  io = socketio(server);

  io.on('connection', socket => {
    console.log(socket.id);
    console.log(socket.handshake.query);

    const { latitude, longitude, techs } = socket.handshake.query;

    setTimeout(() => {
      socket.emit('message', 'ola zueira');
    }, 3000);

    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude)
      },
      techs: parseStringLowerCase(techs)
    });

  })
}

exports.findConnections = (coordinates, techs) => {
  return connections.filter(connection => {
    return calculateDistance(coordinates, connection.coordinates) < 10 &&
      connection.techs.some(item => techs.includes(item))
  });
}
exports.sendMessage = (to, message, data) => {
  to.forEach(connection => {
    io.to(connection).emit(message, data);
  });
}