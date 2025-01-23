import { useState, useContext } from "react";
import { WorkoutContext } from "../context/WorkoutContext";
export const WorkoutsForm = ({ workouts }) => {
  const { dispatch } = useContext(WorkoutContext);
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, seterror] = useState("null");
  const [emptyFields, setEmptyFilds] = useState("null");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = { title, load, reps };
    const response = await fetch("/api/workouts", {
      methode: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      seterror(data.message);
      setEmptyFilds(data.emptyFields);
    }
    if (response.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      seterror(null);
      setEmptyFilds([]);
      dispatch({ type: "ADD_Workout ", payload: data });
      console.log("new workout added", data);
    }
  };

  return (
    <div className="workouts-form">
      <h2>Add a new workout</h2>
      <form className="create" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={emptyFields.includes("title") ? "empty" : ""}
        />
        <label htmlFor="load">Load (kg)</label>
        <input
          type="text"
          id="load"
          value={load}
          onChange={(e) => setLoad(e.target.value)}
          className={emptyFields.includes("load") ? "empty" : ""}
        />
        <label htmlFor="reps">Reps</label>
        <input
          type="text"
          id="reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          className={emptyFields.includes("reps") ? "empty" : ""}
        />
        <button type="submit">Add workout</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default WorkoutsForm;
