const handleSignin = (req, res, database, bcrypt) => {
	const {email, password} = req.body;

	if ( !email || !password) {
		return res.status(400).json('Incorrect signin form submission');
	}
	
	database.select('email','hash')
	.from('login')
	.where('email', '=' , email)
	.then(data => {
		const isValid = bcrypt.compareSync(password, data[0].hash);
	 if (isValid) {
	 	return database.select('*')
	 	.from('users')
	 	.where('email', '=', email)
	 	.then(user =>
	 			res.json(user[0])
	 		)
	 	.catch(err => res.json('Error'))
	 }
	 else {
		res.status(400).json('Wrong creditentials')
	 }
	})
}

module.exports = {
	handleSignin: handleSignin
} 