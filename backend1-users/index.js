var bodyParser = require('body-parser');
const cors = require('cors');
var cookieParser = require('cookie-parser');
const express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
var session = require('express-session');
let Twitter = require("twitter");
let config = require('./config.js');
const helmet = require('helmet');

const URLs = require("./URLs.js");

const mongoose = require('mongoose');

const {User, validate} = require('./models/users'); 

const app = express();

let url;

app.use(cors());
// Enable CORS
app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested With, Content-Type, Accept');
   next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({secret: 'whatever', resave: true, saveUninitialized: true}))
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(logger('tiny'));


app.use(passport.initialize())
app.use(passport.session())


passport.use(new Strategy({
    consumerKey: 'tBFqED4qB1NH28ar5yGSxqv8Z',
    consumerSecret: 'KPHqMYKSpI1W019eVl3gDoYsV8eTr4PwKOzSNElp7qhuVCc8Jn',
    callbackURL: `${URLs.callback}`
}, function(token, tokenSecret, profile, callback) {
    return callback(null, profile);
}));

passport.serializeUser(function(user, callback) {
    callback(null, user);
})

passport.deserializeUser(function(obj, callback) {
    callback(null, obj);
})


let T = new Twitter(config);

app.get('/twitter/login', passport.authenticate('twitter'), (req,res) => {
  let link = req.get('origin');
  url = link;
})


app.get('/data', passport.authenticate('twitter', {
    failureRedirect: '/',
    successRedirect: url
}), async (req, res) => {

  let userData = {
    name: req.user.displayName,
    screenName: req.user.username,
    place: req.user["_json"].location,
    followersCount: req.user["_json"]["followers_count"],
    followingCount: req.user["_json"]["friends_count"],
    img: req.user.photos[0].value,
    favoritesCount: req.user["_json"]["favourites_count"],
    userId: req.user["_json"]["id_str"]    
  }
  const { error } = validate(userData); 
  if (error) return res.status(400).send(error.details[0].message);

  
  const user = await User.findOne({ userId: `${req.user["_json"]["id_str"]}` });

  let userTransfer = Object.assign({}, userData);

  if (!user) {    
    // if no user, create one
    let user = new User(userTransfer);
    user = await user.save();
  }
  else {
    // else, update user
    let user = await User.findOneAndUpdate(
      { userId: `${req.user["_json"]["id_str"]}` },
      userTransfer
    );
  }
  res.redirect(`${URLs.redirect}/#/${req.user["_json"]["id_str"]}/home`);
})

app.get('/logout', (req, res) => {
  req.logout();
  res.send(['success']);
})

app.get('/:userId/userInfo', async (req, res) => {
  const user = await User.findOne({ userId: `${req.params.userId}` });
  res.send(user);
})

app.get('/:userId/favorites', (req, res) => {
    T
    .get('favorites/list', {
      q: '#nodejs',
      count: 200,  
      result_type: 'recent',
      lang: 'en',
      user_id: req.params.userId,
      "tweet_mode": "extended",
      "include_entities": true
    })
    .then((array) => {
      var favorites = array.map((favorite) => {
      
        return {
          id: favorite.id,
          stringId: favorite["id_str"]
        }

      })
      res.send(favorites);
    })
    .catch((err) => res.send(err))
})

app.get('/:userId/:maxId/moreFavorites', (req, res) => {
    T
    .get('favorites/list', {
      q: '#nodejs',
      count: 200,  
      result_type: 'recent',
      lang: 'en',
      user_id: req.params.userId,
      max_id: req.params.maxId,
      "tweet_mode": "extended",
      "include_entities": true
    })
    .then((array) => {
      var favorites = array.map((favorite) => {
        return {
          id: favorite.id,
          stringId: favorite["id_str"]
        }
      });
      res.send(favorites);
    })
    .catch((err) => res.send(err))
})

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/users')
  .then(() => console.log('Connected to MongoDB/users...'))
  .catch(err => console.error('Could not connect to MongoDB...'));


const port = process.env.PORT || 2400;
app.listen(port, () => console.log(`Listening on port ${port}...`));