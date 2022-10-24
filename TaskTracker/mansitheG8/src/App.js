import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import NewTask from "./components/NewTask";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  const [add, setAdd] = useState(false);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      console.log("HEllo", { tasksFromServer });
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    return data;
  };
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  const delTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });

    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleAdd = () => {
    setAdd(!add);
  };

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  const newTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();

    setTasks([...tasks, data]);
  };

  return (
    <div className="container">
      <Header text={add ? "Close" : "Add"} onClick={toggleAdd} add={add} />
      <Route
        path="/"
        exact
        render={(props) => (
          <>
            {add ? <NewTask newTask={newTask} /> : ""}
            {tasks.length > 0 ? (
              <Tasks
                tasks={tasks}
                delTask={delTask}
                toggleReminder={toggleReminder}
              />
            ) : (
              "No tasks to show."
            )}

            <Footer />
          </>
        )}
      />
      <Route path="/about" component={About} />
    </div>
  );
}

export default App;
