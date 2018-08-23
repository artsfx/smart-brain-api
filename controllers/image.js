// initialize with your api key. This will also work in your browser via http://browserify.org/
const Clarifai = require('clarifai');
const app = new Clarifai.App({
 apiKey: 'a718393040b14ce7bba275f494d6653c'
});

 const handleApiCall = (req, res) => {
 	const {input} = req.body;
 	console.log(input)
 	 app.models.predict('a403429f2ddf4b49b307e318f00e528b', input)
 	 .then(data => res.json(data))
 	 .catch(err => res.status(400).json('Unable to work with API'))
 }

const handleImage = (req, res, database) => {
	const { id } = req.body;
	database('users').where('id', '=', id)
	.increment('entries',1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('Unable to get entries'))
}



module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
}