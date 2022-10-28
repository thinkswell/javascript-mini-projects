const router = require('express').Router();
const User = require('../models/user.model');

module.exports = (params) => {
  // get all users
  router.route('/').get((req, res) => {
    User.find()
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        res.status(400).json(`error: ${err}`);
      });
  });

  // add user
  router.route('/add').post((req, res) => {
    console.log('here', req.body);
    const username = req.body.username;

    const newUser = new User({ username });
    // save user to db
    newUser
      .save()
      .then((user) => {
        const context = {
          msg: 'user added!',
          user,
        };
        return res.json(context);
      })
      .catch((err) => {
        return res.status(400).json(`error: ${err}`);
      });
  });

  return router;
};
