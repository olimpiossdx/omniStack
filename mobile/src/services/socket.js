import socketio from 'socket.io-client';

const socket = socketio('http://192.168.100.7:3333', {
  autoConnect: false
});

function subScribeToNewDevs(subsribeFuncion) {
  socket.on('new-dev', subsribeFuncion);
}

function conect(latitude, longitude, techs) {
  socket.io.query = { latitude, longitude, techs };

  socketio.connect();

  socket.on('message', text => {
    console.log('[socket]text:', text);
  })
}
function discconect() {
  socketio.discconect();
}
export { conect, discconect, subScribeToNewDevs };