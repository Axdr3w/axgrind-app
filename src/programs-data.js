// Multi-week progressive programs — a different shape from single-session
// WORKOUTS/SPORTS_WORKOUTS: `weeks` (grouped into phases) instead of `days`.
// openWorkout() in plans.js checks for `isProgram` to render this shape.

export const PROGRAM_WORKOUTS = [
  // ===== RECOVERY =====
  {id:'program-recovery',program:'recovery',level:'beginner',icon:'🔄',title:'Recovery — 3-Week Program',meta:'3 weeks · 4-5x/week · 15-20 min',featured:true,isProgram:true,
   tip:'<strong>Recovery is where the actual adaptation happens, not the workout itself.</strong> Skipping this is why plateaus and nagging injuries show up.',
   weeks:[
     {label:'WEEK 1 · ACTIVE RECOVERY FOUNDATIONS',note:'Recovery isn\'t doing nothing — it\'s deliberately easy movement and a few simple habits that speed up how fast your body repairs itself.',
      days:[
        {label:'DAY 1 — FOAM ROLLING & LIGHT MOBILITY',exercises:[
          {name:'Foam Roll Quads & Hamstrings',sets:'2 min each',rest:''},{name:'Foam Roll Upper Back & Lats',sets:'2 min each',rest:''},
          {name:'Cat-Cow',sets:'2×10',rest:'15s'},{name:"Child's Pose",sets:'1 min',rest:''},
          {name:'Box Breathing (4-4-4-4)',sets:'5 rounds',rest:''}]},
        {label:'DAY 2 — ACTIVE RECOVERY CARDIO',exercises:[
          {name:'Easy Walk or Bike (conversational pace)',sets:'20 min',rest:''},{name:'Standing Forward Fold',sets:'3×30s',rest:'15s'},
          {name:'Hip Circles',sets:'2×10 each direction',rest:'15s'},{name:'Diaphragmatic Breathing',sets:'5 min',rest:''}]}]},
     {label:'WEEKS 2-3 · FULL RECOVERY PROTOCOL',note:'Layer in temperature-based recovery and a real wind-down routine now that the basics are automatic — these compound with everything else you\'re doing.',
      days:[
        {label:'DAY 1 — SELF-MYOFASCIAL RELEASE & CONTRAST THERAPY',exercises:[
          {name:'Foam Roll Full Body',sets:'8 min',rest:''},{name:'Lacrosse Ball Glute/Piriformis Release',sets:'2 min each side',rest:''},
          {name:'Contrast Shower (hot 60s / cold 30s)',sets:'3 rounds',rest:''},{name:'Deep Diaphragmatic Breathing',sets:'5 min',rest:''}]},
        {label:'DAY 2 — MOBILITY FLOW & SLEEP WIND-DOWN',exercises:[
          {name:'Full Body Mobility Flow',sets:'12 min',rest:''},{name:'90/90 Hip Stretch',sets:'2×30s each side',rest:'20s'},
          {name:'Legs-Up-The-Wall',sets:'5 min',rest:''},{name:'Screen-Free Wind-Down Routine',sets:'15 min',rest:''}]}]},
   ]},

  // ===== DEEP BREATHING & STRESS RELIEF =====
  {id:'program-breathing',program:'breathing',level:'beginner',icon:'🌬️',title:'Deep Breathing & Stress Relief — 2-Week Program',meta:'2 weeks · daily · 10 min',featured:true,isProgram:true,
   tip:'<strong>Breathwork won\'t remove the source of your stress, but it can measurably calm your nervous system in minutes.</strong> If stress or anxiety feels unmanageable, talk to a doctor or mental health professional.',
   weeks:[
     {label:'WEEK 1 · FOUNDATIONAL TECHNIQUES',note:'Learn the core patterns this week — slow and deliberate matters more than getting them perfect. Sit or lie down somewhere quiet if you can.',
      days:[
        {label:'DAY 1 — DIAPHRAGMATIC BREATHING BASICS',exercises:[
          {name:'Diaphragmatic Breathing (hand on belly)',sets:'5 min',rest:''},{name:'Box Breathing (4-4-4-4)',sets:'5 rounds',rest:''},
          {name:'Extended Exhale Breathing (4 in, 8 out)',sets:'2 min',rest:''},{name:'Body Scan (lying down)',sets:'5 min',rest:''}]},
        {label:'DAY 2 — CALMING TECHNIQUES',exercises:[
          {name:'4-7-8 Breathing',sets:'4 rounds',rest:''},{name:'Diaphragmatic Breathing',sets:'5 min',rest:''},
          {name:'Progressive Muscle Relaxation',sets:'8 min',rest:''},{name:'Mindful Body Scan',sets:'5 min',rest:''}]}]},
     {label:'WEEK 2 · BUILDING A DAILY PRACTICE',note:'The real benefit of breathwork comes from repetition, not intensity — these are meant to bookend your day, not replace it.',
      days:[
        {label:'DAY 1 — MORNING RESET',exercises:[
          {name:'Box Breathing (4-4-4-4)',sets:'8 rounds',rest:''},{name:'Diaphragmatic Breathing',sets:'5 min',rest:''},
          {name:'Extended Exhale Breathing',sets:'3 min',rest:''},{name:'Gratitude Reflection (3 things)',sets:'2 min',rest:''}]},
        {label:'DAY 2 — EVENING WIND-DOWN',exercises:[
          {name:'4-7-8 Breathing',sets:'6 rounds',rest:''},{name:'Progressive Muscle Relaxation',sets:'10 min',rest:''},
          {name:'Diaphragmatic Breathing',sets:'5 min',rest:''},{name:'Screen-Free Wind-Down',sets:'10 min',rest:''}]}]},
   ]},

  // ===== KNEE PAIN RELIEF =====
  {id:'program-kneepain',program:'kneepain',level:'beginner',icon:'🦵',title:'Knee Pain Relief — 3-Week Program',meta:'3 weeks · 3-4x/week · 15-20 min',featured:true,isProgram:true,
   tip:'<strong>This is general strengthening and mobility work, not a diagnosis or treatment for a specific injury.</strong> Stop and see a doctor or physical therapist if pain is sharp, sudden, or getting worse.',
   weeks:[
     {label:'WEEK 1 · GENTLE ACTIVATION',note:'Most knee pain responds well to stronger glutes and quads, not more rest. Stay in a pain-free range this week — mild awareness is fine, sharp pain is not.',
      days:[
        {label:'DAY 1 — QUAD & GLUTE ACTIVATION',exercises:[
          {name:'Quad Sets (isometric)',sets:'3×10s',rest:'20s'},{name:'Glute Bridge',sets:'3×12',rest:'30s'},
          {name:'Straight Leg Raise',sets:'3×10 each side',rest:'20s'},{name:'Seated Knee Extension (pain-free range)',sets:'3×12',rest:'20s'}]},
        {label:'DAY 2 — HIP STRENGTH FOR KNEE SUPPORT',exercises:[
          {name:'Clamshells',sets:'3×15 each side',rest:'20s'},{name:'Standing Hip Abduction',sets:'3×12 each side',rest:'20s'},
          {name:'Calf Raises',sets:'3×15',rest:'20s'},{name:'Wall Sit (pain-free range only)',sets:'3×15s',rest:'30s'}]}]},
     {label:'WEEKS 2-3 · PROGRESSIVE STRENGTHENING',note:'Add light load and range now that the basics feel stable — but if a specific movement causes sharp pain, drop back to Week 1\'s version instead of pushing through it.',
      days:[
        {label:'DAY 1 — CONTROLLED LOADING',exercises:[
          {name:'Mini Band Lateral Walks',sets:'3×10 each direction',rest:'30s'},{name:'Bodyweight Squat (partial range, pain-free)',sets:'3×10',rest:'30s'},
          {name:'Single-Leg Glute Bridge',sets:'3×10 each side',rest:'30s'},{name:'Wall Sit',sets:'3×20s',rest:'30s'}]},
        {label:'DAY 2 — STEP CONTROL & MOBILITY',exercises:[
          {name:'Step-Ups (low step)',sets:'3×8 each side',rest:'30s'},{name:'Step-Downs (low step, controlled)',sets:'3×8 each side',rest:'30s'},
          {name:'Clamshells',sets:'3×15 each side',rest:'20s'},{name:'Foam Roll Quads & IT Band',sets:'2 min each side',rest:''}]}]},
   ]},

  // ===== LOWER BACK PAIN RELIEF =====
  {id:'program-backpain',program:'backpain',level:'beginner',icon:'🩹',title:'Lower Back Pain Relief — 3-Week Program',meta:'3 weeks · 4x/week · 15-20 min',featured:true,isProgram:true,
   tip:'<strong>Gentle movement usually helps ordinary lower back pain more than bed rest does.</strong> This isn\'t a treatment for a diagnosed injury — see a doctor if you have numbness, tingling, or pain that radiates down a leg.',
   weeks:[
     {label:'WEEK 1 · GENTLE MOBILITY & CORE ACTIVATION',note:'The goal this week is pain-free movement and waking up the deep core muscles that support your spine — not intensity.',
      days:[
        {label:'DAY 1 — SPINE MOBILITY',exercises:[
          {name:'Cat-Cow',sets:'2×10',rest:'15s'},{name:"Child's Pose",sets:'1 min',rest:''},
          {name:'Pelvic Tilts',sets:'2×12',rest:'15s'},{name:'Knee-to-Chest Stretch',sets:'2×20s each side',rest:'15s'}]},
        {label:'DAY 2 — CORE ACTIVATION',exercises:[
          {name:'Dead Bug',sets:'3×8 each side',rest:'30s'},{name:'Bird Dog',sets:'3×8 each side',rest:'30s'},
          {name:'Glute Bridge',sets:'3×12',rest:'30s'},{name:'Diaphragmatic Breathing',sets:'5 min',rest:''}]}]},
     {label:'WEEKS 2-3 · BUILDING SUPPORT',note:'A strong, stable core is what actually protects your lower back day to day — these build that without ever putting your spine under heavy load.',
      days:[
        {label:'DAY 1 — CORE & GLUTE STRENGTH',exercises:[
          {name:'Bird Dog',sets:'3×10 each side',rest:'30s'},{name:'Dead Bug',sets:'3×10 each side',rest:'30s'},
          {name:'Glute Bridge (2s hold at top)',sets:'3×15',rest:'30s'},{name:'Side Plank (knees down if needed)',sets:'3×15s each side',rest:'30s'}]},
        {label:'DAY 2 — MOBILITY & POSTURE',exercises:[
          {name:'Cat-Cow',sets:'2×10',rest:'15s'},{name:'Standing Hip Flexor Stretch',sets:'2×30s each side',rest:'20s'},
          {name:'Thoracic Spine Rotation',sets:'2×10 each side',rest:'20s'},{name:'Walking (easy pace)',sets:'15 min',rest:''}]}]},
   ]},

  // ===== SHOULDER PAIN RELIEF =====
  {id:'program-shoulderpain',program:'shoulderpain',level:'beginner',icon:'🦾',title:'Shoulder Pain Relief — 3-Week Program',meta:'3 weeks · 3-4x/week · 15 min',featured:true,isProgram:true,
   tip:'<strong>Most shoulder pain improves with better scapular control and gradual loading, not complete rest.</strong> See a doctor if you have significant weakness, numbness, or can\'t lift your arm.',
   weeks:[
     {label:'WEEK 1 · PAIN-FREE RANGE & ACTIVATION',note:'Keep every movement inside a pain-free range this week — a little awareness of the shoulder is fine, sharp or pinching pain means back off.',
      days:[
        {label:'DAY 1 — SCAPULAR ACTIVATION',exercises:[
          {name:'Scapular Squeezes',sets:'3×12',rest:'20s'},{name:'Band Pull-Apart',sets:'3×15',rest:'20s'},
          {name:'Pendulum Swings',sets:'2×30s',rest:'15s'},{name:'Wall Slides',sets:'3×10',rest:'20s'}]},
        {label:'DAY 2 — GENTLE MOBILITY',exercises:[
          {name:'Arm Circles',sets:'2×30s each direction',rest:'15s'},{name:'Cross-Body Shoulder Stretch',sets:'2×20s each side',rest:'15s'},
          {name:'External Rotation (light band)',sets:'3×12',rest:'20s'},{name:'Doorway Chest Stretch',sets:'2×20s',rest:'15s'}]}]},
     {label:'WEEKS 2-3 · ROTATOR CUFF & CONTROL',note:'Rotator cuff strength is what actually stabilizes the joint — these build it gradually so the shoulder can handle more load without irritation.',
      days:[
        {label:'DAY 1 — ROTATOR CUFF STRENGTH',exercises:[
          {name:'External Rotation (light band)',sets:'3×15',rest:'30s'},{name:'Internal Rotation (light band)',sets:'3×15',rest:'30s'},
          {name:'Band Pull-Apart',sets:'3×15',rest:'20s'},{name:'Wall Slides',sets:'3×12',rest:'20s'}]},
        {label:'DAY 2 — CONTROLLED LOADING',exercises:[
          {name:'Scapular Push-Up',sets:'3×10',rest:'30s'},{name:'Prone Y-Raise (light or no weight)',sets:'3×12',rest:'30s'},
          {name:'Pendulum Swings',sets:'2×30s',rest:'15s'},{name:'Cross-Body Shoulder Stretch',sets:'2×20s each side',rest:'15s'}]}]},
   ]},

  // ===== NECK PAIN RELIEF =====
  {id:'program-neckpain',program:'neckpain',level:'beginner',icon:'🧣',title:'Neck Pain Relief — 2-Week Program',meta:'2 weeks · daily · 10 min',featured:true,isProgram:true,
   tip:'<strong>Most neck tightness comes from posture and stress, not structural damage.</strong> See a doctor if pain follows an injury, or you have numbness or tingling down an arm.',
   weeks:[
     {label:'WEEK 1 · GENTLE MOBILITY & POSTURE',note:'Move slowly and stay pain-free — neck stretches should feel like relief, not a fight.',
      days:[
        {label:'DAY 1 — MOBILITY',exercises:[
          {name:'Chin Tucks',sets:'3×10',rest:'15s'},{name:'Neck Rotation (slow)',sets:'2×10 each direction',rest:'15s'},
          {name:'Upper Trap Stretch',sets:'2×20s each side',rest:'15s'},{name:'Shoulder Rolls',sets:'2×10',rest:'15s'}]},
        {label:'DAY 2 — POSTURE RESET',exercises:[
          {name:'Chin Tucks',sets:'3×10',rest:'15s'},{name:'Wall Angels',sets:'2×10',rest:'20s'},
          {name:'Levator Scapulae Stretch',sets:'2×20s each side',rest:'15s'},{name:'Doorway Chest Stretch',sets:'2×20s',rest:'15s'}]}]},
     {label:'WEEK 2 · BUILDING NECK ENDURANCE',note:'A small amount of isometric strength goes a long way for a neck that gets sore from long hours at a desk.',
      days:[
        {label:'DAY 1 — ISOMETRIC STRENGTH',exercises:[
          {name:'Chin Tucks',sets:'3×10',rest:'15s'},{name:'Isometric Neck Press (front/back/sides, gentle)',sets:'3×8s each direction',rest:'20s'},
          {name:'Upper Trap Stretch',sets:'2×20s each side',rest:'15s'},{name:'Wall Angels',sets:'2×12',rest:'20s'}]},
        {label:'DAY 2 — MOBILITY & RESET',exercises:[
          {name:'Neck Rotation (slow)',sets:'2×10 each direction',rest:'15s'},{name:'Chin Tucks',sets:'3×10',rest:'15s'},
          {name:'Levator Scapulae Stretch',sets:'2×20s each side',rest:'15s'},{name:'Shoulder Rolls',sets:'2×10',rest:'15s'}]}]},
   ]},

  // ===== HIP PAIN RELIEF =====
  {id:'program-hippain',program:'hippain',level:'beginner',icon:'🦴',title:'Hip Pain Relief — 3-Week Program',meta:'3 weeks · 3-4x/week · 15-20 min',featured:true,isProgram:true,
   tip:'<strong>Hip pain often comes from weak glutes or tight hip flexors from sitting, not a structural problem.</strong> See a doctor if pain is sudden, severe, or follows a fall or impact.',
   weeks:[
     {label:'WEEK 1 · MOBILITY & ACTIVATION',note:'Loosen up tight hip flexors first, then wake up the glutes — most desk-bound hip pain is a combination of both.',
      days:[
        {label:'DAY 1 — MOBILITY',exercises:[
          {name:'Hip Circles',sets:'2×10 each direction',rest:'15s'},{name:'Kneeling Hip Flexor Stretch',sets:'2×30s each side',rest:'20s'},
          {name:'90/90 Hip Stretch',sets:'2×30s each side',rest:'20s'},{name:'Pigeon Pose',sets:'2×30s each side',rest:'20s'}]},
        {label:'DAY 2 — GLUTE ACTIVATION',exercises:[
          {name:'Glute Bridge',sets:'3×12',rest:'30s'},{name:'Clamshells',sets:'3×15 each side',rest:'20s'},
          {name:'Standing Hip Abduction',sets:'3×12 each side',rest:'20s'},{name:'Fire Hydrants',sets:'3×10 each side',rest:'20s'}]}]},
     {label:'WEEKS 2-3 · STRENGTH & CONTROL',note:'Stronger glutes take pressure off the hip joint itself — these build that strength while keeping the joint moving through a full, comfortable range.',
      days:[
        {label:'DAY 1 — GLUTE STRENGTH',exercises:[
          {name:'Single-Leg Glute Bridge',sets:'3×10 each side',rest:'30s'},{name:'Mini Band Lateral Walks',sets:'3×10 each direction',rest:'30s'},
          {name:'Fire Hydrants',sets:'3×12 each side',rest:'20s'},{name:'Clamshells',sets:'3×15 each side',rest:'20s'}]},
        {label:'DAY 2 — MOBILITY & LOADED MOVEMENT',exercises:[
          {name:'Kneeling Hip Flexor Stretch',sets:'2×30s each side',rest:'20s'},{name:'Bodyweight Squat (comfortable range)',sets:'3×12',rest:'30s'},
          {name:'Step-Ups (low step)',sets:'3×10 each side',rest:'30s'},{name:'90/90 Hip Stretch',sets:'2×30s each side',rest:'20s'}]}]},
   ]},

  // ===== WRIST & ELBOW PAIN RELIEF =====
  {id:'program-wristpain',program:'wristpain',level:'beginner',icon:'✋',title:'Wrist & Elbow Pain Relief — 2-Week Program',meta:'2 weeks · daily · 10 min',featured:true,isProgram:true,
   tip:'<strong>Most wrist and elbow soreness comes from overuse — typing, lifting, or repetitive grip work.</strong> See a doctor if you notice swelling, numbness, or pain that doesn\'t ease with rest.',
   weeks:[
     {label:'WEEK 1 · GENTLE MOBILITY',note:'Keep everything pain-free and slow this week — the goal is restoring comfortable range of motion, not stretching aggressively.',
      days:[
        {label:'DAY 1 — WRIST MOBILITY',exercises:[
          {name:'Wrist Circles',sets:'2×10 each direction',rest:'15s'},{name:'Wrist Flexor Stretch',sets:'2×20s each side',rest:'15s'},
          {name:'Wrist Extensor Stretch',sets:'2×20s each side',rest:'15s'},{name:'Fist to Fan Stretch',sets:'2×10',rest:'15s'}]},
        {label:'DAY 2 — ELBOW MOBILITY',exercises:[
          {name:'Elbow Flexion/Extension',sets:'2×12',rest:'15s'},{name:'Forearm Pronation/Supination',sets:'2×12',rest:'15s'},
          {name:'Wrist Flexor Stretch',sets:'2×20s each side',rest:'15s'},{name:'Wrist Extensor Stretch',sets:'2×20s each side',rest:'15s'}]}]},
     {label:'WEEK 2 · GRIP & TENDON STRENGTH',note:'Light, controlled strengthening builds tendon resilience — the goal is a little productive load, never pain.',
      days:[
        {label:'DAY 1 — GRIP STRENGTH',exercises:[
          {name:'Wrist Curls (light weight or no weight)',sets:'3×12',rest:'20s'},{name:'Reverse Wrist Curls',sets:'3×12',rest:'20s'},
          {name:'Grip Squeezes (soft ball)',sets:'3×15',rest:'20s'},{name:'Wrist Circles',sets:'2×10 each direction',rest:'15s'}]},
        {label:'DAY 2 — ECCENTRIC LOADING',exercises:[
          {name:'Eccentric Wrist Extension (slow lower)',sets:'3×10',rest:'30s'},{name:'Eccentric Wrist Flexion (slow lower)',sets:'3×10',rest:'30s'},
          {name:'Forearm Pronation/Supination',sets:'2×12',rest:'15s'},{name:'Wrist Flexor & Extensor Stretch',sets:'2×20s each',rest:'15s'}]}]},
   ]},

  // ===== ANKLE PAIN RELIEF =====
  {id:'program-anklepain',program:'anklepain',level:'beginner',icon:'🦶',title:'Ankle Pain Relief — 2-Week Program',meta:'2 weeks · daily · 10-15 min',featured:true,isProgram:true,
   tip:'<strong>Most ankle soreness comes from weak stabilizers or lingering stiffness after a sprain, not a structural problem.</strong> See a doctor if there\'s significant swelling, bruising, or you can\'t bear weight on it.',
   weeks:[
     {label:'WEEK 1 · GENTLE MOBILITY & ACTIVATION',note:'Restore comfortable range of motion first — everything should stay pain-free this week, mild stiffness awareness is fine.',
      days:[
        {label:'DAY 1 — ANKLE MOBILITY',exercises:[
          {name:'Ankle Circles',sets:'2×10 each direction',rest:'15s'},{name:'Ankle Alphabet (trace letters with foot)',sets:'1 round',rest:''},
          {name:'Calf Stretch (wall lean)',sets:'2×20s each side',rest:'15s'},{name:'Towel Scrunches (toe curls)',sets:'2×15',rest:'15s'}]},
        {label:'DAY 2 — ACTIVATION & BALANCE',exercises:[
          {name:'Single-Leg Balance (pain-free)',sets:'3×20s each side',rest:'20s'},{name:'Ankle Dorsiflexion (light band)',sets:'3×12',rest:'20s'},
          {name:'Ankle Eversion/Inversion (light band)',sets:'3×12 each direction',rest:'20s'},{name:'Calf Raises (both feet)',sets:'3×12',rest:'20s'}]}]},
     {label:'WEEK 2 · BALANCE & PROGRESSIVE STRENGTH',note:'Balance work retrains the tiny stabilizer muscles that usually cause repeat ankle trouble — don\'t skip it even though it looks easy.',
      days:[
        {label:'DAY 1 — BALANCE & STABILITY',exercises:[
          {name:'Single-Leg Balance (eyes closed if stable)',sets:'3×20s each side',rest:'20s'},{name:'Single-Leg Calf Raise',sets:'3×10 each side',rest:'30s'},
          {name:'Lateral Band Walks',sets:'3×10 each direction',rest:'30s'},{name:'Ankle Circles',sets:'2×10 each direction',rest:'15s'}]},
        {label:'DAY 2 — LOADED MOVEMENT',exercises:[
          {name:'Heel-to-Toe Walk',sets:'3×10 steps',rest:'20s'},{name:'Calf Raises (single leg progression)',sets:'3×12 each side',rest:'30s'},
          {name:'Step-Downs (low step, controlled)',sets:'3×8 each side',rest:'30s'},{name:'Calf Stretch (wall lean)',sets:'2×20s each side',rest:'15s'}]}]},
   ]},

  // ===== FAT LOSS =====
  {id:'program-fatloss',program:'fatloss',level:'beginner',icon:'🔥',title:'Fat Loss — 6-Week Program',meta:'6 weeks · 4-5x/week · 30-40 min',featured:true,isProgram:true,
   tip:'<strong>You can\'t out-train a bad diet, but this builds the calorie-burning engine.</strong> Pair this with the Nutrition tab\'s calorie calculator for real results.',
   weeks:[
     {label:'WEEKS 1-2 · FOUNDATION',note:'Build the habit and base conditioning before intensity ramps up. Consistency matters more than intensity right now.',
      days:[
        {label:'DAY 1 — FULL BODY CIRCUIT (repeat 3 rounds)',exercises:[
          {name:'Jumping Jacks',sets:'45s',rest:'15s'},{name:'Bodyweight Squat',sets:'15 reps',rest:'15s'},
          {name:'Push-Ups',sets:'10 reps',rest:'15s'},{name:'Bodyweight Row (table)',sets:'10 reps',rest:'15s'},
          {name:'Plank Hold',sets:'30s',rest:'30s (end of round)'}]},
        {label:'DAY 2 — STEADY CARDIO',exercises:[
          {name:'Brisk Walk or Easy Jog',sets:'25 min',rest:''},{name:'Mountain Climbers',sets:'3×30s',rest:'30s'},
          {name:'Bicycle Crunches',sets:'3×20',rest:'20s'},{name:'Cool-down stretch',sets:'5 min',rest:''}]}]},
     {label:'WEEKS 3-4 · BUILD',note:'Intensity increases — HIIT gets introduced alongside the circuits. Expect these to feel noticeably harder than weeks 1-2.',
      days:[
        {label:'DAY 1 — HIIT CIRCUIT (repeat 4 rounds)',exercises:[
          {name:'Burpees',sets:'30s',rest:'15s'},{name:'Jump Squats',sets:'30s',rest:'15s'},
          {name:'Mountain Climbers',sets:'30s',rest:'15s'},{name:'Push-Ups',sets:'30s',rest:'30s (end of round)'}]},
        {label:'DAY 2 — FULL BODY STRENGTH CIRCUIT (repeat 4 rounds)',exercises:[
          {name:'Reverse Lunges',sets:'12 each',rest:'20s'},{name:'Diamond Push-Ups',sets:'10 reps',rest:'20s'},
          {name:'Glute Bridge',sets:'20 reps',rest:'20s'},{name:'Plank to Push-Up',sets:'10 reps',rest:'30s (end of round)'}]}]},
     {label:'WEEKS 5-6 · PEAK',note:'Peak intensity. These sessions should genuinely challenge you — that\'s the point this close to the end of the program.',
      days:[
        {label:'DAY 1 — METABOLIC FINISHER (repeat 5 rounds)',exercises:[
          {name:'Burpee with Push-Up',sets:'30s',rest:'10s'},{name:'Jump Lunges',sets:'30s',rest:'10s'},
          {name:'Tuck Jumps',sets:'30s',rest:'10s'},{name:'Mountain Climbers',sets:'30s',rest:'30s (end of round)'}]},
        {label:'DAY 2 — SPRINT INTERVALS',exercises:[
          {name:'Sprint in place (max speed)',sets:'30s',rest:'30s'},{name:'High Knees',sets:'30s',rest:'30s'},
          {name:'Jump Squats',sets:'30s',rest:'30s'},{name:'Cool-down walk',sets:'5 min',rest:''}]}]},
   ]},

  // ===== MOBILITY & FLEXIBILITY =====
  {id:'program-mobility',program:'mobility',level:'beginner',icon:'🧘‍♂️',title:'Mobility & Flexibility — 4-Week Program',meta:'4 weeks · 4x/week · 20 min',featured:true,isProgram:true,
   tip:'<strong>Mobility work pays off everywhere else.</strong> Better hip and shoulder range of motion makes every other workout in this app safer and more effective.',
   weeks:[
     {label:'WEEKS 1-2 · FOUNDATION MOBILITY',note:'Focus on your major joints — hips, shoulders, spine, and ankles. Move slow and controlled, never bounce into a stretch.',
      days:[
        {label:'DAY 1 — HIPS & ANKLES',exercises:[
          {name:'Hip Circles',sets:'2×10 each direction',rest:'20s'},{name:'Deep Squat Hold',sets:'3×30s',rest:'30s'},
          {name:'Ankle Circles',sets:'2×10 each',rest:'15s'},{name:"90/90 Hip Stretch",sets:'2×30s each side',rest:'20s'},
          {name:'Pigeon Pose',sets:'2×30s each side',rest:'20s'}]},
        {label:'DAY 2 — SHOULDERS & SPINE',exercises:[
          {name:'Arm Circles',sets:'2×30s',rest:'15s'},{name:'Cat-Cow',sets:'2×10',rest:'15s'},
          {name:'Thoracic Spine Rotation',sets:'2×10 each side',rest:'20s'},{name:'Band/Towel Pull-Apart',sets:'2×15',rest:'20s'},
          {name:"Child's Pose",sets:'1min',rest:''}]}]},
     {label:'WEEKS 3-4 · DEEP FLEXIBILITY',note:'Now that your joints are warmed up to real range of motion, hold stretches longer and work toward deeper positions like splits.',
      days:[
        {label:'DAY 1 — HIP OPENERS & SPLITS PROGRESS',exercises:[
          {name:'Deep Lunge Stretch',sets:'3×30s each side',rest:'20s'},{name:'Frog Stretch',sets:'3×30s',rest:'30s'},
          {name:'Pigeon Pose (deep)',sets:'3×45s each side',rest:'20s'},{name:'Splits Progression Hold',sets:'3×30s each side',rest:'30s'}]},
        {label:'DAY 2 — SHOULDER & BACKBEND MOBILITY',exercises:[
          {name:'Wall Slides',sets:'3×12',rest:'20s'},{name:'Camel Pose',sets:'3×20s',rest:'30s'},
          {name:'Bridge Hold',sets:'3×20s',rest:'30s'},{name:'Wheel Pose (if ready)',sets:'2×15s',rest:'45s'},
          {name:'Seated Forward Fold',sets:'1min',rest:''}]}]},
   ]},

  // ===== CALISTHENICS SKILL PROGRESSIONS =====
  {id:'calisthenics-lsit',sport:'calisthenics',level:'beginner',icon:'🤸',title:'L-Sit Progression',meta:'4 weeks · 3x/week · 20 min',featured:true,isProgram:true,
   tip:'<strong>The L-sit is one of the best foundational calisthenics skills.</strong> It directly builds the compression strength that planche and front lever both need later.',
   weeks:[
     {label:'WEEKS 1-2 · COMPRESSION & BENT-KNEE HOLDS',note:'Focus on hollowing your lower back and actively pressing your hands into the floor — the compression through your hips matters more than leg extension right now.',
      days:[{label:'L-SIT FOUNDATION',exercises:[
        {name:'Bent-Knee L-Sit Hold',sets:'5×10s',rest:'45s'},{name:'Tuck L-Sit Hold',sets:'4×10s',rest:'45s'},
        {name:'Hollow Body Hold',sets:'4×20s',rest:'30s'},{name:'Seated Compression Hold (knees to chest)',sets:'4×10s',rest:'30s'},
        {name:'Dead Hang',sets:'3×20s',rest:'30s'}]}]},
     {label:'WEEKS 3-4 · FULL L-SIT HOLDS',note:'Extend one leg at a time before both — a "one-leg-out" L-sit is a completely normal and useful stepping stone, not cheating.',
      days:[{label:'L-SIT PROGRESSION',exercises:[
        {name:'One-Leg-Extended L-Sit',sets:'5×10s each side',rest:'45s'},{name:'Full L-Sit Hold',sets:'5×5s',rest:'60s'},
        {name:'L-Sit to Tuck Pulses',sets:'4×8',rest:'45s'},{name:'Hollow Body Hold',sets:'4×30s',rest:'30s'},
        {name:'Parallel Bar/Chair Support Hold',sets:'3×20s',rest:'30s'}]}]},
   ]},
  {id:'calisthenics-handstand',sport:'calisthenics',level:'beginner',icon:'🤸',title:'Handstand Progression',meta:'6 weeks · 3x/week · 25 min',featured:false,isProgram:true,
   tip:'<strong>Handstands are a balance skill first, a strength skill second.</strong> Most people quit too early because they\'re chasing strength when what they actually need is more wall time.',
   weeks:[
     {label:'WEEKS 1-2 · WALL HOLDS & WRIST PREP',note:'Wrist mobility matters more than people expect — sore wrists are the #1 reason beginners stop practicing. Don\'t skip the prep work.',
      days:[{label:'WALL FOUNDATION',exercises:[
        {name:'Wrist Circles & Stretches',sets:'3 min',rest:''},{name:'Wall Handstand Hold (chest to wall)',sets:'5×15s',rest:'45s'},
        {name:'Pike Push-Ups',sets:'3×10',rest:'45s'},{name:'Hollow Body Hold',sets:'3×20s',rest:'30s'},
        {name:'Handstand Kick-Up Practice',sets:'10 attempts',rest:'30s'}]}]},
     {label:'WEEKS 3-4 · FREESTANDING BALANCE',note:'Practice away from the wall now, even if you only hold it for a second — falling out safely is a skill you need to build early.',
      days:[{label:'BALANCE WORK',exercises:[
        {name:'Wall Handstand Hold (back to wall)',sets:'5×20s',rest:'45s'},{name:'Freestanding Handstand Attempts',sets:'10×5s',rest:'30s'},
        {name:'Handstand Weight Shifts (fingers/heel)',sets:'4×20s',rest:'30s'},{name:'Pike Push-Ups (elevated)',sets:'4×10',rest:'45s'}]}]},
     {label:'WEEKS 5-6 · HANDSTAND PUSH-UP PREP',note:'Only add push-up range once your freestanding hold is consistent — rushing this is how shoulders get hurt.',
      days:[{label:'STRENGTH PROGRESSION',exercises:[
        {name:'Wall Handstand Hold',sets:'5×30s',rest:'45s'},{name:'Handstand Push-Up Negatives (wall)',sets:'4×5',rest:'90s'},
        {name:'Pike Push-Ups (feet elevated)',sets:'4×10',rest:'45s'},{name:'Freestanding Handstand Practice',sets:'8×10s',rest:'30s'}]}]},
   ]},
  {id:'calisthenics-muscleup',sport:'calisthenics',level:'intermediate',icon:'🤸',title:'Muscle-Up Progression',meta:'8 weeks · 3x/week · 30 min',featured:true,isProgram:true,
   tip:'<strong>You need strict pull-ups and dips before this program will make sense.</strong> Aim for 8+ strict pull-ups and 10+ dips before starting — otherwise build that base first.',
   weeks:[
     {label:'WEEKS 1-2 · PULLING STRENGTH BASE',note:'This program assumes a real pulling base already exists — these weeks sharpen it further, not build it from zero.',
      days:[{label:'PULL STRENGTH',exercises:[
        {name:'Weighted Pull-Ups',sets:'5×5',rest:'2min'},{name:'Explosive Pull-Ups (chest to bar)',sets:'5×5',rest:'90s'},
        {name:'Dips',sets:'4×10',rest:'75s'},{name:'False Grip Dead Hang',sets:'4×15s',rest:'45s'}]}]},
     {label:'WEEKS 3-5 · EXPLOSIVE PULL & TRANSITION',note:'The transition over the bar — not the pull itself — is what actually stops most people. Drill it directly.',
      days:[{label:'TRANSITION WORK',exercises:[
        {name:'False Grip Pull-Ups',sets:'5×5',rest:'90s'},{name:'Explosive Chest-to-Bar Pull-Ups',sets:'5×5',rest:'90s'},
        {name:'Muscle-Up Transition Drill (low bar/rings)',sets:'6×3',rest:'2min'},{name:'Dips (weighted if able)',sets:'4×8',rest:'90s'}]}]},
     {label:'WEEKS 6-8 · FULL MUSCLE-UP PRACTICE',note:'Practice the full movement fresh, at the start of your session, while your pull is still explosive.',
      days:[{label:'FULL SKILL PRACTICE',exercises:[
        {name:'Muscle-Up practice (full attempts)',sets:'6×2',rest:'2min'},{name:'False Grip Pull-Ups',sets:'4×6',rest:'90s'},
        {name:'Muscle-Up Transition Drill',sets:'4×3',rest:'90s'},{name:'Weighted Dips',sets:'4×8',rest:'90s'}]}]},
   ]},
  {id:'calisthenics-frontlever',sport:'calisthenics',level:'intermediate',icon:'🤸',title:'Front Lever Progression',meta:'8 weeks · 3x/week · 30 min',featured:false,isProgram:true,
   tip:'<strong>The front lever is a back and core strength skill, not an arm skill.</strong> Keep your arms straight throughout — bent arms turn it into a completely different (easier) exercise.',
   weeks:[
     {label:'WEEKS 1-3 · TUCK FRONT LEVER',note:'Keep your lower back flat, not arched, and pull your shoulder blades down — that\'s what actually holds the position, not your arms.',
      days:[{label:'TUCK PROGRESSION',exercises:[
        {name:'Tuck Front Lever Hold',sets:'5×10s',rest:'60s'},{name:'Dead Hang (active shoulders)',sets:'4×20s',rest:'30s'},
        {name:'Hollow Body Hold',sets:'4×20s',rest:'30s'},{name:'Bodyweight Row (table)',sets:'4×12',rest:'45s'}]}]},
     {label:'WEEKS 4-6 · ADVANCED TUCK',note:'Extending your hips further from the bar increases the lever arm significantly — expect this to feel much harder than the basic tuck.',
      days:[{label:'ADVANCED TUCK',exercises:[
        {name:'Advanced Tuck Front Lever Hold',sets:'5×8s',rest:'75s'},{name:'Tuck Front Lever Pulls',sets:'4×5',rest:'90s'},
        {name:'Weighted Pull-Ups',sets:'4×5',rest:'2min'},{name:'Hollow Body Hold',sets:'4×25s',rest:'30s'}]}]},
     {label:'WEEKS 7-8 · STRADDLE & FULL FRONT LEVER',note:'A straddle front lever is a completely legitimate stepping stone to the full position — don\'t skip it to rush the "real" version.',
      days:[{label:'STRADDLE PROGRESSION',exercises:[
        {name:'Straddle Front Lever Hold',sets:'5×8s',rest:'90s'},{name:'Full Front Lever Attempts',sets:'5×5s',rest:'90s'},
        {name:'Advanced Tuck Front Lever Hold',sets:'4×10s',rest:'75s'},{name:'Weighted Pull-Ups',sets:'4×5',rest:'2min'}]}]},
   ]},
  {id:'calisthenics-planche',sport:'calisthenics',level:'advanced',icon:'🤸',title:'Planche Progression',meta:'10 weeks · 3x/week · 35 min',featured:true,isProgram:true,
   tip:'<strong>The full progression: frog stand → elbow lever → tuck planche → advanced tuck → straddle → full planche.</strong> This is a long-term skill — most people take 6-18 months to reach a full planche. Be patient with the timeline.',
   weeks:[
     {label:'WEEKS 1-3 · FROG STAND & ELBOW LEVER',note:'These build the wrist strength and forward lean tolerance everything else depends on. Don\'t skip ahead just because they look easy.',
      days:[{label:'FOUNDATION HOLDS',exercises:[
        {name:'Frog Stand Hold',sets:'5×15s',rest:'45s'},{name:'Elbow Lever Practice',sets:'5×10s',rest:'45s'},
        {name:'Wrist Circles & Stretches',sets:'3 min',rest:''},{name:'Plank Hold (hands forward)',sets:'4×20s',rest:'30s'}]}]},
     {label:'WEEKS 4-6 · L-SIT & TUCK PLANCHE',note:'A strong L-sit is your gateway into the tuck planche — the compression strength transfers directly.',
      days:[{label:'L-SIT & TUCK',exercises:[
        {name:'Full L-Sit Hold',sets:'5×8s',rest:'60s'},{name:'Tuck Planche Hold',sets:'5×8s',rest:'75s'},
        {name:'Tuck Planche Push-Ups (if ready)',sets:'3×5',rest:'90s'},{name:'Pseudo Planche Push-Ups',sets:'4×8',rest:'60s'}]}]},
     {label:'WEEKS 7-10 · ADVANCED TUCK & STRADDLE PLANCHE',note:'Extending your body further from tucked increases difficulty a lot — advanced tuck is often the biggest jump in the whole progression. Give it real time.',
      days:[{label:'ADVANCED PROGRESSION',exercises:[
        {name:'Advanced Tuck Planche Hold',sets:'5×6s',rest:'90s'},{name:'Straddle Planche Attempts',sets:'5×5s',rest:'90s'},
        {name:'Tuck Planche Hold',sets:'4×10s',rest:'75s'},{name:'Pseudo Planche Push-Ups (weighted)',sets:'4×8',rest:'75s'}]}]},
   ]},
];
