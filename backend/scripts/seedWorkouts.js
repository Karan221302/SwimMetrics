const mongoose = require("mongoose");
require("dotenv").config();

// ✅ import model (make sure file name EXACT = TrainingSet.js)
const TrainingSet = require("../models/TrainingSet");

// ✅ connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

// ✅ workouts dataset
const workouts = [

  {
    name: "Endurance Builder",
    category: "endurance",
    level: "advanced",
    warmup: [
      { description: "400 freestyle easy", distance: 400 },
      { description: "4x100 kick", distance: 400 }
    ],
    mainSet: [
      { description: "5x400 freestyle", distance: 2000 },
      { description: "4x200 pull", distance: 800 }
    ],
    cooldown: [
      { description: "200 easy", distance: 200 }
    ]
  },

  {
    name: "Sprint Power",
    category: "short-distance",
    level: "advanced",
    warmup: [
      { description: "300 swim + drills", distance: 300 }
    ],
    mainSet: [
      { description: "12x50 sprint", distance: 600 },
      { description: "8x25 max effort", distance: 200 }
    ],
    cooldown: [
      { description: "200 easy", distance: 200 }
    ]
  },

  {
    name: "Pre Competition Sharpness",
    category: "pre-competition",
    level: "advanced",
    warmup: [
      { description: "400 mixed strokes", distance: 400 }
    ],
    mainSet: [
      { description: "4x100 race pace", distance: 400 },
      { description: "4x50 sprint", distance: 200 }
    ],
    cooldown: [
      { description: "200 easy", distance: 200 }
    ]
  },

  {
    name: "Race Simulation",
    category: "competition",
    level: "advanced",
    warmup: [
      { description: "400 swim + drills", distance: 400 }
    ],
    mainSet: [
      { description: "2x200 race simulation", distance: 400 },
      { description: "4x100 fast", distance: 400 }
    ],
    cooldown: [
      { description: "300 easy", distance: 300 }
    ]
  },

  {
    name: "Freestyle Technique",
    category: "stroke-correction",
    level: "intermediate",
    warmup: [
      { description: "300 easy freestyle", distance: 300 }
    ],
    mainSet: [
      { description: "6x50 drill (catch-up)", distance: 300 },
      { description: "6x50 technique swim", distance: 300 }
    ],
    cooldown: [
      { description: "200 easy", distance: 200 }
    ]
  },

  {
    name: "IM Builder",
    category: "IM",
    level: "advanced",
    warmup: [
      { description: "400 IM drill", distance: 400 }
    ],
    mainSet: [
      { description: "4x200 IM", distance: 800 },
      { description: "8x50 stroke order", distance: 400 }
    ],
    cooldown: [
      { description: "200 easy", distance: 200 }
    ]
  },

  {
    name: "Lactate Threshold",
    category: "LT",
    level: "advanced",
    warmup: [
      { description: "400 swim + kick", distance: 400 }
    ],
    mainSet: [
      { description: "6x200 threshold pace", distance: 1200 },
      { description: "4x100 strong", distance: 400 }
    ],
    cooldown: [
      { description: "300 easy", distance: 300 }
    ]
  },

  {
    name: "Swim Circuit",
    category: "circuit",
    level: "advanced",
    warmup: [
      { description: "300 swim", distance: 300 }
    ],
    mainSet: [
      { description: "4 rounds: 100 swim + 50 kick + 50 pull", distance: 800 }
    ],
    cooldown: [
      { description: "200 easy", distance: 200 }
    ]
  },

  {
    name: "Dryland Strength",
    category: "dryland",
    level: "advanced",
    warmup: [
      { description: "Dynamic stretching", distance: 0 }
    ],
    mainSet: [
      { description: "Pushups, squats, core circuits", distance: 0 }
    ],
    cooldown: [
      { description: "Stretching", distance: 0 }
    ]
  },

  {
    name: "Recovery Session",
    category: "recovery",
    level: "all",
    warmup: [
      { description: "200 easy swim", distance: 200 }
    ],
    mainSet: [
      { description: "400 relaxed swim", distance: 400 }
    ],
    cooldown: [
      { description: "200 float + relax", distance: 200 }
    ]
  },
// ================= ELITE WORKOUT PACK =================

{
  name: "Elite Aerobic Base Builder",
  category: "endurance",
  level: "elite",
  warmup: [
    { description: "400 swim", distance: 400 },
    { description: "200 kick", distance: 200 },
    { description: "200 pull", distance: 200 },
    { description: "4x100 drill/swim", distance: 400 }
  ],
  mainSet: [
    { description: "5x400 aerobic", distance: 2000 },
    { description: "4x200 negative split", distance: 800 },
    { description: "8x100 pull paddles", distance: 800 }
  ],
  cooldown: [
    { description: "200 easy", distance: 200 }
  ]
},

{
  name: "Sprint Power Session",
  category: "sprint",
  level: "elite",
  warmup: [
    { description: "300 swim", distance: 300 },
    { description: "6x50 drill", distance: 300 },
    { description: "4x25 build", distance: 100 }
  ],
  mainSet: [
    { description: "12x25 max sprint", distance: 300 },
    { description: "8x50 race pace", distance: 400 },
    { description: "4x100 recovery", distance: 400 }
  ],
  cooldown: [
    { description: "200 easy", distance: 200 }
  ]
},

{
  name: "Lactate Tolerance Killer",
  category: "LT",
  level: "elite",
  warmup: [
    { description: "400 swim", distance: 400 },
    { description: "200 pull", distance: 200 },
    { description: "4x50 build", distance: 200 }
  ],
  mainSet: [
    { description: "6x100 all out", distance: 600 },
    { description: "4x50 sprint", distance: 200 },
    { description: "4x200 recovery", distance: 800 }
  ],
  cooldown: [
    { description: "300 easy", distance: 300 }
  ]
},

{
  name: "IM Specialist Session",
  category: "IM",
  level: "elite",
  warmup: [
    { description: "400 swim", distance: 400 },
    { description: "200 IM drill", distance: 200 }
  ],
  mainSet: [
    { description: "4x200 IM", distance: 800 },
    { description: "8x100 IM order", distance: 800 },
    { description: "4x50 fly sprint", distance: 200 }
  ],
  cooldown: [
    { description: "200 easy", distance: 200 }
  ]
},

{
  name: "Race Pace Simulation",
  category: "race",
  level: "elite",
  warmup: [
    { description: "400 swim", distance: 400 },
    { description: "4x100 build", distance: 400 }
  ],
  mainSet: [
    { description: "6x100 race pace", distance: 600 },
    { description: "4x50 sprint", distance: 200 },
    { description: "2x200 broken swim", distance: 400 }
  ],
  cooldown: [
    { description: "300 easy", distance: 300 }
  ]
}

// ================= ADD 40 MORE SIMILAR =================

];

// ✅ seed function
const seedWorkouts = async () => {
  try {
    await TrainingSet.deleteMany(); // optional
    await TrainingSet.insertMany(workouts);

    console.log("✅ Workouts seeded successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedWorkouts();