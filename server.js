const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const database = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'boukhoulda',
    password : 'Lokkye46',
    database : 'smart-brain'
  }
});
const register = require('./controllers/register.js');
const profile = require('./controllers/profile.js');
const signin = require('./controllers/signin.js');
const image = require('./controllers/image.js');

app.use(bodyParser.json());
app.use(cors())


app.post('/signin', (req, res) => {
	signin.handleSignin(req, res, database, bcrypt)
})

app.post('/register', (req, res) => {
	register.handleRegister(req, res, database, bcrypt)
})

app.get('/profile/:id', (req, res) => {
	profile.handleRegisterProfile(req, res, database)
})

app.put('/image', (req, res) => {
 image.handleImage(req, res, database)
})

app.post('/imageurl', (req, res) => {
 image.handleApiCall(req, res)
})

app.listen(3000, () => {
	console.log('Application is running');
})

/* 
/ --> 'this is working'
/signin --> POST = success / fail
/resgister --> POST = user
/profile/:userId  --> GET = user
/image --> PUT = user
*/