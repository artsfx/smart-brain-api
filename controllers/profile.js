const handleProfile = (req, res, database, bcrypt) => {
	const id = req.params.id;
		let found = false;
	database.select('*').from('users').where({id})
	.then(user => {
		if (user.length) 
			{
				res.json(user[0])
			}
			else {
				res.status(400).json('Not found');
			}
		}
			)
	}

	module.exports = {
		handleProfile: handleProfile
	}