import { createContext, useReducer } from "react";

export const WorkoutContext = createContext();

const workoutReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        ...state,
        workout: action.payload,
      };

    case "GET_WORKOUTS":
      return {
        ...state,
        workouts: action.payload,
        loading: false,
      };
    case "GET_WORKOUT":
      return {
        ...state,
        workout: action.payload,
        loading: false,
      };
    case "ADD_WORKOUT":
      return {
        ...state,
        workouts: [...state.workouts, action.payload],
      };
    case "DELETE_WORKOUT":
      return {
        ...state,
        workouts: state.workouts.filter(
          (workout) => workout._id !== action.payload
        ),
      };
    case "WORKOUT_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const WorkoutProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutReducer, {
    workouts: [],
    workout: null,
    loading: true,
  });

  return (
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};
