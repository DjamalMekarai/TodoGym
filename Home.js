import React, { useEffect } from "react";
import WorkoutDetails from "../Components/WorkoutDetails";
import WorkoutsForm from "../Components/WorkoutsForm.js";
import { WorkoutContext } from "../context/WorkoutContext";
function Home() {
  const { workouts, setWorkouts } = React.useContext(WorkoutContext);
  useEffect(() => {
    const fetchWorkouts = async () => {
      const res = await fetch("/api/workouts");
      const data = await res.json();
      if (res.ok) {
        setWorkouts({ type: "GET_WORKOUTS", payload: data });
      }
    };
    fetchWorkouts();
  }, [setWorkouts]);

  return (
    <div>
      <h1>Home</h1>
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout.id} workout={workout} />
          ))}
      </div>
      <WorkoutsForm />
    </div>
  );
}

export default Home;
