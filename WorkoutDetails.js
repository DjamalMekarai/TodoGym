import { useWorkoutContext } from "../context/WorkoutContext";

//date fns
import { formatDistanceToNow } from "date-fns";
const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutContext();
  const handleclick = async () => {
    const response = await fetch(`/api/workouts/${workout._id}`, {
      method: "DELETE",
    });
    const json = await response.json();
    if (response.ok) {
      console.log("workout deleted", json);
      dispatch({ type: "DELETE_WORKOUT", payload: workout._id });
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span className="Material-Symbols" onClick={{ handleclick }}>
        Delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
