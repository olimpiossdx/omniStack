const Dev = require('../models/Devs');
const parseStringLowerCase = require('../utils/parseStringAsArray');

module.exports = {
  async index(request, response) {

    console.log('[search]', request.query);
    const { latitude, longitude, techs } = request.query;

    const techsArray = parseStringLowerCase(techs);
    const devs = await Dev.find({
      techs: {
        $in: techsArray
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [latitude, longitude]
          },
          $maxDistance: 10000, //  10km
        },
      },
    });

    return response.json({ devs });
  }
}
