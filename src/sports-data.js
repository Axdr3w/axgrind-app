export const SPORTS = [
  { id: 'calisthenics', name: 'Calisthenics', icon: '🤸', description: 'Bodyweight strength and skill work — includes progressions for muscle-up, planche, front lever, handstand, and L-sit.' },
  { id: 'yoga', name: 'Yoga', icon: '🧘', description: 'Flow-based flexibility, balance, and breath-focused training.' },
  { id: 'soccer', name: 'Soccer', icon: '⚽', description: 'Ball control, passing, shooting, and match-speed conditioning.' },
  { id: 'basketball', name: 'Basketball', icon: '🏀', description: 'Ball handling, shooting mechanics, and explosive court movement.' },
  { id: 'fencing', name: 'Fencing', icon: '🤺', description: 'Footwork, distance control, and blade work fundamentals.' },
  { id: 'lacrosse', name: 'Lacrosse', icon: '🥍', description: 'Stick skills, dodging, and game-speed conditioning.' },
  { id: 'swimming', name: 'Swimming', icon: '🏊', description: 'Stroke technique, interval sets, and race-pace training.' },
  { id: 'climbing', name: 'Climbing', icon: '🧗', description: 'Bouldering movement, finger strength, and power endurance.' },
  { id: 'tennis', name: 'Tennis', icon: '🎾', description: 'Groundstrokes, footwork, and match-intensity conditioning.' },
  { id: 'boxing', name: 'Boxing', icon: '🥊', description: 'Stance, combinations, defense, and round-based conditioning.' },
  { id: 'volleyball', name: 'Volleyball', icon: '🏐', description: 'Passing, attacking, and explosive jump training.' },
  { id: 'football', name: 'Football', icon: '🏈', description: 'Stance, routes, tackling technique, and combine-style power.' },
  { id: 'baseball', name: 'Baseball', icon: '⚾', description: 'Throwing, fielding, hitting mechanics, and live game reps.' },
  { id: 'hockey', name: 'Ice Hockey', icon: '🏒', description: 'Skating fundamentals, edge work, and shooting power.' },
  { id: 'golf', name: 'Golf', icon: '⛳', description: 'Swing mechanics, short game, and precision practice.' },
  { id: 'wrestling', name: 'Wrestling', icon: '🤼', description: 'Stance, takedowns, chain wrestling, and live conditioning.' },
  { id: 'track', name: 'Track & Field', icon: '🏃', description: 'Running form, interval training, and race-pace power.' },
  { id: 'gymnastics', name: 'Gymnastics', icon: '🤸‍♀️', description: 'Body control fundamentals, rolls, and advanced skill progressions.' },
  { id: 'cycling', name: 'Cycling', icon: '🚴', description: 'Endurance base building, hill repeats, and race-pace intervals.' },
  { id: 'rowing', name: 'Rowing', icon: '🚣', description: 'Stroke technique, interval pieces, and 2k race-pace training.' },
  { id: 'tabletennis', name: 'Table Tennis', icon: '🏓', description: 'Grip, footwork, topspin, and fast-paced reaction training.' },
  { id: 'badminton', name: 'Badminton', icon: '🏸', description: 'Strokes, footwork, smash technique, and deceptive shot play.' },
  { id: 'skateboarding', name: 'Skateboarding', icon: '🛹', description: 'Balance, ollies, flip tricks, and progressive trick building.' },
  { id: 'surfing', name: 'Surfing', icon: '🏄', description: 'Paddling, pop-up technique, and wave-reading skills.' },
  { id: 'martialarts', name: 'Martial Arts', icon: '🥋', description: 'Stances, striking fundamentals, and controlled sparring.' },
  { id: 'rugby', name: 'Rugby', icon: '🏉', description: 'Passing, tackling technique, and contact conditioning.' },

  // Olympic sports batch
  { id: 'archery', name: 'Archery', icon: '🏹', description: 'Stance, draw technique, and consistency under competition pressure.' },
  { id: 'breaking', name: 'Breaking', icon: '🕺', description: 'Toprock, footwork, freezes, and power move progressions.' },
  { id: 'canoekayak', name: 'Canoe/Kayak', icon: '🛶', description: 'Paddle stroke technique, core rotation power, and race-pace intervals.' },
  { id: 'diving', name: 'Diving', icon: '🤿', description: 'Entry technique, aerial body control, and rotation drills.' },
  { id: 'equestrian', name: 'Equestrian', icon: '🐎', description: 'Riding position, core stability, and grip endurance for control in the saddle.' },
  { id: 'fieldhockey', name: 'Field Hockey', icon: '🏑', description: 'Stick skills, passing, and game-speed conditioning.' },
  { id: 'handball', name: 'Handball', icon: '🤾', description: 'Passing, jump shot technique, and explosive court movement.' },
  { id: 'judo', name: 'Judo', icon: '🥋', description: 'Grip fighting, throwing technique, and groundwork fundamentals.' },
  { id: 'pentathlon', name: 'Modern Pentathlon', icon: '🎖️', description: 'Combined training across fencing, swimming, riding, and running/shooting.' },
  { id: 'sailing', name: 'Sailing', icon: '⛵', description: 'Hiking position endurance, core stability, and quick-response boat handling.' },
  { id: 'shooting', name: 'Shooting', icon: '🎯', description: 'Stance, trigger control, and precision under time pressure.' },
  { id: 'taekwondo', name: 'Taekwondo', icon: '🥋', description: 'Kicking fundamentals, combinations, and sparring conditioning.' },
  { id: 'triathlon', name: 'Triathlon', icon: '⏱️', description: 'Combined swim-bike-run training and transition practice.' },
  { id: 'waterpolo', name: 'Water Polo', icon: '🤽', description: 'Eggbeater kick, passing, and explosive in-water conditioning.' },
  { id: 'weightlifting', name: 'Weightlifting', icon: '🏋️', description: 'Olympic snatch and clean & jerk technique, mobility, and progressive loading.' },
  { id: 'alpineskiing', name: 'Alpine Skiing', icon: '⛷️', description: 'Leg strength, edge control concepts, and race-pace power (dryland-focused).' },
  { id: 'biathlon', name: 'Biathlon', icon: '🎿', description: 'Ski endurance combined with rapid shooting-transition drills.' },
  { id: 'bobsled', name: 'Bobsled', icon: '🛷', description: 'Explosive sprint-start power and push technique.' },
  { id: 'crosscountryskiing', name: 'Cross-Country Skiing', icon: '🎿', description: 'Aerobic base building, double-poling strength, and race-pace intervals.' },
  { id: 'curling', name: 'Curling', icon: '🥌', description: 'Delivery balance, sweeping technique, and sweeping endurance.' },
  { id: 'figureskating', name: 'Figure Skating', icon: '⛸️', description: 'Off-ice edge and balance work, jump technique, and core/posture control.' },
  { id: 'freestyleskiing', name: 'Freestyle Skiing', icon: '🎿', description: 'Aerial body awareness, trampoline-based rotation practice, and leg power.' },
  { id: 'luge', name: 'Luge', icon: '🛷', description: 'Explosive start power and aerodynamic position endurance.' },
  { id: 'nordiccombined', name: 'Nordic Combined', icon: '🎿', description: 'Combined ski jump and cross-country skiing conditioning.' },
  { id: 'shorttrack', name: 'Short Track Speed Skating', icon: '⛸️', description: 'Off-ice skating stance, explosive starts, and corner technique.' },
  { id: 'skeleton', name: 'Skeleton', icon: '🛷', description: 'Max sprint-start power and core stability for high-speed control.' },
  { id: 'skijumping', name: 'Ski Jumping', icon: '🎿', description: 'Explosive takeoff power, aerial position holds, and landing technique.' },
  { id: 'snowboarding', name: 'Snowboarding', icon: '🏂', description: 'Balance, edge control, and progressive trick building.' },
  { id: 'speedskating', name: 'Speed Skating', icon: '⛸️', description: 'Explosive stride power, low-stance endurance, and race-pace intervals.' },
];

// Multi-week training programs, distinct from single-sport skill workouts —
// shown in their own "Programs" tab in Plans (array order = display order,
// not alphabetical, so priority programs like Recovery can stay pinned up top).
export const PROGRAMS = [
  { id: 'recovery', name: 'Recovery', icon: '🔄', description: 'A 3-week program of foam rolling, mobility flows, and contrast therapy to speed up how fast your body repairs itself.' },
  { id: 'breathing', name: 'Deep Breathing & Stress Relief', icon: '🌬️', description: 'A 2-week daily practice of breathing techniques and relaxation drills to calm your nervous system and manage stress.' },
  { id: 'kneepain', name: 'Knee Pain Relief', icon: '🦵', description: 'A 3-week program of gentle activation and progressive strengthening to build knee support without aggravating pain.' },
  { id: 'backpain', name: 'Lower Back Pain Relief', icon: '🩹', description: 'A 3-week program of gentle mobility and core activation to build the support your lower back needs day to day.' },
  { id: 'shoulderpain', name: 'Shoulder Pain Relief', icon: '🦾', description: 'A 3-week program of scapular activation and rotator cuff strengthening to build stable, resilient shoulders.' },
  { id: 'neckpain', name: 'Neck Pain Relief', icon: '🧣', description: 'A 2-week program of gentle mobility and posture work to ease neck tightness from long hours at a desk.' },
  { id: 'hippain', name: 'Hip Pain Relief', icon: '🦴', description: 'A 3-week program of hip mobility and glute strengthening to take pressure off a tight, sore hip.' },
  { id: 'wristpain', name: 'Wrist & Elbow Pain Relief', icon: '✋', description: 'A 2-week program of mobility and gradual tendon loading to ease wrist and elbow soreness from overuse.' },
  { id: 'anklepain', name: 'Ankle Pain Relief', icon: '🦶', description: 'A 2-week program of mobility, balance, and calf strengthening to build a more stable, resilient ankle.' },
  { id: 'fatloss', name: 'Fat Loss', icon: '🔥', description: 'A 6-week progressive program combining full-body circuits and HIIT to maximize calorie burn.' },
  { id: 'mobility', name: 'Mobility & Flexibility', icon: '🧘‍♂️', description: 'A 4-week program to open up your hips, shoulders, and spine and build real, usable flexibility.' },
];

