const axios = require('axios');
const Dev = require('../models/Devs');
const parseStringLowerCase = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {

  async index(request, response) {
    const devs = await Dev.find();
    return response.json(devs);
  },

  async store(request, response) {
    console.log('body ', request.body)
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {

      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

      const { name = login, bio, avatar_url } = apiResponse.data;

      const techsArray = parseStringLowerCase(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      }

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });
      // Filtar as conexões que estão há no máximo 10km de distância
      // e que o novo dev tenha uma das tencologias filtradas
      const sendSocketMessageTo = findConnections({ latitude, longitude }, techsArray);
      console.log(sendSocketMessageTo);
      sendMessage(sendSocketMessageTo, 'new-dev', dev);
    }

    return response.json(dev);
  }

};