import React, { useState, useReducer } from "react";
import Modal from "./Modal";
import { data } from "../../../data";
// reducer function
import { reducer } from "./reducer";

const defaultState = {
  people: [],
  isModalOpen: false,
  modalContent: "Hello World!",
};

const Index = () => {
  const [name, setName] = useState("");
  const [state, dispatch] = useReducer(reducer, defaultState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      const newPerson = { id: new Date().getTime().toString(), name };
      dispatch({ type: "ADD_PEOPLE", payload: newPerson });
      setName("");
    } else {
      dispatch({ type: "NO_NAME" });
    }
  };

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  const removePeople = (id) => {
    dispatch({ type: "REMOVE_PEOPLE", payload: id });
  };
  return (
    <>
      {state.isModalOpen && (
        <Modal modalContent={state.modalContent} closeModal={closeModal} />
      )}
      <form onSubmit={handleSubmit} className="form">
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Add</button>
        </div>
      </form>
      {state.people.map((person) => (
        <div key={person.id} className="item">
          <h4>{person.name}</h4>
          <button onClick={() => removePeople(person.id)}>remove</button>
        </div>
      ))}
    </>
  );
};

export default Index;
