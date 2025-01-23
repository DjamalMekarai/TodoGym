const express = require("express");
const {
  createWorkout,
  getWorkoutsid,
  getWorkouts,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/workoutController");
const router = express.Router();
// get all workouts
router.get("/", getWorkouts);

//get signle workouters
router.get("/:id", getWorkoutsid);

//post new workout
router.post("/", createWorkout);

//update workout
router.patch("/:id", updateWorkout);

//
router.delete("/:id", deleteWorkout);

module.exports = router;
