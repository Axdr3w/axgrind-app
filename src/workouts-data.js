export const WORKOUTS = [
  // ===== CHEST GYM =====
  {id:'chest-gym-beg',muscle:'chest',env:'gym',level:'beginner',icon:'💪',title:'Chest Builder — Beginner',meta:'3 days/week · 30 min · Gym',featured:false,
   tip:'<strong>Focus on form.</strong> Slow and controlled reps, feel the chest squeeze on every rep. Start light.',
   days:[
     {label:'CHEST DAY',exercises:[
       {name:'Machine Chest Press',sets:'3×12',rest:'90s'},{name:'Incline Dumbbell Press',sets:'3×12',rest:'90s'},
       {name:'Dumbbell Fly (flat)',sets:'3×15',rest:'60s'},{name:'Push-Ups',sets:'3×10',rest:'60s'},
       {name:'Cable Chest Fly',sets:'2×15',rest:'45s'}]}]},
  {id:'chest-gym-int',muscle:'chest',env:'gym',level:'intermediate',icon:'💪',title:'Chest Power — Intermediate',meta:'2x/week · 45 min · Gym',featured:true,
   tip:'<strong>Progressive overload is key.</strong> Add weight every 1–2 weeks. Squeeze hard at the top.',
   days:[
     {label:'CHEST A — HEAVY',exercises:[
       {name:'Flat Barbell Bench Press',sets:'4×8',rest:'2min'},{name:'Incline Barbell Press',sets:'4×8',rest:'90s'},
       {name:'Weighted Dips',sets:'3×8',rest:'90s'},{name:'Cable Fly (high to low)',sets:'3×12',rest:'60s'},
       {name:'Close-Grip Bench Press',sets:'3×10',rest:'90s'}]},
     {label:'CHEST B — PUMP',exercises:[
       {name:'Incline Dumbbell Press',sets:'4×12',rest:'60s'},{name:'Flat Dumbbell Press',sets:'4×12',rest:'60s'},
       {name:'Pec Deck Machine',sets:'3×15',rest:'45s'},{name:'Cable Crossover',sets:'3×15',rest:'45s'},
       {name:'Push-Up Drop Set',sets:'2×failure',rest:'60s'}]}]},
  {id:'chest-gym-adv',muscle:'chest',env:'gym',level:'advanced',icon:'💪',title:'Chest Destroyer — Advanced',meta:'2x/week · 60 min · Gym',featured:false,
   tip:'<strong>Volume + intensity.</strong> Short rest, heavy weight. You need a spotter for the heavy sets.',
   days:[
     {label:'CHEST — POWER DAY',exercises:[
       {name:'Flat Barbell Bench (heavy)',sets:'5×3-5',rest:'3min'},{name:'Incline Barbell Press',sets:'4×6',rest:'2min'},
       {name:'Weighted Dips',sets:'4×8',rest:'90s'},{name:'Decline Bench Press',sets:'3×8',rest:'90s'},
       {name:'Cable Fly superset Push-Up',sets:'3×12+failure',rest:'60s'}]},
     {label:'CHEST — HYPERTROPHY',exercises:[
       {name:'Incline Dumbbell Press',sets:'4×10',rest:'60s'},{name:'Flat Dumbbell Press',sets:'4×12',rest:'60s'},
       {name:'Low-to-High Cable Fly',sets:'4×15',rest:'45s'},{name:'High-to-Low Cable Fly',sets:'4×15',rest:'45s'},
       {name:'Pec Deck',sets:'3×20 (slow)',rest:'45s'},{name:'Push-Up drop set',sets:'2×failure',rest:'60s'}]}]},

  // ===== CHEST HOME =====
  {id:'chest-home-beg',muscle:'chest',env:'home',level:'beginner',icon:'🏠',title:'Chest At Home — Beginner',meta:'3x/week · 20 min · No equipment',featured:false,
   tip:'<strong>No equipment, no problem.</strong> Body angle is your resistance. Elevate feet for more challenge.',
   days:[{label:'CHEST BODYWEIGHT',exercises:[
     {name:'Regular Push-Ups',sets:'3×10',rest:'60s'},{name:'Wide Push-Ups',sets:'3×10',rest:'60s'},
     {name:'Incline Push-Ups (hands elevated)',sets:'3×12',rest:'60s'},{name:'Knee Push-Ups',sets:'2×15',rest:'45s'},
     {name:'Chest Squeeze (prayer pulse)',sets:'3×20',rest:'30s'}]}]},
  {id:'chest-home-int',muscle:'chest',env:'home',level:'intermediate',icon:'🏠',title:'Chest Grind — Home Intermediate',meta:'3x/week · 30 min · No equipment',featured:false,
   tip:'<strong>Vary the angle.</strong> Incline, flat, decline push-ups all hit different parts of the chest.',
   days:[{label:'CHEST BODYWEIGHT',exercises:[
     {name:'Decline Push-Ups (feet elevated)',sets:'4×15',rest:'60s'},{name:'Diamond Push-Ups',sets:'3×12',rest:'60s'},
     {name:'Wide Push-Ups',sets:'4×15',rest:'45s'},{name:'Archer Push-Ups',sets:'3×8 each',rest:'60s'},
     {name:'Explosive Push-Ups',sets:'3×10',rest:'60s'},{name:'Push-Up hold (bottom)',sets:'3×30s',rest:'30s'}]}]},
  {id:'chest-home-adv',muscle:'chest',env:'home',level:'advanced',icon:'🏠',title:'Chest Beast — Home Advanced',meta:'3x/week · 35 min · No equipment',featured:false,
   tip:'<strong>This will be brutal.</strong> Clap push-ups, one-arm progressions, and max volume.',
   days:[{label:'CHEST ADVANCED BODYWEIGHT',exercises:[
     {name:'Clap Push-Ups',sets:'4×10',rest:'60s'},{name:'One-Arm Push-Up (assisted)',sets:'3×6 each',rest:'90s'},
     {name:'Decline Diamond Push-Ups',sets:'4×12',rest:'60s'},{name:'Archer Push-Ups',sets:'4×10 each',rest:'60s'},
     {name:'Hindu Push-Ups',sets:'3×15',rest:'60s'},{name:'Push-Up to Side Plank',sets:'3×10 each',rest:'60s'}]}]},

  // ===== BACK GYM =====
  {id:'back-gym-beg',muscle:'back',env:'gym',level:'beginner',icon:'🏋️',title:'Back Basics — Beginner Gym',meta:'2x/week · 35 min · Gym',featured:false,
   tip:'<strong>Learn to feel your back.</strong> Initiate every pull with your elbows, not your hands.',
   days:[{label:'BACK DAY',exercises:[
     {name:'Lat Pulldown',sets:'4×12',rest:'90s'},{name:'Seated Cable Row',sets:'4×12',rest:'90s'},
     {name:'Dumbbell Row (1 arm)',sets:'3×12 each',rest:'60s'},{name:'Face Pulls',sets:'3×15',rest:'60s'},
     {name:'Straight-Arm Pulldown',sets:'3×15',rest:'45s'}]}]},
  {id:'back-gym-int',muscle:'back',env:'gym',level:'intermediate',icon:'🏋️',title:'Back Width & Thickness — Intermediate',meta:'2x/week · 50 min · Gym',featured:true,
   tip:'<strong>Width vs thickness.</strong> Pulldowns/pull-ups build width. Rows build thickness. Do both.',
   days:[
     {label:'BACK — WIDTH',exercises:[
       {name:'Pull-Ups (weighted if able)',sets:'4×8',rest:'90s'},{name:'Wide-Grip Lat Pulldown',sets:'4×10',rest:'75s'},
       {name:'Straight-Arm Pulldown',sets:'3×15',rest:'45s'},{name:'Single-Arm Cable Pulldown',sets:'3×12 each',rest:'45s'}]},
     {label:'BACK — THICKNESS',exercises:[
       {name:'Barbell Bent-Over Row',sets:'4×8',rest:'90s'},{name:'Seated Cable Row',sets:'4×10',rest:'75s'},
       {name:'T-Bar Row',sets:'3×10',rest:'75s'},{name:'Dumbbell Row',sets:'3×12 each',rest:'60s'},
       {name:'Face Pulls',sets:'3×15',rest:'45s'}]}]},
  {id:'back-gym-adv',muscle:'back',env:'gym',level:'advanced',icon:'🏋️',title:'Back Destroyer — Advanced',meta:'2x/week · 65 min · Gym',featured:false,
   tip:'<strong>Deadlifts are non-negotiable.</strong> This builds a serious back. Full ROM on every rep.',
   days:[
     {label:'BACK — HEAVY PULL',exercises:[
       {name:'Conventional Deadlift',sets:'5×3',rest:'3min'},{name:'Weighted Pull-Ups',sets:'5×6',rest:'2min'},
       {name:'Pendlay Row',sets:'4×6',rest:'90s'},{name:'Meadows Row',sets:'3×10 each',rest:'75s'},
       {name:'Face Pull superset Rear Delt Fly',sets:'3×15',rest:'45s'}]},
     {label:'BACK — HYPERTROPHY',exercises:[
       {name:'Chest-Supported Row',sets:'4×12',rest:'60s'},{name:'Wide Lat Pulldown',sets:'4×10',rest:'60s'},
       {name:'Single-Arm Dumbbell Row',sets:'4×12 each',rest:'60s'},{name:'Cable Row (wide grip)',sets:'3×15',rest:'45s'},
       {name:'Straight-Arm Pulldown',sets:'3×15',rest:'30s'}]}]},

  // ===== BACK HOME =====
  {id:'back-home-beg',muscle:'back',env:'home',level:'beginner',icon:'🏠',title:'Back At Home — Beginner',meta:'2x/week · 20 min · No equipment',featured:false,
   tip:'<strong>Back at home is tough but doable.</strong> A table or bedsheet can substitute a row.',
   days:[{label:'BACK BODYWEIGHT',exercises:[
     {name:'Bodyweight Row (under table)',sets:'4×10',rest:'60s'},{name:'Superman Hold',sets:'3×10 (2s hold)',rest:'45s'},
     {name:'Reverse Snow Angels (prone)',sets:'3×12',rest:'45s'},{name:'Good Mornings (bodyweight)',sets:'3×15',rest:'45s'},
     {name:'Dead Hang (doorframe)',sets:'3×20s',rest:'30s'}]}]},
  {id:'back-home-int',muscle:'back',env:'home',level:'intermediate',icon:'🏠',title:'Back Grind — Home Intermediate',meta:'2x/week · 30 min',featured:false,
   tip:'<strong>Use a pull-up bar if you have one</strong> — best investment you can make for home back training.',
   days:[{label:'BACK BODYWEIGHT',exercises:[
     {name:'Pull-Ups',sets:'5×max',rest:'90s'},{name:'Bodyweight Row (table)',sets:'4×12',rest:'60s'},
     {name:'Chin-Ups',sets:'3×max',rest:'90s'},{name:'Superman (3s hold)',sets:'3×12',rest:'45s'},
     {name:'Prone Y-T-W raises',sets:'3×10 each',rest:'45s'}]}]},
  {id:'back-home-adv',muscle:'back',env:'home',level:'advanced',icon:'🏠',title:'Back Beast — Home Advanced',meta:'2x/week · 35 min',featured:false,
   tip:'<strong>Weighted pull-ups or L-sit pull-ups</strong> are the gold standard for advanced home back training.',
   days:[{label:'BACK ADVANCED',exercises:[
     {name:'Weighted Pull-Ups (backpack)',sets:'5×6',rest:'2min'},{name:'L-Sit Pull-Ups',sets:'3×6',rest:'90s'},
     {name:'Archer Pull-Ups',sets:'3×5 each',rest:'90s'},{name:'Explosive Pull-Ups',sets:'3×8',rest:'90s'},
     {name:'Typewriter Pull-Ups',sets:'3×5 each',rest:'90s'},{name:'Towel Row',sets:'4×12',rest:'60s'}]}]},

  // ===== SHOULDERS GYM =====
  {id:'shoulders-gym-beg',muscle:'shoulders',env:'gym',level:'beginner',icon:'⚡',title:'Shoulder Builder — Beginner',meta:'2x/week · 30 min · Gym',featured:false,
   tip:'<strong>Warm up the rotator cuff first.</strong> Shoulders are injury-prone. Never skip the warm-up.',
   days:[{label:'SHOULDER DAY',exercises:[
     {name:'Dumbbell Shoulder Press',sets:'4×12',rest:'90s'},{name:'Lateral Raises',sets:'4×15',rest:'45s'},
     {name:'Front Raises',sets:'3×12',rest:'45s'},{name:'Face Pulls',sets:'3×15',rest:'45s'},
     {name:'Arnold Press',sets:'3×10',rest:'75s'}]}]},
  {id:'shoulders-gym-int',muscle:'shoulders',env:'gym',level:'intermediate',icon:'⚡',title:'Boulder Shoulders — Intermediate',meta:'2x/week · 45 min · Gym',featured:true,
   tip:'<strong>Lateral raises are the most underrated exercise.</strong> High rep, low weight, strict form.',
   days:[
     {label:'SHOULDERS — PRESS DAY',exercises:[
       {name:'Overhead Barbell Press',sets:'4×8',rest:'2min'},{name:'Arnold Press',sets:'3×10',rest:'90s'},
       {name:'Seated Dumbbell Press',sets:'3×12',rest:'75s'},{name:'Lateral Raises',sets:'4×15',rest:'30s'},
       {name:'Rear Delt Fly',sets:'3×15',rest:'30s'}]},
     {label:'SHOULDERS — ISOLATION',exercises:[
       {name:'Cable Lateral Raise',sets:'4×15 each',rest:'30s'},{name:'Face Pulls',sets:'4×20',rest:'30s'},
       {name:'Upright Row',sets:'3×12',rest:'60s'},{name:'Plate Front Raise',sets:'3×12',rest:'45s'},
       {name:'Shrugs',sets:'4×15',rest:'45s'}]}]},
  {id:'shoulders-gym-adv',muscle:'shoulders',env:'gym',level:'advanced',icon:'⚡',title:'Cannonball Delts — Advanced',meta:'2x/week · 55 min · Gym',featured:false,
   tip:'<strong>Press heavy, isolate often.</strong> Front/side/rear delt split within each session.',
   days:[
     {label:'SHOULDERS — HEAVY',exercises:[
       {name:'Standing Barbell Press',sets:'5×5',rest:'3min'},{name:'Push Press',sets:'3×6',rest:'2min'},
       {name:'Seated Dumbbell Press',sets:'4×8',rest:'90s'},{name:'Lateral Raise (drop set)',sets:'3×12/10/8',rest:'60s'},
       {name:'Face Pull',sets:'4×20',rest:'30s'}]},
     {label:'SHOULDERS — VOLUME',exercises:[
       {name:'Cable Lateral Raise',sets:'5×20 each',rest:'30s'},{name:'Rear Delt Fly',sets:'4×20',rest:'30s'},
       {name:'Y-Raise (incline bench)',sets:'3×15',rest:'45s'},{name:'Plate Pinch Front Raise',sets:'3×15',rest:'45s'},
       {name:'Shrugs (barbell)',sets:'4×15',rest:'45s'}]}]},

  // ===== SHOULDERS HOME =====
  {id:'shoulders-home-beg',muscle:'shoulders',env:'home',level:'beginner',icon:'🏠',title:'Shoulders At Home — Beginner',meta:'2x/week · 20 min',featured:false,
   tip:'<strong>Bodyweight shoulder work is underrated.</strong> Pike push-ups and handstand progressions are incredibly effective.',
   days:[{label:'SHOULDER BODYWEIGHT',exercises:[
     {name:'Pike Push-Ups',sets:'3×10',rest:'60s'},{name:'Wall Shoulder Taps',sets:'3×20',rest:'45s'},
     {name:'Arm Circles (forward+back)',sets:'3×30s',rest:'30s'},{name:'YTW Raises (prone on floor)',sets:'3×10 each',rest:'45s'},
     {name:'Plank Shoulder Taps',sets:'3×20',rest:'45s'}]}]},
  {id:'shoulders-home-int',muscle:'shoulders',env:'home',level:'intermediate',icon:'🏠',title:'Shoulder Grind — Home Intermediate',meta:'2x/week · 28 min',featured:false,
   tip:'<strong>Progress pike push-ups toward handstand push-ups.</strong> That is the goal.',
   days:[{label:'SHOULDER BODYWEIGHT',exercises:[
     {name:'Pike Push-Ups',sets:'5×12',rest:'60s'},{name:'Elevated Pike Push-Ups',sets:'4×10',rest:'75s'},
     {name:'Wall Handstand Hold',sets:'3×30s',rest:'60s'},{name:'Side Plank Reach-Through',sets:'3×12 each',rest:'45s'},
     {name:'Prone T-Raise',sets:'4×15',rest:'30s'}]}]},
  {id:'shoulders-home-adv',muscle:'shoulders',env:'home',level:'advanced',icon:'🏠',title:'Shoulder Beast — Home Advanced',meta:'2x/week · 35 min',featured:false,
   tip:'<strong>Handstand push-ups are the goal.</strong> Use a wall for balance and work your way to free-standing.',
   days:[{label:'SHOULDER ADVANCED',exercises:[
     {name:'Handstand Push-Ups (wall)',sets:'5×6',rest:'2min'},{name:'Pike Push-Ups (slow)',sets:'4×10',rest:'90s'},
     {name:'Pseudo Planche Push-Ups',sets:'3×8',rest:'90s'},{name:'Wall Walk',sets:'3×5',rest:'60s'},
     {name:'Prone Y-T-W (3s hold)',sets:'3×10 each',rest:'45s'}]}]},

  // ===== ARMS GYM =====
  {id:'arms-gym-beg',muscle:'arms',env:'gym',level:'beginner',icon:'🔥',title:'Arms Starter — Beginner',meta:'2x/week · 30 min · Gym',featured:false,
   tip:'<strong>Squeeze at the top of every curl.</strong> Mind-muscle connection matters more than weight here.',
   days:[{label:'ARMS DAY',exercises:[
     {name:'EZ Bar Curl',sets:'3×12',rest:'60s'},{name:'Hammer Curls',sets:'3×12',rest:'60s'},
     {name:'Tricep Rope Pushdown',sets:'3×15',rest:'60s'},{name:'Overhead Tricep Extension',sets:'3×12',rest:'60s'},
     {name:'Preacher Curl (machine)',sets:'2×15',rest:'45s'},{name:'Tricep Kickback',sets:'2×15',rest:'45s'}]}]},
  {id:'arms-gym-int',muscle:'arms',env:'gym',level:'intermediate',icon:'🔥',title:'Arms Volume — Intermediate',meta:'2x/week · 45 min · Gym',featured:true,
   tip:'<strong>Superset biceps and triceps</strong> for a huge pump and save time.',
   days:[
     {label:'BICEPS',exercises:[
       {name:'Barbell Curl',sets:'4×10',rest:'60s'},{name:'Incline Dumbbell Curl',sets:'3×12',rest:'60s'},
       {name:'Concentration Curl',sets:'3×12 each',rest:'45s'},{name:'Cable Curl',sets:'3×15',rest:'45s'},
       {name:'Hammer Curl',sets:'3×12',rest:'45s'}]},
     {label:'TRICEPS',exercises:[
       {name:'Close-Grip Bench Press',sets:'4×10',rest:'90s'},{name:'Tricep Dip (weighted)',sets:'3×10',rest:'75s'},
       {name:'Overhead Cable Extension',sets:'3×12',rest:'60s'},{name:'Rope Pushdown',sets:'3×15',rest:'45s'},
       {name:'Single-Arm Pushdown',sets:'3×15 each',rest:'30s'}]}]},
  {id:'arms-gym-adv',muscle:'arms',env:'gym',level:'advanced',icon:'🔥',title:'Arms Destroyer — Advanced',meta:'2x/week · 55 min · Gym',featured:false,
   tip:'<strong>High volume, multiple angles.</strong> 20+ sets per session for serious arm growth.',
   days:[
     {label:'BICEPS — ADVANCED',exercises:[
       {name:'Barbell Curl (heavy)',sets:'4×8',rest:'90s'},{name:'EZ Bar Preacher Curl',sets:'4×10',rest:'75s'},
       {name:'Incline Dumbbell Curl',sets:'3×12',rest:'60s'},{name:'Spider Curl',sets:'3×12',rest:'45s'},
       {name:'Cable Curl (21s)',sets:'3 sets',rest:'60s'},{name:'Hammer Curl',sets:'3×15',rest:'30s'}]},
     {label:'TRICEPS — ADVANCED',exercises:[
       {name:'Close-Grip Bench Press',sets:'4×6',rest:'2min'},{name:'Weighted Dips',sets:'4×8',rest:'90s'},
       {name:'Skull Crushers',sets:'4×10',rest:'75s'},{name:'Overhead Extension',sets:'3×12',rest:'60s'},
       {name:'Rope Pushdown',sets:'3×15',rest:'30s'},{name:'Reverse Pushdown',sets:'3×15',rest:'30s'}]}]},

  // ===== ARMS HOME =====
  {id:'arms-home-beg',muscle:'arms',env:'home',level:'beginner',icon:'🏠',title:'Arms At Home — Beginner',meta:'2x/week · 20 min',featured:false,
   tip:'<strong>No weights?</strong> Use water bottles, backpacks, or anything heavy you can grip safely.',
   days:[{label:'ARMS BODYWEIGHT',exercises:[
     {name:'Diamond Push-Ups (triceps)',sets:'3×10',rest:'60s'},{name:'Chin-Ups (biceps)',sets:'3×max',rest:'90s'},
     {name:'Tricep Dips (chair)',sets:'3×12',rest:'60s'},{name:'Reverse Push-Up',sets:'3×10',rest:'60s'},
     {name:'Isometric Bicep Hold (door frame)',sets:'3×20s',rest:'30s'}]}]},
  {id:'arms-home-int',muscle:'arms',env:'home',level:'intermediate',icon:'🏠',title:'Arms Grind — Home Intermediate',meta:'2x/week · 25 min',featured:false,
   tip:'<strong>Chin-ups are the king of home bicep exercises.</strong> If you can do 10 clean reps, add a backpack.',
   days:[{label:'ARMS BODYWEIGHT',exercises:[
     {name:'Close-Grip Push-Ups',sets:'4×15',rest:'60s'},{name:'Chin-Ups',sets:'5×max',rest:'90s'},
     {name:'Tricep Dips (elevated)',sets:'4×15',rest:'60s'},{name:'Diamond Push-Ups',sets:'4×12',rest:'60s'},
     {name:'Towel Bicep Curl (door)',sets:'4×12',rest:'60s'}]}]},
  {id:'arms-home-adv',muscle:'arms',env:'home',level:'advanced',icon:'🏠',title:'Arms Beast — Home Advanced',meta:'2x/week · 30 min',featured:false,
   tip:'<strong>Weighted chin-ups and ring dips</strong> are elite arm builders requiring zero gym.',
   days:[{label:'ADVANCED ARMS',exercises:[
     {name:'Weighted Chin-Ups',sets:'5×6',rest:'2min'},{name:'Commando Pull-Ups',sets:'3×8',rest:'90s'},
     {name:'Weighted Tricep Dips',sets:'4×10',rest:'90s'},{name:'Close-Grip Explosive Push-Ups',sets:'3×10',rest:'75s'},
     {name:'Bodyweight Skull Crusher (bar)',sets:'3×12',rest:'60s'}]}]},

  // ===== LEGS GYM =====
  {id:'legs-gym-beg',muscle:'legs',env:'gym',level:'beginner',icon:'🦵',title:'Leg Day — Beginner Gym',meta:'2x/week · 40 min · Gym',featured:false,
   tip:'<strong>Master the squat and lunge first.</strong> Everything else is built on these movements.',
   days:[{label:'LEG DAY',exercises:[
     {name:'Goblet Squat',sets:'4×12',rest:'90s'},{name:'Leg Press',sets:'4×15',rest:'90s'},
     {name:'Romanian Deadlift (light)',sets:'3×12',rest:'90s'},{name:'Leg Extension',sets:'3×15',rest:'60s'},
     {name:'Leg Curl',sets:'3×15',rest:'60s'},{name:'Standing Calf Raise',sets:'4×20',rest:'30s'}]}]},
  {id:'legs-gym-int',muscle:'legs',env:'gym',level:'intermediate',icon:'🦵',title:'Leg Destroyer — Intermediate',meta:'2x/week · 55 min · Gym',featured:true,
   tip:'<strong>Squat deep. Lunge heavy. Grow.</strong> Add weight every session if you can.',
   days:[
     {label:'LEGS — QUAD FOCUS',exercises:[
       {name:'Back Squat',sets:'4×8',rest:'2min'},{name:'Front Squat',sets:'3×8',rest:'90s'},
       {name:'Leg Press (high feet)',sets:'4×12',rest:'75s'},{name:'Bulgarian Split Squat',sets:'3×10 each',rest:'90s'},
       {name:'Leg Extension',sets:'3×15',rest:'60s'},{name:'Calf Raise',sets:'4×20',rest:'30s'}]},
     {label:'LEGS — HAMSTRING FOCUS',exercises:[
       {name:'Romanian Deadlift',sets:'4×10',rest:'90s'},{name:'Leg Curl (seated)',sets:'4×12',rest:'60s'},
       {name:'Glute-Ham Raise',sets:'3×10',rest:'75s'},{name:'Hip Thrust',sets:'4×12',rest:'75s'},
       {name:'Walking Lunges',sets:'3×20 steps',rest:'60s'},{name:'Seated Calf Raise',sets:'4×20',rest:'30s'}]}]},
  {id:'legs-gym-adv',muscle:'legs',env:'gym',level:'advanced',icon:'🦵',title:'Leg Beast — Advanced',meta:'2x/week · 70 min · Gym',featured:false,
   tip:'<strong>Big legs require big effort.</strong> Squats, deadlifts, and heavy compound work. No skipping leg day.',
   days:[
     {label:'LEGS — HEAVY',exercises:[
       {name:'Back Squat (heavy)',sets:'5×3-5',rest:'3min'},{name:'Romanian Deadlift',sets:'4×6',rest:'2min'},
       {name:'Hack Squat',sets:'4×8',rest:'90s'},{name:'Bulgarian Split Squat (heavy)',sets:'3×8 each',rest:'90s'},
       {name:'Leg Curl (drop set)',sets:'3×12/10/8',rest:'60s'}]},
     {label:'LEGS — VOLUME',exercises:[
       {name:'Leg Press (4 foot positions)',sets:'4×15 each',rest:'60s'},{name:'Walking Lunges',sets:'4×20 steps',rest:'60s'},
       {name:'Sissy Squat',sets:'3×15',rest:'60s'},{name:'Nordic Curl',sets:'3×8',rest:'90s'},
       {name:'Seated Calf Raise',sets:'5×20',rest:'30s'},{name:'Standing Calf Raise',sets:'5×20',rest:'30s'}]}]},

  // ===== LEGS HOME =====
  {id:'legs-home-beg',muscle:'legs',env:'home',level:'beginner',icon:'🏠',title:'Legs At Home — Beginner',meta:'2x/week · 25 min',featured:false,
   tip:'<strong>Go slow on the way down.</strong> 3 seconds down, explode up. That tempo builds more muscle.',
   days:[{label:'LEG BODYWEIGHT',exercises:[
     {name:'Bodyweight Squat',sets:'4×20',rest:'45s'},{name:'Reverse Lunges',sets:'3×12 each',rest:'45s'},
     {name:'Glute Bridge',sets:'4×20',rest:'30s'},{name:'Wall Sit',sets:'3×45s',rest:'30s'},
     {name:'Calf Raises',sets:'4×25',rest:'20s'},{name:'Step-Ups (chair)',sets:'3×12 each',rest:'45s'}]}]},
  {id:'legs-home-int',muscle:'legs',env:'home',level:'intermediate',icon:'🏠',title:'Legs Grind — Home Intermediate',meta:'2x/week · 35 min',featured:false,
   tip:'<strong>Add a jump to every exercise</strong> to increase difficulty and burn more calories.',
   days:[{label:'LEG BODYWEIGHT',exercises:[
     {name:'Jump Squats',sets:'4×15',rest:'60s'},{name:'Bulgarian Split Squat',sets:'4×12 each',rest:'75s'},
     {name:'Single-Leg Glute Bridge',sets:'3×15 each',rest:'45s'},{name:'Lateral Lunges',sets:'3×12 each',rest:'45s'},
     {name:'Sumo Squat',sets:'3×20',rest:'45s'},{name:'Calf Raise (single leg)',sets:'4×20 each',rest:'20s'}]}]},
  {id:'legs-home-adv',muscle:'legs',env:'home',level:'advanced',icon:'🏠',title:'Legs Beast — Home Advanced',meta:'2x/week · 40 min',featured:false,
   tip:'<strong>Pistol squats are the benchmark.</strong> Work toward them. They build incredible leg strength.',
   days:[{label:'ADVANCED LEG BODYWEIGHT',exercises:[
     {name:'Pistol Squats (assisted)',sets:'5×5 each',rest:'90s'},{name:'Shrimp Squat',sets:'4×6 each',rest:'90s'},
     {name:'Plyometric Lunges',sets:'4×12 each',rest:'60s'},{name:'Box Jumps (chair)',sets:'4×10',rest:'60s'},
     {name:'Nordic Curl (partner or door)',sets:'3×8',rest:'90s'},{name:'Single-Leg Calf Raise (weighted)',sets:'4×20 each',rest:'30s'}]}]},

  // ===== GLUTES GYM =====
  {id:'glutes-gym-beg',muscle:'glutes',env:'gym',level:'beginner',icon:'🍑',title:'Glute Builder — Beginner',meta:'2x/week · 35 min · Gym',featured:false,
   tip:'<strong>Squeeze the glutes at the top of every rep.</strong> If you don\'t feel it, you\'re not engaging them.',
   days:[{label:'GLUTES DAY',exercises:[
     {name:'Hip Thrust (barbell)',sets:'4×15',rest:'75s'},{name:'Romanian Deadlift',sets:'3×12',rest:'90s'},
     {name:'Cable Kickback',sets:'3×15 each',rest:'45s'},{name:'Abductor Machine',sets:'3×20',rest:'30s'},
     {name:'Glute Bridge',sets:'3×20',rest:'30s'}]}]},
  {id:'glutes-gym-int',muscle:'glutes',env:'gym',level:'intermediate',icon:'🍑',title:'Glute Grind — Intermediate',meta:'2x/week · 50 min · Gym',featured:true,
   tip:'<strong>Hip thrusts should be your heaviest glute exercise.</strong> Load them up progressively.',
   days:[
     {label:'GLUTES — HEAVY',exercises:[
       {name:'Barbell Hip Thrust',sets:'5×10',rest:'90s'},{name:'Romanian Deadlift',sets:'4×10',rest:'90s'},
       {name:'Bulgarian Split Squat',sets:'3×12 each',rest:'75s'},{name:'Cable Kickback',sets:'3×15 each',rest:'45s'},
       {name:'Abductor Machine',sets:'3×20',rest:'30s'}]},
     {label:'GLUTES — PUMP',exercises:[
       {name:'Single-Leg Hip Thrust',sets:'4×12 each',rest:'60s'},{name:'Sumo Deadlift',sets:'4×10',rest:'90s'},
       {name:'Lateral Band Walk',sets:'3×20 each',rest:'30s'},{name:'Donkey Kick (cable)',sets:'3×15 each',rest:'30s'},
       {name:'Glute Squeeze Machine',sets:'3×20',rest:'30s'}]}]},
  {id:'glutes-gym-adv',muscle:'glutes',env:'gym',level:'advanced',icon:'🍑',title:'Glute Destroyer — Advanced',meta:'2x/week · 60 min · Gym',featured:false,
   tip:'<strong>Load the hip thrust heavy</strong> — 200+ lbs for advanced athletes. Track weight weekly.',
   days:[
     {label:'GLUTES — STRENGTH',exercises:[
       {name:'Barbell Hip Thrust (heavy)',sets:'5×6',rest:'2min'},{name:'Sumo Deadlift',sets:'4×6',rest:'2min'},
       {name:'Bulgarian Split Squat (heavy)',sets:'4×8 each',rest:'90s'},{name:'Cable Pull-Through',sets:'4×15',rest:'60s'},
       {name:'Reverse Hyper',sets:'3×15',rest:'60s'}]},
     {label:'GLUTES — VOLUME',exercises:[
       {name:'Single-Leg Hip Thrust',sets:'4×15 each',rest:'60s'},{name:'Romanian Deadlift',sets:'4×12',rest:'75s'},
       {name:'Abductor Machine (drop set)',sets:'3×20/15/10',rest:'30s'},{name:'Cable Kickback',sets:'4×20 each',rest:'30s'},
       {name:'Frog Pump',sets:'3×30',rest:'20s'}]}]},

  // ===== GLUTES HOME =====
  {id:'glutes-home-beg',muscle:'glutes',env:'home',level:'beginner',icon:'🏠',title:'Glutes At Home — Beginner',meta:'2x/week · 25 min',featured:false,
   tip:'<strong>Squeeze hard at the top of every glute bridge.</strong> Hold for 1 second.',
   days:[{label:'GLUTES BODYWEIGHT',exercises:[
     {name:'Glute Bridge',sets:'4×20',rest:'30s'},{name:'Donkey Kick',sets:'3×15 each',rest:'30s'},
     {name:'Fire Hydrant',sets:'3×15 each',rest:'30s'},{name:'Sumo Squat',sets:'4×20',rest:'45s'},
     {name:'Glute Bridge Hold',sets:'3×30s',rest:'30s'}]}]},
  {id:'glutes-home-int',muscle:'glutes',env:'home',level:'intermediate',icon:'🏠',title:'Glutes Grind — Home Intermediate',meta:'2x/week · 30 min',featured:false,
   tip:'<strong>Use a resistance band</strong> if you have one — it doubles the effectiveness of every home glute exercise.',
   days:[{label:'GLUTES BODYWEIGHT',exercises:[
     {name:'Single-Leg Glute Bridge',sets:'4×15 each',rest:'45s'},{name:'Hip Thrust (couch)',sets:'4×15',rest:'60s'},
     {name:'Curtsy Lunge',sets:'3×15 each',rest:'45s'},{name:'Donkey Kick Pulse',sets:'3×20 each',rest:'30s'},
     {name:'Sumo Squat Jump',sets:'3×15',rest:'45s'},{name:'Clam Shell',sets:'3×20 each',rest:'20s'}]}]},
  {id:'glutes-home-adv',muscle:'glutes',env:'home',level:'advanced',icon:'🏠',title:'Glutes Beast — Home Advanced',meta:'2x/week · 35 min',featured:false,
   tip:'<strong>Add a resistance band and a backpack for extra load</strong> on hip thrusts and squats.',
   days:[{label:'ADVANCED GLUTES',exercises:[
     {name:'Weighted Single-Leg Hip Thrust',sets:'5×12 each',rest:'60s'},{name:'Bulgarian Split Squat',sets:'4×12 each',rest:'75s'},
     {name:'Weighted Donkey Kick',sets:'4×15 each',rest:'30s'},{name:'Plyometric Sumo Squat',sets:'3×15',rest:'45s'},
     {name:'Frog Pump',sets:'3×40',rest:'20s'},{name:'Lateral Band Walk',sets:'3×25 each',rest:'20s'}]}]},

  // ===== CORE GYM =====
  {id:'core-gym-beg',muscle:'core',env:'gym',level:'beginner',icon:'🔥',title:'Core Basics — Beginner',meta:'3x/week · 15 min · Gym',featured:false,
   tip:'<strong>Breathe out on the effort.</strong> Exhale when you crunch or curl up. That engages the deep core.',
   days:[{label:'CORE DAY',exercises:[
     {name:'Plank',sets:'3×30s',rest:'30s'},{name:'Crunches',sets:'3×20',rest:'30s'},
     {name:'Leg Raises',sets:'3×15',rest:'30s'},{name:'Russian Twists',sets:'3×20',rest:'30s'},
     {name:'Cable Crunch',sets:'3×15',rest:'45s'}]}]},
  {id:'core-gym-int',muscle:'core',env:'gym',level:'intermediate',icon:'🔥',title:'Core Shred — Intermediate',meta:'3x/week · 20 min · Gym',featured:true,
   tip:'<strong>Weighted core work builds real strength.</strong> A strong core protects your spine on every other lift.',
   days:[{label:'CORE CIRCUIT',exercises:[
     {name:'Cable Crunch',sets:'4×20',rest:'30s'},{name:'Hanging Leg Raise',sets:'4×15',rest:'45s'},
     {name:'Ab Wheel Rollout',sets:'3×10',rest:'60s'},{name:'Russian Twists (weighted)',sets:'3×20',rest:'30s'},
     {name:'Plank to Push-Up',sets:'3×10',rest:'45s'},{name:'Side Plank',sets:'3×45s each',rest:'20s'}]}]},
  {id:'core-gym-adv',muscle:'core',env:'gym',level:'advanced',icon:'🔥',title:'Core Beast — Advanced',meta:'3x/week · 25 min · Gym',featured:false,
   tip:'<strong>Dragon flags and L-sits are elite core exercises.</strong> Work toward them.',
   days:[{label:'CORE ADVANCED',exercises:[
     {name:'Hanging Windshield Wipers',sets:'4×10',rest:'60s'},{name:'Ab Wheel Rollout (standing)',sets:'3×8',rest:'75s'},
     {name:'Dragon Flag',sets:'3×6',rest:'90s'},{name:'Cable Woodchop',sets:'3×12 each',rest:'45s'},
     {name:'Weighted Side Bend',sets:'3×15 each',rest:'30s'},{name:'L-Sit Hold',sets:'4×15s',rest:'30s'}]}]},

  // ===== CORE HOME =====
  {id:'core-home-beg',muscle:'core',env:'home',level:'beginner',icon:'🏠',title:'Core At Home — Beginner',meta:'3x/week · 15 min',featured:false,
   tip:'<strong>Start with the plank.</strong> 30 seconds proper form beats 2 minutes with bad form every time.',
   days:[{label:'CORE BODYWEIGHT',exercises:[
     {name:'Plank',sets:'3×30s',rest:'20s'},{name:'Crunches',sets:'3×20',rest:'20s'},
     {name:'Bicycle Crunches',sets:'3×20',rest:'20s'},{name:'Leg Raises',sets:'3×12',rest:'30s'},
     {name:'Mountain Climbers',sets:'3×30s',rest:'30s'}]}]},
  {id:'core-home-int',muscle:'core',env:'home',level:'intermediate',icon:'🏠',title:'Core Grind — Home Intermediate',meta:'3x/week · 20 min',featured:false,
   tip:'<strong>Add a timer.</strong> AMRAP (as many reps as possible) in 30s per exercise for extra intensity.',
   days:[{label:'CORE CIRCUIT',exercises:[
     {name:'Plank',sets:'4×60s',rest:'20s'},{name:'V-Ups',sets:'4×15',rest:'30s'},
     {name:'Bicycle Crunches',sets:'3×30',rest:'20s'},{name:'Mountain Climbers',sets:'4×30s',rest:'20s'},
     {name:'Side Plank',sets:'3×45s each',rest:'20s'},{name:'Hollow Body Hold',sets:'3×30s',rest:'30s'}]}]},
  {id:'core-home-adv',muscle:'core',env:'home',level:'advanced',icon:'🏠',title:'Core Beast — Home Advanced',meta:'3x/week · 25 min',featured:false,
   tip:'<strong>L-sits and dragon flags can be done at home.</strong> Use chairs for L-sits, a low table for dragon flags.',
   days:[{label:'ADVANCED CORE',exercises:[
     {name:'L-Sit Hold (chairs)',sets:'4×15s',rest:'30s'},{name:'Dragon Flag',sets:'3×6',rest:'90s'},
     {name:'Ab Wheel Rollout',sets:'4×10',rest:'60s'},{name:'V-Ups',sets:'4×20',rest:'30s'},
     {name:'Side Plank Hip Dip',sets:'3×15 each',rest:'20s'},{name:'Tuck Planche Hold',sets:'3×10s',rest:'60s'}]}]},

  // ===== FULL BODY GYM =====
  {id:'fullbody-gym-beg',muscle:'fullbody',env:'gym',level:'beginner',icon:'⭐',title:'Full Body — Beginner 3x/week',meta:'3 days/week · 40 min · Gym',featured:true,
   tip:'<strong>Perfect for beginners.</strong> Full body 3x a week is the fastest way to build muscle when starting out.',
   days:[
     {label:'DAY A',exercises:[
       {name:'Goblet Squat',sets:'3×12',rest:'90s'},{name:'Dumbbell Bench Press',sets:'3×10',rest:'90s'},
       {name:'Dumbbell Row (1 arm)',sets:'3×10 each',rest:'60s'},{name:'Dumbbell Press',sets:'3×10',rest:'60s'},
       {name:'Plank',sets:'3×30s',rest:'30s'}]},
     {label:'DAY B',exercises:[
       {name:'Romanian Deadlift (light)',sets:'3×10',rest:'90s'},{name:'Push-Ups',sets:'3×12',rest:'60s'},
       {name:'Lat Pulldown',sets:'3×10',rest:'75s'},{name:'Reverse Lunge',sets:'3×10 each',rest:'60s'},
       {name:'Dead Bug',sets:'3×10 each',rest:'30s'}]},
     {label:'DAY C',exercises:[
       {name:'Leg Press',sets:'3×15',rest:'90s'},{name:'Incline Push-Ups',sets:'3×12',rest:'60s'},
       {name:'Seated Cable Row',sets:'3×12',rest:'75s'},{name:'Dumbbell Curl',sets:'3×12',rest:'45s'},
       {name:'Glute Bridge',sets:'3×20',rest:'30s'}]}]},
  {id:'fullbody-gym-int',muscle:'fullbody',env:'gym',level:'intermediate',icon:'⭐',title:'8-Week Shred — Intermediate',meta:'5 days/week · 50 min · Gym',featured:true,
   tip:'<strong>The classic AX.GRIND shred program.</strong> High intensity, short rest, burn fat and build muscle.',
   days:[
     {label:'DAY 1 — CHEST & TRICEPS',exercises:[
       {name:'Flat Barbell Bench Press',sets:'4×10',rest:'60s'},{name:'Incline Dumbbell Press',sets:'3×12',rest:'60s'},
       {name:'Cable Fly',sets:'3×15',rest:'45s'},{name:'Tricep Rope Pushdown',sets:'4×12',rest:'45s'},
       {name:'Overhead Tricep Extension',sets:'3×15',rest:'45s'}]},
     {label:'DAY 2 — BACK & BICEPS',exercises:[
       {name:'Pull-Ups',sets:'4×8',rest:'60s'},{name:'Barbell Row',sets:'4×10',rest:'60s'},
       {name:'Seated Cable Row',sets:'3×12',rest:'45s'},{name:'EZ Bar Curl',sets:'4×10',rest:'45s'},
       {name:'Hammer Curls',sets:'3×12',rest:'30s'}]},
     {label:'DAY 3 — LEGS',exercises:[
       {name:'Back Squat',sets:'4×10',rest:'90s'},{name:'Romanian Deadlift',sets:'4×10',rest:'75s'},
       {name:'Leg Press',sets:'3×15',rest:'60s'},{name:'Leg Curl',sets:'3×12',rest:'45s'},
       {name:'Standing Calf Raise',sets:'4×20',rest:'30s'}]},
     {label:'DAY 4 — SHOULDERS',exercises:[
       {name:'Seated Dumbbell Press',sets:'4×10',rest:'60s'},{name:'Lateral Raises',sets:'4×15',rest:'30s'},
       {name:'Face Pulls',sets:'3×20',rest:'30s'},{name:'Arnold Press',sets:'3×10',rest:'60s'}]},
     {label:'DAY 5 — CORE & CARDIO',exercises:[
       {name:'Hanging Leg Raise',sets:'4×15',rest:'30s'},{name:'Cable Crunch',sets:'3×20',rest:'30s'},
       {name:'Plank',sets:'3×60s',rest:'20s'},{name:'Battle Ropes',sets:'4×30s',rest:'30s'},
       {name:'Box Jumps',sets:'3×10',rest:'45s'}]}]},
  {id:'fullbody-gym-adv',muscle:'fullbody',env:'gym',level:'advanced',icon:'⭐',title:'Elite 6-Day Split — Advanced',meta:'6 days/week · 75 min · Gym',featured:false,
   tip:'<strong>This is not for beginners.</strong> You need 1+ year consistent training. Nutrition and sleep are non-negotiable.',
   days:[
     {label:'MON — CHEST (heavy)',exercises:[
       {name:'Flat Barbell Bench Press',sets:'5×3-5',rest:'3min'},{name:'Incline Barbell Press',sets:'4×6',rest:'2min'},
       {name:'Weighted Dips',sets:'4×8',rest:'90s'},{name:'Cable Fly drop set',sets:'3×12',rest:'60s'}]},
     {label:'TUE — BACK (heavy)',exercises:[
       {name:'Deadlift',sets:'5×3',rest:'3min'},{name:'Weighted Pull-Ups',sets:'5×5',rest:'2min'},
       {name:'Barbell Row',sets:'4×6',rest:'90s'},{name:'Meadows Row',sets:'3×10 each',rest:'75s'}]},
     {label:'WED — LEGS (quad)',exercises:[
       {name:'Back Squat (heavy)',sets:'5×3',rest:'3min'},{name:'Hack Squat',sets:'4×8',rest:'90s'},
       {name:'Leg Press',sets:'4×12',rest:'75s'},{name:'Bulgarian Split Squat',sets:'3×8 each',rest:'90s'}]},
     {label:'THU/FRI/SAT',exercises:[
       {name:'Thu: Shoulders + Arms',sets:'Press + isolation volume',rest:''},{name:'Fri: Hamstrings + Glutes',sets:'RDL, leg curl, hip thrust',rest:''},
       {name:'Sat: Weak point day',sets:'Whatever needs most work',rest:''}]}]},

  // ===== FULL BODY HOME =====
  {id:'fullbody-home-beg',muscle:'fullbody',env:'home',level:'beginner',icon:'🏠',title:'Home Starter — Full Body Beginner',meta:'3 days/week · 25 min · Home',featured:false,
   tip:'<strong>Start here if you\'re new to training.</strong> Master the basics before adding complexity.',
   days:[
     {label:'DAY A — PUSH + LEGS',exercises:[
       {name:'Push-Ups',sets:'3×10',rest:'60s'},{name:'Bodyweight Squat',sets:'3×20',rest:'60s'},
       {name:'Tricep Dips (chair)',sets:'3×10',rest:'60s'},{name:'Glute Bridge',sets:'3×15',rest:'30s'},
       {name:'Plank',sets:'3×20s',rest:'20s'}]},
     {label:'DAY B — PULL + CORE',exercises:[
       {name:'Bodyweight Row (table)',sets:'3×10',rest:'60s'},{name:'Reverse Lunge',sets:'3×10 each',rest:'45s'},
       {name:'Superman',sets:'3×12',rest:'30s'},{name:'Mountain Climbers',sets:'3×30s',rest:'30s'},
       {name:'Crunches',sets:'3×15',rest:'20s'}]}]},
  {id:'fullbody-home-int',muscle:'fullbody',env:'home',level:'intermediate',icon:'🏠',title:'Home Warrior — Full Body',meta:'5 days/week · 35 min · Home',featured:true,
   tip:'<strong>No gym needed.</strong> This is a complete program. Pair with good nutrition for serious results.',
   days:[
     {label:'DAY 1 — PUSH',exercises:[
       {name:'Push-Ups',sets:'4×20',rest:'45s'},{name:'Wide Push-Ups',sets:'3×15',rest:'45s'},
       {name:'Pike Push-Ups',sets:'3×12',rest:'45s'},{name:'Tricep Dips (chair)',sets:'3×15',rest:'30s'},
       {name:'Diamond Push-Ups',sets:'3×10',rest:'30s'}]},
     {label:'DAY 2 — LEGS',exercises:[
       {name:'Jump Squats',sets:'4×15',rest:'45s'},{name:'Reverse Lunges',sets:'3×15 each',rest:'30s'},
       {name:'Glute Bridge',sets:'4×20',rest:'30s'},{name:'Wall Sit',sets:'3×45s',rest:'30s'},
       {name:'Calf Raises',sets:'4×25',rest:'20s'}]},
     {label:'DAY 3 — PULL + CORE',exercises:[
       {name:'Pull-Ups',sets:'4×max',rest:'90s'},{name:'Bodyweight Row',sets:'4×12',rest:'60s'},
       {name:'Plank',sets:'3×60s',rest:'20s'},{name:'V-Ups',sets:'3×15',rest:'30s'},
       {name:'Mountain Climbers',sets:'3×30s',rest:'20s'}]}]},
  {id:'fullbody-home-adv',muscle:'fullbody',env:'home',level:'advanced',icon:'🏠',title:'Home Beast — Full Body Advanced',meta:'5 days/week · 45 min · Home',featured:false,
   tip:'<strong>Calisthenics at its finest.</strong> Muscle-ups, pistol squats, dragon flags. Elite level.',
   days:[
     {label:'DAY 1 — UPPER POWER',exercises:[
       {name:'Weighted Pull-Ups',sets:'5×6',rest:'2min'},{name:'Weighted Push-Ups',sets:'4×15',rest:'75s'},
       {name:'Archer Push-Ups',sets:'3×8 each',rest:'90s'},{name:'Pike Push-Ups',sets:'4×12',rest:'60s'},
       {name:'L-Sit Hold',sets:'4×15s',rest:'30s'}]},
     {label:'DAY 2 — LOWER POWER',exercises:[
       {name:'Pistol Squats',sets:'5×6 each',rest:'90s'},{name:'Shrimp Squats',sets:'4×8 each',rest:'90s'},
       {name:'Box Jumps',sets:'4×10',rest:'60s'},{name:'Nordic Curl',sets:'3×8',rest:'90s'},
       {name:'Single-Leg Calf Raise',sets:'4×20 each',rest:'20s'}]},
     {label:'DAY 3 — SKILL + CORE',exercises:[
       {name:'Muscle-Up practice',sets:'5×max',rest:'2min'},{name:'Handstand Push-Ups',sets:'3×6',rest:'2min'},
       {name:'Dragon Flag',sets:'3×6',rest:'90s'},{name:'Ab Wheel Rollout',sets:'4×10',rest:'60s'},
       {name:'Tuck Planche Hold',sets:'3×10s',rest:'60s'}]}]},

  // ===== CARDIO =====
  {id:'cardio-beg',muscle:'cardio',env:'home',level:'beginner',icon:'🏃',title:'Fat Burn — Beginner Cardio',meta:'3x/week · 20 min · Home',featured:false,
   tip:'<strong>Moderate pace, consistent effort.</strong> Talk test: you should be able to say a few words, not hold a conversation.',
   days:[{label:'CARDIO CIRCUIT',exercises:[
     {name:'March in place',sets:'3 min',rest:'none'},{name:'Jumping Jacks',sets:'3×30s',rest:'15s'},
     {name:'Step-Ups (chair)',sets:'3×20',rest:'30s'},{name:'High Knees',sets:'3×30s',rest:'20s'},
     {name:'Bodyweight Squat',sets:'3×20',rest:'30s'},{name:'Cool-down walk',sets:'2 min',rest:'none'}]}]},
  {id:'cardio-int',muscle:'cardio',env:'home',level:'intermediate',icon:'🏃',title:'HIIT Shred — Intermediate',meta:'3x/week · 25 min · Home',featured:true,
   tip:'<strong>20 seconds max effort, 10 seconds rest.</strong> That\'s the Tabata protocol. It works.',
   days:[{label:'HIIT CIRCUIT (repeat 4 rounds)',exercises:[
     {name:'Burpees',sets:'30s on / 10s off',rest:''},{name:'Jump Squats',sets:'30s on / 10s off',rest:''},
     {name:'Mountain Climbers',sets:'30s on / 10s off',rest:''},{name:'High Knees',sets:'30s on / 10s off',rest:''},
     {name:'Push-Ups',sets:'30s on / 10s off',rest:''},{name:'Rest',sets:'2 min between rounds',rest:''}]}]},
  {id:'cardio-adv',muscle:'cardio',env:'home',level:'advanced',icon:'🏃',title:'Cardio Destroyer — Advanced',meta:'3x/week · 30 min · Home',featured:false,
   tip:'<strong>Elite conditioning.</strong> This taxes your whole body and cardiovascular system. Hydrate before, during, after.',
   days:[{label:'ADVANCED CARDIO (5 rounds)',exercises:[
     {name:'Clap Push-Ups',sets:'30s',rest:'10s'},{name:'Jump Lunges',sets:'30s',rest:'10s'},
     {name:'Burpee with Push-Up',sets:'30s',rest:'10s'},{name:'Tuck Jumps',sets:'30s',rest:'10s'},
     {name:'Sprint in place (max speed)',sets:'30s',rest:'10s'},{name:'Rest between rounds',sets:'90s',rest:''}]}]},

  // ===== CARDIO GYM =====
  {id:'cardio-gym-beg',muscle:'cardio',env:'gym',level:'beginner',icon:'🏃',title:'Machine Cardio — Beginner',meta:'3x/week · 20 min · Gym',featured:false,
   tip:'<strong>Steady state builds your base.</strong> Keep heart rate moderate — you should be able to hold a light conversation.',
   days:[{label:'STEADY STATE',exercises:[
     {name:'Treadmill Incline Walk',sets:'15 min',rest:'none'},{name:'Stationary Bike',sets:'10 min easy',rest:'none'},
     {name:'Rowing Machine',sets:'5 min easy',rest:'none'},{name:'Cool-down stretch',sets:'5 min',rest:'none'}]}]},
  {id:'cardio-gym-int',muscle:'cardio',env:'gym',level:'intermediate',icon:'🏃',title:'Interval Engine — Intermediate',meta:'3x/week · 25 min · Gym',featured:true,
   tip:'<strong>Alternate machines to hit different energy systems</strong> without overloading one joint pattern.',
   days:[{label:'MACHINE INTERVALS (repeat 6 rounds)',exercises:[
     {name:'Treadmill Sprint',sets:'30s on / 90s off',rest:''},{name:'Rowing Machine Sprint',sets:'250m fast',rest:'90s'},
     {name:'Assault Bike',sets:'20s all-out',rest:'40s'},{name:'Stair Climber',sets:'2 min moderate',rest:'60s'}]}]},
  {id:'cardio-gym-adv',muscle:'cardio',env:'gym',level:'advanced',icon:'🏃',title:'Metabolic Conditioning — Advanced',meta:'3x/week · 30 min · Gym',featured:false,
   tip:'<strong>This is a finisher, not a warm-up.</strong> Do it after lifting or on a dedicated conditioning day only.',
   days:[{label:'GYM MetCon (repeat 5 rounds)',exercises:[
     {name:'Assault Bike',sets:'30s all-out',rest:'30s'},{name:'Rowing Machine',sets:'250m fast',rest:'60s'},
     {name:'Battle Ropes',sets:'30s',rest:'30s'},{name:'Sled Push',sets:'20m',rest:'60s'},
     {name:'Box Jumps',sets:'10 reps',rest:'45s'}]}]},

  // ===== CHEST — EXTRA SPECIALIZATION PLANS =====
  {id:'chest-gym-specialist',muscle:'chest',env:'gym',level:'intermediate',icon:'🏋️',title:'Chest Specialization — Mind-Muscle Pump',meta:'2x/week · 40 min · Gym',featured:false,
   tip:'<strong>Light weight, brutal squeeze.</strong> This day is about feeling the chest work, not moving max weight.',
   days:[{label:'CHEST — ISOLATION FOCUS',exercises:[
     {name:'Pec Deck Machine',sets:'4×15 (2s squeeze)',rest:'45s'},{name:'Low-to-High Cable Fly',sets:'4×15',rest:'45s'},
     {name:'High-to-Low Cable Fly',sets:'4×15',rest:'45s'},{name:'Single-Arm Cable Fly',sets:'3×12 each',rest:'30s'},
     {name:'Push-Up (slow tempo)',sets:'3×failure',rest:'45s'}]}]},
  {id:'chest-home-superset',muscle:'chest',env:'home',level:'intermediate',icon:'🏠',title:'Chest Supersets — Home Burnout',meta:'2x/week · 25 min · No equipment',featured:false,
   tip:'<strong>Pair every exercise back-to-back with no rest</strong> for a metabolic chest finisher.',
   days:[{label:'CHEST SUPERSET CIRCUIT (repeat 3 rounds)',exercises:[
     {name:'Wide Push-Ups',sets:'15 reps',rest:'0s'},{name:'Diamond Push-Ups',sets:'12 reps',rest:'0s'},
     {name:'Incline Push-Ups',sets:'15 reps',rest:'0s'},{name:'Chest Squeeze Hold',sets:'20s',rest:'90s (end of round)'}]}]},

  // ===== BACK — EXTRA SPECIALIZATION PLANS =====
  {id:'back-gym-strength',muscle:'back',env:'gym',level:'advanced',icon:'🏋️',title:'Back Strength — Deadlift Focus',meta:'1x/week · 45 min · Gym',featured:false,
   tip:'<strong>This is a pure strength day.</strong> Low reps, long rest, near-max loads. Warm up thoroughly.',
   days:[{label:'DEADLIFT FOCUS',exercises:[
     {name:'Conventional Deadlift (work up to heavy triple)',sets:'6×3',rest:'3min'},{name:'Deficit Deadlift',sets:'3×5',rest:'2min'},
     {name:'Barbell Row (heavy)',sets:'4×5',rest:'2min'},{name:'Weighted Pull-Ups',sets:'4×5',rest:'90s'}]}]},
  {id:'back-home-endurance',muscle:'back',env:'home',level:'beginner',icon:'🏠',title:'Back Endurance — High Rep Home',meta:'2x/week · 25 min',featured:false,
   tip:'<strong>Higher reps build muscular endurance</strong> when you don\'t have heavy weight to pull against.',
   days:[{label:'BACK ENDURANCE',exercises:[
     {name:'Bodyweight Row (table, slow)',sets:'4×20',rest:'45s'},{name:'Superman Hold',sets:'4×20s',rest:'30s'},
     {name:'Reverse Snow Angels',sets:'4×20',rest:'30s'},{name:'Prone Y-Raise',sets:'3×15',rest:'30s'}]}]},

  // ===== SHOULDERS — EXTRA SPECIALIZATION PLANS =====
  {id:'shoulders-gym-specialist',muscle:'shoulders',env:'gym',level:'intermediate',icon:'🏋️',title:'Delt Specialization — 21s & Drop Sets',meta:'2x/week · 35 min · Gym',featured:false,
   tip:'<strong>Drop sets and partial reps ("21s") shock the delts</strong> when regular sets stop working.',
   days:[{label:'SHOULDER SHOCK',exercises:[
     {name:'Lateral Raise 21s (7 bottom, 7 top, 7 full)',sets:'3 sets',rest:'45s'},{name:'Cable Lateral Raise (drop set)',sets:'3×15/12/10',rest:'45s'},
     {name:'Rear Delt Fly (drop set)',sets:'3×15/12/10',rest:'45s'},{name:'Front Raise (plate)',sets:'3×15',rest:'30s'}]}]},
  {id:'shoulders-home-mobility',muscle:'shoulders',env:'home',level:'beginner',icon:'🏠',title:'Shoulder Mobility & Stability — Home',meta:'3x/week · 15 min',featured:false,
   tip:'<strong>Healthy shoulders lift more long-term.</strong> This session is about joint health, not fatigue.',
   days:[{label:'MOBILITY & STABILITY',exercises:[
     {name:'Arm Circles (both directions)',sets:'2×30s',rest:'15s'},{name:'Wall Slides',sets:'3×12',rest:'30s'},
     {name:'Band/Towel Pull-Apart',sets:'3×15',rest:'30s'},{name:'Scapular Push-Ups',sets:'3×12',rest:'30s'},
     {name:'Prone YTW Hold',sets:'2×10s each',rest:'30s'}]}]},

  // ===== ARMS — EXTRA SPECIALIZATION PLANS =====
  {id:'arms-gym-giant',muscle:'arms',env:'gym',level:'advanced',icon:'🏋️',title:'Arms Giant Sets — Gym',meta:'2x/week · 40 min · Gym',featured:false,
   tip:'<strong>Giant sets (3-4 exercises back-to-back) crush the arms</strong> with minimal time on the clock.',
   days:[{label:'BICEP GIANT SET (repeat 3 rounds)',exercises:[
     {name:'Barbell Curl',sets:'10 reps',rest:'0s'},{name:'Hammer Curl',sets:'10 reps',rest:'0s'},
     {name:'Cable Curl',sets:'10 reps',rest:'90s (end of round)'}]},
    {label:'TRICEP GIANT SET (repeat 3 rounds)',exercises:[
     {name:'Rope Pushdown',sets:'12 reps',rest:'0s'},{name:'Overhead Extension',sets:'12 reps',rest:'0s'},
     {name:'Bench Dip',sets:'12 reps',rest:'90s (end of round)'}]}]},
  {id:'arms-home-burnout',muscle:'arms',env:'home',level:'intermediate',icon:'🏠',title:'Arms Burnout — Home Finisher',meta:'2x/week · 20 min',featured:false,
   tip:'<strong>Tack this onto the end of any home workout</strong> for a serious arm pump.',
   days:[{label:'ARM BURNOUT CIRCUIT (repeat 3 rounds)',exercises:[
     {name:'Diamond Push-Ups',sets:'to failure',rest:'0s'},{name:'Chin-Ups (or negatives)',sets:'to failure',rest:'0s'},
     {name:'Tricep Dips (chair)',sets:'to failure',rest:'60s (end of round)'}]}]},

  // ===== LEGS — EXTRA SPECIALIZATION PLANS =====
  {id:'legs-gym-power',muscle:'legs',env:'gym',level:'advanced',icon:'🏋️',title:'Leg Power — Squat Strength Focus',meta:'1x/week · 50 min · Gym',featured:false,
   tip:'<strong>Pure strength day.</strong> Build toward a heavy top single or triple on squats. Use a spotter or rack safeties.',
   days:[{label:'SQUAT STRENGTH',exercises:[
     {name:'Back Squat (work up to heavy triple)',sets:'6×3',rest:'3min'},{name:'Pause Squat',sets:'3×5',rest:'2min'},
     {name:'Front Squat',sets:'3×5',rest:'2min'},{name:'Walking Lunge (heavy)',sets:'3×10 each',rest:'90s'}]}]},
  {id:'legs-home-endurance',muscle:'legs',env:'home',level:'beginner',icon:'🏠',title:'Legs Endurance — Home Circuit',meta:'3x/week · 25 min',featured:false,
   tip:'<strong>High reps, minimal rest.</strong> Builds muscular endurance and burns fat without any equipment.',
   days:[{label:'LEG ENDURANCE CIRCUIT (repeat 3 rounds)',exercises:[
     {name:'Bodyweight Squat',sets:'25 reps',rest:'20s'},{name:'Reverse Lunge',sets:'15 each',rest:'20s'},
     {name:'Glute Bridge',sets:'20 reps',rest:'20s'},{name:'Wall Sit',sets:'30s',rest:'30s (end of round)'}]}]},

  // ===== GLUTES — EXTRA SPECIALIZATION PLANS =====
  {id:'glutes-gym-specialist',muscle:'glutes',env:'gym',level:'intermediate',icon:'🏋️',title:'Glute Specialization — Activation & Growth',meta:'2x/week · 40 min · Gym',featured:false,
   tip:'<strong>Activate before you load.</strong> Banded warm-ups make every heavy set that follows more effective.',
   days:[{label:'GLUTE ACTIVATION + GROWTH',exercises:[
     {name:'Banded Glute Bridge (activation)',sets:'2×20',rest:'20s'},{name:'Banded Lateral Walk (activation)',sets:'2×20 each',rest:'20s'},
     {name:'Barbell Hip Thrust',sets:'4×12',rest:'75s'},{name:'Cable Kickback',sets:'3×15 each',rest:'45s'},
     {name:'Abductor Machine',sets:'3×20',rest:'30s'}]}]},
  {id:'glutes-home-burnout',muscle:'glutes',env:'home',level:'intermediate',icon:'🏠',title:'Glute Burnout — Home Finisher',meta:'2x/week · 20 min',featured:false,
   tip:'<strong>End with a burnout set to failure</strong> on the last exercise — that\'s where the growth signal comes from.',
   days:[{label:'GLUTE BURNOUT CIRCUIT (repeat 3 rounds)',exercises:[
     {name:'Glute Bridge',sets:'20 reps',rest:'0s'},{name:'Donkey Kick',sets:'15 each',rest:'0s'},
     {name:'Fire Hydrant',sets:'15 each',rest:'60s (end of round)'},{name:'Glute Bridge Hold (final round only)',sets:'to failure',rest:'none'}]}]},

  // ===== CORE — EXTRA SPECIALIZATION PLANS =====
  {id:'core-gym-weighted',muscle:'core',env:'gym',level:'intermediate',icon:'🏋️',title:'Weighted Core — Gym',meta:'2x/week · 20 min · Gym',featured:false,
   tip:'<strong>Add weight once bodyweight core work gets easy.</strong> A strong core transfers directly to every other lift.',
   days:[{label:'WEIGHTED CORE',exercises:[
     {name:'Weighted Cable Crunch',sets:'4×15',rest:'45s'},{name:'Weighted Hanging Leg Raise',sets:'4×12',rest:'45s'},
     {name:'Weighted Russian Twist',sets:'3×20',rest:'30s'},{name:'Weighted Plank (plate on back)',sets:'3×30s',rest:'30s'}]}]},
  {id:'core-home-tabata',muscle:'core',env:'home',level:'intermediate',icon:'🏠',title:'Core Tabata — Home',meta:'3x/week · 15 min',featured:false,
   tip:'<strong>20s max effort, 10s rest, 8 rounds per exercise.</strong> Classic Tabata protocol for a fast, brutal core session.',
   days:[{label:'TABATA CORE (20s on / 10s off × 8 rounds each)',exercises:[
     {name:'Crunches',sets:'8 rounds',rest:''},{name:'Bicycle Crunches',sets:'8 rounds',rest:''},
     {name:'Mountain Climbers',sets:'8 rounds',rest:''},{name:'Plank Hold',sets:'8 rounds',rest:''}]}]},

  // ===== FULL BODY — EXTRA SPECIALIZATION PLANS =====
  {id:'fullbody-gym-ppl',muscle:'fullbody',env:'gym',level:'intermediate',icon:'⭐',title:'Push Pull Legs — Strength Split',meta:'6 days/week · 55 min · Gym',featured:false,
   tip:'<strong>The classic PPL split.</strong> Run it twice through the week for 6 total sessions.',
   days:[
     {label:'PUSH (Chest/Shoulders/Triceps)',exercises:[
       {name:'Flat Barbell Bench Press',sets:'4×8',rest:'90s'},{name:'Seated Dumbbell Press',sets:'3×10',rest:'75s'},
       {name:'Lateral Raise',sets:'3×15',rest:'45s'},{name:'Tricep Rope Pushdown',sets:'3×15',rest:'45s'}]},
     {label:'PULL (Back/Biceps)',exercises:[
       {name:'Pull-Ups',sets:'4×8',rest:'90s'},{name:'Barbell Row',sets:'4×10',rest:'75s'},
       {name:'Face Pulls',sets:'3×15',rest:'45s'},{name:'Barbell Curl',sets:'3×12',rest:'45s'}]},
     {label:'LEGS',exercises:[
       {name:'Back Squat',sets:'4×8',rest:'90s'},{name:'Romanian Deadlift',sets:'4×10',rest:'90s'},
       {name:'Leg Press',sets:'3×15',rest:'75s'},{name:'Calf Raise',sets:'4×20',rest:'30s'}]}]},
  {id:'fullbody-home-express',muscle:'fullbody',env:'home',level:'beginner',icon:'⭐',title:'Full Body Circuit — 20-Min Express',meta:'4x/week · 20 min · Home',featured:false,
   tip:'<strong>Short on time?</strong> This hits every major muscle group in one fast circuit — perfect for busy days.',
   days:[{label:'FULL BODY EXPRESS (repeat 4 rounds)',exercises:[
     {name:'Push-Ups',sets:'10 reps',rest:'0s'},{name:'Bodyweight Squat',sets:'15 reps',rest:'0s'},
     {name:'Bodyweight Row (table)',sets:'10 reps',rest:'0s'},{name:'Glute Bridge',sets:'15 reps',rest:'0s'},
     {name:'Plank',sets:'20s',rest:'60s (end of round)'}]}]},
];
