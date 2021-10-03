import React from "react";
import { data } from "../../../data";

const UseStateArray = () => {
  const [people, setPeople] = React.useState(data);
  const removeItem = (id) => {
    const newPeople = people.filter((person) => person.id !== id);
    setPeople(newPeople);
  };
  return (
    <>
      {people.map(({ id, name }) => (
        <div key={id} className="item">
          <h4>{name}</h4>
          <button className="btn" onClick={() => removeItem(id)}>
            Remove
          </button>
        </div>
      ))}
      <button className="btn" onClick={() => setPeople([])}>
        Clear Items!
      </button>
    </>
  );
};

export default UseStateArray;
