const router = require('express').Router();
const Exercise = require('../models/exercise.model');

module.exports = (params) => {
  // all exercises
  router.route('/').get((req, res) => {
    Exercise.find()
      .then((exercises) => {
        console.log(exercises);
        res.json(exercises);
      })
      .catch((err) => {
        res.status(400).json(`error: ${err}`);
      });
  });

  // add exercise
  router.route('/add').post((req, res) => {
    const { username, description } = req.body;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({ username, description, duration, date });

    // save to db
    newExercise
      .save()
      .then((exercise) => {
        const context = {
          msg: 'exercise added!',
          exercise,
        };
        res.json(context);
      })
      .catch((err) => {
        res.status(400).json(`error: ${err}`);
      });
  });

  // get item by id
  router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
      .then((exercise) => {
        if (!exercise) {
          res.status(404).json(`not found!`);
        }
        res.json(exercise);
      })
      .catch((err) => {
        res.status(400).json(`error: ${err}`);
      });
  });

  // update exercise
  router.route('/:id').put((req, res) => {
    // console.log(req.body);
    Exercise.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((exercise) => {
        const context = {
          msg: 'exercise record updated!',
          exercise,
        };
        res.json(context);
      })
      .catch((err) => {
        res.status(400).json(`error: ${err}`);
      });
  });

  // delete exercise
  router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
      .then(() => {
        res.json(`Exercise record deleted!`);
      })
      .catch((err) => {
        res.status(400).json(`error: ${err}`);
      });
  });

  return router;
};
