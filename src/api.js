const { API_KEY } = process.env;
const axios = require('axios').default;

const baseUrl = 'https://api.nasa.gov/';

const getAstronomyPictureOfTheDay = async (date) => {
	try {
		const res = await axios.get(`${baseUrl}planetary/apod`, {
			params: {
				api_key: API_KEY,
				date,
			},
		});
		return { code: res.status, ...res.data };
	}
	catch (err) {
		return err.response.data;
	}
};

module.exports = { getAstronomyPictureOfTheDay };