export const SPORTS_WORKOUTS = [
  // ===== CALISTHENICS =====
  {id:'calisthenics-beg',sport:'calisthenics',level:'beginner',icon:'🤸',title:'Calisthenics Foundations — Beginner',meta:'3x/week · 30 min',featured:true,
   tip:'<strong>Master the basics before chasing skills.</strong> Strict form on push-ups, rows, and squats builds the base everything else is built on.',
   days:[{label:'FOUNDATIONS',exercises:[
     {name:'Push-Ups',sets:'4×10',rest:'60s'},{name:'Bodyweight Row (table)',sets:'4×10',rest:'60s'},
     {name:'Bodyweight Squat',sets:'4×15',rest:'45s'},{name:'Plank Hold',sets:'3×30s',rest:'30s'},
     {name:'Dead Hang',sets:'3×20s',rest:'45s'},{name:'Hollow Body Hold',sets:'3×15s',rest:'30s'}]}]},
  {id:'calisthenics-int',sport:'calisthenics',level:'intermediate',icon:'🤸',title:'Skill Progressions — Intermediate',meta:'3x/week · 40 min',featured:true,
   tip:'<strong>This is where skills start forming.</strong> Negatives and holds build the strength that full reps need later.',
   days:[{label:'SKILL WORK',exercises:[
     {name:'Pull-Ups',sets:'5×6',rest:'90s'},{name:'Dips',sets:'4×10',rest:'75s'},
     {name:'Pistol Squats (assisted)',sets:'3×5 each',rest:'90s'},{name:'L-Sit Hold',sets:'4×10s',rest:'45s'},
     {name:'Handstand Push-Ups (wall)',sets:'3×6',rest:'90s'},{name:'Archer Push-Ups',sets:'3×6 each',rest:'60s'}]}]},
  {id:'calisthenics-adv',sport:'calisthenics',level:'advanced',icon:'🤸',title:'Elite Skills — Advanced',meta:'3x/week · 50 min',featured:false,
   tip:'<strong>Muscle-ups and levers require real prerequisite strength.</strong> Don\'t rush these — injury risk is real at this level.',
   days:[{label:'ELITE SKILLS',exercises:[
     {name:'Muscle-Up practice',sets:'5×3',rest:'2min'},{name:'Front Lever progression (tuck)',sets:'4×10s',rest:'90s'},
     {name:'Weighted Dips',sets:'4×6',rest:'90s'},{name:'Handstand Push-Ups',sets:'4×6',rest:'2min'},
     {name:'Dragon Flag',sets:'3×6',rest:'90s'},{name:'Pistol Squats',sets:'4×6 each',rest:'90s'}]}]},

  // ===== YOGA =====
  {id:'yoga-beg',sport:'yoga',level:'beginner',icon:'🧘',title:'Yoga Fundamentals — Beginner',meta:'3x/week · 25 min',featured:true,
   tip:'<strong>Breathe first, stretch second.</strong> Match your breath to each movement — that\'s the actual practice, not how deep you can fold.',
   days:[{label:'FOUNDATIONS FLOW',exercises:[
     {name:'Sun Salutation A',sets:'4 rounds',rest:''},{name:"Child's Pose",sets:'1min',rest:''},
     {name:'Downward Dog',sets:'5 breaths',rest:''},{name:'Warrior I & II',sets:'5 breaths each side',rest:''},
     {name:"Cat-Cow",sets:'8 rounds',rest:''},{name:'Seated Forward Fold',sets:'1min',rest:''}]}]},
  {id:'yoga-int',sport:'yoga',level:'intermediate',icon:'🧘',title:'Vinyasa Flow — Intermediate',meta:'3x/week · 35 min',featured:false,
   tip:'<strong>Link breath to movement continuously.</strong> One breath, one movement — that\'s what makes it a "flow."',
   days:[{label:'VINYASA FLOW',exercises:[
     {name:'Sun Salutation B',sets:'5 rounds',rest:''},{name:'Warrior III',sets:'5 breaths each side',rest:''},
     {name:'Half Moon Pose',sets:'5 breaths each side',rest:''},{name:'Crow Pose',sets:'3×10s',rest:'30s'},
     {name:'Camel Pose',sets:'5 breaths',rest:''},{name:'Pigeon Pose',sets:'1min each side',rest:''}]}]},
  {id:'yoga-adv',sport:'yoga',level:'advanced',icon:'🧘',title:'Power & Arm Balances — Advanced',meta:'3x/week · 45 min',featured:false,
   tip:'<strong>Arm balances need a warm, engaged core more than raw strength.</strong> Never force a backbend — build up gradually.',
   days:[{label:'POWER FLOW',exercises:[
     {name:'Sun Salutation B (fast flow)',sets:'8 rounds',rest:''},{name:'Handstand practice (wall)',sets:'5×20s',rest:'60s'},
     {name:'Firefly Pose',sets:'3×10s',rest:'30s'},{name:'Wheel Pose',sets:'3×20s',rest:'45s'},
     {name:'Side Crow',sets:'3×10s each',rest:'30s'},{name:'Scorpion progression',sets:'3×10s',rest:'45s'}]}]},

  // ===== SOCCER =====
  {id:'soccer-beg',sport:'soccer',level:'beginner',icon:'⚽',title:'Soccer Fundamentals — Beginner',meta:'3x/week · 40 min',featured:true,
   tip:'<strong>Touch the ball every session.</strong> Ball control at a walking pace, done consistently, beats occasional hard sessions.',
   days:[{label:'BALL CONTROL BASICS',exercises:[
     {name:'Jog warm-up',sets:'5 min',rest:''},{name:'Cone Weaving Dribble',sets:'6 reps',rest:'45s'},
     {name:'Inside-Foot Passing (wall)',sets:'4×15',rest:'45s'},{name:'Juggling practice',sets:'5×2 min',rest:'30s'},
     {name:'Shooting on Goal',sets:'3×10 shots',rest:'60s'},{name:'Cool-down jog',sets:'5 min',rest:''}]}]},
  {id:'soccer-int',sport:'soccer',level:'intermediate',icon:'⚽',title:'Dribbling & Agility — Intermediate',meta:'3x/week · 50 min',featured:true,
   tip:'<strong>Speed of play matters more than fancy moves.</strong> Practice combos at game speed, not slow motion.',
   days:[{label:'SKILL & AGILITY',exercises:[
     {name:'Dynamic warm-up',sets:'8 min',rest:''},{name:'Agility Ladder Drills',sets:'6×20s',rest:'30s'},
     {name:'Dribbling Combo Moves (step-over, cut)',sets:'8 reps',rest:'45s'},{name:'First-Touch Passing (moving ball)',sets:'4×15',rest:'45s'},
     {name:'Shooting Off the Dribble',sets:'3×10',rest:'60s'},{name:'Small-Sided Possession Game',sets:'15 min',rest:''}]}]},
  {id:'soccer-adv',sport:'soccer',level:'advanced',icon:'⚽',title:'Match Conditioning — Advanced',meta:'4x/week · 60 min',featured:false,
   tip:'<strong>Train the way the game actually demands</strong> — repeated sprints with short recovery, not steady jogging.',
   days:[{label:'MATCH-INTENSITY TRAINING',exercises:[
     {name:'Dynamic warm-up + activation',sets:'10 min',rest:''},{name:'Repeated Sprint Shuttles (30m)',sets:'10×30s on/30s off',rest:''},
     {name:'1v1 Attacking/Defending Drills',sets:'8 reps',rest:'45s'},{name:'Advanced Dribbling Combos (full speed)',sets:'10 reps',rest:'30s'},
     {name:'Finishing Under Pressure',sets:'4×10 shots',rest:'60s'},{name:'Small-Sided Game (high intensity)',sets:'20 min',rest:''}]}]},

  // ===== BASKETBALL =====
  {id:'basketball-beg',sport:'basketball',level:'beginner',icon:'🏀',title:'Basketball Fundamentals — Beginner',meta:'3x/week · 35 min',featured:true,
   tip:'<strong>Form shooting before game shooting.</strong> Grooving correct mechanics close to the hoop pays off far more than heaving threes.',
   days:[{label:'BALL HANDLING & SHOOTING',exercises:[
     {name:'Stationary Dribbling (both hands)',sets:'3×1min each',rest:'30s'},{name:'Form Shooting (close range)',sets:'4×10',rest:'45s'},
     {name:'Layup Practice (both sides)',sets:'4×10',rest:'45s'},{name:'Figure-8 Dribble',sets:'3×1min',rest:'30s'},
     {name:'Free Throws',sets:'3×10',rest:'45s'},{name:'Defensive Slides',sets:'4×20s',rest:'30s'}]}]},
  {id:'basketball-int',sport:'basketball',level:'intermediate',icon:'🏀',title:'Ball Handling & Shooting — Intermediate',meta:'3x/week · 45 min',featured:true,
   tip:'<strong>Combine dribble moves with a shot at the end.</strong> Isolated skills don\'t transfer to games — chained ones do.',
   days:[{label:'COMBO WORK',exercises:[
     {name:'Dynamic warm-up',sets:'6 min',rest:''},{name:'Crossover-to-Pull-Up Jumper',sets:'5×8',rest:'45s'},
     {name:'Mid-Range Shooting off the Dribble',sets:'4×10',rest:'45s'},{name:'Defensive Slide + Closeout Drill',sets:'6×20s',rest:'30s'},
     {name:'Two-Ball Dribbling Drill',sets:'3×1min',rest:'45s'},{name:'Full-Court Layup Sprints',sets:'6 reps',rest:'45s'}]}]},
  {id:'basketball-adv',sport:'basketball',level:'advanced',icon:'🏀',title:'Explosive Performance — Advanced',meta:'4x/week · 55 min',featured:false,
   tip:'<strong>Vertical power and lateral quickness separate good players from great ones.</strong> Train them directly, not just through scrimmage.',
   days:[{label:'EXPLOSIVE TRAINING',exercises:[
     {name:'Dynamic warm-up + pogo hops',sets:'8 min',rest:''},{name:'Box Jumps',sets:'5×6',rest:'90s'},
     {name:'Combo Moves Full Speed (in-and-out, hesitation)',sets:'10 reps',rest:'45s'},{name:'Catch-and-Shoot Conditioning',sets:'5×10 shots',rest:'45s'},
     {name:'Defensive Slide Shuttle',sets:'6×20s',rest:'30s'},{name:'Full-Court 1v1',sets:'6 rounds',rest:'60s'}]}]},

  // ===== FENCING =====
  {id:'fencing-beg',sport:'fencing',level:'beginner',icon:'🤺',title:'Footwork & Fundamentals — Beginner',meta:'3x/week · 30 min',featured:true,
   tip:'<strong>Footwork is 80% of fencing.</strong> Everyone wants to work the blade — the legs are what actually win touches.',
   days:[{label:'FOOTWORK BASICS',exercises:[
     {name:'En Garde Stance Hold',sets:'3×30s',rest:'30s'},{name:'Advance-Retreat Steps',sets:'6×20s',rest:'30s'},
     {name:'Lunge Practice',sets:'4×10',rest:'45s'},{name:'Mirror Blade Drills',sets:'3×2min',rest:'45s'},
     {name:'Advance-Lunge Combo',sets:'5×8',rest:'45s'},{name:'Balance Hold (en garde, eyes closed)',sets:'3×20s',rest:'30s'}]}]},
  {id:'fencing-int',sport:'fencing',level:'intermediate',icon:'🤺',title:'Distance & Timing — Intermediate',meta:'3x/week · 40 min',featured:false,
   tip:'<strong>Control the distance and you control the exchange.</strong> Practice recognizing when you\'re in range, not just reacting.',
   days:[{label:'DISTANCE CONTROL',exercises:[
     {name:'Footwork warm-up',sets:'5 min',rest:''},{name:'Advance-Advance-Lunge Combo',sets:'6×8',rest:'45s'},
     {name:'Retreat-Parry-Riposte Drill',sets:'5×10',rest:'45s'},{name:'Fleche Practice',sets:'4×8',rest:'60s'},
     {name:'Reaction Lunge (partner cue)',sets:'5×10',rest:'45s'},{name:'Footwork Endurance Circuit',sets:'4×1min',rest:'45s'}]}]},
  {id:'fencing-adv',sport:'fencing',level:'advanced',icon:'🤺',title:'Explosive Bladework — Advanced',meta:'4x/week · 50 min',featured:false,
   tip:'<strong>Explosive footwork under fatigue is what separates competitive fencers.</strong> Train it tired, not just fresh.',
   days:[{label:'COMPETITIVE CONDITIONING',exercises:[
     {name:'Footwork warm-up',sets:'6 min',rest:''},{name:'Explosive Lunge Intervals',sets:'8×15s',rest:'30s'},
     {name:'Reaction Drills (partner/light cue)',sets:'6×10',rest:'45s'},{name:'Fleche Sprint Combo',sets:'6×8',rest:'60s'},
     {name:'Footwork Under Fatigue Circuit',sets:'5×1min',rest:'30s'},{name:'Bout Simulation',sets:'5×3min',rest:'90s'}]}]},

  // ===== LACROSSE =====
  {id:'lacrosse-beg',sport:'lacrosse',level:'beginner',icon:'🥍',title:'Stick Skills Fundamentals — Beginner',meta:'3x/week · 35 min',featured:true,
   tip:'<strong>Cradle constantly, even when not drilling.</strong> Stick familiarity is what separates comfortable players from stiff ones.',
   days:[{label:'STICK BASICS',exercises:[
     {name:'Cradling Practice (both hands)',sets:'3×1min each',rest:'30s'},{name:'Wall Ball Passing',sets:'4×20',rest:'45s'},
     {name:'Catching on the Run',sets:'4×10',rest:'45s'},{name:'Ground Ball Scoops',sets:'4×10',rest:'45s'},
     {name:'Shooting on Goal (stationary)',sets:'3×10',rest:'60s'},{name:'Footwork Ladder',sets:'4×20s',rest:'30s'}]}]},
  {id:'lacrosse-int',sport:'lacrosse',level:'intermediate',icon:'🥍',title:'Dodging & Shooting — Intermediate',meta:'3x/week · 45 min',featured:false,
   tip:'<strong>Shoot on the run, not just standing still.</strong> That\'s how shots actually happen in a game.',
   days:[{label:'DODGE & FINISH',exercises:[
     {name:'Dynamic warm-up',sets:'6 min',rest:''},{name:'Split-Dodge Practice',sets:'6×8',rest:'45s'},
     {name:'Shooting on the Run',sets:'4×10',rest:'45s'},{name:'Ground Ball Under Pressure',sets:'5×8',rest:'45s'},
     {name:'Face Dodge to Shot Combo',sets:'6×8',rest:'45s'},{name:'Agility Shuttle',sets:'5×20s',rest:'30s'}]}]},
  {id:'lacrosse-adv',sport:'lacrosse',level:'advanced',icon:'🥍',title:'Game-Speed Conditioning — Advanced',meta:'4x/week · 55 min',featured:false,
   tip:'<strong>Stick skills fall apart under fatigue if you never train them tired.</strong> Push through fatigue in practice, not just in games.',
   days:[{label:'GAME-SPEED TRAINING',exercises:[
     {name:'Dynamic warm-up + sprints',sets:'8 min',rest:''},{name:'Dodge Combos Full Speed',sets:'8×8',rest:'45s'},
     {name:'Shooting Under Fatigue',sets:'5×10',rest:'45s'},{name:'Explosive Change of Direction',sets:'6×15s',rest:'30s'},
     {name:'Ground Ball Scramble Drill',sets:'6×8',rest:'45s'},{name:'Man-Up/Man-Down Simulation',sets:'15 min',rest:''}]}]},

  // ===== SWIMMING =====
  {id:'swimming-beg',sport:'swimming',level:'beginner',icon:'🏊',title:'Technique Foundations — Beginner',meta:'3x/week · 30 min pool',featured:true,
   tip:'<strong>Technique before distance.</strong> Bad form repeated for laps just grooves bad habits — swim slow and clean first.',
   days:[{label:'TECHNIQUE SET',exercises:[
     {name:'Easy Warm-up Swim',sets:'200m',rest:''},{name:'Catch-Up Drill (freestyle)',sets:'4×50m',rest:'30s'},
     {name:'Kickboard Kick Set',sets:'4×50m',rest:'30s'},{name:'Freestyle Technique Swim',sets:'4×50m',rest:'45s'},
     {name:'Breathing Drill (bilateral)',sets:'4×25m',rest:'30s'},{name:'Easy Cool-down Swim',sets:'100m',rest:''}]}]},
  {id:'swimming-int',sport:'swimming',level:'intermediate',icon:'🏊',title:'Interval Endurance — Intermediate',meta:'3x/week · 40 min pool',featured:false,
   tip:'<strong>Hold a consistent pace across every interval.</strong> A steady 8x50 beats a fast first rep and a slow last one.',
   days:[{label:'INTERVAL SET',exercises:[
     {name:'Warm-up Swim',sets:'300m',rest:''},{name:'Freestyle Interval Set',sets:'8×50m',rest:'20s'},
     {name:'Kick Set',sets:'4×50m',rest:'30s'},{name:'Pull Set (buoy)',sets:'4×50m',rest:'30s'},
     {name:'Descending Effort Set',sets:'4×100m',rest:'45s'},{name:'Cool-down Swim',sets:'150m',rest:''}]}]},
  {id:'swimming-adv',sport:'swimming',level:'advanced',icon:'🏊',title:'Race-Pace Training — Advanced',meta:'4x/week · 55 min pool',featured:false,
   tip:'<strong>Race-pace sets are uncomfortable by design.</strong> If they feel easy, you\'re not going fast enough.',
   days:[{label:'RACE-PACE SET',exercises:[
     {name:'Warm-up Swim',sets:'400m',rest:''},{name:'Race-Pace 100s',sets:'6×100m',rest:'30s'},
     {name:'Broken 200 (race pace)',sets:'2×200m',rest:'60s'},{name:'Kick Set (fast)',sets:'6×50m',rest:'20s'},
     {name:'Sprint Set',sets:'8×25m all-out',rest:'30s'},{name:'Dryland Core Circuit',sets:'3 rounds',rest:'60s'}]}]},

  // ===== CLIMBING =====
  {id:'climbing-beg',sport:'climbing',level:'beginner',icon:'🧗',title:'Movement Fundamentals — Beginner',meta:'2-3x/week · 40 min',featured:true,
   tip:'<strong>Climb with your legs, not your arms.</strong> Beginners over-grip and pull with their arms — footwork is what actually saves your forearms.',
   days:[{label:'MOVEMENT BASICS',exercises:[
     {name:'Easy Bouldering Problems (top-rope or bouldering wall)',sets:'6 problems',rest:'2min'},
     {name:'Flagging Practice',sets:'4×5 each side',rest:'60s'},{name:'Silent Feet Drill',sets:'4 problems',rest:'90s'},
     {name:'Dead Hang (fingerboard, easy grip)',sets:'4×10s',rest:'60s'},{name:'Core Tension Hold (plank on wall)',sets:'3×20s',rest:'45s'}]}]},
  {id:'climbing-int',sport:'climbing',level:'intermediate',icon:'🧗',title:'Power & Technique — Intermediate',meta:'3x/week · 50 min',featured:false,
   tip:'<strong>4x4s build power-endurance fast.</strong> Four boulder problems, four times through, minimal rest — brutal but effective.',
   days:[{label:'4x4 CIRCUIT',exercises:[
     {name:'Warm-up climbs (easy)',sets:'4 problems',rest:'2min'},{name:'4x4 Bouldering Circuit',sets:'4 problems × 4 rounds',rest:'3min between rounds'},
     {name:'Hangboard (moderate grip)',sets:'5×10s',rest:'90s'},{name:'Campus Board Intro (easy rungs)',sets:'4×3 moves',rest:'2min'},
     {name:'Core Tension Circuit',sets:'3 rounds',rest:'60s'}]}]},
  {id:'climbing-adv',sport:'climbing',level:'advanced',icon:'🧗',title:'Limit Bouldering — Advanced',meta:'3-4x/week · 60 min',featured:false,
   tip:'<strong>Limit bouldering means near-max effort on hard moves with full rest.</strong> This is about power, not volume — rest fully between attempts.',
   days:[{label:'LIMIT SESSION',exercises:[
     {name:'Thorough warm-up (easy to moderate)',sets:'15 min',rest:''},{name:'Limit Boulder Attempts (near-max grade)',sets:'6 attempts',rest:'4min'},
     {name:'Max Hangs (fingerboard)',sets:'5×7s',rest:'3min'},{name:'Campus Board Ladders',sets:'5×4 moves',rest:'2min'},
     {name:'Power Endurance Circuit',sets:'4 problems back-to-back',rest:'4min'}]}]},

  // ===== TENNIS =====
  {id:'tennis-beg',sport:'tennis',level:'beginner',icon:'🎾',title:'Groundstroke Fundamentals — Beginner',meta:'3x/week · 40 min',featured:true,
   tip:'<strong>A relaxed grip gives you far more control than a tight one.</strong> Grip the paddle like you\'re holding a bird, not crushing it.',
   days:[{label:'GROUNDSTROKE BASICS',exercises:[
     {name:'Dynamic warm-up',sets:'6 min',rest:''},{name:'Forehand Wall Rally',sets:'4×2min',rest:'60s'},
     {name:'Backhand Wall Rally',sets:'4×2min',rest:'60s'},{name:'Split-Step Footwork Drill',sets:'4×20s',rest:'30s'},
     {name:'Serve Practice (form focus)',sets:'3×10',rest:'60s'},{name:'Mini-Tennis Rally',sets:'5 min',rest:''}]}]},
  {id:'tennis-int',sport:'tennis',level:'intermediate',icon:'🎾',title:'Rally Patterns — Intermediate',meta:'3x/week · 50 min',featured:false,
   tip:'<strong>Play cross-court patterns before going for lines.</strong> Consistency down the middle of the court sets up the winner.',
   days:[{label:'PATTERN PLAY',exercises:[
     {name:'Dynamic warm-up + footwork',sets:'8 min',rest:''},{name:'Cross-Court Rally Pattern',sets:'6×2min',rest:'60s'},
     {name:'Approach Shot + Volley Drill',sets:'5×8',rest:'45s'},{name:'Serve Practice (placement)',sets:'4×10',rest:'60s'},
     {name:'Lateral Agility Shuttle',sets:'5×20s',rest:'30s'},{name:'Live-Ball Rally Points',sets:'10 points',rest:''}]}]},
  {id:'tennis-adv',sport:'tennis',level:'advanced',icon:'🎾',title:'Match Conditioning — Advanced',meta:'4x/week · 60 min',featured:false,
   tip:'<strong>Tennis points involve explosive sprints, not steady running.</strong> Train the stop-start pattern the sport actually demands.',
   days:[{label:'MATCH-INTENSITY',exercises:[
     {name:'Dynamic warm-up + sprints',sets:'10 min',rest:''},{name:'Live-Ball Point Play',sets:'20 points',rest:''},
     {name:'Serve + First Shot Combo (full power)',sets:'6×8',rest:'60s'},{name:'Court-Sprint Shuttle',sets:'8×15s',rest:'30s'},
     {name:'Defensive Recovery Drill',sets:'6×20s',rest:'30s'},{name:'Tiebreak Simulation',sets:'1 set',rest:''}]}]},

  // ===== BOXING =====
  {id:'boxing-beg',sport:'boxing',level:'beginner',icon:'🥊',title:'Stance & Fundamentals — Beginner',meta:'3x/week · 35 min',featured:true,
   tip:'<strong>A tight guard matters more than power at this stage.</strong> Keep your hands up through every single round, even shadowboxing.',
   days:[{label:'FUNDAMENTALS',exercises:[
     {name:'Jump Rope',sets:'5 min',rest:''},{name:'Stance & Guard Drill',sets:'3×2min',rest:'60s'},
     {name:'Jab-Cross Shadowboxing',sets:'4×2min',rest:'60s'},{name:'Footwork Drill (in/out)',sets:'4×1min',rest:'45s'},
     {name:'Heavy Bag Basics (jab-cross)',sets:'4×2min',rest:'60s'},{name:'Cool-down stretch',sets:'5 min',rest:''}]}]},
  {id:'boxing-int',sport:'boxing',level:'intermediate',icon:'🥊',title:'Combo Work — Intermediate',meta:'3x/week · 45 min',featured:false,
   tip:'<strong>Slip and counter, don\'t just block.</strong> Defense that sets up your own offense is what separates levels here.',
   days:[{label:'COMBO & DEFENSE',exercises:[
     {name:'Jump Rope',sets:'6 min',rest:''},{name:'Shadowboxing (combos)',sets:'4×3min',rest:'60s'},
     {name:'Heavy Bag Combos (4-6 punch)',sets:'6×2min',rest:'60s'},{name:'Slip & Counter Drill',sets:'5×2min',rest:'45s'},
     {name:'Footwork + Pivot Drill',sets:'4×1min',rest:'45s'},{name:'Core Circuit (boxer\'s abs)',sets:'3 rounds',rest:'60s'}]}]},
  {id:'boxing-adv',sport:'boxing',level:'advanced',icon:'🥊',title:'Championship Rounds — Advanced',meta:'4x/week · 55 min',featured:false,
   tip:'<strong>Train in real rounds with real rest — 3 minutes on, 1 minute off.</strong> That\'s the actual demand of the sport.',
   days:[{label:'ROUND-BASED CONDITIONING',exercises:[
     {name:'Jump Rope Warm-up',sets:'8 min',rest:''},{name:'Heavy Bag Championship Rounds',sets:'6×3min',rest:'1min'},
     {name:'Counter-Punching Drill (pads/partner)',sets:'6×2min',rest:'45s'},{name:'Explosive Combo Intervals',sets:'8×30s all-out',rest:'30s'},
     {name:'Defensive Footwork Under Fatigue',sets:'5×1min',rest:'30s'},{name:'Core & Conditioning Circuit',sets:'4 rounds',rest:'60s'}]}]},

  // ===== VOLLEYBALL =====
  {id:'volleyball-beg',sport:'volleyball',level:'beginner',icon:'🏐',title:'Passing & Serving — Beginner',meta:'3x/week · 35 min',featured:true,
   tip:'<strong>A clean forearm pass is the foundation of every play.</strong> Get the platform angle right before worrying about power.',
   days:[{label:'PASSING BASICS',exercises:[
     {name:'Dynamic warm-up',sets:'6 min',rest:''},{name:'Forearm Pass Practice (wall or partner)',sets:'4×15',rest:'45s'},
     {name:'Underhand Serve Practice',sets:'4×10',rest:'45s'},{name:'Footwork to the Ball Drill',sets:'4×20s',rest:'30s'},
     {name:'Overhead Setting Practice',sets:'4×15',rest:'45s'},{name:'Cool-down stretch',sets:'5 min',rest:''}]}]},
  {id:'volleyball-int',sport:'volleyball',level:'intermediate',icon:'🏐',title:'Attack & Block — Intermediate',meta:'3x/week · 45 min',featured:false,
   tip:'<strong>Timing your approach footwork is everything for a real attack.</strong> Slow it down and get the steps right before adding speed.',
   days:[{label:'ATTACK FUNDAMENTALS',exercises:[
     {name:'Dynamic warm-up + footwork',sets:'8 min',rest:''},{name:'Approach Footwork Drill (3-step)',sets:'6×5',rest:'45s'},
     {name:'Attack Swing Practice',sets:'5×8',rest:'45s'},{name:'Blocking Footwork Drill',sets:'5×20s',rest:'30s'},
     {name:'Jump Serve Practice',sets:'4×8',rest:'60s'},{name:'Setting Under Pressure',sets:'4×10',rest:'45s'}]}]},
  {id:'volleyball-adv',sport:'volleyball',level:'advanced',icon:'🏐',title:'Explosive Performance — Advanced',meta:'4x/week · 55 min',featured:false,
   tip:'<strong>Vertical power directly translates to hitting and blocking.</strong> Train jump power, not just volleyball skill reps.',
   days:[{label:'EXPLOSIVE TRAINING',exercises:[
     {name:'Dynamic warm-up + pogo hops',sets:'8 min',rest:''},{name:'Approach Jump Practice (max height)',sets:'6×5',rest:'90s'},
     {name:'Quick-Attack Combo Drill',sets:'6×5',rest:'60s'},{name:'Defensive Scramble Drill',sets:'6×20s',rest:'30s'},
     {name:'Jump Serve Power Reps',sets:'5×8',rest:'60s'},{name:'Box Jumps',sets:'4×6',rest:'90s'}]}]},

  // ===== FOOTBALL =====
  {id:'football-beg',sport:'football',level:'beginner',icon:'🏈',title:'Football Fundamentals — Beginner',meta:'3x/week · 40 min',featured:true,
   tip:'<strong>Stance and start come before everything else.</strong> A clean first step out of your stance wins the rep before contact even happens.',
   days:[{label:'FUNDAMENTALS',exercises:[
     {name:'3-Point Stance Starts',sets:'6×10 yards',rest:'45s'},{name:'Route Running (basic routes)',sets:'6 reps',rest:'45s'},
     {name:'Catching Drill (net or partner)',sets:'4×10',rest:'45s'},{name:'Tackling Form (bags)',sets:'5×5',rest:'60s'},
     {name:'Agility Ladder Drills',sets:'5×20s',rest:'30s'},{name:'Conditioning Sprints',sets:'6×40 yards',rest:'45s'}]}]},
  {id:'football-int',sport:'football',level:'intermediate',icon:'🏈',title:'Position Skills — Intermediate',meta:'4x/week · 50 min',featured:false,
   tip:'<strong>Route precision matters more than raw speed at this stage.</strong> A sharp cut beats a fast, rounded one every time.',
   days:[{label:'SKILL DEVELOPMENT',exercises:[
     {name:'Dynamic warm-up',sets:'8 min',rest:''},{name:'Route Tree Combos',sets:'8 reps',rest:'45s'},
     {name:'Change of Direction Drill',sets:'6×15s',rest:'30s'},{name:'Catching Under Pressure',sets:'5×10',rest:'45s'},
     {name:'Tackling Technique (live pace, bags)',sets:'5×5',rest:'60s'},{name:'Conditioning Shuttle Sprints',sets:'8×20 yards',rest:'30s'}]}]},
  {id:'football-adv',sport:'football',level:'advanced',icon:'🏈',title:'Combine-Style Training — Advanced',meta:'4-5x/week · 60 min',featured:false,
   tip:'<strong>Explosive power is trainable — it\'s not just genetics.</strong> Combine-style testing movements build the speed and power scouts look for.',
   days:[{label:'EXPLOSIVE PERFORMANCE',exercises:[
     {name:'Dynamic warm-up + starts',sets:'10 min',rest:''},{name:'40-Yard Sprint Reps',sets:'6 reps',rest:'2min'},
     {name:'Box Jumps',sets:'5×6',rest:'90s'},{name:'Route Tree Full Speed',sets:'10 reps',rest:'45s'},
     {name:'Contact Conditioning Circuit',sets:'5 rounds',rest:'60s'},{name:'Position Drill Simulation',sets:'15 min',rest:''}]}]},

  // ===== BASEBALL =====
  {id:'baseball-beg',sport:'baseball',level:'beginner',icon:'⚾',title:'Baseball Fundamentals — Beginner',meta:'3x/week · 40 min',featured:true,
   tip:'<strong>Soft hands on ground balls, not stiff ones.</strong> Let the ball come into your glove instead of stabbing at it.',
   days:[{label:'FUNDAMENTALS',exercises:[
     {name:'Throwing Mechanics Drill',sets:'4×15 throws',rest:'45s'},{name:'Fielding Ground Balls',sets:'4×10',rest:'45s'},
     {name:'Batting Tee Work',sets:'4×10 swings',rest:'45s'},{name:'Base Running Form',sets:'4×1 base',rest:'45s'},
     {name:'Catching Fly Balls',sets:'4×10',rest:'45s'},{name:'Cool-down stretch',sets:'5 min',rest:''}]}]},
  {id:'baseball-int',sport:'baseball',level:'intermediate',icon:'⚾',title:'Live Reps — Intermediate',meta:'3-4x/week · 50 min',featured:false,
   tip:'<strong>Live pitching timing is a completely different skill than tee work.</strong> Get as many live reads as you can.',
   days:[{label:'LIVE SKILL WORK',exercises:[
     {name:'Dynamic warm-up + throwing',sets:'8 min',rest:''},{name:'Batting Practice (live pitching)',sets:'4×10 swings',rest:'60s'},
     {name:'Infield/Outfield Fielding Drills',sets:'5×8',rest:'45s'},{name:'Base Running (steal reads)',sets:'6 reps',rest:'45s'},
     {name:'Double Play Turn Practice',sets:'5×6',rest:'45s'},{name:'Pitching Bullpen (form focus)',sets:'20 pitches',rest:'2min'}]}]},
  {id:'baseball-adv',sport:'baseball',level:'advanced',icon:'⚾',title:'Power & Precision — Advanced',meta:'4x/week · 55 min',featured:false,
   tip:'<strong>Bat speed and throwing velocity are both trainable with explosive work.</strong> Not just more reps — more explosive ones.',
   days:[{label:'EXPLOSIVE PERFORMANCE',exercises:[
     {name:'Dynamic warm-up + long toss',sets:'10 min',rest:''},{name:'Explosive Hitting Drills (weighted bat)',sets:'4×10 swings',rest:'60s'},
     {name:'Advanced Fielding Reads (bad hops)',sets:'6×8',rest:'45s'},{name:'Pitching Velocity Bullpen',sets:'25 pitches',rest:'2min'},
     {name:'Sprint Conditioning (base-to-base)',sets:'8 reps',rest:'45s'},{name:'Situational Game Simulation',sets:'15 min',rest:''}]}]},

  // ===== ICE HOCKEY =====
  {id:'hockey-beg',sport:'hockey',level:'beginner',icon:'🏒',title:'Skating Fundamentals — Beginner',meta:'3x/week · 40 min ice',featured:true,
   tip:'<strong>Skating is the foundation of everything in hockey.</strong> A player with average hands but great skating beats one with the reverse.',
   days:[{label:'SKATING BASICS',exercises:[
     {name:'Forward Stride Practice',sets:'6×30s',rest:'45s'},{name:'Stopping Practice (both sides)',sets:'6×10',rest:'30s'},
     {name:'Stickhandling (stationary)',sets:'4×1min',rest:'30s'},{name:'Passing Drill (partner)',sets:'4×15',rest:'45s'},
     {name:'Basic Shot Practice (wrist shot)',sets:'3×10',rest:'45s'},{name:'Cool-down skate',sets:'5 min',rest:''}]}]},
  {id:'hockey-int',sport:'hockey',level:'intermediate',icon:'🏒',title:'Edge Work & Shooting — Intermediate',meta:'3-4x/week · 50 min ice',featured:false,
   tip:'<strong>Edge control determines how quickly you can change direction.</strong> Weak edges show up as wide, slow turns.',
   days:[{label:'EDGE & SKILL WORK',exercises:[
     {name:'Edge Work Drills (crossovers)',sets:'6×30s',rest:'30s'},{name:'Stickhandling While Skating',sets:'4×1min',rest:'30s'},
     {name:'Wrist Shot Practice',sets:'4×10',rest:'45s'},{name:'Slap Shot Practice',sets:'3×10',rest:'60s'},
     {name:'Agility Skating Circuit',sets:'5×30s',rest:'30s'},{name:'Small-Area Game',sets:'10 min',rest:''}]}]},
  {id:'hockey-adv',sport:'hockey',level:'advanced',icon:'🏒',title:'Explosive Speed — Advanced',meta:'4x/week · 55 min ice',featured:false,
   tip:'<strong>First-step acceleration wins puck races.</strong> Train the explosive start, not just top speed.',
   days:[{label:'EXPLOSIVE PERFORMANCE',exercises:[
     {name:'Explosive Start Sprints (on ice)',sets:'6×15s',rest:'45s'},{name:'Game-Speed Stickhandling',sets:'6×30s',rest:'30s'},
     {name:'One-Timer Shot Practice',sets:'4×10',rest:'45s'},{name:'Agility Edge Circuit',sets:'6×30s',rest:'30s'},
     {name:'Battle Drills (puck protection)',sets:'6×20s',rest:'30s'},{name:'Small-Area Game (high intensity)',sets:'12 min',rest:''}]}]},

  // ===== GOLF =====
  {id:'golf-beg',sport:'golf',level:'beginner',icon:'⛳',title:'Golf Fundamentals — Beginner',meta:'2-3x/week · 45 min',featured:true,
   tip:'<strong>Grip and setup determine everything that follows.</strong> Fix these before worrying about swing power.',
   days:[{label:'FUNDAMENTALS',exercises:[
     {name:'Grip & Stance Practice',sets:'10 min',rest:''},{name:'Putting Practice (short range)',sets:'20 putts',rest:''},
     {name:'Chipping Practice',sets:'20 chips',rest:''},{name:'Half-Swing Practice (pitching wedge)',sets:'20 swings',rest:''},
     {name:'Full Swing Practice (mid iron)',sets:'20 swings',rest:''},{name:'Putting Practice (long range)',sets:'15 putts',rest:''}]}]},
  {id:'golf-int',sport:'golf',level:'intermediate',icon:'⛳',title:'Full Swing & Short Game — Intermediate',meta:'3x/week · 55 min',featured:false,
   tip:'<strong>Practice your misses, not just your good shots.</strong> Course management comes from knowing your real tendencies.',
   days:[{label:'FULL GAME PRACTICE',exercises:[
     {name:'Dynamic warm-up',sets:'6 min',rest:''},{name:'Full Swing Practice (driver)',sets:'20 swings',rest:''},
     {name:'Full Swing Practice (irons)',sets:'20 swings',rest:''},{name:'Bunker Play Practice',sets:'15 shots',rest:''},
     {name:'Chipping from Various Lies',sets:'20 chips',rest:''},{name:'Putting Practice (breaking putts)',sets:'20 putts',rest:''}]}]},
  {id:'golf-adv',sport:'golf',level:'advanced',icon:'⛳',title:'Power & Precision — Advanced',meta:'3-4x/week · 60 min',featured:false,
   tip:'<strong>Swing speed training adds real distance.</strong> Combine it with precision work so you don\'t sacrifice accuracy for power.',
   days:[{label:'PERFORMANCE TRAINING',exercises:[
     {name:'Dynamic warm-up + mobility',sets:'8 min',rest:''},{name:'Swing Speed Training (overspeed swings)',sets:'10 swings',rest:'45s'},
     {name:'Precision Iron Play (target practice)',sets:'20 shots',rest:''},{name:'Pressure Putting Drills',sets:'20 putts',rest:''},
     {name:'Course Management Simulation',sets:'9 holes mental rounds',rest:''},{name:'Bunker & Recovery Shot Practice',sets:'15 shots',rest:''}]}]},

  // ===== WRESTLING =====
  {id:'wrestling-beg',sport:'wrestling',level:'beginner',icon:'🤼',title:'Wrestling Fundamentals — Beginner',meta:'3x/week · 40 min',featured:true,
   tip:'<strong>Stance and motion are the foundation of every takedown.</strong> A wrestler who never stops moving is much harder to score on.',
   days:[{label:'FUNDAMENTALS',exercises:[
     {name:'Stance & Motion Drill',sets:'4×1min',rest:'30s'},{name:'Sprawl Practice',sets:'5×8',rest:'45s'},
     {name:'Single-Leg Takedown Drill',sets:'5×5 each side',rest:'45s'},{name:'Double-Leg Takedown Drill',sets:'5×5',rest:'45s'},
     {name:'Penetration Step Drill',sets:'4×10',rest:'30s'},{name:'Live Drilling (light)',sets:'3×2min',rest:'60s'}]}]},
  {id:'wrestling-int',sport:'wrestling',level:'intermediate',icon:'🤼',title:'Chain Wrestling — Intermediate',meta:'4x/week · 50 min',featured:false,
   tip:'<strong>Chain your attacks together.</strong> If the first shot doesn\'t land, the second and third should already be loaded.',
   days:[{label:'CHAIN WRESTLING',exercises:[
     {name:'Stance & Motion Warm-up',sets:'5 min',rest:''},{name:'Takedown Chain Combos',sets:'6×5',rest:'45s'},
     {name:'Escape & Reversal Drills',sets:'5×5',rest:'45s'},{name:'Sprawl-to-Counter Drill',sets:'5×8',rest:'45s'},
     {name:'Live Drilling (moderate pace)',sets:'5×2min',rest:'60s'},{name:'Conditioning Circuit',sets:'3 rounds',rest:'60s'}]}]},
  {id:'wrestling-adv',sport:'wrestling',level:'advanced',icon:'🤼',title:'Live Competition Rounds — Advanced',meta:'5x/week · 60 min',featured:false,
   tip:'<strong>Wrestle tired on purpose.</strong> Matches are won in the third period when technique has to survive fatigue.',
   days:[{label:'COMPETITIVE CONDITIONING',exercises:[
     {name:'Stance & Motion Warm-up',sets:'5 min',rest:''},{name:'Explosive Takedown Chains',sets:'8×5',rest:'45s'},
     {name:'Live Wrestling Rounds',sets:'6×3min',rest:'90s'},{name:'Mat Return Live Rounds',sets:'4×2min',rest:'60s'},
     {name:'Conditioning Under Fatigue Circuit',sets:'5 rounds',rest:'45s'},{name:'Technical Sparring (full live)',sets:'3×5min',rest:'2min'}]}]},

  // ===== TRACK & FIELD =====
  {id:'track-beg',sport:'track',level:'beginner',icon:'🏃',title:'Running Fundamentals — Beginner',meta:'3x/week · 30 min',featured:true,
   tip:'<strong>Build your base before chasing speed.</strong> Easy mileage now is what lets you handle hard training later without breaking down.',
   days:[{label:'FOUNDATIONS',exercises:[
     {name:'Dynamic warm-up',sets:'8 min',rest:''},{name:'Running Form Drills (A-skips, high knees)',sets:'4×20m',rest:'45s'},
     {name:'Easy-Pace Base Run',sets:'15 min',rest:''},{name:'Strides (relaxed acceleration)',sets:'4×60m',rest:'60s'},
     {name:'Cool-down jog + stretch',sets:'5 min',rest:''}]}]},
  {id:'track-int',sport:'track',level:'intermediate',icon:'🏃',title:'Interval Training — Intermediate',meta:'4x/week · 40 min',featured:false,
   tip:'<strong>Hold the same pace on every rep.</strong> A fast first interval and a slow last one means you started too fast.',
   days:[{label:'INTERVAL SESSION',exercises:[
     {name:'Dynamic warm-up + strides',sets:'10 min',rest:''},{name:'400m Repeats',sets:'6×400m',rest:'90s'},
     {name:'Tempo Run (comfortably hard)',sets:'15 min',rest:''},{name:'Hill Sprints',sets:'6×20s',rest:'90s'},
     {name:'Cool-down jog',sets:'10 min',rest:''}]}]},
  {id:'track-adv',sport:'track',level:'advanced',icon:'🏃',title:'Race-Pace Power — Advanced',meta:'5x/week · 50 min',featured:false,
   tip:'<strong>Race-pace intervals should feel uncomfortable by the last rep.</strong> If they don\'t, the pace was too conservative.',
   days:[{label:'RACE-PACE SESSION',exercises:[
     {name:'Dynamic warm-up + drills',sets:'12 min',rest:''},{name:'Race-Pace 800m Repeats',sets:'5×800m',rest:'2min'},
     {name:'Plyometric Power Circuit (bounds, hops)',sets:'4 rounds',rest:'60s'},{name:'Sprint Mechanics Drill (flying 30s)',sets:'6×30m',rest:'90s'},
     {name:'Cool-down jog',sets:'10 min',rest:''}]}]},

  // ===== GYMNASTICS =====
  {id:'gymnastics-beg',sport:'gymnastics',level:'beginner',icon:'🤸‍♀️',title:'Gymnastics Fundamentals — Beginner',meta:'3x/week · 35 min',featured:true,
   tip:'<strong>Hollow and arch body positions are the foundation of every skill.</strong> Master those shapes before chasing tricks.',
   days:[{label:'FUNDAMENTALS',exercises:[
     {name:'Hollow Body Hold',sets:'4×15s',rest:'30s'},{name:'Arch Body Hold',sets:'4×15s',rest:'30s'},
     {name:'Forward Rolls',sets:'5 reps',rest:'30s'},{name:'Backward Rolls',sets:'5 reps',rest:'30s'},
     {name:'Cartwheel Practice',sets:'6 reps each side',rest:'45s'},{name:'Handstand Against Wall',sets:'4×15s',rest:'45s'}]}]},
  {id:'gymnastics-int',sport:'gymnastics',level:'intermediate',icon:'🤸‍♀️',title:'Skill Building — Intermediate',meta:'3-4x/week · 45 min',featured:false,
   tip:'<strong>A freestanding handstand takes real practice.</strong> Chase the wall less and drill your kick-up and balance more.',
   days:[{label:'SKILL PROGRESSIONS',exercises:[
     {name:'Freestanding Handstand Practice',sets:'6×15s',rest:'45s'},{name:'Round-Off Practice',sets:'6 reps',rest:'45s'},
     {name:'Bridge Hold',sets:'4×20s',rest:'30s'},{name:'Backbend Kick-Over Practice',sets:'5 reps',rest:'60s'},
     {name:'Splits Flexibility Work',sets:'3×30s each side',rest:'30s'},{name:'Handstand Forward Roll',sets:'5 reps',rest:'45s'}]}]},
  {id:'gymnastics-adv',sport:'gymnastics',level:'advanced',icon:'🤸‍♀️',title:'Advanced Skills — Advanced',meta:'4x/week · 55 min',featured:false,
   tip:'<strong>Back handsprings need a spotter or mat training until they\'re fully consistent.</strong> Never rush the progression here — injury risk is real.',
   days:[{label:'ADVANCED SKILLS',exercises:[
     {name:'Back Handspring Practice (spotted)',sets:'6 reps',rest:'60s'},{name:'Round-Off Back Handspring Combo',sets:'5 reps',rest:'60s'},
     {name:'Aerial Cartwheel Progression',sets:'5 reps',rest:'60s'},{name:'Freestanding Handstand Push-Up',sets:'4×5',rest:'90s'},
     {name:'Flexibility & Splits Deep Work',sets:'4×30s each',rest:'30s'},{name:'Full Routine Run-Through',sets:'3 reps',rest:'2min'}]}]},

  // ===== CYCLING =====
  {id:'cycling-beg',sport:'cycling',level:'beginner',icon:'🚴',title:'Endurance Base — Beginner',meta:'3x/week · 45 min',featured:true,
   tip:'<strong>Build your aerobic base at an easy, conversational pace.</strong> Most beginner mistakes come from riding too hard, too often.',
   days:[{label:'BASE MILES',exercises:[
     {name:'Easy Endurance Ride',sets:'30 min',rest:''},{name:'Cadence Drills (high RPM, low resistance)',sets:'4×2min',rest:'2min'},
     {name:'Bike Handling Practice (turns, braking)',sets:'10 min',rest:''},{name:'Cool-down easy spin',sets:'5 min',rest:''}]}]},
  {id:'cycling-int',sport:'cycling',level:'intermediate',icon:'🚴',title:'Interval Power — Intermediate',meta:'4x/week · 55 min',featured:false,
   tip:'<strong>Hill repeats build both strength and threshold power together.</strong> Stay seated for the first half of the climb before standing.',
   days:[{label:'INTERVAL SESSION',exercises:[
     {name:'Warm-up spin',sets:'10 min',rest:''},{name:'Hill Repeats',sets:'6×3min',rest:'3min'},
     {name:'Tempo Ride (steady hard effort)',sets:'20 min',rest:''},{name:'Cool-down spin',sets:'10 min',rest:''}]}]},
  {id:'cycling-adv',sport:'cycling',level:'advanced',icon:'🚴',title:'Race-Pace Intervals — Advanced',meta:'5x/week · 70 min',featured:false,
   tip:'<strong>VO2max intervals are supposed to hurt.</strong> If you can hold a conversation during them, you\'re not going hard enough.',
   days:[{label:'HIGH-INTENSITY SESSION',exercises:[
     {name:'Warm-up spin + openers',sets:'15 min',rest:''},{name:'VO2max Intervals',sets:'6×4min',rest:'4min'},
     {name:'Sprint Power Reps',sets:'6×15s all-out',rest:'3min'},{name:'Race-Simulation Effort',sets:'20 min',rest:''},
     {name:'Cool-down spin',sets:'10 min',rest:''}]}]},

  // ===== ROWING =====
  {id:'rowing-beg',sport:'rowing',level:'beginner',icon:'🚣',title:'Stroke Technique — Beginner',meta:'3x/week · 30 min',featured:true,
   tip:'<strong>Legs, then back, then arms on the drive — reverse it on the recovery.</strong> Sequencing matters more than raw power at this stage.',
   days:[{label:'TECHNIQUE FOCUS',exercises:[
     {name:'Stroke Technique Drill (arms only)',sets:'4×2min',rest:'60s'},{name:'Stroke Technique Drill (add back)',sets:'4×2min',rest:'60s'},
     {name:'Full Stroke Practice (legs-back-arms)',sets:'4×3min',rest:'60s'},{name:'Easy Steady-State Piece',sets:'10 min',rest:''}]}]},
  {id:'rowing-int',sport:'rowing',level:'intermediate',icon:'🚣',title:'Interval Pieces — Intermediate',meta:'4x/week · 40 min',featured:false,
   tip:'<strong>Power comes from your legs, not your arms yanking the handle.</strong> Drive through your legs first on every stroke.',
   days:[{label:'INTERVAL SESSION',exercises:[
     {name:'Warm-up row',sets:'10 min',rest:''},{name:'500m Interval Repeats',sets:'6×500m',rest:'2min'},
     {name:'Power Stroke Drill (10 strokes max power)',sets:'5 sets',rest:'90s'},{name:'Steady-State Piece',sets:'15 min',rest:''}]}]},
  {id:'rowing-adv',sport:'rowing',level:'advanced',icon:'🚣',title:'Race-Pace 2k Training — Advanced',meta:'5x/week · 50 min',featured:false,
   tip:'<strong>The 2k erg test is a brutal pacing puzzle.</strong> Practice race pace specifically, not just generic hard rowing.',
   days:[{label:'RACE-PACE SESSION',exercises:[
     {name:'Warm-up row + starts',sets:'12 min',rest:''},{name:'2k Race-Pace Simulation',sets:'1×2000m',rest:''},
     {name:'High Stroke-Rate Sprints',sets:'6×250m',rest:'2min'},{name:'Cool-down row',sets:'10 min',rest:''}]}]},

  // ===== TABLE TENNIS =====
  {id:'tabletennis-beg',sport:'tabletennis',level:'beginner',icon:'🏓',title:'Table Tennis Fundamentals — Beginner',meta:'3x/week · 30 min',featured:true,
   tip:'<strong>A relaxed grip gives you far more control than a tight one.</strong> Grip the paddle like you\'re holding a bird, not crushing it.',
   days:[{label:'FUNDAMENTALS',exercises:[
     {name:'Grip & Ready Stance Practice',sets:'5 min',rest:''},{name:'Forehand Drive Practice',sets:'4×2min',rest:'45s'},
     {name:'Backhand Drive Practice',sets:'4×2min',rest:'45s'},{name:'Serving Practice (basic)',sets:'4×10 serves',rest:'45s'},
     {name:'Rally Consistency Drill',sets:'4×2min',rest:'45s'}]}]},
  {id:'tabletennis-int',sport:'tabletennis',level:'intermediate',icon:'🏓',title:'Footwork & Spin — Intermediate',meta:'3x/week · 40 min',featured:false,
   tip:'<strong>Footwork gets you into position before your arm even swings.</strong> Fast feet make a slow-looking stroke look effortless.',
   days:[{label:'FOOTWORK & TOPSPIN',exercises:[
     {name:'Footwork Side-to-Side Drill',sets:'5×1min',rest:'30s'},{name:'Topspin Forehand Practice',sets:'4×2min',rest:'45s'},
     {name:'Topspin Backhand Practice',sets:'4×2min',rest:'45s'},{name:'Serve + Third-Ball Attack Drill',sets:'5×10',rest:'45s'},
     {name:'Multi-Ball Rally Drill',sets:'5×2min',rest:'45s'}]}]},
  {id:'tabletennis-adv',sport:'tabletennis',level:'advanced',icon:'🏓',title:'Speed & Spin Mastery — Advanced',meta:'4x/week · 50 min',featured:false,
   tip:'<strong>Deceptive spin serves win free points at every level.</strong> Disguise the contact point so your opponent can\'t read the spin.',
   days:[{label:'ADVANCED TRAINING',exercises:[
     {name:'Multi-Ball Speed Drill',sets:'6×2min',rest:'45s'},{name:'Advanced Spin Serve Practice',sets:'6×10',rest:'45s'},
     {name:'Reaction Volley Drill (close to table)',sets:'5×1min',rest:'30s'},{name:'Footwork + Attack Combo Drill',sets:'5×2min',rest:'45s'},
     {name:'Match Play Simulation',sets:'5 games',rest:'2min'}]}]},

  // ===== BADMINTON =====
  {id:'badminton-beg',sport:'badminton',level:'beginner',icon:'🏸',title:'Badminton Fundamentals — Beginner',meta:'3x/week · 30 min',featured:true,
   tip:'<strong>Return to the center of the court after every shot.</strong> Court positioning wins more points than raw power at this stage.',
   days:[{label:'FUNDAMENTALS',exercises:[
     {name:'Grip & Ready Position Practice',sets:'5 min',rest:''},{name:'Clear Shot Practice',sets:'4×10',rest:'45s'},
     {name:'Drop Shot Practice',sets:'4×10',rest:'45s'},{name:'Serving Practice',sets:'4×10',rest:'45s'},
     {name:'Footwork Basics Drill',sets:'4×20s',rest:'30s'}]}]},
  {id:'badminton-int',sport:'badminton',level:'intermediate',icon:'🏸',title:'Smash & Net Play — Intermediate',meta:'3x/week · 40 min',featured:false,
   tip:'<strong>Jump into your smash rather than swinging from flat feet.</strong> The extra height changes the angle completely.',
   days:[{label:'ATTACK & NET PLAY',exercises:[
     {name:'Smash Technique Practice',sets:'4×10',rest:'45s'},{name:'Net Play Drill (tight shots)',sets:'4×2min',rest:'45s'},
     {name:'Footwork Combination Drill',sets:'5×20s',rest:'30s'},{name:'Drive Shot Practice',sets:'4×10',rest:'45s'},
     {name:'Rally Consistency Drill',sets:'4×2min',rest:'45s'}]}]},
  {id:'badminton-adv',sport:'badminton',level:'advanced',icon:'🏸',title:'Deceptive Power — Advanced',meta:'4x/week · 50 min',featured:false,
   tip:'<strong>Disguise your shot until the last possible moment.</strong> Same preparation, different outcome — that\'s what beats good opponents.',
   days:[{label:'ADVANCED TRAINING',exercises:[
     {name:'Deceptive Shot Practice',sets:'5×10',rest:'45s'},{name:'Jump Smash Practice',sets:'5×10',rest:'60s'},
     {name:'High-Intensity Multi-Shuttle Drill',sets:'6×1min',rest:'30s'},{name:'Footwork Speed Circuit',sets:'6×20s',rest:'30s'},
     {name:'Match Play Simulation',sets:'3 games',rest:'2min'}]}]},

  // ===== SKATEBOARDING =====
  {id:'skateboarding-beg',sport:'skateboarding',level:'beginner',icon:'🛹',title:'Skateboarding Fundamentals — Beginner',meta:'3x/week · 30 min',featured:true,
   tip:'<strong>Balance and pushing comfortably come before any tricks.</strong> Spend real time just cruising before chasing an ollie.',
   days:[{label:'FUNDAMENTALS',exercises:[
     {name:'Balance & Stance Practice',sets:'10 min',rest:''},{name:'Pushing Technique Practice',sets:'10 min',rest:''},
     {name:'Turning Practice (carving)',sets:'10 min',rest:''},{name:'Ollie Fundamentals (stationary)',sets:'15 attempts',rest:''}]}]},
  {id:'skateboarding-int',sport:'skateboarding',level:'intermediate',icon:'🛹',title:'Flip Tricks & Grinds — Intermediate',meta:'3x/week · 40 min',featured:false,
   tip:'<strong>Land on your bolts, not the middle of the board.</strong> Foot placement on landing is what actually determines if a trick sticks.',
   days:[{label:'TRICK PROGRESSION',exercises:[
     {name:'Ollie Practice (rolling)',sets:'15 attempts',rest:''},{name:'Kickflip Progression',sets:'15 attempts',rest:''},
     {name:'Basic Grind Practice (low rail/curb)',sets:'10 attempts',rest:''},{name:'Ramp Basics (drop-in practice)',sets:'10 attempts',rest:''}]}]},
  {id:'skateboarding-adv',sport:'skateboarding',level:'advanced',icon:'🛹',title:'Advanced Tricks — Advanced',meta:'4x/week · 50 min',featured:false,
   tip:'<strong>Film your attempts and watch them back.</strong> It\'s the fastest way to see what your foot is actually doing wrong.',
   days:[{label:'ADVANCED PROGRESSION',exercises:[
     {name:'Advanced Flip Trick Practice',sets:'20 attempts',rest:''},{name:'Vert/Ramp Combo Practice',sets:'15 attempts',rest:''},
     {name:'Technical Rail/Ledge Tricks',sets:'15 attempts',rest:''},{name:'Line Run-Throughs (linking tricks)',sets:'10 attempts',rest:''}]}]},

  // ===== SURFING =====
  {id:'surfing-beg',sport:'surfing',level:'beginner',icon:'🏄',title:'Surfing Fundamentals — Beginner',meta:'2-3x/week · 45 min',featured:true,
   tip:'<strong>Practice your pop-up on the sand until it\'s automatic.</strong> You won\'t have time to think about it once a wave is actually coming.',
   days:[{label:'FUNDAMENTALS',exercises:[
     {name:'Pop-Up Practice (on sand/land)',sets:'15 reps',rest:'30s'},{name:'Paddling Technique Practice',sets:'10 min',rest:''},
     {name:'Catching Whitewater Waves',sets:'10 attempts',rest:''},{name:'Balance Practice (standing on board)',sets:'10 min',rest:''}]}]},
  {id:'surfing-int',sport:'surfing',level:'intermediate',icon:'🏄',title:'Wave Reading & Turns — Intermediate',meta:'2-3x/week · 55 min',featured:false,
   tip:'<strong>Reading the wave before you paddle for it saves energy and catches better waves.</strong> Watch how it\'s breaking, not just where it is.',
   days:[{label:'WAVE SKILLS',exercises:[
     {name:'Wave Reading Practice (positioning)',sets:'15 min',rest:''},{name:'Bottom Turn Practice',sets:'10 attempts',rest:''},
     {name:'Cutback Practice',sets:'10 attempts',rest:''},{name:'Paddle Power Intervals',sets:'6×30s',rest:'30s'}]}]},
  {id:'surfing-adv',sport:'surfing',level:'advanced',icon:'🏄',title:'Advanced Maneuvers — Advanced',meta:'3-4x/week · 60 min',featured:false,
   tip:'<strong>Paddle fitness is what lets you surf a full session at high intensity.</strong> Train it directly, not just in the water.',
   days:[{label:'ADVANCED PERFORMANCE',exercises:[
     {name:'Carving Turns Practice',sets:'15 attempts',rest:''},{name:'Aerial Attempt Progression',sets:'10 attempts',rest:''},
     {name:'Paddle Endurance Intervals',sets:'8×1min',rest:'30s'},{name:'Duck Dive Practice',sets:'10 reps',rest:''}]}]},

  // ===== MARTIAL ARTS =====
  {id:'martialarts-beg',sport:'martialarts',level:'beginner',icon:'🥋',title:'Martial Arts Fundamentals — Beginner',meta:'3x/week · 40 min',featured:true,
   tip:'<strong>A stable stance is what every strike and block builds from.</strong> Rushing past stance work catches up with you later.',
   days:[{label:'FUNDAMENTALS',exercises:[
     {name:'Basic Stance Practice',sets:'5 min',rest:''},{name:'Punching Fundamentals (jab-cross)',sets:'4×2min',rest:'45s'},
     {name:'Kicking Fundamentals (front/roundhouse)',sets:'4×10 each',rest:'45s'},{name:'Basic Forms/Kata Practice',sets:'5 reps',rest:'60s'},
     {name:'Cool-down stretch',sets:'5 min',rest:''}]}]},
  {id:'martialarts-int',sport:'martialarts',level:'intermediate',icon:'🥋',title:'Combinations & Sparring — Intermediate',meta:'3-4x/week · 50 min',featured:false,
   tip:'<strong>Controlled sparring is where technique actually gets tested.</strong> Slow it down and focus on timing rather than power.',
   days:[{label:'COMBINATION WORK',exercises:[
     {name:'Combination Striking Practice',sets:'5×2min',rest:'45s'},{name:'Controlled Sparring Drills',sets:'5×2min',rest:'60s'},
     {name:'Takedown Basics',sets:'5×5',rest:'45s'},{name:'Pad Work (combinations)',sets:'5×2min',rest:'45s'},
     {name:'Conditioning Circuit',sets:'3 rounds',rest:'60s'}]}]},
  {id:'martialarts-adv',sport:'martialarts',level:'advanced',icon:'🥋',title:'Advanced Sparring — Advanced',meta:'4-5x/week · 60 min',featured:false,
   tip:'<strong>Advanced kicks need full-body mobility, not just leg strength.</strong> Keep working flexibility even at a high skill level.',
   days:[{label:'ADVANCED TRAINING',exercises:[
     {name:'Explosive Combination Sparring',sets:'6×2min',rest:'60s'},{name:'Advanced Kicking Techniques',sets:'6×10 each',rest:'45s'},
     {name:'Takedown & Ground Transition Drills',sets:'6×5',rest:'45s'},{name:'High-Intensity Pad Rounds',sets:'6×3min',rest:'60s'},
     {name:'Conditioning Circuit',sets:'4 rounds',rest:'45s'}]}]},

  // ===== RUGBY =====
  {id:'rugby-beg',sport:'rugby',level:'beginner',icon:'🏉',title:'Rugby Fundamentals — Beginner',meta:'3x/week · 40 min',featured:true,
   tip:'<strong>Tackle technique protects your body as much as it stops the ball carrier.</strong> Head placement is the single most important detail.',
   days:[{label:'FUNDAMENTALS',exercises:[
     {name:'Passing Fundamentals (both sides)',sets:'4×15',rest:'45s'},{name:'Tackling Technique (form, bags)',sets:'5×6',rest:'60s'},
     {name:'Catching High Balls',sets:'4×10',rest:'45s'},{name:'Basic Fitness Circuit',sets:'4 rounds',rest:'60s'},
     {name:'Cool-down jog',sets:'5 min',rest:''}]}]},
  {id:'rugby-int',sport:'rugby',level:'intermediate',icon:'🏉',title:'Contact & Support Play — Intermediate',meta:'3-4x/week · 50 min',featured:false,
   tip:'<strong>Support your teammate at the breakdown, not just the ball carrier.</strong> Rucking well keeps possession alive.',
   days:[{label:'CONTACT SKILLS',exercises:[
     {name:'Rucking Technique Practice',sets:'5×8',rest:'45s'},{name:'Evasion Footwork Drills',sets:'5×15s',rest:'30s'},
     {name:'Contact Conditioning (tackle bags)',sets:'6×6',rest:'60s'},{name:'Support Play Positioning Drill',sets:'6 reps',rest:'45s'},
     {name:'Passing Under Pressure',sets:'5×10',rest:'45s'}]}]},
  {id:'rugby-adv',sport:'rugby',level:'advanced',icon:'🏉',title:'Game-Speed Conditioning — Advanced',meta:'4-5x/week · 60 min',featured:false,
   tip:'<strong>Phase play at game speed under fatigue is what separates levels.</strong> Train the repeated-effort demand directly.',
   days:[{label:'GAME-SPEED TRAINING',exercises:[
     {name:'Explosive Contact Conditioning',sets:'6×6',rest:'45s'},{name:'Phase Play Simulation (full speed)',sets:'15 min',rest:''},
     {name:'Repeated Sprint Shuttles',sets:'8×20s',rest:'30s'},{name:'Breakdown Speed Drill',sets:'6×8',rest:'45s'},
     {name:'High-Intensity Interval Conditioning',sets:'6 rounds',rest:'45s'}]}]},

  // ===== ARCHERY =====
  {id:'archery-beg',sport:'archery',level:'beginner',icon:'🏹',title:'Archery Fundamentals — Beginner',meta:'2-3x/week · 30 min',featured:true,
   tip:'<strong>Consistency in your setup matters more than raw draw strength.</strong> Same stance, same anchor point, every single shot.',
   days:[{label:'FUNDAMENTALS',exercises:[
     {name:'Stance & Posture Practice',sets:'10 min',rest:''},{name:'Bow Grip Drill (no arrow)',sets:'4×10',rest:'30s'},
     {name:'Anchor Point Consistency Drill',sets:'4×10',rest:'30s'},{name:'Release Practice (close range)',sets:'20 shots',rest:''},
     {name:'Back Tension Hold',sets:'4×10s',rest:'30s'}]}]},
  {id:'archery-int',sport:'archery',level:'intermediate',icon:'🏹',title:'Form Consistency — Intermediate',meta:'3x/week · 40 min',featured:false,
   tip:'<strong>Group tightening comes from repeatable form, not aiming harder.</strong> Slow down and feel each shot.',
   days:[{label:'CONSISTENCY TRAINING',exercises:[
     {name:'Blank Bale Practice (form focus)',sets:'20 shots',rest:''},{name:'Draw Strength Holds',sets:'5×15s',rest:'45s'},
     {name:'Group Tightening Drill (mid range)',sets:'30 shots',rest:''},{name:'Back Tension Hold',sets:'5×15s',rest:'30s'},
     {name:'Follow-Through Practice',sets:'20 shots',rest:''}]}]},
  {id:'archery-adv',sport:'archery',level:'advanced',icon:'🏹',title:'Competition Simulation — Advanced',meta:'4x/week · 50 min',featured:false,
   tip:'<strong>Practice under simulated pressure.</strong> Score every end and hold yourself to competition standards in training.',
   days:[{label:'COMPETITION PREP',exercises:[
     {name:'Scored Practice Rounds',sets:'6 ends × 6 arrows',rest:'2min'},{name:'Draw Strength Holds (heavy)',sets:'6×15s',rest:'45s'},
     {name:'Rapid Shot Timing Drill',sets:'20 shots',rest:''},{name:'Mental Focus Hold (extended anchor)',sets:'5×20s',rest:'30s'},
     {name:'Long-Distance Precision Practice',sets:'20 shots',rest:''}]}]},

  // ===== BREAKING =====
  {id:'breaking-beg',sport:'breaking',level:'beginner',icon:'🕺',title:'Breaking Fundamentals — Beginner',meta:'3x/week · 35 min',featured:true,
   tip:'<strong>Toprock and footwork come before anything on the floor.</strong> Musicality and rhythm are skills too — not just tricks.',
   days:[{label:'FOUNDATIONS',exercises:[
     {name:'Toprock Basics',sets:'5×1min',rest:'30s'},{name:'Six-Step Footwork',sets:'10 reps',rest:'45s'},
     {name:'Freeze Practice (baby freeze)',sets:'10 attempts',rest:'45s'},{name:'Musicality Drill (rhythm practice)',sets:'5 min',rest:''},
     {name:'Core Strength Circuit',sets:'3 rounds',rest:'45s'}]}]},
  {id:'breaking-int',sport:'breaking',level:'intermediate',icon:'🕺',title:'Power Move Progressions — Intermediate',meta:'3-4x/week · 45 min',featured:false,
   tip:'<strong>Power moves need real rotational core strength.</strong> Don\'t skip the conditioning work for the flashy stuff.',
   days:[{label:'POWER PROGRESSIONS',exercises:[
     {name:'Windmill Prep Drill',sets:'10 attempts',rest:'60s'},{name:'CC (Coffee Grinder) Practice',sets:'10 attempts',rest:'45s'},
     {name:'Freeze Combinations',sets:'8 attempts',rest:'45s'},{name:'Rotational Core Circuit',sets:'4 rounds',rest:'45s'},
     {name:'Footwork Combos (full speed)',sets:'8 reps',rest:'30s'}]}]},
  {id:'breaking-adv',sport:'breaking',level:'advanced',icon:'🕺',title:'Battle Routines — Advanced',meta:'4x/week · 55 min',featured:false,
   tip:'<strong>Full power moves take real time to build safely.</strong> Windmills and flares need serious core and shoulder prep — never rush them.',
   days:[{label:'ADVANCED POWER & ROUTINES',exercises:[
     {name:'Windmill Practice',sets:'10 attempts',rest:'90s'},{name:'Flare Progression Practice',sets:'8 attempts',rest:'90s'},
     {name:'Battle Routine Run-Through',sets:'5 reps',rest:'2min'},{name:'Explosive Core Circuit',sets:'4 rounds',rest:'45s'},
     {name:'Freeze & Power Move Combo',sets:'6 reps',rest:'60s'}]}]},

  // ===== CANOE/KAYAK =====
  {id:'canoekayak-beg',sport:'canoekayak',level:'beginner',icon:'🛶',title:'Paddle Technique — Beginner',meta:'3x/week · 35 min water',featured:true,
   tip:'<strong>Power comes from your torso rotation, not just your arms.</strong> Think of pulling the boat past the paddle, not the paddle through the water.',
   days:[{label:'TECHNIQUE FOCUS',exercises:[
     {name:'Forward Stroke Technique',sets:'4×3min',rest:'60s'},{name:'Balance Drills',sets:'10 min',rest:''},
     {name:'Turning Stroke Practice',sets:'4×10',rest:'45s'},{name:'Easy Steady Paddle',sets:'15 min',rest:''}]}]},
  {id:'canoekayak-int',sport:'canoekayak',level:'intermediate',icon:'🛶',title:'Interval Power — Intermediate',meta:'4x/week · 45 min water',featured:false,
   tip:'<strong>Rotate your torso fully on every stroke.</strong> Arm-only paddling fatigues fast and loses power.',
   days:[{label:'INTERVAL SESSION',exercises:[
     {name:'Warm-up paddle',sets:'10 min',rest:''},{name:'250m Sprint Intervals',sets:'6×250m',rest:'2min'},
     {name:'Core Rotation Power Drill',sets:'4×15',rest:'45s'},{name:'Steady-State Paddle',sets:'15 min',rest:''}]}]},
  {id:'canoekayak-adv',sport:'canoekayak',level:'advanced',icon:'🛶',title:'Race-Pace Training — Advanced',meta:'5x/week · 55 min water',featured:false,
   tip:'<strong>Explosive starts win close races.</strong> Practice your first 10 strokes at max power specifically, not just the middle of the race.',
   days:[{label:'RACE-PACE SESSION',exercises:[
     {name:'Explosive Start Practice',sets:'8 reps',rest:'90s'},{name:'500m Race-Pace Repeats',sets:'5×500m',rest:'3min'},
     {name:'Core Rotation Power Circuit',sets:'4 rounds',rest:'45s'},{name:'Endurance Paddle',sets:'20 min',rest:''}]}]},

  // ===== DIVING =====
  {id:'diving-beg',sport:'diving',level:'beginner',icon:'🤿',title:'Diving Fundamentals — Beginner',meta:'3x/week · 30 min',featured:true,
   tip:'<strong>Practice your positions on land before adding height.</strong> A clean tuck/pike on the ground translates directly to the air.',
   days:[{label:'FUNDAMENTALS',exercises:[
     {name:'Approach & Hurdle Step Practice',sets:'10 reps',rest:'30s'},{name:'Tuck Position Practice (dryland)',sets:'4×10s',rest:'20s'},
     {name:'Pike Position Practice (dryland)',sets:'4×10s',rest:'20s'},{name:'Basic Entries (feet-first, hands-first)',sets:'10 reps',rest:'30s'},
     {name:'Core & Flexibility Circuit',sets:'3 rounds',rest:'30s'}]}]},
  {id:'diving-int',sport:'diving',level:'intermediate',icon:'🤿',title:'Rotation & Spotting — Intermediate',meta:'3-4x/week · 40 min',featured:false,
   tip:'<strong>Spot your entry early.</strong> Finding the water with your eyes before you\'re fully rotated is what keeps dives controlled.',
   days:[{label:'ROTATION TRAINING',exercises:[
     {name:'Springboard Basics (approach + hurdle)',sets:'10 dives',rest:'60s'},{name:'Rotation Drill (trampoline-assisted if available)',sets:'10 reps',rest:'45s'},
     {name:'Spotting Practice',sets:'10 reps',rest:'30s'},{name:'Core & Shoulder Strength Circuit',sets:'4 rounds',rest:'45s'}]}]},
  {id:'diving-adv',sport:'diving',level:'advanced',icon:'🤿',title:'Advanced Twists — Advanced',meta:'4x/week · 50 min',featured:false,
   tip:'<strong>Advanced twisting dives need serious spatial awareness.</strong> Build them progressively, dive by dive — never jump straight to full difficulty.',
   days:[{label:'ADVANCED ROTATION',exercises:[
     {name:'Twist Progression Practice',sets:'10 dives',rest:'90s'},{name:'Somersault Combination Practice',sets:'10 dives',rest:'90s'},
     {name:'Competition Dive Run-Through',sets:'6 dives',rest:'2min'},{name:'Explosive Core Circuit',sets:'4 rounds',rest:'45s'}]}]},

  // ===== EQUESTRIAN =====
  {id:'equestrian-beg',sport:'equestrian',level:'beginner',icon:'🐎',title:'Rider Conditioning — Beginner',meta:'3x/week · 30 min',featured:true,
   tip:'<strong>Your core and legs do the real work of staying balanced in the saddle.</strong> This off-horse conditioning directly supports your riding.',
   days:[{label:'FOUNDATIONS',exercises:[
     {name:'Core Stability Circuit',sets:'3 rounds',rest:'45s'},{name:'Hip Flexor Mobility Work',sets:'3×30s each side',rest:'20s'},
     {name:'Balance Drills (single-leg stance)',sets:'4×20s each',rest:'30s'},{name:'Posture Hold Practice',sets:'3×30s',rest:'30s'},
     {name:'Grip Strength Work',sets:'3×20s',rest:'30s'}]}]},
  {id:'equestrian-int',sport:'equestrian',level:'intermediate',icon:'🐎',title:'Position Control — Intermediate',meta:'3-4x/week · 35 min',featured:false,
   tip:'<strong>A stable lower leg is what gives you control.</strong> Build the strength that keeps your leg quiet and independent from your upper body.',
   days:[{label:'STABILITY TRAINING',exercises:[
     {name:'Core Rotation Stability Circuit',sets:'4 rounds',rest:'45s'},{name:'Single-Leg Balance (unstable surface)',sets:'4×20s each',rest:'30s'},
     {name:'Grip & Forearm Endurance',sets:'4×30s',rest:'30s'},{name:'Hip Mobility Flow',sets:'10 min',rest:''}]}]},
  {id:'equestrian-adv',sport:'equestrian',level:'advanced',icon:'🐎',title:'Advanced Riding Fitness — Advanced',meta:'4x/week · 40 min',featured:false,
   tip:'<strong>Explosive core control matters for jumping and quick direction changes.</strong> Train it directly, not just general fitness.',
   days:[{label:'ADVANCED CONDITIONING',exercises:[
     {name:'Explosive Core Circuit',sets:'5 rounds',rest:'45s'},{name:'Balance Under Fatigue Drill',sets:'5×20s',rest:'30s'},
     {name:'Grip Endurance (heavy hang)',sets:'5×20s',rest:'30s'},{name:'Full-Body Stability Circuit',sets:'4 rounds',rest:'45s'}]}]},

  // ===== FIELD HOCKEY =====
  {id:'fieldhockey-beg',sport:'fieldhockey',level:'beginner',icon:'🏑',title:'Stick Skills Fundamentals — Beginner',meta:'3x/week · 35 min',featured:true,
   tip:'<strong>Stay low and keep the ball close.</strong> A wide stance and bent knees give you way more stick control.',
   days:[{label:'STICK BASICS',exercises:[
     {name:'Grip & Stance Practice',sets:'5 min',rest:''},{name:'Push Pass Practice',sets:'4×15',rest:'45s'},
     {name:'Dribbling Fundamentals',sets:'4×1min',rest:'30s'},{name:'Trapping/Receiving Drill',sets:'4×10',rest:'45s'},
     {name:'Footwork Ladder',sets:'4×20s',rest:'30s'}]}]},
  {id:'fieldhockey-int',sport:'fieldhockey',level:'intermediate',icon:'🏑',title:'Hitting & Tackling — Intermediate',meta:'3x/week · 45 min',featured:false,
   tip:'<strong>A clean tackle is about timing, not speed.</strong> Watch the ball, not the player\'s feet.',
   days:[{label:'SKILL & DEFENSE',exercises:[
     {name:'Dynamic warm-up',sets:'6 min',rest:''},{name:'Hitting Technique Practice',sets:'4×10',rest:'45s'},
     {name:'Agility with Stick Drill',sets:'5×20s',rest:'30s'},{name:'Tackling Technique Practice',sets:'5×8',rest:'45s'},
     {name:'Dribbling Combo Moves',sets:'6 reps',rest:'45s'}]}]},
  {id:'fieldhockey-adv',sport:'fieldhockey',level:'advanced',icon:'🏑',title:'Game-Speed Conditioning — Advanced',meta:'4x/week · 55 min',featured:false,
   tip:'<strong>Stick skills need to survive fatigue.</strong> Practice them at the end of a hard conditioning block, not just when fresh.',
   days:[{label:'GAME-SPEED TRAINING',exercises:[
     {name:'Dynamic warm-up + sprints',sets:'8 min',rest:''},{name:'Stick Skills Under Fatigue',sets:'6×8',rest:'45s'},
     {name:'Repeated Sprint Shuttles',sets:'8×20s',rest:'30s'},{name:'Game-Speed Tackling Drill',sets:'6×8',rest:'45s'},
     {name:'Small-Sided Game',sets:'15 min',rest:''}]}]},

  // ===== HANDBALL =====
  {id:'handball-beg',sport:'handball',level:'beginner',icon:'🤾',title:'Handball Fundamentals — Beginner',meta:'3x/week · 35 min',featured:true,
   tip:'<strong>Catch with soft hands and release quickly.</strong> Handball moves fast — holding the ball too long kills your team\'s rhythm.',
   days:[{label:'FUNDAMENTALS',exercises:[
     {name:'Passing & Catching Practice',sets:'4×15',rest:'45s'},{name:'Dribbling Basics',sets:'4×1min',rest:'30s'},
     {name:'Shooting Form (stationary)',sets:'4×10',rest:'45s'},{name:'Footwork Drill',sets:'4×20s',rest:'30s'}]}]},
  {id:'handball-int',sport:'handball',level:'intermediate',icon:'🤾',title:'Jump Shot & Defense — Intermediate',meta:'3x/week · 45 min',featured:false,
   tip:'<strong>Jump shot power comes from your legs and core, not just your arm.</strong> Attack the shot with your whole body.',
   days:[{label:'SKILL DEVELOPMENT',exercises:[
     {name:'Dynamic warm-up',sets:'6 min',rest:''},{name:'Jump Shot Technique Practice',sets:'5×8',rest:'45s'},
     {name:'Defensive Positioning Drill',sets:'5×20s',rest:'30s'},{name:'Fast Break Practice',sets:'6 reps',rest:'45s'},
     {name:'Passing Under Pressure',sets:'5×10',rest:'45s'}]}]},
  {id:'handball-adv',sport:'handball',level:'advanced',icon:'🤾',title:'Explosive Performance — Advanced',meta:'4x/week · 55 min',featured:false,
   tip:'<strong>Vertical power directly translates to a harder, higher jump shot.</strong> Train it directly.',
   days:[{label:'EXPLOSIVE TRAINING',exercises:[
     {name:'Dynamic warm-up + pogo hops',sets:'8 min',rest:''},{name:'Jump Shot Power Reps',sets:'6×8',rest:'60s'},
     {name:'Box Jumps',sets:'5×6',rest:'90s'},{name:'Game-Speed Combo Drill',sets:'6 reps',rest:'45s'},
     {name:'Defensive Slide Shuttle',sets:'6×20s',rest:'30s'}]}]},

  // ===== JUDO =====
  {id:'judo-beg',sport:'judo',level:'beginner',icon:'🥋',title:'Judo Fundamentals — Beginner',meta:'3x/week · 40 min',featured:true,
   tip:'<strong>Learn to fall safely before anything else.</strong> Breakfalls (ukemi) are the single most important beginner skill in judo — they protect you for everything that follows.',
   days:[{label:'FUNDAMENTALS',exercises:[
     {name:'Breakfall Practice (ukemi)',sets:'10 reps each direction',rest:'45s'},{name:'Grip Fighting Basics (kumi-kata)',sets:'5×1min',rest:'30s'},
     {name:'Footwork & Movement Drill',sets:'4×1min',rest:'30s'},{name:'Basic Throw Practice (o-goshi, walk-through)',sets:'8 reps each side',rest:'60s'}]}]},
  {id:'judo-int',sport:'judo',level:'intermediate',icon:'🥋',title:'Throwing Technique — Intermediate',meta:'3-4x/week · 50 min',featured:false,
   tip:'<strong>Off-balancing (kuzushi) happens before the throw, not during it.</strong> Most beginners skip this and muscle the throw instead.',
   days:[{label:'THROWING WORK',exercises:[
     {name:'Grip Fighting Drills',sets:'5×1min',rest:'45s'},{name:'Off-Balancing Practice (kuzushi)',sets:'6×8',rest:'45s'},
     {name:'Throw Repetition (uchi-komi)',sets:'6×10',rest:'45s'},{name:'Groundwork Basics (newaza)',sets:'5×2min',rest:'60s'}]}]},
  {id:'judo-adv',sport:'judo',level:'advanced',icon:'🥋',title:'Randori Conditioning — Advanced',meta:'4-5x/week · 60 min',featured:false,
   tip:'<strong>Randori (live sparring) is where technique actually gets tested under resistance.</strong> Control the intensity so it stays technical, not just a wrestling match.',
   days:[{label:'LIVE TRAINING',exercises:[
     {name:'Combination Throw Practice',sets:'6×8',rest:'60s'},{name:'Randori (live sparring)',sets:'5×3min',rest:'90s'},
     {name:'Groundwork Live Rounds',sets:'4×3min',rest:'60s'},{name:'Explosive Throw Entries',sets:'6×6',rest:'45s'}]}]},

  // ===== MODERN PENTATHLON =====
  {id:'pentathlon-beg',sport:'pentathlon',level:'beginner',icon:'🎖️',title:'Multi-Discipline Fundamentals — Beginner',meta:'4x/week · 50 min',featured:true,
   tip:'<strong>You\'re building a foundation across five very different disciplines at once.</strong> Expect this to feel scattered at first — that\'s normal.',
   days:[
     {label:'FENCING & SWIM BASICS',exercises:[
       {name:'En Garde Stance Hold',sets:'3×30s',rest:'30s'},{name:'Lunge Practice',sets:'4×10',rest:'45s'},
       {name:'Easy Swim Technique',sets:'200m',rest:''},{name:'Kick Set',sets:'4×50m',rest:'30s'}]},
     {label:'RUN & SHOOT BASICS',exercises:[
       {name:'Easy-Pace Run',sets:'15 min',rest:''},{name:'Stance & Trigger Control Drill',sets:'4×10',rest:'30s'},
       {name:'Core Stability Circuit',sets:'3 rounds',rest:'45s'}]}]},
  {id:'pentathlon-int',sport:'pentathlon',level:'intermediate',icon:'🎖️',title:'Combined Conditioning — Intermediate',meta:'5x/week · 55 min',featured:false,
   tip:'<strong>The "laser run" (run + shoot) is its own skill — practice the transition between elevated heart rate and precise shooting specifically.</strong>',
   days:[
     {label:'LASER RUN PRACTICE',exercises:[
       {name:'Interval Run',sets:'6×400m',rest:'90s'},{name:'Shooting Under Elevated Heart Rate',sets:'4×5 shots',rest:'2min'},
       {name:'Transition Drill (run-to-shoot)',sets:'5 reps',rest:'90s'}]},
     {label:'FENCE & SWIM CONDITIONING',exercises:[
       {name:'Fencing Footwork Combos',sets:'6×8',rest:'45s'},{name:'Swim Interval Set',sets:'8×50m',rest:'20s'},
       {name:'Core Rotation Circuit',sets:'4 rounds',rest:'45s'}]}]},
  {id:'pentathlon-adv',sport:'pentathlon',level:'advanced',icon:'🎖️',title:'Full Combined Event — Advanced',meta:'5-6x/week · 65 min',featured:false,
   tip:'<strong>Simulate the full event order when you can.</strong> Fatigue from earlier disciplines changes how the later ones feel — train for that specifically.',
   days:[{label:'COMBINED EVENT SIMULATION',exercises:[
     {name:'Fencing Bout Simulation',sets:'5×3min',rest:'90s'},{name:'Swim Race-Pace Set',sets:'4×100m',rest:'45s'},
     {name:'Laser Run Full Simulation',sets:'3 rounds run+shoot',rest:'2min'},{name:'Explosive Conditioning Circuit',sets:'4 rounds',rest:'45s'}]}]},

  // ===== SAILING =====
  {id:'sailing-beg',sport:'sailing',level:'beginner',icon:'⛵',title:'Sailing Fitness Fundamentals — Beginner',meta:'2-3x/week · 30 min',featured:true,
   tip:'<strong>Core endurance matters more than raw strength for most sailing positions.</strong> Build the ability to hold a braced position for a long time.',
   days:[{label:'FUNDAMENTALS',exercises:[
     {name:'Core Stability Circuit',sets:'3 rounds',rest:'45s'},{name:'Hiking Position Hold (simulated)',sets:'4×20s',rest:'45s'},
     {name:'Grip Endurance Work',sets:'4×20s',rest:'30s'},{name:'Balance Drills',sets:'10 min',rest:''}]}]},
  {id:'sailing-int',sport:'sailing',level:'intermediate',icon:'⛵',title:'Hiking Endurance — Intermediate',meta:'3x/week · 40 min',featured:false,
   tip:'<strong>Hiking endurance is a specific, trainable quality.</strong> Long isometric holds at an angle are exactly what the boat demands.',
   days:[{label:'HIKING CONDITIONING',exercises:[
     {name:'Hiking Position Hold (extended)',sets:'5×30s',rest:'45s'},{name:'Core Rotation Circuit',sets:'4 rounds',rest:'45s'},
     {name:'Quick-Response Balance Drill',sets:'5×20s',rest:'30s'},{name:'Grip & Forearm Endurance',sets:'4×30s',rest:'30s'}]}]},
  {id:'sailing-adv',sport:'sailing',level:'advanced',icon:'⛵',title:'Race Conditioning — Advanced',meta:'4x/week · 50 min',featured:false,
   tip:'<strong>Tacking and gybing under fatigue is where races are actually won or lost.</strong> Train the explosive transition, not just the steady hold.',
   days:[{label:'ADVANCED CONDITIONING',exercises:[
     {name:'Extended Hiking Hold',sets:'6×40s',rest:'45s'},{name:'Explosive Tack/Gybe Simulation',sets:'8 reps',rest:'45s'},
     {name:'Core Endurance Circuit',sets:'5 rounds',rest:'45s'},{name:'Grip Endurance (heavy)',sets:'5×30s',rest:'30s'}]}]},

  // ===== SHOOTING =====
  {id:'shooting-beg',sport:'shooting',level:'beginner',icon:'🎯',title:'Shooting Fundamentals — Beginner',meta:'2-3x/week · 30 min',featured:true,
   tip:'<strong>A stable stance and controlled breathing matter more than a steady hand.</strong> Most wobble comes from your base, not your grip.',
   days:[{label:'FUNDAMENTALS',exercises:[
     {name:'Stance & Grip Practice',sets:'10 min',rest:''},{name:'Breathing Control Drill',sets:'5×5 breaths',rest:'30s'},
     {name:'Trigger Control Practice (dry fire)',sets:'20 reps',rest:''},{name:'Sight Alignment Hold',sets:'5×10s',rest:'20s'}]}]},
  {id:'shooting-int',sport:'shooting',level:'intermediate',icon:'🎯',title:'Precision Consistency — Intermediate',meta:'3x/week · 40 min',featured:false,
   tip:'<strong>Follow through after every shot.</strong> Dropping your position the instant you fire is what ruins otherwise good groups.',
   days:[{label:'CONSISTENCY TRAINING',exercises:[
     {name:'Sight Alignment Consistency Drill',sets:'20 shots',rest:''},{name:'Follow-Through Practice',sets:'20 shots',rest:''},
     {name:'Stability Hold (extended aim)',sets:'5×15s',rest:'30s'},{name:'Timed Precision Drill',sets:'15 shots',rest:''}]}]},
  {id:'shooting-adv',sport:'shooting',level:'advanced',icon:'🎯',title:'Competition Stage Simulation — Advanced',meta:'4x/week · 50 min',featured:false,
   tip:'<strong>Practice under time pressure and simulated competition stress.</strong> Technical skill alone isn\'t enough once the scoreboard is real.',
   days:[{label:'COMPETITION PREP',exercises:[
     {name:'Rapid-Fire Precision Drill',sets:'20 shots',rest:''},{name:'Competition Stage Simulation',sets:'3 stages',rest:'3min'},
     {name:'Stability Hold Under Fatigue',sets:'6×15s',rest:'30s'},{name:'Mental Focus Practice',sets:'10 min',rest:''}]}]},

  // ===== TAEKWONDO =====
  {id:'taekwondo-beg',sport:'taekwondo',level:'beginner',icon:'🥋',title:'Taekwondo Fundamentals — Beginner',meta:'3x/week · 40 min',featured:true,
   tip:'<strong>Chamber your knee before every kick.</strong> That\'s where the speed and power actually come from, not the leg swing itself.',
   days:[{label:'FUNDAMENTALS',exercises:[
     {name:'Basic Stance Practice',sets:'5 min',rest:''},{name:'Front Kick Practice',sets:'4×10 each',rest:'45s'},
     {name:'Roundhouse Kick Practice',sets:'4×10 each',rest:'45s'},{name:'Side Kick Practice',sets:'4×10 each',rest:'45s'},
     {name:'Footwork & Pivoting Drill',sets:'4×20s',rest:'30s'}]}]},
  {id:'taekwondo-int',sport:'taekwondo',level:'intermediate',icon:'🥋',title:'Kicking Combinations — Intermediate',meta:'3-4x/week · 50 min',featured:false,
   tip:'<strong>Chain kicks together without resetting your stance between them.</strong> That\'s what makes combinations actually fast.',
   days:[{label:'COMBINATION WORK',exercises:[
     {name:'Kicking Combination Drills',sets:'5×2min',rest:'45s'},{name:'Footwork & Sparring Basics',sets:'5×2min',rest:'60s'},
     {name:'Pad Work (kick combinations)',sets:'5×2min',rest:'45s'},{name:'Core & Flexibility Circuit',sets:'3 rounds',rest:'45s'}]}]},
  {id:'taekwondo-adv',sport:'taekwondo',level:'advanced',icon:'🥋',title:'Sparring Conditioning — Advanced',meta:'4-5x/week · 60 min',featured:false,
   tip:'<strong>Full-contact sparring under fatigue is the real test of your technique.</strong> Keep your guard up even when you\'re tired — that\'s exactly when it matters most.',
   days:[{label:'ADVANCED SPARRING',exercises:[
     {name:'Explosive Kick Combinations',sets:'6×2min',rest:'60s'},{name:'Full-Contact Sparring Rounds',sets:'5×2min',rest:'90s'},
     {name:'Reaction Drills (partner cue)',sets:'6×10',rest:'45s'},{name:'Conditioning Circuit',sets:'4 rounds',rest:'45s'}]}]},

  // ===== TRIATHLON =====
  {id:'triathlon-beg',sport:'triathlon',level:'beginner',icon:'⏱️',title:'Brick Workout Fundamentals — Beginner',meta:'4x/week · 45 min',featured:true,
   tip:'<strong>Your legs feel completely different on the run right after biking.</strong> "Brick" workouts (bike-to-run) train your body to adapt to that transition.',
   days:[{label:'BRICK BASICS',exercises:[
     {name:'Easy Swim Technique',sets:'200m',rest:''},{name:'Easy Bike Ride',sets:'15 min',rest:''},
     {name:'Transition Practice (bike-to-run gear change)',sets:'5 reps',rest:'60s'},{name:'Short Easy Run (off the bike)',sets:'10 min',rest:''}]}]},
  {id:'triathlon-int',sport:'triathlon',level:'intermediate',icon:'⏱️',title:'Interval Brick Sessions — Intermediate',meta:'5x/week · 55 min',featured:false,
   tip:'<strong>Practice race-day nutrition and pacing during training, not for the first time on race day.</strong>',
   days:[{label:'INTERVAL BRICK',exercises:[
     {name:'Swim Interval Set',sets:'8×50m',rest:'20s'},{name:'Bike Interval Set',sets:'6×3min',rest:'2min'},
     {name:'Transition Practice',sets:'5 reps',rest:'45s'},{name:'Run Off the Bike (tempo)',sets:'15 min',rest:''}]}]},
  {id:'triathlon-adv',sport:'triathlon',level:'advanced',icon:'⏱️',title:'Race Simulation — Advanced',meta:'6x/week · 70 min',featured:false,
   tip:'<strong>Full race-pace brick sessions are uncomfortable by design.</strong> That discomfort late in a run-off-the-bike is exactly what race day feels like.',
   days:[{label:'FULL BRICK SIMULATION',exercises:[
     {name:'Race-Pace Swim',sets:'400m',rest:''},{name:'Race-Pace Bike',sets:'30 min',rest:''},
     {name:'Fast Transition Practice',sets:'3 reps',rest:'30s'},{name:'Race-Pace Run Off the Bike',sets:'20 min',rest:''}]}]},

  // ===== WATER POLO =====
  {id:'waterpolo-beg',sport:'waterpolo',level:'beginner',icon:'🤽',title:'Water Polo Fundamentals — Beginner',meta:'3x/week · 40 min pool',featured:true,
   tip:'<strong>The eggbeater kick is the foundation of everything in water polo.</strong> You need to be able to tread water strongly while your hands stay free to play.',
   days:[{label:'FUNDAMENTALS',exercises:[
     {name:'Eggbeater Kick Practice',sets:'5×1min',rest:'30s'},{name:'Passing & Catching Drill',sets:'4×15',rest:'45s'},
     {name:'Basic Positioning Practice',sets:'10 min',rest:''},{name:'Sprint Swimming (freestyle, head-up)',sets:'4×25m',rest:'30s'}]}]},
  {id:'waterpolo-int',sport:'waterpolo',level:'intermediate',icon:'🤽',title:'Shooting & Defense — Intermediate',meta:'3-4x/week · 50 min pool',featured:false,
   tip:'<strong>Shooting power comes from your eggbeater kick lifting you out of the water, not just your arm.</strong>',
   days:[{label:'SKILL DEVELOPMENT',exercises:[
     {name:'Eggbeater Kick (elevated, shooting position)',sets:'5×30s',rest:'30s'},{name:'Shooting Technique Practice',sets:'4×10',rest:'45s'},
     {name:'Defensive Positioning Drill',sets:'5×20s',rest:'30s'},{name:'Sprint Swimming Intervals',sets:'6×25m',rest:'30s'}]}]},
  {id:'waterpolo-adv',sport:'waterpolo',level:'advanced',icon:'🤽',title:'Game-Speed Conditioning — Advanced',meta:'4-5x/week · 60 min pool',featured:false,
   tip:'<strong>Explosive shooting power under fatigue is what separates levels.</strong> Practice your shot after a hard sprint set, not just when fresh.',
   days:[{label:'GAME-SPEED TRAINING',exercises:[
     {name:'Sprint Swimming Set',sets:'8×25m',rest:'20s'},{name:'Explosive Shooting Under Fatigue',sets:'5×8',rest:'45s'},
     {name:'Eggbeater Endurance Hold',sets:'5×45s',rest:'30s'},{name:'Game-Speed Scrimmage',sets:'15 min',rest:''}]}]},

  // ===== WEIGHTLIFTING =====
  {id:'weightlifting-beg',sport:'weightlifting',level:'beginner',icon:'🏋️',title:'Olympic Lift Technique — Beginner',meta:'3x/week · 40 min',featured:true,
   tip:'<strong>Learn the snatch and clean & jerk with an empty bar or PVC pipe first.</strong> Technique has to be automatic before you add real weight.',
   days:[{label:'TECHNIQUE PRIMER',exercises:[
     {name:'Mobility Warm-up (hips, shoulders, ankles)',sets:'10 min',rest:''},{name:'Snatch Grip Drill (PVC/empty bar)',sets:'5×5',rest:'60s'},
     {name:'Clean Pull Practice (light)',sets:'5×5',rest:'60s'},{name:'Front Squat (light)',sets:'4×8',rest:'90s'},
     {name:'Overhead Squat Hold (PVC)',sets:'4×15s',rest:'45s'}]}]},
  {id:'weightlifting-int',sport:'weightlifting',level:'intermediate',icon:'🏋️',title:'Snatch & Clean & Jerk — Intermediate',meta:'4x/week · 50 min',featured:false,
   tip:'<strong>Speed under the bar matters as much as raw strength.</strong> A fast pull with a slow drop under the bar still misses the lift.',
   days:[{label:'LIFT DEVELOPMENT',exercises:[
     {name:'Snatch (moderate load)',sets:'5×3',rest:'2min'},{name:'Clean & Jerk (moderate load)',sets:'5×3',rest:'2min'},
     {name:'Front Squat',sets:'4×6',rest:'90s'},{name:'Overhead Squat',sets:'4×5',rest:'90s'},
     {name:'Snatch Pull',sets:'4×5',rest:'90s'}]}]},
  {id:'weightlifting-adv',sport:'weightlifting',level:'advanced',icon:'🏋️',title:'Competition Prep — Advanced',meta:'5x/week · 60 min',featured:false,
   tip:'<strong>Heavy singles build the confidence and technique stability that competition demands.</strong> Always with a spotter or in a rack with safety pins.',
   days:[{label:'HEAVY SINGLES',exercises:[
     {name:'Snatch (heavy singles)',sets:'6×1',rest:'3min'},{name:'Clean & Jerk (heavy singles)',sets:'6×1',rest:'3min'},
     {name:'Front Squat (heavy)',sets:'5×3',rest:'2min'},{name:'Snatch Pull (heavy)',sets:'4×3',rest:'2min'}]}]},

  // ===== ALPINE SKIING =====
  {id:'alpineskiing-beg',sport:'alpineskiing',level:'beginner',icon:'⛷️',title:'Ski Conditioning — Beginner',meta:'3x/week · 35 min',featured:true,
   tip:'<strong>Leg strength and balance are what you can build off the mountain.</strong> This directly transfers to edge control on snow.',
   days:[{label:'FUNDAMENTALS',exercises:[
     {name:'Bodyweight Squat (ski stance)',sets:'4×15',rest:'45s'},{name:'Single-Leg Balance Drills',sets:'4×20s each',rest:'30s'},
     {name:'Wall Sit',sets:'4×30s',rest:'45s'},{name:'Lateral Lunges',sets:'3×12 each',rest:'45s'}]}]},
  {id:'alpineskiing-int',sport:'alpineskiing',level:'intermediate',icon:'⛷️',title:'Turn Power — Intermediate',meta:'3-4x/week · 45 min',featured:false,
   tip:'<strong>Skiing is quad-dominant, isometric-heavy work.</strong> Wall sits and long squat holds mimic exactly what a run demands.',
   days:[{label:'STRENGTH & ENDURANCE',exercises:[
     {name:'Wall Sit (extended)',sets:'4×45s',rest:'45s'},{name:'Bulgarian Split Squat',sets:'4×10 each',rest:'75s'},
     {name:'Lateral Bounds',sets:'4×10 each',rest:'45s'},{name:'Core Rotation Circuit',sets:'4 rounds',rest:'45s'}]}]},
  {id:'alpineskiing-adv',sport:'alpineskiing',level:'advanced',icon:'⛷️',title:'Race Power — Advanced',meta:'4x/week · 55 min',featured:false,
   tip:'<strong>Racing demands explosive power on top of endurance.</strong> Train both — long holds AND explosive jumps.',
   days:[{label:'EXPLOSIVE + ENDURANCE',exercises:[
     {name:'Wall Sit (heavy/extended)',sets:'5×60s',rest:'45s'},{name:'Lateral Bound Power Reps',sets:'5×10 each',rest:'45s'},
     {name:'Box Jumps',sets:'5×6',rest:'90s'},{name:'Single-Leg Squat (pistol progression)',sets:'4×6 each',rest:'90s'}]}]},

  // ===== BIATHLON =====
  {id:'biathlon-beg',sport:'biathlon',level:'beginner',icon:'🎿',title:'Ski & Shoot Fundamentals — Beginner',meta:'3x/week · 40 min',featured:true,
   tip:'<strong>Bringing your heart rate down quickly before shooting is a trainable skill.</strong> Practice the transition, not just each discipline alone.',
   days:[{label:'FUNDAMENTALS',exercises:[
     {name:'Cross-Country Ski Technique (or roller ski/run)',sets:'15 min',rest:''},{name:'Shooting Stance Practice',sets:'10 min',rest:''},
     {name:'Breathing Control Drill',sets:'5×5 breaths',rest:'30s'},{name:'Easy Endurance Effort',sets:'10 min',rest:''}]}]},
  {id:'biathlon-int',sport:'biathlon',level:'intermediate',icon:'🎿',title:'Transition Training — Intermediate',meta:'4x/week · 50 min',featured:false,
   tip:'<strong>Practice shooting immediately after hard effort.</strong> That transition — not either discipline alone — is the actual sport.',
   days:[{label:'SKI-SHOOT TRANSITIONS',exercises:[
     {name:'Interval Ski/Run Effort',sets:'6×3min',rest:'90s'},{name:'Shooting Under Elevated Heart Rate',sets:'4×5 shots',rest:'2min'},
     {name:'Transition Drill',sets:'5 reps',rest:'90s'},{name:'Steady Endurance Effort',sets:'15 min',rest:''}]}]},
  {id:'biathlon-adv',sport:'biathlon',level:'advanced',icon:'🎿',title:'Race-Pace Combined Training — Advanced',meta:'5x/week · 60 min',featured:false,
   tip:'<strong>Race pace changes everything about the shooting transition.</strong> Train at the intensity you\'ll actually race at.',
   days:[{label:'RACE-PACE SESSION',exercises:[
     {name:'Race-Pace Interval Effort',sets:'6×4min',rest:'2min'},{name:'Rapid Shooting Under Fatigue',sets:'5×5 shots',rest:'90s'},
     {name:'Full Race Simulation',sets:'3 rounds ski+shoot',rest:'3min'},{name:'Cool-down effort',sets:'10 min',rest:''}]}]},

  // ===== BOBSLED =====
  {id:'bobsled-beg',sport:'bobsled',level:'beginner',icon:'🛷',title:'Push Start Fundamentals — Beginner',meta:'3x/week · 35 min',featured:true,
   tip:'<strong>The start is a short, explosive sprint.</strong> Everything you build here is pure acceleration power, not endurance.',
   days:[{label:'FUNDAMENTALS',exercises:[
     {name:'Sprint Starts (dryland)',sets:'6×10m',rest:'90s'},{name:'Bodyweight Squat',sets:'4×12',rest:'60s'},
     {name:'Broad Jumps',sets:'4×5',rest:'60s'},{name:'Core Bracing Circuit',sets:'3 rounds',rest:'45s'}]}]},
  {id:'bobsled-int',sport:'bobsled',level:'intermediate',icon:'🛷',title:'Push Power — Intermediate',meta:'4x/week · 45 min',featured:false,
   tip:'<strong>Sprint power and lower-body strength both matter — the push is short but brutally intense.</strong>',
   days:[{label:'POWER TRAINING',exercises:[
     {name:'Resisted Sprint Starts (sled push/pull)',sets:'6×10m',rest:'2min'},{name:'Trap Bar Deadlift (or heavy squat)',sets:'5×5',rest:'2min'},
     {name:'Broad Jumps',sets:'5×5',rest:'75s'},{name:'Push-Start Simulation (partner push)',sets:'6 reps',rest:'90s'}]}]},
  {id:'bobsled-adv',sport:'bobsled',level:'advanced',icon:'🛷',title:'Max Power Training — Advanced',meta:'4-5x/week · 55 min',featured:false,
   tip:'<strong>Max power training at this level is about peak force output.</strong> Full recovery between reps — quality over volume.',
   days:[{label:'MAX POWER SESSION',exercises:[
     {name:'Max Effort Sprint Starts',sets:'8×10m',rest:'3min'},{name:'Heavy Trap Bar Deadlift',sets:'5×3',rest:'2min'},
     {name:'Depth Jumps',sets:'5×5',rest:'90s'},{name:'Push-Start Simulation (full effort)',sets:'6 reps',rest:'2min'}]}]},

  // ===== CROSS-COUNTRY SKIING =====
  {id:'crosscountryskiing-beg',sport:'crosscountryskiing',level:'beginner',icon:'🎿',title:'Technique & Base — Beginner',meta:'3x/week · 35 min',featured:true,
   tip:'<strong>Build your aerobic base before worrying about speed.</strong> Most of your training time should feel comfortably easy.',
   days:[{label:'FOUNDATIONS',exercises:[
     {name:'Technique Drills (roller ski or run)',sets:'15 min',rest:''},{name:'Easy Aerobic Effort',sets:'20 min',rest:''},
     {name:'Double-Poling Drill (poles or resistance band)',sets:'4×1min',rest:'45s'}]}]},
  {id:'crosscountryskiing-int',sport:'crosscountryskiing',level:'intermediate',icon:'🎿',title:'Interval Training — Intermediate',meta:'4x/week · 50 min',featured:false,
   tip:'<strong>Double-poling strength is often the limiting factor, not your legs.</strong> Train your upper body specifically for this sport.',
   days:[{label:'INTERVAL SESSION',exercises:[
     {name:'Warm-up effort',sets:'10 min',rest:''},{name:'Interval Effort',sets:'6×4min',rest:'2min'},
     {name:'Double-Poling Strength Circuit',sets:'4 rounds',rest:'45s'},{name:'Cool-down easy effort',sets:'10 min',rest:''}]}]},
  {id:'crosscountryskiing-adv',sport:'crosscountryskiing',level:'advanced',icon:'🎿',title:'Race-Pace & VO2max — Advanced',meta:'5-6x/week · 60 min',featured:false,
   tip:'<strong>VO2max intervals are supposed to be genuinely uncomfortable.</strong> If you can hold a conversation, the pace is too easy.',
   days:[{label:'VO2MAX SESSION',exercises:[
     {name:'Warm-up + openers',sets:'12 min',rest:''},{name:'VO2max Intervals',sets:'6×5min',rest:'3min'},
     {name:'Double-Poling Power Reps',sets:'5×1min',rest:'60s'},{name:'Cool-down easy effort',sets:'10 min',rest:''}]}]},

  // ===== CURLING =====
  {id:'curling-beg',sport:'curling',level:'beginner',icon:'🥌',title:'Curling Fundamentals — Beginner',meta:'2-3x/week · 30 min',featured:true,
   tip:'<strong>Balance in your delivery matters more than arm strength.</strong> A stable slide releases the stone consistently.',
   days:[{label:'FUNDAMENTALS',exercises:[
     {name:'Delivery Stance & Balance Practice',sets:'10 min',rest:''},{name:'Sweeping Technique Drill',sets:'4×30s',rest:'30s'},
     {name:'Core Stability Circuit',sets:'3 rounds',rest:'45s'},{name:'Lower Body Mobility Work',sets:'10 min',rest:''}]}]},
  {id:'curling-int',sport:'curling',level:'intermediate',icon:'🥌',title:'Precision Delivery — Intermediate',meta:'3x/week · 35 min',featured:false,
   tip:'<strong>Sweeping is a real cardio workout.</strong> Build the endurance to sweep hard for the full length of the sheet, more than once a game.',
   days:[{label:'PRECISION & ENDURANCE',exercises:[
     {name:'Precision Delivery Drill',sets:'15 reps',rest:''},{name:'Sweeping Endurance Circuit',sets:'5×45s',rest:'30s'},
     {name:'Balance Under Fatigue Drill',sets:'4×20s',rest:'30s'},{name:'Core Rotation Circuit',sets:'4 rounds',rest:'45s'}]}]},
  {id:'curling-adv',sport:'curling',level:'advanced',icon:'🥌',title:'Competitive Conditioning — Advanced',meta:'3-4x/week · 40 min',featured:false,
   tip:'<strong>Weight control on the stone comes from repeatable delivery mechanics under pressure.</strong> Practice it fatigued, not just fresh.',
   days:[{label:'ADVANCED TRAINING',exercises:[
     {name:'Weight-Control Delivery Practice',sets:'20 reps',rest:''},{name:'High-Intensity Sweeping Intervals',sets:'6×45s',rest:'30s'},
     {name:'Strategic Delivery Under Pressure',sets:'15 reps',rest:''},{name:'Core & Balance Circuit',sets:'4 rounds',rest:'45s'}]}]},

  // ===== FIGURE SKATING =====
  {id:'figureskating-beg',sport:'figureskating',level:'beginner',icon:'⛸️',title:'Off-Ice Fundamentals — Beginner',meta:'3x/week · 35 min',featured:true,
   tip:'<strong>Off-ice balance and core work translate directly to on-ice edge control.</strong> This is time well spent even away from the rink.',
   days:[{label:'FUNDAMENTALS',exercises:[
     {name:'Single-Leg Balance Drills',sets:'4×20s each',rest:'30s'},{name:'Core Stability Circuit',sets:'3 rounds',rest:'45s'},
     {name:'Posture & Alignment Practice',sets:'10 min',rest:''},{name:'Ankle Strengthening Drill',sets:'3×15 each',rest:'30s'}]}]},
  {id:'figureskating-int',sport:'figureskating',level:'intermediate',icon:'⛸️',title:'Jump Prep — Intermediate',meta:'3-4x/week · 45 min',featured:false,
   tip:'<strong>Off-ice jump technique (using a mat or soft landing surface) lets you drill the rotation safely before adding ice.</strong>',
   days:[{label:'JUMP & SPIN PREP',exercises:[
     {name:'Off-Ice Jump Technique (mat)',sets:'10 reps',rest:'45s'},{name:'Spin Prep Balance Drill',sets:'5×15s',rest:'30s'},
     {name:'Explosive Single-Leg Hops',sets:'4×8 each',rest:'45s'},{name:'Core Rotation Circuit',sets:'4 rounds',rest:'45s'}]}]},
  {id:'figureskating-adv',sport:'figureskating',level:'advanced',icon:'⛸️',title:'Program Conditioning — Advanced',meta:'4-5x/week · 55 min',featured:false,
   tip:'<strong>A full program is an intense 3-4 minute anaerobic effort.</strong> Train that specific energy system, not just skill alone.',
   days:[{label:'ADVANCED CONDITIONING',exercises:[
     {name:'Off-Ice Jump Combinations',sets:'10 reps',rest:'60s'},{name:'Explosive Rotation Power Drill',sets:'5×8',rest:'45s'},
     {name:'Program Run-Through Simulation (off-ice)',sets:'2×4min',rest:'3min'},{name:'Core & Balance Circuit',sets:'4 rounds',rest:'45s'}]}]},

  // ===== FREESTYLE SKIING =====
  {id:'freestyleskiing-beg',sport:'freestyleskiing',level:'beginner',icon:'🎿',title:'Aerial Awareness — Beginner',meta:'3x/week · 35 min',featured:true,
   tip:'<strong>Trampoline work builds the spatial awareness aerial tricks demand.</strong> Always with proper supervision and safety mats.',
   days:[{label:'FUNDAMENTALS',exercises:[
     {name:'Trampoline Basic Bounces',sets:'10 min',rest:''},{name:'Tuck Position Practice',sets:'4×10s',rest:'30s'},
     {name:'Balance & Landing Drills',sets:'4×10',rest:'30s'},{name:'Core Strength Circuit',sets:'3 rounds',rest:'45s'}]}]},
  {id:'freestyleskiing-int',sport:'freestyleskiing',level:'intermediate',icon:'🎿',title:'Rotation Practice — Intermediate',meta:'3-4x/week · 45 min',featured:false,
   tip:'<strong>Mogul skiing is brutal on your legs.</strong> Build the eccentric leg strength that absorbs bump after bump.',
   days:[{label:'ROTATION & LEG ENDURANCE',exercises:[
     {name:'Trampoline Rotation Practice',sets:'10 reps',rest:'60s'},{name:'Mogul Leg Endurance (squat holds)',sets:'4×30s',rest:'45s'},
     {name:'Explosive Jump Practice',sets:'5×5',rest:'60s'},{name:'Core Rotation Circuit',sets:'4 rounds',rest:'45s'}]}]},
  {id:'freestyleskiing-adv',sport:'freestyleskiing',level:'advanced',icon:'🎿',title:'Advanced Trick Progression — Advanced',meta:'4x/week · 55 min',featured:false,
   tip:'<strong>Advanced trick progressions demand real spatial control.</strong> Build them step by step with proper safety equipment — never skip stages.',
   days:[{label:'ADVANCED PROGRESSION',exercises:[
     {name:'Trampoline Advanced Rotation Practice',sets:'10 reps',rest:'75s'},{name:'Explosive Leg Power Circuit',sets:'5 rounds',rest:'45s'},
     {name:'Landing Absorption Drill',sets:'5×8',rest:'45s'},{name:'Core & Balance Circuit',sets:'4 rounds',rest:'45s'}]}]},

  // ===== LUGE =====
  {id:'luge-beg',sport:'luge',level:'beginner',icon:'🛷',title:'Start Technique Fundamentals — Beginner',meta:'3x/week · 30 min',featured:true,
   tip:'<strong>The start is a powerful pull using your arms and core, not your legs.</strong> Build that specific pulling power.',
   days:[{label:'FUNDAMENTALS',exercises:[
     {name:'Seated Pull Start Practice (dryland)',sets:'6×5',rest:'60s'},{name:'Core Bracing Circuit',sets:'3 rounds',rest:'45s'},
     {name:'Grip & Forearm Strength',sets:'4×20s',rest:'30s'},{name:'Neck Strengthening Drill',sets:'3×10',rest:'30s'}]}]},
  {id:'luge-int',sport:'luge',level:'intermediate',icon:'🛷',title:'Start Power — Intermediate',meta:'4x/week · 40 min',featured:false,
   tip:'<strong>Position endurance matters as much as the start.</strong> You hold an aerodynamic position for the whole run — build that stamina.',
   days:[{label:'POWER & POSITION',exercises:[
     {name:'Explosive Pull Start (resistance)',sets:'6×5',rest:'90s'},{name:'Aerodynamic Position Hold',sets:'5×20s',rest:'45s'},
     {name:'Core Endurance Circuit',sets:'4 rounds',rest:'45s'},{name:'Grip Endurance Work',sets:'5×20s',rest:'30s'}]}]},
  {id:'luge-adv',sport:'luge',level:'advanced',icon:'🛷',title:'Max Start Power — Advanced',meta:'4-5x/week · 50 min',featured:false,
   tip:'<strong>Max explosive pull power at this level comes down to fractions of a second.</strong> Full recovery between reps — this is a power sport, not an endurance one.',
   days:[{label:'MAX POWER SESSION',exercises:[
     {name:'Max Effort Pull Start',sets:'8×5',rest:'2min'},{name:'Extended Position Hold',sets:'5×30s',rest:'45s'},
     {name:'Explosive Core Circuit',sets:'5 rounds',rest:'45s'},{name:'Grip Endurance (heavy)',sets:'5×25s',rest:'30s'}]}]},

  // ===== NORDIC COMBINED =====
  {id:'nordiccombined-beg',sport:'nordiccombined',level:'beginner',icon:'🎿',title:'Combined Fundamentals — Beginner',meta:'4x/week · 40 min',featured:true,
   tip:'<strong>You\'re training two very different disciplines — explosive jump power and endurance skiing.</strong> Give each its own dedicated session rather than mixing them every time.',
   days:[
     {label:'JUMP FUNDAMENTALS',exercises:[
       {name:'Explosive Squat Jumps',sets:'4×8',rest:'60s'},{name:'Aerial Position Practice (dryland)',sets:'4×10s',rest:'30s'},
       {name:'Core Bracing Circuit',sets:'3 rounds',rest:'45s'}]},
     {label:'SKI ENDURANCE FUNDAMENTALS',exercises:[
       {name:'Easy Aerobic Effort (ski/run)',sets:'20 min',rest:''},{name:'Technique Drills',sets:'10 min',rest:''}]}]},
  {id:'nordiccombined-int',sport:'nordiccombined',level:'intermediate',icon:'🎿',title:'Combined Conditioning — Intermediate',meta:'5x/week · 50 min',featured:false,
   tip:'<strong>Balance explosive leg power with aerobic capacity.</strong> Neither discipline can be neglected in this sport.',
   days:[
     {label:'EXPLOSIVE POWER',exercises:[
       {name:'Box Jumps',sets:'5×6',rest:'75s'},{name:'Explosive Leg Power Circuit',sets:'4 rounds',rest:'45s'}]},
     {label:'ENDURANCE INTERVALS',exercises:[
       {name:'Interval Ski/Run Effort',sets:'6×4min',rest:'2min'},{name:'Double-Poling Strength Drill',sets:'4×1min',rest:'45s'}]}]},
  {id:'nordiccombined-adv',sport:'nordiccombined',level:'advanced',icon:'🎿',title:'Race Simulation — Advanced',meta:'5-6x/week · 65 min',featured:false,
   tip:'<strong>Simulate the actual event order — jump session, then endurance race pace — when you can.</strong> The fatigue carries over between disciplines.',
   days:[{label:'COMBINED EVENT SIMULATION',exercises:[
     {name:'Max Explosive Jump Practice',sets:'6×6',rest:'90s'},{name:'Race-Pace Ski/Run Effort',sets:'6×5min',rest:'2min'},
     {name:'Double-Poling Power Reps',sets:'5×1min',rest:'60s'},{name:'Cool-down effort',sets:'10 min',rest:''}]}]},

  // ===== SHORT TRACK SPEED SKATING =====
  {id:'shorttrack-beg',sport:'shorttrack',level:'beginner',icon:'⛸️',title:'Skating Stance Fundamentals — Beginner',meta:'3x/week · 30 min',featured:true,
   tip:'<strong>The low skating stance is demanding on your legs even off the ice.</strong> Build the strength to hold it before worrying about speed.',
   days:[{label:'FUNDAMENTALS',exercises:[
     {name:'Low Skating Stance Hold (dryland)',sets:'4×20s',rest:'45s'},{name:'Lateral Bounds',sets:'4×10 each',rest:'45s'},
     {name:'Single-Leg Balance Drills',sets:'4×20s each',rest:'30s'},{name:'Core Stability Circuit',sets:'3 rounds',rest:'45s'}]}]},
  {id:'shorttrack-int',sport:'shorttrack',level:'intermediate',icon:'⛸️',title:'Corner Technique — Intermediate',meta:'3-4x/week · 40 min',featured:false,
   tip:'<strong>Corner technique off the ice means practicing the crossover step pattern and lean angle on dry land.</strong>',
   days:[{label:'CORNER & START WORK',exercises:[
     {name:'Crossover Step Drill (dryland)',sets:'5×20s',rest:'30s'},{name:'Explosive Start Practice',sets:'6×5',rest:'90s'},
     {name:'Lateral Bound Power Reps',sets:'5×10 each',rest:'45s'},{name:'Low Stance Endurance Hold',sets:'5×30s',rest:'45s'}]}]},
  {id:'shorttrack-adv',sport:'shorttrack',level:'advanced',icon:'⛸️',title:'Race-Pace Sprints — Advanced',meta:'4-5x/week · 50 min',featured:false,
   tip:'<strong>Short track is a tactical, explosive sprint sport.</strong> Train max power output combined with the endurance to repeat it.',
   days:[{label:'SPRINT INTERVALS',exercises:[
     {name:'Max Effort Sprint Starts',sets:'8×10m',rest:'2min'},{name:'Lateral Bound Power Circuit',sets:'5 rounds',rest:'45s'},
     {name:'Low Stance Endurance (heavy)',sets:'6×30s',rest:'30s'},{name:'Explosive Core Circuit',sets:'4 rounds',rest:'45s'}]}]},

  // ===== SKELETON =====
  {id:'skeleton-beg',sport:'skeleton',level:'beginner',icon:'🛷',title:'Sprint Start Fundamentals — Beginner',meta:'3x/week · 30 min',featured:true,
   tip:'<strong>Skeleton starts are a flat-out sprint push.</strong> Build raw acceleration power first — everything else builds on this.',
   days:[{label:'FUNDAMENTALS',exercises:[
     {name:'Sprint Starts (dryland)',sets:'6×10m',rest:'90s'},{name:'Core Stability Circuit',sets:'3 rounds',rest:'45s'},
     {name:'Bodyweight Squat',sets:'4×12',rest:'60s'},{name:'Broad Jumps',sets:'4×5',rest:'60s'}]}]},
  {id:'skeleton-int',sport:'skeleton',level:'intermediate',icon:'🛷',title:'Explosive Sprint Power — Intermediate',meta:'4x/week · 40 min',featured:false,
   tip:'<strong>Position holds train the aerodynamic stability you need at high speed.</strong> Core control matters as much as sprint power.',
   days:[{label:'POWER & POSITION',exercises:[
     {name:'Resisted Sprint Starts',sets:'6×10m',rest:'2min'},{name:'Position Hold Practice',sets:'5×20s',rest:'45s'},
     {name:'Broad Jumps',sets:'5×5',rest:'75s'},{name:'Core Endurance Circuit',sets:'4 rounds',rest:'45s'}]}]},
  {id:'skeleton-adv',sport:'skeleton',level:'advanced',icon:'🛷',title:'Max Sprint Power — Advanced',meta:'4-5x/week · 50 min',featured:false,
   tip:'<strong>Every fraction of a second in the start matters at this level.</strong> Max effort, full recovery — quality over volume.',
   days:[{label:'MAX POWER SESSION',exercises:[
     {name:'Max Effort Sprint Starts',sets:'8×10m',rest:'3min'},{name:'Heavy Squat',sets:'5×3',rest:'2min'},
     {name:'Depth Jumps',sets:'5×5',rest:'90s'},{name:'Extended Position Hold',sets:'5×30s',rest:'45s'}]}]},

  // ===== SKI JUMPING =====
  {id:'skijumping-beg',sport:'skijumping',level:'beginner',icon:'🎿',title:'Takeoff Fundamentals — Beginner',meta:'3x/week · 35 min',featured:true,
   tip:'<strong>The takeoff is a single explosive extension of your legs.</strong> Build that specific explosive power off the hill first.',
   days:[{label:'FUNDAMENTALS',exercises:[
     {name:'Explosive Squat Jumps',sets:'4×8',rest:'60s'},{name:'Aerodynamic Position Hold (dryland)',sets:'4×15s',rest:'30s'},
     {name:'Balance Drills',sets:'4×20s',rest:'30s'},{name:'Core Bracing Circuit',sets:'3 rounds',rest:'45s'}]}]},
  {id:'skijumping-int',sport:'skijumping',level:'intermediate',icon:'🎿',title:'Flight Position Power — Intermediate',meta:'3-4x/week · 45 min',featured:false,
   tip:'<strong>Flight position holds train the core and back strength needed to stay stable in the air.</strong>',
   days:[{label:'TAKEOFF & FLIGHT',exercises:[
     {name:'Explosive Takeoff Simulation',sets:'6×6',rest:'75s'},{name:'Flight Position Hold',sets:'5×20s',rest:'45s'},
     {name:'Landing Technique Drill (soft landing)',sets:'6×5',rest:'45s'},{name:'Core Rotation Circuit',sets:'4 rounds',rest:'45s'}]}]},
  {id:'skijumping-adv',sport:'skijumping',level:'advanced',icon:'🎿',title:'Max Takeoff Power — Advanced',meta:'4x/week · 55 min',featured:false,
   tip:'<strong>Max explosive takeoff power combined with a long, stable flight position hold is the whole sport in two movements.</strong> Train both directly.',
   days:[{label:'MAX POWER & POSITION',exercises:[
     {name:'Max Effort Takeoff Simulation',sets:'8×6',rest:'2min'},{name:'Extended Flight Position Hold',sets:'5×30s',rest:'45s'},
     {name:'Explosive Leg Power Circuit',sets:'5 rounds',rest:'45s'},{name:'Landing Absorption Drill',sets:'6×5',rest:'45s'}]}]},

  // ===== SNOWBOARDING =====
  {id:'snowboarding-beg',sport:'snowboarding',level:'beginner',icon:'🏂',title:'Snowboarding Fundamentals — Beginner',meta:'3x/week · 30 min',featured:true,
   tip:'<strong>Balance board or skateboard practice builds the same edge-control feel snowboarding demands.</strong>',
   days:[{label:'FUNDAMENTALS',exercises:[
     {name:'Balance Board Practice',sets:'10 min',rest:''},{name:'Ankle Mobility & Strength Work',sets:'3×15',rest:'30s'},
     {name:'Squat Hold (riding stance)',sets:'4×20s',rest:'30s'},{name:'Core Stability Circuit',sets:'3 rounds',rest:'45s'}]}]},
  {id:'snowboarding-int',sport:'snowboarding',level:'intermediate',icon:'🏂',title:'Spin & Grab Progression — Intermediate',meta:'3-4x/week · 40 min',featured:false,
   tip:'<strong>Trampoline practice (with proper supervision) is a safe way to build the rotation awareness for spins before adding a board.</strong>',
   days:[{label:'TRICK PROGRESSION',exercises:[
     {name:'Trampoline Spin Practice',sets:'10 reps',rest:'60s'},{name:'Ollie Practice (skateboard or balance board)',sets:'15 attempts',rest:''},
     {name:'Explosive Jump Practice',sets:'5×5',rest:'60s'},{name:'Core Rotation Circuit',sets:'4 rounds',rest:'45s'}]}]},
  {id:'snowboarding-adv',sport:'snowboarding',level:'advanced',icon:'🏂',title:'Big Air Power — Advanced',meta:'4x/week · 50 min',featured:false,
   tip:'<strong>Big air tricks demand real explosive leg power plus advanced spatial control.</strong> Build both progressively with proper safety gear — never rush this.',
   days:[{label:'ADVANCED PROGRESSION',exercises:[
     {name:'Trampoline Advanced Rotation Practice',sets:'10 reps',rest:'75s'},{name:'Explosive Leg Power Circuit',sets:'5 rounds',rest:'45s'},
     {name:'Landing Absorption Drill',sets:'5×8',rest:'45s'},{name:'Core & Balance Circuit',sets:'4 rounds',rest:'45s'}]}]},

  // ===== SPEED SKATING =====
  {id:'speedskating-beg',sport:'speedskating',level:'beginner',icon:'⛸️',title:'Skating Stance Fundamentals — Beginner',meta:'3x/week · 30 min',featured:true,
   tip:'<strong>The low speed-skating stance is one of the most demanding positions in sport for your legs.</strong> Build up your hold time gradually.',
   days:[{label:'FUNDAMENTALS',exercises:[
     {name:'Low Skating Stance Hold (dryland)',sets:'4×20s',rest:'45s'},{name:'Lateral Bounds',sets:'4×10 each',rest:'45s'},
     {name:'Bodyweight Squat',sets:'4×15',rest:'45s'},{name:'Core Stability Circuit',sets:'3 rounds',rest:'45s'}]}]},
  {id:'speedskating-int',sport:'speedskating',level:'intermediate',icon:'⛸️',title:'Stride Power — Intermediate',meta:'3-4x/week · 40 min',featured:false,
   tip:'<strong>Explosive lateral push power is what generates speed.</strong> Train the lateral bound pattern directly and often.',
   days:[{label:'STRIDE & POWER',exercises:[
     {name:'Lateral Bound Power Reps',sets:'5×10 each',rest:'60s'},{name:'Low Stance Endurance Hold',sets:'5×30s',rest:'45s'},
     {name:'Interval Sprint Effort (run/cycle)',sets:'6×1min',rest:'90s'},{name:'Core Rotation Circuit',sets:'4 rounds',rest:'45s'}]}]},
  {id:'speedskating-adv',sport:'speedskating',level:'advanced',icon:'⛸️',title:'Race-Pace Power — Advanced',meta:'4-5x/week · 50 min',featured:false,
   tip:'<strong>Race-pace intervals combined with max lateral power output is the core of high-level speed skating training.</strong>',
   days:[{label:'RACE-PACE SESSION',exercises:[
     {name:'Max Lateral Bound Power',sets:'6×10 each',rest:'75s'},{name:'Low Stance Endurance (heavy)',sets:'6×40s',rest:'45s'},
     {name:'Race-Pace Interval Effort',sets:'6×2min',rest:'90s'},{name:'Explosive Core Circuit',sets:'4 rounds',rest:'45s'}]}]},

  // ===== BONUS SPECIALIZATION WORKOUTS (spread across existing sports) =====
  {id:'soccer-setpieces',sport:'soccer',level:'intermediate',icon:'⚽',title:'Set-Piece Specialization',meta:'2x/week · 35 min',featured:false,
   tip:'<strong>Dead-ball situations decide a lot of close games.</strong> Practice them deliberately, not just as an afterthought at the end of training.',
   days:[{label:'SET-PIECE PRACTICE',exercises:[
     {name:'Corner Kick Delivery Practice',sets:'4×8',rest:'45s'},{name:'Free Kick Technique',sets:'4×8',rest:'45s'},
     {name:'Defensive Set-Piece Marking',sets:'5×6',rest:'45s'},{name:'Near-Post Run Timing',sets:'5×6',rest:'45s'}]}]},
  {id:'soccer-position',sport:'soccer',level:'advanced',icon:'⚽',title:'Position-Specific Conditioning',meta:'3x/week · 45 min',featured:false,
   tip:'<strong>A winger and a center-back have completely different repeated-sprint demands.</strong> Train the pattern your position actually requires.',
   days:[{label:'POSITIONAL CONDITIONING',exercises:[
     {name:'Winger Sprint Repeats',sets:'8×30m',rest:'45s'},{name:'Central Midfield Box-to-Box Shuttle',sets:'6×60s',rest:'60s'},
     {name:'Center-Back Recovery Sprint Drill',sets:'6×20m',rest:'45s'},{name:'High-Intensity Positional Rondo',sets:'12 min',rest:''}]}]},

  {id:'basketball-postmoves',sport:'basketball',level:'intermediate',icon:'🏀',title:'Post-Move Fundamentals',meta:'2x/week · 35 min',featured:false,
   tip:'<strong>Footwork decides post moves, not size.</strong> A well-timed drop-step beats brute force every time.',
   days:[{label:'POST PLAY',exercises:[
     {name:'Drop-Step Post Move',sets:'5×8 each side',rest:'45s'},{name:'Up-and-Under Footwork',sets:'5×8',rest:'45s'},
     {name:'Post Entry Pass Timing',sets:'4×10',rest:'45s'},{name:'Rebounding Positioning Drill',sets:'5×8',rest:'45s'}]}]},
  {id:'basketball-transition',sport:'basketball',level:'advanced',icon:'🏀',title:'Transition Offense Conditioning',meta:'3x/week · 45 min',featured:false,
   tip:'<strong>Fast breaks are won in the first three seconds after a rebound.</strong> Train the outlet pass and sprint just as hard as the finish.',
   days:[{label:'TRANSITION TRAINING',exercises:[
     {name:'Fast Break Finishing',sets:'6×6',rest:'45s'},{name:'Outlet Pass Practice',sets:'5×10',rest:'45s'},
     {name:'Transition Sprint Intervals',sets:'8×20s',rest:'30s'},{name:'Full-Court Push Drill',sets:'6 reps',rest:'60s'}]}]},

  {id:'volleyball-servereceive',sport:'volleyball',level:'intermediate',icon:'🏐',title:'Serve Receive Specialization',meta:'2x/week · 35 min',featured:false,
   tip:'<strong>A clean serve receive is what sets up your entire offense.</strong> A shaky first touch means a scrambled set every time.',
   days:[{label:'SERVE RECEIVE',exercises:[
     {name:'Passing Platform Angle Drill',sets:'4×15',rest:'45s'},{name:'Serve Receive Positioning',sets:'5×10',rest:'45s'},
     {name:'Communication & Coverage Drill',sets:'5×2min',rest:'45s'},{name:'Deep Serve Reception Practice',sets:'4×10',rest:'45s'}]}]},
  {id:'volleyball-libero',sport:'volleyball',level:'advanced',icon:'🏐',title:'Libero Defensive Training',meta:'3x/week · 40 min',featured:false,
   tip:'<strong>Great defense is about reading the hitter early, not reacting late.</strong> Watch the shoulder and arm angle before the ball is even hit.',
   days:[{label:'DEFENSIVE SPECIALIZATION',exercises:[
     {name:'Dig Technique Practice',sets:'5×10',rest:'45s'},{name:'Defensive Read Drill',sets:'5×2min',rest:'45s'},
     {name:'Emergency Save Technique',sets:'4×8',rest:'45s'},{name:'Low-to-Ground Recovery Drill',sets:'5×8',rest:'45s'}]}]},

  {id:'tennis-doubles',sport:'tennis',level:'intermediate',icon:'🎾',title:'Doubles Strategy & Positioning',meta:'2x/week · 40 min',featured:false,
   tip:'<strong>Doubles is won at the net, not the baseline.</strong> Communication with your partner matters as much as any individual shot.',
   days:[{label:'DOUBLES PLAY',exercises:[
     {name:'Poaching Practice',sets:'5×8',rest:'45s'},{name:'Net Positioning Drill',sets:'5×2min',rest:'45s'},
     {name:'Serve-and-Volley Combo',sets:'6×6',rest:'45s'},{name:'Communication & Court Coverage',sets:'10 min',rest:''}]}]},
  {id:'tennis-returnofserve',sport:'tennis',level:'advanced',icon:'🎾',title:'Return of Serve Specialization',meta:'3x/week · 45 min',featured:false,
   tip:'<strong>A great return starts before the ball is even struck.</strong> Read the toss and shoulder angle to anticipate placement.',
   days:[{label:'RETURN TRAINING',exercises:[
     {name:'Return Positioning Drill',sets:'5×10',rest:'45s'},{name:'Block Return Practice',sets:'5×10',rest:'45s'},
     {name:'Return-and-Approach Combo',sets:'5×8',rest:'45s'},{name:'Reaction Return Drill',sets:'6×10',rest:'45s'}]}]},

  {id:'golf-wedgeplay',sport:'golf',level:'intermediate',icon:'⛳',title:'Wedge Play Specialization',meta:'2x/week · 40 min',featured:false,
   tip:'<strong>Scoring happens inside 100 yards.</strong> Wedge distance control is one of the highest-value skills you can practice.',
   days:[{label:'WEDGE SPECIALIZATION',exercises:[
     {name:'Distance Wedge Control',sets:'20 shots',rest:''},{name:'Spin Control Practice',sets:'15 shots',rest:''},
     {name:'Flop Shot Practice',sets:'15 shots',rest:''},{name:'Uphill/Downhill Lie Practice',sets:'15 shots',rest:''}]}]},
  {id:'golf-mentalgame',sport:'golf',level:'advanced',icon:'⛳',title:'Course Strategy & Mental Game',meta:'2-3x/week · 45 min',featured:false,
   tip:'<strong>Your pre-shot routine should be identical every time.</strong> Consistency in your mental process is what holds up under pressure.',
   days:[{label:'MENTAL & STRATEGY TRAINING',exercises:[
     {name:'Pre-Shot Routine Practice',sets:'20 reps',rest:''},{name:'Risk-Reward Decision Drill',sets:'9 holes mental rounds',rest:''},
     {name:'Simulated Pressure Rounds',sets:'6 holes',rest:''},{name:'Visualization Practice',sets:'10 min',rest:''}]}]},

  {id:'boxing-southpaw',sport:'boxing',level:'intermediate',icon:'🥊',title:'Southpaw Adaptation Training',meta:'2x/week · 40 min',featured:false,
   tip:'<strong>Fighting the opposite stance changes your angles completely.</strong> Drill it deliberately — most fighters rarely see it in training.',
   days:[{label:'STANCE ADAPTATION',exercises:[
     {name:'Orthodox vs Southpaw Footwork',sets:'5×2min',rest:'45s'},{name:'Lead Hand Control Drill',sets:'5×2min',rest:'45s'},
     {name:'Angle-Cutting Practice',sets:'5×2min',rest:'45s'},{name:'Cross-Guard Adjustment Drill',sets:'4×2min',rest:'45s'}]}]},
  {id:'boxing-ringcutting',sport:'boxing',level:'advanced',icon:'🥊',title:'Ring Cutting & Angles',meta:'3x/week · 50 min',featured:false,
   tip:'<strong>Cutting off the ring is how pressure fighters trap opponents.</strong> It\'s footwork and angles, not just forward pressure.',
   days:[{label:'RING GENERALSHIP',exercises:[
     {name:'Ring Cutting Footwork',sets:'6×2min',rest:'45s'},{name:'Angle Creation Drill',sets:'6×2min',rest:'45s'},
     {name:'Pressure Fighting Practice',sets:'5×3min',rest:'60s'},{name:'Cutting Off the Ring Simulation',sets:'5×2min',rest:'60s'}]}]},

  {id:'wrestling-bottomescapes',sport:'wrestling',level:'intermediate',icon:'🤼',title:'Bottom Position Escapes',meta:'3x/week · 40 min',featured:false,
   tip:'<strong>Escapes are free points if you drill them enough to be instinctive.</strong> Don\'t neglect bottom position just because top feels more dominant.',
   days:[{label:'ESCAPE TRAINING',exercises:[
     {name:'Stand-Up Escape Practice',sets:'6×8',rest:'45s'},{name:'Switch Escape Drill',sets:'6×8',rest:'45s'},
     {name:'Hip Heist Escape',sets:'5×8',rest:'45s'},{name:'Sit-Out Escape Practice',sets:'5×8',rest:'45s'}]}]},
  {id:'wrestling-topcontrol',sport:'wrestling',level:'advanced',icon:'🤼',title:'Top Position Control',meta:'3-4x/week · 45 min',featured:false,
   tip:'<strong>Riding time and control add up over a match.</strong> Heavy hands and constant pressure wear an opponent down.',
   days:[{label:'TOP CONTROL TRAINING',exercises:[
     {name:'Ride Control Practice',sets:'5×2min',rest:'45s'},{name:'Half Nelson Turn Drill',sets:'6×6',rest:'45s'},
     {name:'Tilt & Turn Combinations',sets:'6×6',rest:'45s'},{name:'Pressure & Control Circuit',sets:'4 rounds',rest:'45s'}]}]},

  {id:'judo-newaza',sport:'judo',level:'intermediate',icon:'🥋',title:'Ne-Waza Groundwork Specialization',meta:'2-3x/week · 40 min',featured:false,
   tip:'<strong>Groundwork is its own complete skill set.</strong> Don\'t neglect it just because throws look more impressive.',
   days:[{label:'GROUNDWORK SPECIALIZATION',exercises:[
     {name:'Pin Escape Practice',sets:'6×8',rest:'45s'},{name:'Turnover Technique Drill',sets:'6×6',rest:'45s'},
     {name:'Armlock Setup Practice',sets:'5×6',rest:'45s'},{name:'Groundwork Transition Drill',sets:'5×2min',rest:'45s'}]}]},
  {id:'judo-tachiwaza',sport:'judo',level:'advanced',icon:'🥋',title:'Tachi-Waza Standing Combinations',meta:'3-4x/week · 50 min',featured:false,
   tip:'<strong>Chain your throws together.</strong> A defended first attempt should flow directly into your second option, not reset to neutral.',
   days:[{label:'STANDING COMBINATIONS',exercises:[
     {name:'Combination Throw Chains',sets:'6×6',rest:'60s'},{name:'Counter-Throw Practice',sets:'6×6',rest:'60s'},
     {name:'Grip Break Drill',sets:'5×8',rest:'45s'},{name:'Entry Speed Practice',sets:'6×6',rest:'45s'}]}]},

  {id:'swimming-butterfly',sport:'swimming',level:'intermediate',icon:'🏊',title:'Butterfly Technique Specialization',meta:'2-3x/week · 35 min pool',featured:false,
   tip:'<strong>Butterfly rewards rhythm over raw power.</strong> A smooth undulation beats a muscled, choppy stroke every time.',
   days:[{label:'BUTTERFLY FOCUS',exercises:[
     {name:'Butterfly Pull Drill',sets:'4×50m',rest:'45s'},{name:'Dolphin Kick Practice',sets:'4×50m',rest:'30s'},
     {name:'Butterfly Timing Drill',sets:'4×25m',rest:'30s'},{name:'Butterfly Interval Set',sets:'6×50m',rest:'45s'}]}]},
  {id:'swimming-openwater',sport:'swimming',level:'advanced',icon:'🏊',title:'Open Water Conditioning',meta:'3x/week · 45 min',featured:false,
   tip:'<strong>Sighting takes real practice.</strong> Lifting your eyes without breaking your stroke rhythm is a skill on its own.',
   days:[{label:'OPEN WATER TRAINING',exercises:[
     {name:'Sighting Practice',sets:'6×50m',rest:'30s'},{name:'Open Water Pacing Set',sets:'20 min',rest:''},
     {name:'Drafting Technique Practice',sets:'4×100m',rest:'30s'},{name:'Long Steady Swim',sets:'25 min',rest:''}]}]},

  {id:'climbing-crimp',sport:'climbing',level:'intermediate',icon:'🧗',title:'Crimp Strength Specialization',meta:'2x/week · 30 min',featured:false,
   tip:'<strong>Finger strength training is high-risk, high-reward.</strong> Always fully warmed up first, and never push through joint pain.',
   days:[{label:'FINGER STRENGTH',exercises:[
     {name:'Crimp Hang Practice',sets:'5×7s',rest:'2min'},{name:'Half-Crimp Strength Drill',sets:'5×7s',rest:'2min'},
     {name:'Finger Extensor Work',sets:'3×15',rest:'45s'},{name:'Open-Hand Grip Practice',sets:'5×10s',rest:'90s'}]}]},
  {id:'climbing-overhang',sport:'climbing',level:'advanced',icon:'🧗',title:'Overhang Technique Training',meta:'3x/week · 45 min',featured:false,
   tip:'<strong>Overhangs demand core tension more than raw arm strength.</strong> A loose body on steep terrain burns out your forearms fast.',
   days:[{label:'OVERHANG TRAINING',exercises:[
     {name:'Overhang Body Tension Drill',sets:'5 problems',rest:'2min'},{name:'Heel Hook Practice',sets:'10 attempts',rest:'60s'},
     {name:'Compression Move Drill',sets:'8 attempts',rest:'90s'},{name:'Overhang Power Circuit',sets:'4 rounds',rest:'2min'}]}]},

  {id:'alpineskiing-slalom',sport:'alpineskiing',level:'intermediate',icon:'⛷️',title:'Slalom Turn Specialization',meta:'3x/week · 35 min',featured:false,
   tip:'<strong>Slalom rhythm comes from quick, light edge changes.</strong> Train the fast-twitch pattern, not just leg strength.',
   days:[{label:'SLALOM TRAINING',exercises:[
     {name:'Quick Edge Change Drill',sets:'5×20s',rest:'30s'},{name:'Slalom Rhythm Practice',sets:'5×30s',rest:'45s'},
     {name:'Pole Plant Timing Drill',sets:'4×20s',rest:'30s'},{name:'Short Turn Endurance Circuit',sets:'4 rounds',rest:'45s'}]}]},
  {id:'alpineskiing-downhill',sport:'alpineskiing',level:'advanced',icon:'⛷️',title:'Downhill Tuck Conditioning',meta:'3-4x/week · 45 min',featured:false,
   tip:'<strong>Holding a tuck at speed is a serious core and quad endurance test.</strong> Build the position hold time progressively.',
   days:[{label:'TUCK CONDITIONING',exercises:[
     {name:'Tuck Position Hold (extended)',sets:'5×45s',rest:'45s'},{name:'Aerodynamic Core Hold',sets:'5×30s',rest:'30s'},
     {name:'High-Speed Balance Drill',sets:'5×20s',rest:'30s'},{name:'Tuck Endurance Circuit',sets:'4 rounds',rest:'45s'}]}]},

  {id:'figureskating-spins',sport:'figureskating',level:'intermediate',icon:'⛸️',title:'Spin Technique Specialization',meta:'3x/week · 35 min',featured:false,
   tip:'<strong>Spin speed comes from pulling your limbs in tight, not spinning harder.</strong> Practice the position changes off-ice first.',
   days:[{label:'SPIN SPECIALIZATION',exercises:[
     {name:'Spin Entry Practice',sets:'8 reps',rest:'45s'},{name:'Spin Speed Drill (off-ice)',sets:'8 reps',rest:'45s'},
     {name:'Spin Position Changes',sets:'6 reps',rest:'45s'},{name:'Spotting & Balance Drill',sets:'5×15s',rest:'30s'}]}]},
  {id:'figureskating-footwork',sport:'figureskating',level:'advanced',icon:'⛸️',title:'Footwork Sequence Training',meta:'3-4x/week · 45 min',featured:false,
   tip:'<strong>Footwork sequences need to feel effortless despite being technically dense.</strong> Slow it down until it\'s clean before adding speed.',
   days:[{label:'FOOTWORK TRAINING',exercises:[
     {name:'Footwork Sequence Practice (off-ice)',sets:'8 reps',rest:'60s'},{name:'Edge Change Combinations',sets:'6 reps',rest:'45s'},
     {name:'Rhythm & Musicality Drill',sets:'10 min',rest:''},{name:'Program Footwork Run-Through',sets:'3 reps',rest:'2min'}]}]},

  {id:'gymnastics-beam',sport:'gymnastics',level:'intermediate',icon:'🤸‍♀️',title:'Beam Balance Specialization',meta:'3x/week · 35 min',featured:false,
   tip:'<strong>Balance under fatigue is what separates clean beam routines from shaky ones.</strong> Train it tired, not just fresh.',
   days:[{label:'BEAM TRAINING',exercises:[
     {name:'Low Beam Balance Drill',sets:'8 reps',rest:'45s'},{name:'Beam Walk Practice',sets:'6 reps',rest:'45s'},
     {name:'Beam Turn Practice',sets:'6 reps each direction',rest:'45s'},{name:'Balance Under Fatigue Drill',sets:'5×15s',rest:'30s'}]}]},
  {id:'gymnastics-vault',sport:'gymnastics',level:'advanced',icon:'🤸‍♀️',title:'Vault Approach & Power',meta:'3-4x/week · 45 min',featured:false,
   tip:'<strong>Vault power comes from your sprint approach and board push, not just the flip itself.</strong> Most of the height is decided before you even leave the board.',
   days:[{label:'VAULT TRAINING',exercises:[
     {name:'Sprint Approach Practice',sets:'8 reps',rest:'60s'},{name:'Round-Off Entry Drill',sets:'8 reps',rest:'60s'},
     {name:'Board Push Power Practice',sets:'6 reps',rest:'75s'},{name:'Vault Block Drill',sets:'6 reps',rest:'60s'}]}]},

  {id:'track-sprintstart',sport:'track',level:'intermediate',icon:'🏃',title:'Sprint Start Specialization',meta:'2-3x/week · 30 min',featured:false,
   tip:'<strong>Reaction time and the first three steps decide a sprint race before the halfway point.</strong> Drill the start on its own, not just full sprints.',
   days:[{label:'START TRAINING',exercises:[
     {name:'Block Start Practice',sets:'8 reps',rest:'90s'},{name:'Reaction Start Drill',sets:'8 reps',rest:'90s'},
     {name:'Acceleration Mechanics Drill',sets:'6×20m',rest:'60s'},{name:'First 10 Meters Practice',sets:'6 reps',rest:'60s'}]}]},
  {id:'track-pacing',sport:'track',level:'advanced',icon:'🏃',title:'Distance Pacing Strategy',meta:'3-4x/week · 40 min',featured:false,
   tip:'<strong>A negative split (running the second half faster than the first) is the gold standard of distance pacing.</strong> Practice the discipline to hold back early.',
   days:[{label:'PACING TRAINING',exercises:[
     {name:'Negative Split Practice',sets:'1×2000m',rest:''},{name:'Pacing Rhythm Drill',sets:'6×400m',rest:'90s'},
     {name:'Surge Practice',sets:'5×200m',rest:'2min'},{name:'Finishing Kick Practice',sets:'5×100m',rest:'2min'}]}]},

  {id:'waterpolo-counterattack',sport:'waterpolo',level:'intermediate',icon:'🤽',title:'Counter-Attack Conditioning',meta:'2-3x/week · 40 min pool',featured:false,
   tip:'<strong>Counter-attacks are won with the first few strokes after a turnover.</strong> React immediately, don\'t wait to see what happens.',
   days:[{label:'COUNTER-ATTACK TRAINING',exercises:[
     {name:'Fast Break Swim Sprint',sets:'6×25m',rest:'30s'},{name:'Counter-Attack Positioning Drill',sets:'6 reps',rest:'45s'},
     {name:'Outlet Pass Practice',sets:'5×10',rest:'45s'},{name:'Transition Sprint Set',sets:'6×25m',rest:'30s'}]}]},
  {id:'waterpolo-powerposition',sport:'waterpolo',level:'advanced',icon:'🤽',title:'Power Position Play',meta:'3-4x/week · 50 min pool',featured:false,
   tip:'<strong>Winning the position in front of the goal is a physical battle.</strong> Leg strength and body positioning matter as much as skill here.',
   days:[{label:'POWER POSITION TRAINING',exercises:[
     {name:'Hole-Set Position Practice',sets:'6×30s',rest:'45s'},{name:'Back-In Technique Drill',sets:'5×8',rest:'45s'},
     {name:'Power Position Shooting',sets:'5×8',rest:'45s'},{name:'Physical Positioning Drill',sets:'6×20s',rest:'30s'}]}]},

  {id:'fieldhockey-penaltycorner',sport:'fieldhockey',level:'intermediate',icon:'🏑',title:'Penalty Corner Specialization',meta:'2x/week · 35 min',featured:false,
   tip:'<strong>Penalty corners are practiced set pieces, not improvisation.</strong> Every player has a specific timed role.',
   days:[{label:'PENALTY CORNER TRAINING',exercises:[
     {name:'Penalty Corner Insertion Practice',sets:'8 reps',rest:'45s'},{name:'Trap & Shot Drill',sets:'8 reps',rest:'45s'},
     {name:'Injection Timing Practice',sets:'6 reps',rest:'45s'},{name:'Corner Defense Drill',sets:'6 reps',rest:'45s'}]}]},
  {id:'fieldhockey-aerial',sport:'fieldhockey',level:'advanced',icon:'🏑',title:'Aerial Ball Control',meta:'3x/week · 40 min',featured:false,
   tip:'<strong>Aerial (3D) skills open up passing lanes defenders can\'t reach on the ground.</strong> They take real dedicated practice to control safely.',
   days:[{label:'AERIAL SKILLS',exercises:[
     {name:'Aerial Pass Practice',sets:'8 reps',rest:'45s'},{name:'Aerial Reception Drill',sets:'8 reps',rest:'45s'},
     {name:'3D Skills Practice',sets:'6 reps',rest:'45s'},{name:'High Ball Control Circuit',sets:'4 rounds',rest:'45s'}]}]},

  {id:'handball-sevenmeter',sport:'handball',level:'advanced',icon:'🤾',title:'Seven-Meter Throw Specialization',meta:'2x/week · 30 min',featured:false,
   tip:'<strong>A seven-meter throw is a one-on-one battle with the goalkeeper.</strong> Consistency under pressure is the entire skill.',
   days:[{label:'PENALTY THROW TRAINING',exercises:[
     {name:'Seven-Meter Throw Practice',sets:'20 throws',rest:''},{name:'Goalkeeper Read Drill',sets:'15 throws',rest:''},
     {name:'Placement Accuracy Practice',sets:'15 throws',rest:''},{name:'Pressure Throw Simulation',sets:'10 throws',rest:''}]}]},
  {id:'cycling-sprintfinish',sport:'cycling',level:'advanced',icon:'🚴',title:'Sprint Finish Specialization',meta:'2x/week · 35 min',featured:false,
   tip:'<strong>A bunch sprint is decided by positioning long before the final 200 meters.</strong> Practice the leadout and the jump separately.',
   days:[{label:'SPRINT FINISH TRAINING',exercises:[
     {name:'Leadout Positioning Drill',sets:'6 reps',rest:'2min'},{name:'Sprint Jump Practice',sets:'6×10s',rest:'3min'},
     {name:'Draft Positioning Practice',sets:'20 min',rest:''},{name:'Final Sprint Simulation',sets:'5×15s',rest:'3min'}]}]},

  // ===== WEAPON / DISCIPLINE / EVENT SPECIALIZATIONS =====
  {id:'fencing-foil',sport:'fencing',level:'intermediate',icon:'🤺',title:'Foil Specialization',meta:'2-3x/week · 40 min',featured:false,
   tip:'<strong>Foil is all about right-of-way.</strong> The attacker has priority, so defense means taking that priority back with a clean parry, not just avoiding the blade.',
   days:[{label:'FOIL TRAINING',exercises:[
     {name:'Right-of-Way Attack Drill',sets:'6×8',rest:'45s'},{name:'Parry-Riposte Practice (foil target)',sets:'6×8',rest:'45s'},
     {name:'Point Control Drill (torso target)',sets:'5×10',rest:'45s'},{name:'Distance & Timing for Foil',sets:'5×2min',rest:'45s'}]}]},
  {id:'fencing-epee',sport:'fencing',level:'intermediate',icon:'🤺',title:'Épée Specialization',meta:'2-3x/week · 40 min',featured:false,
   tip:'<strong>There\'s no right-of-way in épée — both fencers can score at once.</strong> Patience and single-lighting your hit matters more than pure speed.',
   days:[{label:'ÉPÉE TRAINING',exercises:[
     {name:'Point-in-Line Practice',sets:'5×10',rest:'45s'},{name:'Counter-Attack Timing Drill',sets:'6×8',rest:'45s'},
     {name:'Whole-Body Target Practice',sets:'5×10',rest:'45s'},{name:'Stop-Hit Practice',sets:'6×8',rest:'45s'}]}]},
  {id:'fencing-sabre',sport:'fencing',level:'intermediate',icon:'🤺',title:'Sabre Specialization',meta:'2-3x/week · 40 min',featured:false,
   tip:'<strong>Sabre is the fastest fencing weapon.</strong> Actions happen in a fraction of a second, so explosive footwork matters even more than in foil or épée.',
   days:[{label:'SABRE TRAINING',exercises:[
     {name:'Cutting Action Practice',sets:'6×8',rest:'45s'},{name:'Explosive Advance-Lunge (sabre pace)',sets:'6×6',rest:'60s'},
     {name:'Preparation & Attack Timing',sets:'5×10',rest:'45s'},{name:'Flèche/Fast Attack Drill',sets:'5×6',rest:'60s'}]}]},

  {id:'wrestling-freestyle',sport:'wrestling',level:'intermediate',icon:'🤼',title:'Freestyle Specialization',meta:'3x/week · 40 min',featured:false,
   tip:'<strong>Freestyle allows leg attacks</strong>, which opens up a completely different set of takedowns than Greco-Roman.',
   days:[{label:'FREESTYLE TRAINING',exercises:[
     {name:'Leg Attack Setup Drill',sets:'6×6',rest:'45s'},{name:'Ankle Pick Practice',sets:'6×6',rest:'45s'},
     {name:'Freestyle Par Terre Turns',sets:'5×2min',rest:'45s'},{name:'Shot Defense (freestyle rules)',sets:'5×8',rest:'45s'}]}]},
  {id:'wrestling-grecoroman',sport:'wrestling',level:'intermediate',icon:'🤼',title:'Greco-Roman Specialization',meta:'3x/week · 40 min',featured:false,
   tip:'<strong>With leg attacks and grabs banned, Greco-Roman is won in the clinch.</strong> Upper body strength and throws decide matches.',
   days:[{label:'GRECO-ROMAN TRAINING',exercises:[
     {name:'Clinch Fighting Practice',sets:'5×2min',rest:'45s'},{name:'Underhook Battle Drill',sets:'6×6',rest:'45s'},
     {name:'Greco Throw Practice (headlock/bodylock)',sets:'6×6',rest:'60s'},{name:'Par Terre Lift Practice',sets:'5×5',rest:'60s'}]}]},

  {id:'archery-recurve',sport:'archery',level:'intermediate',icon:'🏹',title:'Recurve Specialization',meta:'3x/week · 40 min',featured:false,
   tip:'<strong>Recurve is pure form and repeatability.</strong> There\'s no let-off on the draw, so back tension has to hold the full weight through the shot.',
   days:[{label:'RECURVE TRAINING',exercises:[
     {name:'Recurve Draw Hold Practice',sets:'5×10s',rest:'45s'},{name:'Bow Arm Stability Drill',sets:'20 shots',rest:''},
     {name:'Clicker Timing Practice',sets:'20 shots',rest:''},{name:'Recurve Group Tightening',sets:'20 shots',rest:''}]}]},
  {id:'archery-compound',sport:'archery',level:'intermediate',icon:'🏹',title:'Compound Specialization',meta:'3x/week · 40 min',featured:false,
   tip:'<strong>The let-off means you\'re not holding full draw weight at anchor.</strong> That changes your hold time and lets you focus purely on the pin and trigger control.',
   days:[{label:'COMPOUND TRAINING',exercises:[
     {name:'Release Aid Trigger Control',sets:'20 shots',rest:''},{name:'Sight Pin Alignment Drill',sets:'20 shots',rest:''},
     {name:'Compound Hold & Settle Practice',sets:'5×15s',rest:'30s'},{name:'Peep Sight Alignment Drill',sets:'15 shots',rest:''}]}]},

  {id:'shooting-rifle',sport:'shooting',level:'intermediate',icon:'🎯',title:'Rifle Specialization',meta:'2-3x/week · 40 min',featured:false,
   tip:'<strong>Rifle shooting rewards absolute stillness.</strong> Even your heartbeat affects the shot — elite shooters time their trigger pull between heartbeats.',
   days:[{label:'RIFLE TRAINING',exercises:[
     {name:'Prone Position Stability Drill',sets:'15 min',rest:''},{name:'Standing Position Hold',sets:'5×20s',rest:'30s'},
     {name:'Natural Point of Aim Practice',sets:'10 min',rest:''},{name:'Rifle Trigger Control (dry fire)',sets:'20 reps',rest:''}]}]},
  {id:'shooting-pistol',sport:'shooting',level:'intermediate',icon:'🎯',title:'Pistol Specialization',meta:'2-3x/week · 35 min',featured:false,
   tip:'<strong>A pistol has a much shorter sight radius than a rifle.</strong> Tiny hand movements have an outsized effect — grip consistency matters enormously.',
   days:[{label:'PISTOL TRAINING',exercises:[
     {name:'One-Handed Grip Stability Drill',sets:'10 min',rest:''},{name:'Pistol Sight Alignment Practice',sets:'20 shots',rest:''},
     {name:'Rapid-Fire Precision Drill',sets:'15 shots',rest:''},{name:'Follow-Through Practice (pistol)',sets:'20 shots',rest:''}]}]},
  {id:'shooting-shotgun',sport:'shooting',level:'intermediate',icon:'🎯',title:'Shotgun Specialization',meta:'2x/week · 40 min',featured:false,
   tip:'<strong>Shotgun sports track a moving target, not a still aim.</strong> Your swing and lead matter more than a perfect static sight picture.',
   days:[{label:'SHOTGUN TRAINING',exercises:[
     {name:'Target Tracking Drill',sets:'20 clays',rest:''},{name:'Swing-Through Practice',sets:'20 clays',rest:''},
     {name:'Lead & Timing Drill',sets:'15 clays',rest:''},{name:'Mount Consistency Practice',sets:'15 reps',rest:''}]}]},

  {id:'swimming-backstroke',sport:'swimming',level:'intermediate',icon:'🏊',title:'Backstroke Specialization',meta:'2-3x/week · 35 min pool',featured:false,
   tip:'<strong>Backstroke is the only stroke where you can\'t see where you\'re going.</strong> Counting strokes to the wall is a real, trainable skill.',
   days:[{label:'BACKSTROKE FOCUS',exercises:[
     {name:'Backstroke Technique Swim',sets:'4×50m',rest:'45s'},{name:'Backstroke Kick Drill',sets:'4×50m',rest:'30s'},
     {name:'Flip Turn Practice (backstroke)',sets:'8 reps',rest:'30s'},{name:'Stroke Count to Wall Drill',sets:'4×25m',rest:'30s'}]}]},
  {id:'swimming-breaststroke',sport:'swimming',level:'intermediate',icon:'🏊',title:'Breaststroke Specialization',meta:'2-3x/week · 35 min pool',featured:false,
   tip:'<strong>Breaststroke timing is everything</strong> — pull, breathe, kick, glide, in that exact sequence. Rushing the glide is the most common technical fault.',
   days:[{label:'BREASTSTROKE FOCUS',exercises:[
     {name:'Breaststroke Pull Drill',sets:'4×50m',rest:'45s'},{name:'Breaststroke Kick (whip kick) Practice',sets:'4×50m',rest:'30s'},
     {name:'Timing Drill (pull-breathe-kick-glide)',sets:'4×25m',rest:'30s'},{name:'Breaststroke Interval Set',sets:'6×50m',rest:'30s'}]}]},

  {id:'track-sprints',sport:'track',level:'intermediate',icon:'🏃',title:'Sprints Specialization (100m-400m)',meta:'3x/week · 40 min',featured:false,
   tip:'<strong>Sprinting is a skill, not just raw speed.</strong> Technique work pays off as much as pure conditioning at this distance.',
   days:[{label:'SPRINT EVENTS',exercises:[
     {name:'Acceleration Phase Drill',sets:'6×20m',rest:'90s'},{name:'Max Velocity Sprint Practice',sets:'5×40m',rest:'2min'},
     {name:'Sprint Mechanics (arm drive)',sets:'4×20m',rest:'60s'},{name:'Flying 30s',sets:'5×30m',rest:'2min'}]}]},
  {id:'track-distance',sport:'track',level:'intermediate',icon:'🏃',title:'Distance Specialization (800m+)',meta:'4x/week · 45 min',featured:false,
   tip:'<strong>Distance running is won through pacing discipline and a strong aerobic base.</strong> Most beginners go out too fast and pay for it late.',
   days:[{label:'DISTANCE EVENTS',exercises:[
     {name:'Long Steady Run',sets:'30 min',rest:''},{name:'Tempo Run',sets:'20 min',rest:''},
     {name:'Fartlek Training',sets:'20 min',rest:''},{name:'Recovery Jog',sets:'15 min',rest:''}]}]},
  {id:'track-throws',sport:'track',level:'intermediate',icon:'🏃',title:'Throws Specialization (shot/discus/javelin)',meta:'3x/week · 45 min',featured:false,
   tip:'<strong>Throwing events are explosive, technical, full-body movements.</strong> The legs and hips generate most of the power, not just the arm.',
   days:[{label:'THROWING EVENTS',exercises:[
     {name:'Standing Throw Technique Practice',sets:'15 reps',rest:''},{name:'Rotational/Glide Footwork Drill',sets:'10 reps',rest:'60s'},
     {name:'Medicine Ball Rotational Throw',sets:'5×8',rest:'45s'},{name:'Explosive Hip Drive Drill',sets:'5×6',rest:'60s'}]}]},
  {id:'track-jumps',sport:'track',level:'intermediate',icon:'🏃',title:'Jumps Specialization (long/high/triple/vault)',meta:'3x/week · 40 min',featured:false,
   tip:'<strong>Every jump event is decided in the last few steps of the approach.</strong> A consistent, repeatable run-up matters as much as the jump itself.',
   days:[{label:'JUMPING EVENTS',exercises:[
     {name:'Approach Run Consistency Drill',sets:'8 reps',rest:'90s'},{name:'Takeoff Technique Practice',sets:'8 reps',rest:'60s'},
     {name:'Plyometric Bounding',sets:'5×20m',rest:'60s'},{name:'Landing Technique Drill',sets:'6 reps',rest:'45s'}]}]},

  // ===== TEAM SPORT POSITION-SPECIFIC TRAINING =====
  {id:'soccer-goalkeeper',sport:'soccer',level:'intermediate',icon:'⚽',title:'Goalkeeper Training',meta:'3x/week · 40 min',featured:false,
   tip:'<strong>Goalkeeping is a completely different skill set from outfield play.</strong> Footwork, hand positioning, and shot-stopping reflexes need dedicated training.',
   days:[{label:'GOALKEEPER TRAINING',exercises:[
     {name:'Shot-Stopping Reaction Drill',sets:'20 shots',rest:''},{name:'Diving Technique Practice',sets:'10 each side',rest:'45s'},
     {name:'Distribution Practice (throws & goal kicks)',sets:'15 reps',rest:''},{name:'1v1 Save Practice',sets:'10 reps',rest:'45s'}]}]},
  {id:'soccer-defender',sport:'soccer',level:'intermediate',icon:'⚽',title:'Defender Training',meta:'3x/week · 40 min',featured:false,
   tip:'<strong>Defending is about denying space before it\'s about winning the ball.</strong> Good positioning means you rarely need a desperate tackle.',
   days:[{label:'DEFENDER TRAINING',exercises:[
     {name:'Jockeying & Delay Technique',sets:'5×30s',rest:'30s'},{name:'Tackling Timing Drill',sets:'6×6',rest:'45s'},
     {name:'Aerial Duel Practice',sets:'10 reps',rest:'45s'},{name:'Clearance Technique Practice',sets:'10 reps',rest:'30s'}]}]},
  {id:'soccer-midfielder',sport:'soccer',level:'intermediate',icon:'⚽',title:'Midfielder Training',meta:'3x/week · 45 min',featured:false,
   tip:'<strong>Midfielders cover more ground than anyone else on the pitch.</strong> Box-to-box conditioning is just as important as passing range.',
   days:[{label:'MIDFIELDER TRAINING',exercises:[
     {name:'Box-to-Box Shuttle Runs',sets:'6×60s',rest:'45s'},{name:'Passing Range Practice (short & long)',sets:'4×15',rest:'45s'},
     {name:'Turning Under Pressure Drill',sets:'6×8',rest:'45s'},{name:'Vision & Scanning Practice',sets:'10 min',rest:''}]}]},
  {id:'soccer-striker',sport:'soccer',level:'intermediate',icon:'⚽',title:'Striker Training',meta:'3x/week · 40 min',featured:false,
   tip:'<strong>Finishing is a repeatable skill built on thousands of quality reps.</strong> Practice shooting off both feet, not just your strong one.',
   days:[{label:'STRIKER TRAINING',exercises:[
     {name:'Finishing Practice (both feet)',sets:'4×10 shots',rest:'45s'},{name:'Movement in the Box Drill',sets:'8 reps',rest:'45s'},
     {name:'Hold-Up Play Practice',sets:'6 reps',rest:'45s'},{name:'Off-the-Shoulder Timing Run',sets:'8 reps',rest:'30s'}]}]},

  {id:'basketball-guard',sport:'basketball',level:'intermediate',icon:'🏀',title:'Guard Training',meta:'3x/week · 40 min',featured:false,
   tip:'<strong>Guards need elite ball-handling and court vision.</strong> You\'re the one initiating most possessions.',
   days:[{label:'GUARD TRAINING',exercises:[
     {name:'Advanced Ball-Handling Combo',sets:'5×1min',rest:'45s'},{name:'Pick-and-Roll Ball-Handler Practice',sets:'6 reps',rest:'45s'},
     {name:'Court Vision & Passing Drill',sets:'5×10',rest:'45s'},{name:'Full-Speed Change of Direction',sets:'6×15s',rest:'30s'}]}]},
  {id:'basketball-forward',sport:'basketball',level:'intermediate',icon:'🏀',title:'Forward Training',meta:'3x/week · 40 min',featured:false,
   tip:'<strong>Forwards need to be comfortable both facing the basket and with their back to it.</strong> Versatility is the whole position.',
   days:[{label:'FORWARD TRAINING',exercises:[
     {name:'Face-Up Attack Moves',sets:'6×6',rest:'45s'},{name:'Mid-Post Footwork',sets:'5×8',rest:'45s'},
     {name:'Wing Catch-and-Shoot Practice',sets:'4×10',rest:'45s'},{name:'Transition Finishing Drill',sets:'6 reps',rest:'45s'}]}]},
  {id:'basketball-center',sport:'basketball',level:'intermediate',icon:'🏀',title:'Center Training',meta:'3x/week · 40 min',featured:false,
   tip:'<strong>Post play is won with positioning and footwork before the ball even arrives.</strong> Seal your defender early.',
   days:[{label:'CENTER TRAINING',exercises:[
     {name:'Post Sealing Technique',sets:'6×8',rest:'45s'},{name:'Drop-Step & Up-and-Under (advanced)',sets:'5×8',rest:'45s'},
     {name:'Rim Protection Positioning Drill',sets:'5×20s',rest:'30s'},{name:'Screen-Setting Technique',sets:'6×6',rest:'45s'}]}]},

  {id:'volleyball-setter',sport:'volleyball',level:'intermediate',icon:'🏐',title:'Setter Training',meta:'3x/week · 35 min',featured:false,
   tip:'<strong>A setter\'s hands need to be consistent enough that hitters can attack the same way every single time.</strong> That consistency is the whole job.',
   days:[{label:'SETTER TRAINING',exercises:[
     {name:'Setting Consistency Drill',sets:'4×20',rest:'45s'},{name:'Quick-Set Timing Practice',sets:'5×10',rest:'45s'},
     {name:'Back-Set Technique',sets:'4×10',rest:'45s'},{name:'Setter Footwork & Approach',sets:'5×20s',rest:'30s'}]}]},
  {id:'volleyball-outsidehitter',sport:'volleyball',level:'intermediate',icon:'🏐',title:'Outside Hitter Training',meta:'3x/week · 40 min',featured:false,
   tip:'<strong>Outside hitters attack from the trickiest angle on the court.</strong> Approach timing matters as much as arm swing power.',
   days:[{label:'OUTSIDE HITTER TRAINING',exercises:[
     {name:'Approach Timing Drill',sets:'6×5',rest:'45s'},{name:'Cross-Court & Line Attack Practice',sets:'5×8',rest:'45s'},
     {name:'Off-Speed Shot Practice',sets:'4×8',rest:'45s'},{name:'Transition Attack Drill',sets:'6 reps',rest:'45s'}]}]},
  {id:'volleyball-middleblocker',sport:'volleyball',level:'intermediate',icon:'🏐',title:'Middle Blocker Training',meta:'3x/week · 35 min',featured:false,
   tip:'<strong>Middle blockers have the least time to react of anyone on the court.</strong> Footwork to the block has to be automatic.',
   days:[{label:'MIDDLE BLOCKER TRAINING',exercises:[
     {name:'Quick Footwork to Block',sets:'6×20s',rest:'30s'},{name:'Read-Blocking Practice',sets:'5×2min',rest:'45s'},
     {name:'Quick Attack Timing (middle)',sets:'5×8',rest:'45s'},{name:'Block Timing Drill',sets:'6×6',rest:'45s'}]}]},

  {id:'hockey-goalie',sport:'hockey',level:'intermediate',icon:'🏒',title:'Goalie Training',meta:'3x/week · 40 min ice',featured:false,
   tip:'<strong>Goaltending is its own sport within the sport.</strong> Butterfly technique and rebound control are the foundation of everything else.',
   days:[{label:'GOALIE TRAINING',exercises:[
     {name:'Butterfly Technique Drill',sets:'10 reps',rest:'45s'},{name:'Rebound Control Practice',sets:'15 shots',rest:''},
     {name:'Post-to-Post Movement',sets:'6×20s',rest:'30s'},{name:'Angle & Positioning Drill',sets:'10 min',rest:''}]}]},
  {id:'hockey-defenseman',sport:'hockey',level:'intermediate',icon:'🏒',title:'Defenseman Training',meta:'3x/week · 40 min ice',featured:false,
   tip:'<strong>A good defenseman defends with their feet and stick angle first.</strong> Physical contact is the last resort, not the first option.',
   days:[{label:'DEFENSEMAN TRAINING',exercises:[
     {name:'Gap Control Drill',sets:'6×20s',rest:'30s'},{name:'Stick Positioning Practice',sets:'10 min',rest:''},
     {name:'Outlet Pass Practice',sets:'5×10',rest:'45s'},{name:'Defensive Zone Positioning',sets:'10 min',rest:''}]}]},
  {id:'hockey-forward',sport:'hockey',level:'intermediate',icon:'🏒',title:'Forward Training',meta:'3x/week · 40 min ice',featured:false,
   tip:'<strong>Forwards need explosive first steps to separate from defenders.</strong> That quickness matters more than top-end speed.',
   days:[{label:'FORWARD TRAINING',exercises:[
     {name:'Explosive First-Step Drill',sets:'6×10s',rest:'45s'},{name:'Give-and-Go Passing Practice',sets:'6 reps',rest:'45s'},
     {name:'Net-Front Positioning',sets:'10 min',rest:''},{name:'Backchecking Speed Drill',sets:'6×15s',rest:'30s'}]}]},

  {id:'baseball-pitcher',sport:'baseball',level:'intermediate',icon:'⚾',title:'Pitcher Training',meta:'3x/week · 45 min',featured:false,
   tip:'<strong>Pitching mechanics need to repeat exactly the same way every time.</strong> Inconsistency is what causes both wildness and injury.',
   days:[{label:'PITCHER TRAINING',exercises:[
     {name:'Pitching Mechanics Drill',sets:'20 reps',rest:''},{name:'Bullpen Session (mixed pitches)',sets:'25 pitches',rest:'2min'},
     {name:'Pickoff Move Practice',sets:'10 reps',rest:'30s'},{name:'Fielding Position Practice (comebacker)',sets:'10 reps',rest:'30s'}]}]},
  {id:'baseball-catcher',sport:'baseball',level:'intermediate',icon:'⚾',title:'Catcher Training',meta:'3x/week · 40 min',featured:false,
   tip:'<strong>A catcher\'s stance and framing technique directly affect how many borderline pitches get called strikes.</strong> It\'s a real, trainable skill.',
   days:[{label:'CATCHER TRAINING',exercises:[
     {name:'Receiving & Framing Practice',sets:'20 reps',rest:''},{name:'Blocking Balls in the Dirt',sets:'15 reps',rest:'30s'},
     {name:'Pop Time Throwing Drill (to second base)',sets:'10 reps',rest:'45s'},{name:'Catcher\'s Stance Endurance',sets:'5×1min',rest:'45s'}]}]},
  {id:'baseball-infielder',sport:'baseball',level:'intermediate',icon:'⚾',title:'Infielder Training',meta:'3x/week · 40 min',featured:false,
   tip:'<strong>Quick hands and a low center of gravity matter more than raw arm strength</strong> for turning routine plays into outs consistently.',
   days:[{label:'INFIELDER TRAINING',exercises:[
     {name:'Double Play Turn Practice',sets:'5×6',rest:'45s'},{name:'Backhand Fielding Drill',sets:'4×10',rest:'45s'},
     {name:'Short-Hop Fielding Practice',sets:'4×10',rest:'45s'},{name:'Infield-to-Base Throwing Accuracy',sets:'15 reps',rest:''}]}]},
  {id:'baseball-outfielder',sport:'baseball',level:'intermediate',icon:'⚾',title:'Outfielder Training',meta:'3x/week · 40 min',featured:false,
   tip:'<strong>Reading the ball off the bat quickly is what separates elite outfielders.</strong> The jump matters more than raw sprint speed.',
   days:[{label:'OUTFIELDER TRAINING',exercises:[
     {name:'First-Step Reaction Drill',sets:'8 reps',rest:'45s'},{name:'Fly Ball Tracking Practice',sets:'10 reps',rest:'45s'},
     {name:'Outfield Throwing Accuracy (to bases)',sets:'15 reps',rest:''},{name:'Diving Catch Technique',sets:'8 reps',rest:'45s'}]}]},

  {id:'waterpolo-goalkeeper',sport:'waterpolo',level:'intermediate',icon:'🤽',title:'Goalkeeper Training',meta:'3x/week · 40 min pool',featured:false,
   tip:'<strong>Water polo goalkeepers need explosive eggbeater kick just to get high enough out of the water to make saves.</strong> That\'s a distinct conditioning demand.',
   days:[{label:'GOALKEEPER TRAINING',exercises:[
     {name:'Explosive Eggbeater for Height',sets:'6×15s',rest:'30s'},{name:'Shot-Blocking Reaction Drill',sets:'15 shots',rest:''},
     {name:'Goalkeeper Positioning Practice',sets:'10 min',rest:''},{name:'Distribution After Save',sets:'10 reps',rest:'30s'}]}]},
  {id:'waterpolo-fieldplayer',sport:'waterpolo',level:'intermediate',icon:'🤽',title:'Field Player Training',meta:'3x/week · 45 min pool',featured:false,
   tip:'<strong>Field players need constant treading endurance combined with explosive bursts.</strong> The sport never really lets you rest.',
   days:[{label:'FIELD PLAYER TRAINING',exercises:[
     {name:'Treading Endurance Practice',sets:'5×1min',rest:'30s'},{name:'Explosive Sprint Bursts (in water)',sets:'6×15m',rest:'30s'},
     {name:'Passing Under Pressure',sets:'5×10',rest:'45s'},{name:'Positional Awareness Drill',sets:'10 min',rest:''}]}]},

  {id:'handball-goalkeeper',sport:'handball',level:'intermediate',icon:'🤾',title:'Goalkeeper Training',meta:'3x/week · 40 min',featured:false,
   tip:'<strong>Handball goalkeepers face shots from very close range at high speed.</strong> Reaction time training matters more than almost anything else.',
   days:[{label:'GOALKEEPER TRAINING',exercises:[
     {name:'Close-Range Reaction Drill',sets:'20 shots',rest:''},{name:'Angle Positioning Practice',sets:'10 min',rest:''},
     {name:'One-on-One Save Technique',sets:'10 reps',rest:'30s'},{name:'Distribution Practice (fast break starts)',sets:'10 reps',rest:'30s'}]}]},
  {id:'handball-fieldplayer',sport:'handball',level:'intermediate',icon:'🤾',title:'Field Player Training',meta:'3x/week · 40 min',featured:false,
   tip:'<strong>Field players need to combine jump shot power with quick defensive recovery.</strong> The sport is fast in both directions.',
   days:[{label:'FIELD PLAYER TRAINING',exercises:[
     {name:'Jump Shot Power Practice',sets:'5×8',rest:'45s'},{name:'Defensive Recovery Sprint',sets:'6×15s',rest:'30s'},
     {name:'Fast Break Finishing',sets:'6 reps',rest:'45s'},{name:'Screen & Roll Practice',sets:'6 reps',rest:'45s'}]}]},

  {id:'rugby-forward-position',sport:'rugby',level:'intermediate',icon:'🏉',title:'Forward Position Training',meta:'3x/week · 45 min',featured:false,
   tip:'<strong>Forwards win the physical battle at the breakdown and set pieces.</strong> Raw strength and contact conditioning matter enormously here.',
   days:[{label:'FORWARD TRAINING',exercises:[
     {name:'Scrummaging Technique Practice',sets:'6×10s',rest:'45s'},{name:'Lineout Jumping & Lifting',sets:'8 reps',rest:'45s'},
     {name:'Ruck Clearing Technique',sets:'6×6',rest:'45s'},{name:'Contact Conditioning (forward-specific)',sets:'5 rounds',rest:'45s'}]}]},
  {id:'rugby-back-position',sport:'rugby',level:'intermediate',icon:'🏉',title:'Back Position Training',meta:'3x/week · 40 min',featured:false,
   tip:'<strong>Backs need explosive speed and evasive footwork to finish what the forwards set up.</strong> Space and timing are everything.',
   days:[{label:'BACK TRAINING',exercises:[
     {name:'Evasive Footwork Drill',sets:'6×15s',rest:'30s'},{name:'Explosive Acceleration Practice',sets:'6×20m',rest:'60s'},
     {name:'Support Line Running',sets:'8 reps',rest:'45s'},{name:'Finishing Under Pressure',sets:'6 reps',rest:'45s'}]}]},
];