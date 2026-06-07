require("dotenv").config();
const mongoose = require("mongoose");

const User = require("../models/User");
const TrainingSet = require("../models/TrainingSet");
const AssignedWorkout = require("../models/AssignedWorkout");
const Log = require("../models/Log");
const PerformanceRecord = require("../models/PerformanceRecord");

const strokes = [
  "Freestyle",
  "Backstroke",
  "Breaststroke",
  "Butterfly",
  "IM",
];

const notes = [
  "Good session",
  "Felt strong today",
  "Maintained race pace",
  "Need better turns",
  "Excellent kick set",
  "Good endurance",
  "Focus on technique",
  "Strong finish",
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    console.log(
      "Deleting old assignments/logs/performance..."
    );

    await AssignedWorkout.deleteMany({});
    await Log.deleteMany({});
    await PerformanceRecord.deleteMany({});

    const swimmers = await User.find({
      role: "swimmer",
    });

    const workouts =
      await TrainingSet.find();

    console.log(
      `Swimmers: ${swimmers.length}`
    );

    console.log(
      `Workouts: ${workouts.length}`
    );

    const assignments = [];

    const today = new Date();

    for (const swimmer of swimmers) {
      let sessionsCreated = 0;

      for (
        let day = 30;
        day >= 1;
        day--
      ) {
        const date = new Date(today);

        date.setDate(
          today.getDate() - day
        );

        const weekday =
          date.getDay();

        if (
          weekday === 0
        )
          continue; // Sunday off

        const workout =
          workouts[
            Math.floor(
              Math.random() *
                workouts.length
            )
          ];

        const completed =
          Math.random() < 0.85;

        const assignment =
          await AssignedWorkout.create(
            {
              swimmerId:
                swimmer._id,
              workoutId:
                workout._id,
              date:
                date
                  .toISOString()
                  .split("T")[0],
              status: completed
                ? "completed"
                : "pending",
              feedback:
                completed
                  ? "Workout completed"
                  : "",
              createdAt: date,
            }
          );

        assignments.push(
          assignment
        );

        sessionsCreated++;

        if (
          completed
        ) {
          const mainSetLogs =
            workout.mainSet.map(
              (
                set,
                index
              ) => ({
                setIndex:
                  index,
                reps: [
                  `${Math.floor(
                    Math.random() *
                      2 +
                      1
                  )}:${Math.floor(
                    Math.random() *
                      60
                  )
                    .toString()
                    .padStart(
                      2,
                      "0"
                    )}:00`,
                ],
              })
            );

          const log =
            await Log.create({
              swimmer:
                swimmer._id,
              assignment:
                assignment._id,
              mainSetLogs,
              notes:
                notes[
                  Math.floor(
                    Math.random() *
                      notes.length
                  )
                ],
              rating:
                Math.floor(
                  Math.random() *
                    3
                ) + 3,
              createdAt:
                date,
            });

          const totalDistance =
            [
              ...workout.warmup,
              ...workout.mainSet,
              ...workout.cooldown,
            ].reduce(
              (
                sum,
                set
              ) =>
                sum +
                (set.distance ||
                  0),
              0
            );

          const minutes =
            Math.floor(
              Math.random() *
                3 +
                1
            );

          const seconds =
            Math.floor(
              Math.random() *
                60
            );

          const milliseconds =
            Math.floor(
              Math.random() *
                99
            );

          const totalSeconds =
            minutes *
              60 +
            seconds +
            milliseconds /
              100;

          await PerformanceRecord.create(
            {
              swimmer:
                swimmer._id,
              assignment:
                assignment._id,
              stroke:
                strokes[
                  Math.floor(
                    Math.random() *
                      strokes.length
                  )
                ],
              distance:
                totalDistance,
              minutes,
              seconds,
              milliseconds,
              totalSeconds,
              createdAt:
                date,
            }
          );
        }

        if (
          sessionsCreated >=
          26
        )
          break;
      }
    }

    const totalAssignments =
      await AssignedWorkout.countDocuments();

    const completedAssignments =
      await AssignedWorkout.countDocuments(
        {
          status:
            "completed",
        }
      );

    const totalLogs =
      await Log.countDocuments();

    const totalPerf =
      await PerformanceRecord.countDocuments();

    console.log(
      "\n===== SEED COMPLETE ====="
    );

    console.log(
      "Assignments:",
      totalAssignments
    );

    console.log(
      "Completed:",
      completedAssignments
    );

    console.log(
      "Logs:",
      totalLogs
    );

    console.log(
      "Performance Records:",
      totalPerf
    );

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();