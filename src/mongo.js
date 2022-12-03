const mongoose = require('mongoose');

const { MONGO_SRV } = process.env;

const startDB = async () => {
	await mongoose
		.connect(MONGO_SRV, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.catch((e) => {
			console.log('Error while connecting to DataBase : ', e);
		});

	return mongoose;
};

const getDB = () => {
	return mongoose;
};

mongoose.connection.on('connected', () => {
	console.log('Connected to DataBase!');
});

module.exports = { startDB, getDB };
