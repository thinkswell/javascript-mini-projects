import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Exercise = (props) => {
  return (
    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date.substring(0, 10)}</td>
      <td>
        <Link
          className="btn btn-warning me-1"
          to={`/exercises/${props.exercise._id}`}
        >
          edit
        </Link>
        <button
          type="button"
          className="btn btn-danger"
          value="delete"
          onClick={() => {
            props.deleteExercise(props.exercise._id);
          }}
        >
          delete
        </button>
      </td>
    </tr>
  );
};

export default class ExerciseList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);

    this.state = {
      exercises: [],
    };
  }

  componentDidMount() {
    axios
      .get('http://127.0.0.1:5000/exercises/')
      .then((res) => {
        const exercises = res.data;
        this.setState({ exercises });
      })
      .catch((err) => {
        console.log('ERROR ', err);
      });
  }

  deleteExercise(id) {
    axios.delete(`http://127.0.0.1:5000/exercises/${id}`).then((res) => {
      console.log(res.data);
    });
    // update the exercise list
    this.setState({
      exercises: this.state.exercises.filter((el) => {
        // eslint-disable-next-line no-unused-expressions
        if (el._id !== id) {
          return el;
        }
      }),
    });
  }

  exerciseList() {
    return this.state.exercises.map((exercise) => {
      return (
        <Exercise
          exercise={exercise}
          deleteExercise={this.deleteExercise}
          key={exercise._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3> Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
      </div>
    );
  }
}
