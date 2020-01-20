const axios = require('axios');
const Dev = require('../models/Devs');
const parseStringLowerCase = require('../utils/parseStringAsArray');

module.exports = {

    async index(request, response) {
        const devs = await Dev.find();
        return response.json(devs);
    },

    async store(request, response) {
        console.log('body ',request.body)
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
        }

        return response.json(dev);
    }

};