const Workout = require("../models/workoutsModel");
const mongoose = require("mongoose");
// Get all workouts
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json({ workouts });
};

// Get single workout by id
const getWorkoutsid = async (req, res) => {
  const workout = await Workout.findById(req.params.id);
  if (workout) {
    mongoose.Types.ObjectId.IsValid(req.param.id);
    res.status(200).json({ workout });
  } else {
    res.status(404).json({ message: "Workout not found" });
  }
};

// Create new workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;
  /* Check if all fields are provided in the request */
  let emptyFileds = [];
  if (!title) {
    emptyFileds.push("title");
  }
  if (!reps) {
    emptyFileds.push("reps");
  }
  if (!load) {
    emptyFileds.push("load");
  }
  if (emptyFileds.length > 0) {
    res
      .status(400)
      .json({ message: `${emptyFileds.join(", ")} is required`, emptyFileds });
    return;
  }

  //add doc to db
  try {
    const workout = await Workout.create({ title, reps, load });
    res.status(200).json({ workout });
  } catch (error) {
    res.status(400).json({ message: "Error creating workout" });
  }
};

// Update workout by id
const updateWorkout = async (req, res) => {
  const { title, reps, load } = req.body;
  mongoose.Types.ObjectId.IsValid(req.param.id);
  const workout = await Workout.findById(req.params.id);
  if (workout) {
    workout.title = title;
    workout.reps = reps;
    workout.load = load;
    const updatedWorkout = await workout.save();
    res.status(200).json({ updatedWorkout });
  } else {
    res.status(404).json({ message: "Workout not found" });
  }
};

// Delete workout by id
const deleteWorkout = async (req, res) => {
  mongoose.Types.ObjectId.IsValid(req.param.id);
  const workout = await Workout.findById(req.params.id);
  if (workout) {
    await workout.remove();
    res.status(200).json({ message: "Workout removed" });
  } else {
    res.status(404).json({ message: "Workout not found" });
  }
};

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkoutsid,
  updateWorkout,
  deleteWorkout,
};
