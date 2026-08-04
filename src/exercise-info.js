// Per-exercise "how to" captions + a real YouTube search link for every
// movement used across WORKOUTS. Captions are hand-written form cues, not
// fabricated video URLs — the video link is a genuine YouTube search query,
// since linking one specific unverified video per exercise isn't something
// that can be done honestly at this scale.

const NON_EXERCISE = new Set([
  'rest', 'rest between rounds', 'thu: shoulders + arms',
  'fri: hamstrings + glutes', 'sat: weak point day',
]);

function normalize(name) {
  return name
    .replace(/\(.*?\)/g, '')
    .replace(/^(Thu|Fri|Sat|Mon|Tue|Wed|Sun):.*$/i, '')
    .replace(/\bsuperset .*/i, '')
    .replace(/\b(drop set|21s|heavy|slow tempo|slow|assisted|weighted|standing|seated|work up to.*|each|to failure|final round only|if able)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

const CAPTIONS = {
  'push-ups': 'Keep your core tight and body in a straight line from head to heel. Lower your chest to just above the floor, elbows at about 45°, then press back up.',
  'wide push-ups': 'Hands set wider than shoulder-width shifts more emphasis onto the chest. Keep hips level and don\'t let your lower back sag.',
  'incline push-ups': 'Hands on a raised surface (bench, stairs, couch) reduces the load — a good regression while you build up to standard push-ups.',
  'decline push-ups': 'Feet elevated on a chair or step shifts more load to the upper chest and shoulders. Keep the core braced so hips don\'t sag.',
  'diamond push-ups': 'Hands together under your chest, thumbs and index fingers touching. Heavily targets triceps — keep elbows tracking close to your body.',
  'knee push-ups': 'Knees down instead of toes reduces the load — a solid regression for building toward full push-ups.',
  'clap push-ups': 'Explosive push-up where you push hard enough to leave the floor and clap before landing. Land soft with bent elbows to absorb impact.',
  'archer push-ups': 'One arm stays straight and shifts your weight to the bending arm, building toward one-arm push-up strength.',
  'one-arm push-up': 'An advanced strength benchmark — feet spread wide for a stable base, brace your core hard, and don\'t twist your torso as you press.',
  'hindu push-ups': 'A flowing push-up from downward-dog into a low cobra position. Builds shoulder mobility and pushing strength together.',
  'explosive push-ups': 'Press up fast enough to get your hands off the ground momentarily. Control the landing every rep.',
  'scapular push-ups': 'From a plank, protract and retract your shoulder blades without bending the elbows. Builds shoulder stability.',
  'pseudo planche push-ups': 'Hands turned in, positioned near your hips, leaning forward — builds the shoulder/wrist strength needed for planche work.',
  'push-up to side plank': 'After each push-up, rotate into a side plank, reaching the top arm to the ceiling. Great for core and shoulder stability.',
  'close-grip push-ups': 'Hands close together under your chest, elbows tracking back along your ribs. Targets triceps hard.',
  'close-grip explosive push-ups': 'Same close hand position as a close-grip push-up, performed explosively — press up fast and control the landing.',
  'push-up hold': 'Hold at the bottom of a push-up, a few inches off the floor, keeping the core tight. Builds time-under-tension strength.',
  'regular push-ups': 'Standard push-up: hands under shoulders, straight line from head to heel, chest to just above the floor.',

  'squat': 'Feet shoulder-width, chest up, sit your hips back and down like sitting into a chair. Keep knees tracking over your toes.',
  'bodyweight squat': 'Feet shoulder-width, weight in your heels, sit back and down while keeping your chest up. Go as deep as your mobility allows.',
  'goblet squat': 'Hold a dumbbell vertically against your chest. It counterbalances your squat and reinforces an upright torso.',
  'jump squats': 'Squat down then explode upward into a jump. Land soft, straight back into the next squat.',
  'sumo squat': 'A wide stance with toes turned out targets inner thighs and glutes more than a standard squat.',
  'sumo squat jump': 'Wide sumo stance, squat down, then explode straight up into a jump. Land soft and reset your stance.',
  'front squat': 'Bar racked across the front of your shoulders. Keeps your torso more upright than a back squat — elbows stay high.',
  'back squat': 'Bar across your upper back (not your neck). Brace your core hard, sit back and down, drive through your heels to stand.',
  'hack squat': 'Machine squat with your back against a pad. Lets you load your quads heavily with less balance demand.',
  'pause squat': 'A regular squat with a 2-3 second pause at the bottom. Removes momentum and builds strength out of the hole.',
  'pistol squats': 'A single-leg squat with the other leg extended forward. A serious balance and strength benchmark — hold onto something while you build up to it.',
  'shrimp squat': 'A single-leg squat where the back foot is held behind you and bent. Even harder than a pistol squat — go slow.',
  'sissy squat': 'Lean back from the knees while squatting, keeping hips extended. Brutal quad isolation — hold something sturdy at first.',
  'jump lunges': 'Alternate lunge position mid-air, landing softly into the opposite lunge each time. Great for explosive leg power.',
  'reverse lunge': 'Step backward into a lunge instead of forward — easier on the front knee than a forward lunge.',
  'lateral lunges': 'Step out to the side, sitting your hips back over the stepping leg while the other leg stays straight.',
  'curtsy lunge': 'Step one leg diagonally behind the other, like a curtsy. Targets glutes and inner thighs from a different angle.',
  'walking lunge': 'Step forward into a lunge, then bring the back leg through into the next lunge — a continuous walking pattern.',
  'plyometric lunges': 'Explosive jumping lunges, switching legs in the air. Land soft and controlled every rep.',
  'bulgarian split squat': 'Rear foot elevated on a bench, front leg does the work. A serious single-leg quad and glute builder.',
  'wall sit': 'Back flat against a wall, knees at 90°, thighs parallel to the floor. Hold it — this is a pure endurance test.',
  'step-ups': 'Step fully onto a raised platform, drive through the lead leg, and control the way back down.',
  'box jumps': 'Jump onto a stable platform, landing softly with bent knees. Step back down rather than jumping down to protect your joints.',
  'tuck jumps': 'Jump straight up, pulling your knees toward your chest, and land soft.',

  'deadlift': 'Hinge at the hips, chest up, bar stays close to your shins the whole way. Drive through your heels, don\'t round your lower back.',
  'conventional deadlift': 'Feet hip-width, grip just outside your legs. Hinge back, chest up, bar tight to your body throughout the pull.',
  'romanian deadlift': 'Soft knee bend, hinge the hips back while the bar tracks down your thighs. You should feel this in your hamstrings, not your lower back.',
  'sumo deadlift': 'Wide stance, toes turned out, grip inside your knees. More upright torso than a conventional deadlift.',
  'deficit deadlift': 'Standing on a small platform (1-2 inches) increases the range of motion — use lighter weight than your regular deadlift.',
  'good mornings': 'Bar on your back, hinge forward at the hips with a soft knee bend, keeping your back flat. Go light until your hamstring flexibility catches up.',
  'nordic curl': 'Kneeling, ankles anchored, lower your torso forward as slowly as possible using your hamstrings, then pull back up.',
  'glute-ham raise': 'A machine-assisted hamstring curl performed from a kneeling/hip-hinge position — control the lowering phase.',
  'reverse hyper': 'Hips on a pad, hang your legs, then raise them behind you using your glutes and hamstrings, not momentum.',

  'barbell row': 'Hinge forward with a flat back, pull the bar to your lower ribs, squeezing your shoulder blades together.',
  'barbell bent-over row': 'Same setup as a barbell row — hinge at the hips, flat back, pull to your torso without using momentum.',
  'pendlay row': 'Bar starts on the floor each rep. Pull explosively to your torso, then reset fully between reps — no bouncing.',
  'meadows row': 'A landmine-style single-arm row performed bent over, pulling the bar toward your hip.',
  'dumbbell row': 'One hand and knee on a bench, pull the dumbbell to your hip, keeping your torso still — don\'t rotate to help the pull.',
  'chest-supported row': 'Chest braced against an incline bench removes momentum, isolating your back muscles.',
  't-bar row': 'Straddle the bar, hinge forward, and row it to your chest, squeezing your shoulder blades at the top.',
  'seated cable row': 'Sit tall, pull the handle to your torso while keeping your back straight — don\'t lean back to cheat the pull.',
  'cable row': 'Sit tall, pull the handle to your torso, squeezing your back at the end range without leaning back.',
  'single-arm cable pulldown': 'Standing tall, pull the handle down and back with one arm, keeping your torso stable.',
  'single-arm dumbbell row': 'One hand and knee on a bench for support, pull the dumbbell to your hip without rotating your torso.',
  'bodyweight row': 'Under a sturdy table or a bar set low, pull your chest to the bar/edge, keeping your body straight.',
  'towel row': 'A bodyweight row using a towel looped around a bar or pole — grip challenge added to a normal row pattern.',

  'pull-ups': 'Hands just outside shoulder-width, palms facing away. Pull your chin over the bar, control the way down — don\'t just drop.',
  'chin-ups': 'Palms facing you, hands shoulder-width. Slightly more bicep involvement than a pull-up. Full range of motion each rep.',
  'weighted pull-ups': 'A pull-up with added weight (belt, vest, or backpack). Only add load once you can do several strict bodyweight pull-ups first.',
  'weighted chin-ups': 'A chin-up with added weight. Build a strong bodyweight base before loading it up.',
  'l-sit pull-ups': 'Pull-ups performed while holding your legs out straight in an L position — adds a serious core demand.',
  'archer pull-ups': 'Pull up while shifting your weight toward one arm, the other staying mostly straight — builds toward one-arm pull-up strength.',
  'commando pull-ups': 'Grip the bar with hands stacked one behind the other, pulling your head to alternate sides of the bar each rep.',
  'typewriter pull-ups': 'Pull up to the top and shift side to side across the bar while staying up, instead of lowering between reps.',
  'explosive pull-ups': 'Pull up hard enough that your chest nearly reaches the bar, or so your hands can leave it briefly. Control the descent.',
  'muscle-up practice': 'A pull-up transitioning into a dip above the bar. Practice the transition drills before attempting the full movement.',
  'dead hang': 'Simply hang from a bar with arms straight and shoulders active (not fully relaxed). Builds grip and shoulder health.',
  'lat pulldown': 'Grip just outside shoulder-width, pull the bar to your upper chest, leading with your elbows, not your hands.',
  'wide-grip lat pulldown': 'A wider grip than standard emphasizes the outer lats — pull to your upper chest, elbows driving down and back.',
  'wide lat pulldown': 'Wide grip pulldown, pulling to your upper chest with your elbows leading the movement.',
  'straight-arm pulldown': 'Arms stay straight the whole rep — pull the bar down using your lats, not your arms.',

  'flat barbell bench press': 'Arch your upper back slightly, grip just wider than shoulders, lower the bar to your mid-chest, and press up in a slight arc.',
  'flat barbell bench': 'Grip just wider than shoulders, lower the bar to your mid-chest with control, and press it back up.',
  'incline barbell press': 'Bench set to a 30-45° incline shifts emphasis to the upper chest. Lower to your upper chest, press straight up.',
  'flat dumbbell press': 'Dumbbells start above your chest, lower them to the sides of your chest, and press back up without letting them drift.',
  'incline dumbbell press': 'On an incline bench, press dumbbells up and slightly together at the top for full upper-chest activation.',
  'dumbbell bench press': 'Lower the dumbbells to chest level with control, press them back up without locking out violently.',
  'dumbbell press': 'Press the dumbbells up from shoulder height, keeping your wrists stacked over your elbows.',
  'decline bench press': 'Bench angled downward shifts emphasis to the lower chest — lower the bar to your lower chest with control.',
  'close-grip bench press': 'Hands just inside shoulder-width, elbows tracking close to your body — targets triceps heavily.',
  'machine chest press': 'Set the seat so the handles line up with your mid-chest. Press forward without locking your elbows out hard.',
  'push press': 'A slight leg dip and drive helps launch the bar overhead — more weight than a strict press, but still control the catch.',
  'overhead barbell press': 'Bar starts at your shoulders, press straight overhead while keeping your core tight so your lower back doesn\'t arch.',
  'standing barbell press': 'Feet shoulder-width, brace your core, press the bar straight overhead without leaning back excessively.',
  'seated dumbbell press': 'Back supported, press the dumbbells overhead without arching your lower back off the pad.',
  'dumbbell shoulder press': 'Press the dumbbells from shoulder height straight overhead, keeping your core braced.',
  'arnold press': 'Start with palms facing you, rotate your wrists to face forward as you press overhead. Hits the shoulders from multiple angles.',

  'lateral raise': 'Raise the dumbbells out to your sides to about shoulder height, leading with your elbows, not your hands. Keep the reps controlled.',
  'lateral raises': 'Raise the dumbbells out to shoulder height with a slight bend in the elbow — don\'t swing the weight up with momentum.',
  'cable lateral raise': 'Cable tension keeps constant resistance through the whole range — raise to shoulder height, control the way down.',
  'front raise': 'Raise the weight straight in front of you to shoulder height, keeping your core braced so you don\'t lean back.',
  'front raises': 'Raise the weight in front of you to shoulder height without using body momentum to swing it up.',
  'plate front raise': 'Hold a weight plate with both hands, raise it straight in front of you to shoulder height.',
  'plate pinch front raise': 'Pinch a plate between your fingers and thumb, raise it in front of you — extra grip challenge added to the raise.',
  'rear delt fly': 'Hinge forward, raise the weights out to your sides focusing on squeezing your rear shoulders and upper back.',
  'y-raise': 'On an incline bench facing down, raise light weights up and out into a "Y" shape, thumbs pointing up.',
  'prone y-raise': 'Lying face down, raise your arms into a "Y" shape, squeezing your upper back at the top.',
  'prone t-raise': 'Lying face down, raise your arms out to the sides into a "T" shape, squeezing your shoulder blades together.',
  'prone y-t-w': 'A sequence lying face down: raise arms into Y, then T, then W shapes, squeezing your upper back each time.',
  'prone y-t-w raises': 'Lying face down, cycle through Y, T, and W arm positions, focusing on squeezing your upper back muscles.',
  'prone ytw hold': 'Hold each of the Y, T, and W arm positions lying face down for a few seconds — great for shoulder health.',
  'upright row': 'Pull the weight straight up along your body to about chest height, elbows leading, then lower with control.',
  'shrugs': 'Hold weight at your sides, lift your shoulders straight up toward your ears, and lower with control — no rolling the shoulders.',

  'barbell curl': 'Elbows pinned to your sides, curl the bar up without swinging your torso to generate momentum.',
  'ez bar curl': 'The angled bar is easier on the wrists — same cue as a barbell curl: elbows still, controlled curl up and down.',
  'ez bar preacher curl': 'Arms braced against the preacher pad removes momentum entirely — a strict bicep isolation move.',
  'preacher curl': 'Arms supported on the preacher bench, curl the weight up without letting your shoulders round forward.',
  'dumbbell curl': 'Curl the dumbbells up while keeping your elbows pinned at your sides — avoid swinging your shoulders.',
  'hammer curl': 'Palms face each other throughout the curl (neutral grip) — targets the forearm and outer bicep.',
  'incline dumbbell curl': 'On an incline bench, your arms hang behind your torso, putting the bicep under a deeper stretch.',
  'concentration curl': 'Elbow braced against your inner thigh, curl the weight up slowly, focusing purely on the bicep squeeze.',
  'spider curl': 'Chest against an incline bench, arms hanging straight down — removes all momentum from the curl.',
  'cable curl': 'Constant cable tension through the whole rep — curl up without letting your elbows drift forward.',
  'towel bicep curl': 'Loop a towel under your foot or a door, curl against the tension it creates — a no-weight bicep option.',
  'isometric bicep hold': 'Hold a curled position (against a doorframe or towel) for time instead of doing reps — builds static strength.',

  'tricep rope pushdown': 'Elbows pinned at your sides, push the rope down and slightly apart at the bottom for a full contraction.',
  'rope pushdown': 'Keep elbows locked at your sides, push the rope down and spread it apart slightly at the bottom.',
  'overhead tricep extension': 'Weight behind your head, elbows pointing forward and still, extend your arms straight up.',
  'overhead cable extension': 'Facing away from the cable, extend your arms overhead, keeping your elbows from flaring out.',
  'overhead extension': 'Extend the weight from behind your head to straight overhead, keeping your elbows stationary.',
  'single-arm pushdown': 'One arm at a time on the cable, elbow pinned at your side, push straight down with full control.',
  'reverse pushdown': 'An underhand grip on the pushdown shifts more emphasis onto the inner triceps head.',
  'skull crushers': 'Lying down, lower the weight toward your forehead by bending only at the elbow, then extend back up.',
  'bodyweight skull crusher': 'Using a bar or rings at an angle, lower your forehead toward the bar by bending only your elbows.',
  'tricep kickback': 'Hinge forward, upper arm parallel to the floor, extend your forearm straight back and squeeze.',
  'bench dip': 'Hands on a bench behind you, lower your body by bending your elbows, then press back up. Keep elbows tracking backward, not out.',
  'tricep dips': 'On parallel bars or a bench, lower until your upper arms are about parallel to the floor, then press back up.',
  'tricep dip': 'Lower your body by bending your elbows until your upper arms are roughly parallel to the ground, then press up.',
  'dips': 'Lean slightly forward for more chest, or stay upright for more triceps. Lower until your shoulders are level with your elbows.',

  'plank': 'Forearms and toes on the ground, body in a straight line from head to heel. Squeeze your glutes and brace your core — don\'t let your hips sag or pike up.',
  'plank hold': 'Hold a strict plank position — straight line from head to heel, core braced the entire time.',
  'plank to push-up': 'Alternate between a forearm plank and a push-up (top) position, one arm at a time, without rocking your hips.',
  'plank shoulder taps': 'In a push-up plank position, tap the opposite shoulder with each hand while keeping your hips as still as possible.',
  'side plank': 'Stack your feet, prop up on one forearm, and lift your hips so your body forms a straight line. Don\'t let your hips drop.',
  'side plank reach-through': 'From a side plank, thread your top arm underneath your torso, then rotate back open, adding a rotational core challenge.',
  'side plank hip dip': 'From a side plank, lower and raise your hips a few inches, keeping the rest of your body stable.',
  'hollow body hold': 'Lie on your back, press your lower back into the floor, and lift your shoulders and legs slightly off the ground.',
  'dead bug': 'On your back, extend opposite arm and leg while keeping your lower back pressed into the floor the entire time.',
  'l-sit hold': 'Support yourself on your hands (or parallettes) with legs extended straight out in front of you — a serious core and hip flexor test.',
  'dragon flag': 'Support your upper back on a bench, keep your body rigid, and lower your straight legs and torso down slowly, controlled by your core.',
  'v-ups': 'Lying flat, simultaneously raise your straight legs and torso to meet in a "V" shape, then lower with control.',
  'crunches': 'Curl your shoulders off the floor using your abs, not your neck — keep your lower back on the ground.',
  'bicycle crunches': 'Bring opposite elbow to opposite knee in a pedaling motion, keeping your lower back pressed to the floor.',
  'russian twist': 'Lean back slightly with feet off the ground (or planted for an easier version), rotate the weight side to side.',
  'russian twists': 'Feet off the ground, rotate a weight (or just your hands) from side to side, keeping your chest up.',
  'leg raises': 'Lying flat, keep your lower back pressed to the floor as you raise your straight (or slightly bent) legs up.',
  'hanging leg raise': 'Hang from a bar, raise your legs (straight or bent) toward your chest without swinging your body.',
  'hanging windshield wipers': 'Hanging from a bar with legs raised, rotate them side to side like windshield wipers, using your obliques.',
  'ab wheel rollout': 'Kneeling, roll the wheel out as far as you can control, keeping your core braced so your lower back doesn\'t sag, then pull back in.',
  'cable crunch': 'Kneeling in front of a cable, crunch down by curling your spine, not just bending at the hips.',
  'cable woodchop': 'Rotate the cable diagonally across your body from high to low (or low to high), driven by your core, not your arms.',
  'side bend': 'Standing with a weight in one hand, bend directly sideways at the waist, feeling the stretch and contraction in your obliques.',

  'glute bridge': 'Feet flat, knees bent, drive your hips up by squeezing your glutes, not your lower back. Pause at the top.',
  'single-leg glute bridge': 'Same glute bridge setup with one leg extended — doubles the demand on the working side.',
  'banded glute bridge': 'A band above your knees adds outward tension, cueing you to keep your knees from caving in as you bridge.',
  'hip thrust': 'Upper back braced on a bench, drive your hips up by squeezing your glutes hard at the top, chin tucked.',
  'barbell hip thrust': 'Bar across your hips (use a pad), upper back on a bench, drive up through your heels and squeeze your glutes at the top.',
  'single-leg hip thrust': 'Same hip thrust setup, one leg extended straight — significantly increases the load on the working glute.',
  'frog pump': 'Soles of your feet together, knees out wide, pulse your hips up focusing purely on the glute squeeze.',
  'donkey kick': 'On all fours, kick one leg straight back and up, squeezing your glute at the top without arching your lower back.',
  'donkey kick pulse': 'Same donkey kick position, small pulsing reps at the top of the range instead of a full kick.',
  'fire hydrant': 'On all fours, lift your bent knee out to the side like a dog at a hydrant, keeping your torso stable.',
  'clam shell': 'Lying on your side with knees bent, open your top knee like a clamshell while keeping your feet together.',
  'lateral band walk': 'A band around your ankles or knees, take small steps sideways while staying in a slight squat.',
  'banded lateral walk': 'Band around your legs, step sideways keeping tension on the band and knees tracking over your toes.',
  'abductor machine': 'Push your knees outward against the pads, focusing on your outer hip muscles, and control the return.',
  'glute squeeze machine': 'Push against the pad using your glute, holding a brief squeeze at the peak of the movement.',

  'leg press': 'Feet shoulder-width on the platform, lower until your knees reach about 90°, and press through your heels.',
  'leg extension': 'Extend your legs straight out against the pad, squeezing your quads at the top, then lower with control.',
  'leg curl': 'Curl the pad toward your glutes using your hamstrings, then lower slowly rather than letting it snap back.',
  'calf raise': 'Rise up onto your toes as high as possible, pause briefly, then lower all the way down for a full stretch.',
  'calf raises': 'Push up onto your toes fully, pause at the top, and lower under control for a complete range of motion.',
  'single-leg calf raise': 'Same calf raise, one leg at a time — doubles the load and challenges your balance.',

  'cable fly': 'Slight bend in the elbows, bring your hands together in front of your chest in an arcing motion, squeezing your chest.',
  'cable crossover': 'Cables set high, pull your hands down and across your body in front of you, squeezing your chest at the bottom.',
  'cable chest fly': 'Arc your arms together in front of your chest with a slight elbow bend, focusing on the chest squeeze, not pressing.',
  'low-to-high cable fly': 'Cables set low, bring your hands up and together in front of your upper chest.',
  'high-to-low cable fly': 'Cables set high, bring your hands down and together toward your lower chest.',
  'single-arm cable fly': 'One arm at a time lets you focus fully on the squeeze and range of motion on each side.',
  'dumbbell fly': 'Slight bend in the elbows, lower the dumbbells out to your sides in an arc, then bring them back together over your chest.',
  'pec deck': 'Sit tall, bring the handles together in front of your chest in a hugging motion, squeezing at the peak.',
  'pec deck machine': 'Adjust the seat so the handles line up with your chest, then bring your arms together, squeezing your pecs.',
  'chest squeeze': 'Press your palms together in front of your chest and hold the contraction — a simple isometric finisher.',
  'chest squeeze hold': 'Push your palms together hard in front of your chest and hold — no equipment needed, pure squeeze.',

  'face pull': 'Cable at head height, pull the rope toward your face, elbows high, squeezing your rear delts and upper back.',
  'face pulls': 'Pull the rope toward your face with your elbows high, focusing the squeeze on your rear shoulders and upper back.',

  'burpees': 'Drop into a squat, kick back into a plank, do a push-up, jump your feet back in, then explode up into a jump.',
  'burpee with push-up': 'A standard burpee with a full push-up added at the bottom of the plank position.',
  'mountain climbers': 'From a plank, drive your knees toward your chest alternately at speed, keeping your hips low and stable.',
  'high knees': 'Run in place, driving your knees up toward hip height as quickly as you can, staying light on your feet.',
  'jumping jacks': 'Jump your feet out while raising your arms overhead, then jump back to the start — classic full-body warm-up.',
  'sprint in place': 'Pump your arms and drive your knees as fast as possible without traveling — maximum effort, controlled landing.',
  'march in place': 'A low-impact warm-up — lift your knees to hip height one at a time at a walking pace.',
  'battle ropes': 'Alternate slamming the ropes up and down as hard as you can, keeping a slight knee bend and braced core.',
  'sled push': 'Lean into the sled, drive through your legs in short powerful steps, keeping your back flat.',
  'assault bike': 'Pump both your arms and legs together for max output — this one gets brutal fast, pace yourself accordingly.',
  'rowing machine': 'Drive with your legs first, then lean back and pull the handle to your ribs, reversing the order on the way back.',
  'rowing machine sprint': 'Same rowing technique — legs, then lean, then arms — at maximum sustainable effort for the sprint distance.',
  'stationary bike': 'Keep a steady cadence and light resistance for an easy-paced steady-state session.',
  'treadmill incline walk': 'A brisk walking pace on an incline — sustainable effort you can hold a light conversation through.',
  'treadmill sprint': 'Short, all-out sprint intervals — the recovery walk between them is just as important as the sprint itself.',
  'stair climber': 'Stand tall rather than leaning on the handles, taking full steps to actually work your glutes and quads.',
  'cool-down stretch': 'Gentle static stretching for the muscles you just trained, holding each stretch for 20-30 seconds without bouncing.',
  'cool-down walk': 'An easy-paced walk to bring your heart rate down gradually after a hard session.',

  'good mornings (bodyweight)': 'Hinge forward at the hips with a flat back and soft knees, no weight needed — great warm-up for the deadlift pattern.',
  'band/towel pull-apart': 'Hold a band or towel with both hands, pull it apart by squeezing your shoulder blades together.',
  'arm circles': 'Small controlled circles with straight arms, both directions, to warm up the shoulder joint.',
  'wall shoulder taps': 'Hands against a wall in a plank-like lean, tap the opposite shoulder while keeping your hips square.',
  'wall slides': 'Back against a wall, slide your arms up and down in a "W" to "Y" shape, keeping contact with the wall the whole time.',
  'plank shoulder taps ': 'Tap the opposite shoulder from a plank position while resisting hip rotation.',
  'pike push-ups': 'Hips high in a pike position, lower the top of your head toward the floor — builds toward handstand push-up strength.',
  'elevated pike push-ups': 'Feet raised on a bench in the pike position increases the shoulder load compared to a standard pike push-up.',
  'handstand push-ups': 'Kick up into a handstand against a wall, lower your head toward the floor, and press back up.',
  'wall handstand hold': 'Kick up into a handstand against a wall and hold — builds the shoulder strength and confidence needed for handstand push-ups.',
  'wall walk': 'From a plank with feet against the wall, walk your feet up the wall while walking your hands in, ending near a handstand.',

  // ===== SPORT-SPECIFIC =====
  'sun salutation a': 'A flowing sequence linking forward fold, plank, and upward/downward dog. Move one breath per motion — don\'t rush the transitions.',
  'sun salutation b': 'Adds Warrior I into the classic sun salutation flow. Keep your front knee tracking over your ankle as you sink into each Warrior.',
  "child's pose": 'Sit your hips back toward your heels with arms extended forward, forehead down. A resting pose — let your breath slow down here.',
  'downward dog': 'Hands and feet on the floor, hips lifted high into an inverted V. Pedal your heels to loosen your calves rather than forcing them flat.',
  'warrior i & ii': 'Front knee bent over the ankle, back leg straight and grounded. Square your hips forward for Warrior I, open them to the side for Warrior II.',
  'cat-cow': 'On hands and knees, arch your back and drop your belly on the inhale (cow), round your spine and tuck your chin on the exhale (cat).',
  'crow pose': 'Knees pressed into the backs of your upper arms, weight shifted forward onto your hands. Look slightly forward, not down, to help your balance.',
  'half moon pose': 'Balance on one leg and one hand, other leg extended parallel to the floor. Stack your hips and press actively through the lifted heel.',
  'camel pose': 'Kneeling, hands to your heels, lift your chest toward the ceiling. Keep your hips stacked over your knees rather than sinking back.',
  'pigeon pose': 'Front shin angled across the mat, back leg extended straight behind you. A deep hip-opener — ease in gradually, never force it.',
  'wheel pose': 'A full backbend supported on hands and feet. Press evenly through your palms and heels and keep your neck relaxed.',
  'firefly pose': 'An arm balance with legs extended out to the sides. Shift your weight forward onto your hands before trying to lift your feet.',
  'scorpion progression': 'An advanced backbend/inversion working toward bringing your feet toward your head from a forearm stand. Only pursue this with a strong warm-up and solid handstand base.',

  'cone weaving dribble': 'Keep the ball close with light touches on the outside of your foot, head up scanning the field rather than watching the ball.',
  'inside-foot passing': 'Lock your ankle and strike through the middle of the ball with the inside of your foot for accuracy over power.',
  'juggling practice': 'Small, controlled touches with a relaxed foot — the goal is control, not height.',
  'shooting on goal': 'Plant your non-kicking foot beside the ball, strike through with your laces, and follow through toward the target.',
  'agility ladder drills': "Stay on the balls of your feet with quick, light steps — the ladder is about foot speed, not how high you lift your knees.",
  'dribbling combo moves': 'Chain each move together at game speed — a step-over or cut only works if it\'s sharp and decisive, not slow and telegraphed.',
  'first-touch passing': "Cushion the ball on the way in so your very first touch sets up your next move, rather than just stopping it dead.",
  'repeated sprint shuttles': 'Go all-out on each sprint and actually recover during the rest — this trains your ability to repeat efforts, not just your top speed.',
  '1v1 attacking/defending drills': 'As the attacker, change pace to unbalance the defender; as the defender, stay on the balls of your feet and don\'t dive in.',

  'stationary dribbling': 'Keep your eyes up, not on the ball, and use your fingertips to control it with a low, quick bounce.',
  'form shooting': 'One-hand form first — elbow under the ball, snap your wrist on release, land in the same spot you jumped from.',
  'layup practice': 'Take off on the opposite foot from your shooting hand and lay the ball softly off the backboard.',
  'figure-8 dribble': "Weave the ball in a figure-8 pattern between and around your legs, staying low and keeping your head up.",
  'free throws': "Use the exact same routine every single time — same number of dribbles, same breath, same release — consistency is the whole skill.",
  'defensive slides': "Stay low with your feet wider than shoulder width, and slide without crossing your feet or standing upright.",
  'crossover-to-pull-up jumper': "Sell the crossover with a hard hip and shoulder fake before pulling up into your shot.",

  'en garde stance hold': 'Knees bent, weight balanced evenly between both feet, front foot pointed at your opponent. This stance is your base for every action.',
  'advance-retreat steps': "Small, quick steps that keep your feet roughly shoulder-width apart — don't let your feet cross or click together.",
  'lunge practice': "Push off your back leg and extend your front leg forward, landing with your front knee over your ankle, blade arm extending first.",
  'mirror blade drills': 'Practice your blade actions in front of a mirror to check your extension, wrist position, and point control.',
  'fleche practice': 'An explosive running attack — commit fully once you start; a hesitant fleche is an easy target.',

  'cradling practice': 'Small, controlled wrist and arm motion to keep the ball secure in the pocket — keep it moving even when you\'re not being pressured.',
  'wall ball passing': 'Full extension on your throw, step into it with your opposite foot, and catch with soft hands, giving slightly on impact.',
  'ground ball scoops': "Bend your knees and get low with your stick angled to the ground, running through the ball rather than reaching for it.",
  'split-dodge practice': 'Plant hard and change direction sharply, protecting the stick with your body as you cut the other way.',

  'easy warm-up swim': 'Relaxed effort, focus on smooth technique — this is about waking up your stroke, not building fitness.',
  'catch-up drill': 'One arm waits extended at the front until the other arm completes its full stroke and "catches up" — isolates each side of your stroke.',
  'kickboard kick set': 'Kick from your hips, not your knees, with a relaxed ankle — a big knee-bend kick wastes energy and slows you down.',
  'freestyle technique swim': 'Focus on a long stroke, high elbow catch, and steady bilateral breathing rather than speed.',
  'breathing drill': 'Practice breathing to both sides — it keeps your stroke balanced and gives you flexibility to breathe away from waves or other swimmers.',

  'easy bouldering problems': 'Climb slowly and deliberately, focusing on precise foot placement rather than muscling through moves.',
  'flagging practice': 'Extend one leg out to the side without touching a hold, using it purely for counterbalance to stay on the wall.',
  'silent feet drill': 'Place each foot on its hold with zero noise — it forces precise, controlled foot placement instead of stomping.',
  '4x4 bouldering circuit': 'Four problems back-to-back with minimal rest, repeated four times — pick problems easier than your limit since fatigue compounds fast.',
  'campus board': 'An advanced power tool using only your arms, no feet. Only attempt this with a solid strength base — it\'s high-risk for the fingers and shoulders.',
  'max hangs': 'Near-maximal effort hangs on a fingerboard for a few seconds each — this is pure finger strength work, always fully warmed up first.',

  'forehand wall rally': 'Contact the ball out in front of your body with a full turn of your shoulders, following through across your body.',
  'backhand wall rally': 'Turn your shoulders early and lead with your non-dominant shoulder into contact, keeping a firm wrist.',
  'split-step footwork drill': "Small hop timed to your opponent's contact so you land ready to explode in any direction.",
  'serve practice': 'Toss consistently to the same spot every time, and drive up through your legs into contact rather than arming the ball.',
  'mini-tennis rally': "Soft, controlled rallies close to the net — great for grooving touch and consistency without full-court pace.",

  'jump rope': 'Stay light on the balls of your feet with small, quick hops — let your wrists do the turning, not your whole arm.',
  'stance & guard drill': 'Hands up protecting your chin, elbows tucked to protect your ribs, weight balanced on both feet.',
  'jab-cross shadowboxing': 'Snap the jab straight out and back, rotate your hips and rear foot into the cross — return to guard after every punch.',
  'heavy bag basics': 'Full extension on every punch without leaning your weight onto the bag — footwork and balance matter more than power here.',
  'slip & counter drill': 'Small head movement off the centerline to avoid a punch, then fire back immediately while your opponent resets.',

  'forearm pass practice': 'Platform flat and steady from your shoulders, not your wrists — move your feet to the ball rather than reaching with your arms.',
  'underhand serve practice': 'Step into the serve with your opposite foot and contact the ball with a firm, flat hand below your waist.',
  'overhead setting practice': "Form a window with your hands above your forehead and extend your legs and arms together on contact.",
  'approach footwork drill': 'Left-right-left (or right-left-right) steps timed so your last step converts forward speed into upward jump.',
  'attack swing practice': 'Draw your elbow high and back before snapping through the ball with a full arm swing, contacting at your highest point.',

  'warm-up swim': 'Easy, relaxed pace — the goal is loosening up and finding your rhythm before the main set.',
  'cool-down swim': 'Slow, easy pace to bring your heart rate down and flush your muscles after the main set.',
  'kick set': 'Kick from your hips with a relaxed ankle, not from your knees — a board or wall for support keeps your upper body still so your legs do the work.',
  'pull set': 'A pull buoy between your thighs takes your legs out of it, isolating your arm stroke and upper-body pull.',
  'descending effort set': 'Each rep gets faster than the last — start controlled so you actually have speed left for the final ones.',
  'race-pace 100s': 'Hold the exact pace you\'d race at — not faster, not slower. This trains your pacing judgment as much as your fitness.',
  'broken 200': 'A 200 split into chunks with brief rest — lets you hold race pace longer than you could unbroken.',
  'sprint set': 'Maximum effort for the full distance — technique will get rougher under speed, that\'s expected at this intensity.',
  'dryland core circuit': 'Core strength that transfers directly to a stronger, more stable body position in the water.',

  '3-point stance starts': 'Weight balanced forward on your down hand, back flat — explode out low on the snap rather than standing up first.',
  'route running': 'Sharp, precise cuts at full speed — round off a route and the defender closes the gap you were trying to create.',
  'tackling form': 'Head up and across the body, wrap with both arms, drive your legs through contact. Never lead with the top of your head.',

  'throwing mechanics drill': 'Step toward your target, rotate your hips before your arm, and follow through down and across your body.',
  'fielding ground balls': 'Get your glove down early and field the ball out in front of you, not off to the side.',
  'batting tee work': 'Keep your eyes level and swing through the ball, not just at it — the tee is for grooving your path, not just contact.',

  'forward stride practice': 'Push out to the side and back with each stride, fully extending your pushing leg before recovering it under you.',
  'stopping practice': "Turn your blades sideways and dig in evenly — leaning back is what causes a fall, not the stop itself.",
  'edge work drills': 'Lean into the turn from your ankles and knees, not just your upper body, to hold a tight, controlled edge.',

  'grip & stance practice': "Neutral grip, ball positioned off your front heel, weight balanced evenly — small setup errors cause big miss patterns.",
  'putting practice': 'Keep your head still and let the putter swing like a pendulum from your shoulders, not your wrists.',
  'chipping practice': 'Weight forward, ball back in your stance, hands ahead of the clubhead through impact.',
  'full swing practice': "Smooth tempo back and through — rushing the transition is the most common cause of a mis-hit.",

  'stance & motion drill': 'Stay light and constantly moving in a low athletic stance — a stationary wrestler is an easy target.',
  'sprawl practice': "Snap your hips back and drop your weight the instant a shot comes in, driving your opponent's head down.",
  'single-leg takedown drill': "Penetrate deep on the shot, drive through with your head up, and finish by circling around the leg.",
  'double-leg takedown drill': 'Shoot low and explosive, driving through both legs with your head up and back flat.',
  'penetration step drill': "Take a long, low first step toward your target's legs, closing distance before they can react.",

  'running form drills': "Drive your knees and land under your hips, not out in front — overstriding is the most common form breakdown.",
  'strides': 'Relaxed, controlled acceleration up to about 90% effort — this is about rhythm and turnover, not an all-out sprint.',
  'hill sprints': "Drive your arms and knees hard, staying tall — hills build power without the joint impact of flat-ground sprinting.",

  'arch body hold': "Lie face down, lift your chest and legs slightly off the ground, squeezing your glutes and upper back.",
  'forward rolls': 'Tuck your chin to your chest and roll smoothly along your upper back — never on the top of your head or neck.',
  'cartwheel practice': 'Hands and feet land in one straight line, arms fully extended, hips staying up and over your hands.',

  'cadence drills': "Keep your upper body still and quiet while your legs spin fast and light — a bouncing upper body wastes energy.",
  'hill repeats': 'Stay seated for the lower gears at the base of the climb, standing only when the grade steepens.',

  'stroke technique drill': 'Sequence the drive as legs, then back, then arms — and reverse it exactly on the way back for the recovery.',
  'power stroke drill': "Drive explosively through your legs first, keeping your back strong and stable through the whole stroke.",

  'forehand drive practice': 'Rotate your torso into the shot and brush up the back of the ball for a clean, controlled drive.',
  'backhand drive practice': 'Turn your shoulders early, keep your elbow in front of your body, and drive through the ball.',
  'footwork side-to-side drill': "Small, quick adjustment steps — get your feet set before you swing rather than reaching off-balance.",

  'clear shot practice': 'Full arm extension and a high contact point, hitting the shuttle deep to the back of the court.',
  'drop shot practice': "Same preparation as your clear, but a soft, controlled touch at contact to disguise it until the last moment.",
  'smash technique practice': "Jump into it and snap your wrist at the top of your reach for a steep, powerful downward angle.",

  'balance & stance practice': 'Weight centered over the board, knees soft and slightly bent, eyes up looking where you want to go, not down at your feet.',
  'pushing technique practice': 'Push with your back foot in short, controlled strokes, keeping your front foot steady over the bolts.',
  'ollie fundamentals': 'Snap your back foot down and slide your front foot up the board in one fluid motion — timing matters more than how hard you pop.',

  'pop-up practice': "Push straight up into a low, balanced stance in one fluid motion — don't get to your knees first.",
  'paddling technique practice': 'Long, deliberate strokes with a slight arch in your back — paddle efficiency matters more than speed here.',
  'bottom turn practice': "Set your rail early and drive your weight through your back foot to redirect back up the wave face.",

  'basic stance practice': 'Weight balanced and knees soft, ready to move in any direction — a rigid, flat-footed stance limits everything you do next.',
  'punching fundamentals': 'Rotate your hip and pivot your rear foot into every strike, returning your hand to guard immediately after.',
  'kicking fundamentals': "Chamber your knee before extending the kick, and rotate your supporting foot to generate power from your hips.",

  'passing fundamentals': 'Pass off both hands, releasing the ball flat and slightly behind the receiver so they run onto it.',
  'rucking technique practice': 'Get low and drive through with your legs, staying on your feet to secure the ball for your team.',

  'bent-knee l-sit hold': 'Knees tucked to your chest, hands pressed flat beside your hips, push down through your palms and lift your hips slightly off the ground.',
  'tuck l-sit hold': 'Knees pulled tight to your chest in the air — focus on pressing your shoulders down away from your ears, not just holding on.',
  'one-leg-extended l-sit': 'One leg straight, one tucked — a completely legitimate stepping stone between tuck and full L-sit, not a shortcut.',
  'full l-sit hold': 'Both legs straight and parallel to the ground, shoulders pressed down. Point your toes and squeeze your quads to keep the legs from sagging.',
  'l-sit to tuck pulses': 'Small pulsing reps between tucked and extended — builds the compression strength needed for longer full holds.',
  'seated compression hold': 'Pull your knees to your chest and hold — this is the same compression your torso needs for an L-sit, just without the arm support.',
  'parallel bar/chair support hold': 'Arms locked, shoulders pressed down away from your ears — a simple support hold that builds the shoulder strength every other hold needs.',

  'wall handstand hold': 'Hands shoulder-width, fingers spread, pushing the floor away from you. Squeeze your glutes and brace your core to keep a straight line.',
  'handstand kick-up practice': 'Kick up with control rather than momentum — you should be able to stop partway up, not just fling yourself into the wall.',
  'handstand weight shifts': 'Shift your weight toward your fingertips and heels of your palms to feel how balance actually gets controlled from your hands.',
  'freestanding handstand attempts': 'Look at a fixed point on the floor, not around the room — a wandering gaze is one of the biggest causes of falling out early.',
  'handstand push-up negatives': 'Lower yourself as slowly as you can control, even if you can\'t press back up yet — the lowering phase is what builds the strength.',

  'false grip dead hang': 'Grip the bar so it sits across your palm rather than your fingers — uncomfortable at first, but it\'s what makes the muscle-up transition possible.',
  'false grip pull-ups': 'Same false grip as the dead hang, pulled through a full rep — this is what actually connects your pull-up strength to the muscle-up.',
  'explosive pull-ups': 'Pull up hard enough that your chest nearly reaches the bar, or so your hands can leave it briefly. Control the descent.',
  'muscle-up transition drill': 'Practice the moment your body rotates over the bar in isolation — low rings or an assisted setup let you drill just this piece without the full pull.',

  'tuck front lever hold': 'Knees pulled to your chest, hanging below the bar — focus on pulling your shoulder blades down and keeping your lower back flat, not arched.',
  'advanced tuck front lever hold': 'Hips extended further from the bar than a basic tuck — this is often the biggest jump in difficulty in the whole progression.',
  'tuck front lever pulls': 'From the tuck front lever position, pull yourself slightly up and lower back down under control.',
  'straddle front lever hold': 'Legs spread wide instead of together — the wider straddle reduces the leverage against you, making it more achievable than a straight-leg version.',
  'full front lever attempts': 'Full body straight and horizontal, held only by your shoulders and back — expect this to take real time even after straddle feels solid.',

  'frog stand hold': 'Knees resting on your upper arms (near your elbows), leaning forward until your feet lift off the ground. This is the very first step toward an elbow lever and planche.',
  'elbow lever practice': 'Hands flat on the floor, hips resting on your elbows, leaning forward until your feet come up — builds the forward lean tolerance the planche needs.',
  'tuck planche hold': 'Knees tucked to your chest, leaning forward over your hands until your feet lift off the ground — arms stay straight throughout.',
  'tuck planche push-ups': 'From the tuck planche position, bend and straighten your arms slightly — only attempt once the static hold is solid.',
  'pseudo planche push-ups': 'Hands turned in and positioned near your hips, leaning forward as you press — builds the shoulder and wrist strength every planche stage needs.',
  'advanced tuck planche hold': 'Hips extended further than the basic tuck — a genuinely large difficulty jump, so expect it to take real weeks of practice.',
  'straddle planche attempts': 'Legs spread wide instead of straight together — reduces the leverage against you compared to a straight-body planche.',

  'hip circles': 'Slow, controlled circles through your full range of motion in each direction — this is about mobility, not speed.',
  'deep squat hold': 'Sink as low as you comfortably can with your heels flat on the ground, and just breathe and relax into the position.',
  'ankle circles': 'Slow circles through your full range of motion — often the most neglected joint in most people\'s mobility routine.',
  '90/90 hip stretch': 'Both legs bent at 90°, one in front and one to the side — rotate your torso toward the front leg for a deep hip stretch.',
  'thoracic spine rotation': 'Rotate through your upper back while keeping your hips still — most "spine mobility" people lack is actually in this specific segment.',
  'deep lunge stretch': 'Sink your hips low and forward in a lunge position, keeping your back leg straight and heel reaching back.',
  'frog stretch': 'Knees wide, shins on the ground, hips sinking back and down — a deep, patient stretch for your inner thighs and hips.',
  'splits progression hold': 'Ease into your deepest comfortable range and hold — never bounce, and never push into sharp pain.',

  'stance & grip practice': 'A stable base built from the ground up — most wobble in your aim actually comes from your feet, not your hands.',
  'anchor point consistency drill': 'Draw to the exact same point on your face every single time — consistency here is what makes your shots repeatable.',
  'back tension hold': 'Draw through your back muscles rather than just your arm, and hold that engagement through the release.',
  'breakfall practice': 'Slap the ground with your arm as you land to spread out the impact — this is the single most important safety skill to drill early.',
  'grip fighting basics': 'Control the sleeve and collar before attempting any technique — the grip is the setup for everything that follows.',
  'off-balancing practice': 'Break your partner\'s balance in the direction of the throw before you attempt to execute it — muscling a throw without this rarely works.',
  'eggbeater kick practice': 'Alternate circular kicks with each leg to stay high and stable in the water, keeping your hands free.',
  'hiking position hold': 'Lean out over the water bracing with your legs and core — this is a long isometric hold, so pace your effort.',
  'delivery stance & balance practice': 'A stable, balanced slide is what releases the stone consistently — rushing the delivery is the most common technical fault.',
  'sweeping technique drill': 'Apply firm, even downward pressure while moving your brush quickly — sweeping melts the ice surface just enough to change the stone\'s path.',
  'low skating stance hold': 'Sit low with your chest forward and knees bent deep — this position feels brutal at first but is where all your power comes from.',
  'crossover step drill': 'Cross one foot over the other through the turn, pushing out and back with each step to maintain speed around the corner.',
  'sprint starts': 'Drive hard off your front leg with a low, powerful first few steps — acceleration matters more than your top speed here.',
  'aerodynamic position hold': 'Hold a tucked, stable position with minimal movement — extra motion here just costs you speed.',
  'flight position hold': 'Extend your body into a stable, controlled position — core and back strength are what keep this steady in the air.',
  'snatch': 'One explosive pull from the floor to overhead in a single motion — technique and speed under the bar matter more than raw strength.',
  'clean & jerk': 'A powerful pull to your shoulders (the clean), followed by a explosive drive overhead (the jerk) — two distinct skills in one lift.',
  'snatch pull': 'The pulling portion of the snatch without the catch — builds the explosive extension the full lift depends on.',
  'clean pull practice': 'The pulling phase of the clean, focusing on a strong, fast extension through your hips.',
  'overhead squat hold': 'Weight locked out overhead while you sit into a squat — this demands serious shoulder and hip mobility, so start light.',

  'right-of-way attack drill': 'In foil and sabre, the attacker has priority — commit fully to the attack so the referee (and your opponent) can clearly see who initiated it.',
  'point-in-line practice': 'Extend your arm and blade in a straight line toward your opponent — this defensive position forces them to deal with your blade before attacking.',
  'point control drill': 'Keep the tip of your blade on target through small, precise arm and wrist movements rather than large swinging motions.',
  'cutting action practice': 'A crisp wrist-driven cut, not a wide swing — sabre touches are scored with the edge or tip anywhere above the waist.',
  'leg attack setup drill': 'Change levels and close distance before shooting — a leg attack telegraphed from too far away is easy to sprawl on.',
  'clinch fighting practice': 'Fight for head and arm position early — once the clinch is established, whoever controls the tie-up controls the exchange.',
  'recurve draw hold practice': 'Hold at full draw with your back muscles engaged, not just your arm — this is what recurve archers call "back tension."',
  'release aid trigger control': 'Squeeze the trigger through steady increasing pressure rather than punching it — a surprise release is what keeps your aim steady.',
  'prone position stability drill': 'Build a stable "tripod" with your body, front support, and rifle — the goal is a position that holds itself with minimal muscular effort.',
  'target tracking drill': 'Keep your eyes on the target, not the barrel — trust your peripheral vision to guide the gun into the right spot.',
  'acceleration phase drill': 'Drive your arms and knees powerfully with a forward lean for the first 20-30 meters — this phase is about building speed, not holding a tall sprint posture yet.',
  'standing throw technique practice': 'Focus purely on the release mechanics from a stationary position before adding any footwork or momentum.',
  'approach run consistency drill': 'Mark your steps and hit the same checkmarks every single time — an inconsistent approach ruins an otherwise good jump before you even leave the ground.',
  'shot-stopping reaction drill': 'Stay on the balls of your feet with your hands ready — react to the shot, don\'t try to guess where it\'s going in advance.',
  'jockeying & delay technique': 'Stay on your feet and delay the attacker rather than diving in — force them into a mistake or toward help defense.',
  'box-to-box shuttle runs': 'Match game intensity — sprint the transitions and jog to recover, since that\'s the actual rhythm of a box-to-box role.',
  'advanced ball-handling combo': 'Chain multiple moves together at game speed — keep your eyes up throughout, not on the ball.',
  'post sealing technique': 'Get position on your defender\'s body early and hold it — sealing is won with your legs and back, not your hands.',
  'setting consistency drill': 'Same hand shape and release point on every set — a hitter needs to trust exactly where and how the ball will arrive.',
  'quick footwork to block': 'Small, quick shuffle steps to get square to the hitter — a middle blocker who over-strides arrives late and out of position.',
  'butterfly technique drill (goalie)': 'Drop both knees to the ice together, sealing the bottom of the net, while keeping your upper body ready to react to rebounds.',
  'gap control drill': 'Keep enough distance to react to a change of direction, but close enough to pressure the puck carrier — that gap is the whole skill.',
  'pitching mechanics drill': 'Repeat the exact same arm slot and release point every time — small mechanical inconsistencies are what cause both wildness and arm strain.',
  'receiving & framing practice': 'Keep your glove soft and let the ball come to you, presenting borderline pitches as strikes without an exaggerated pull.',
  'double play turn practice': 'Catch, pivot, and release in one fluid motion — footwork around the bag decides how quickly you can get the ball out.',
  'first-step reaction drill': 'React to the crack of the bat immediately — your first step in the right direction matters more than your top sprint speed.',
  'explosive eggbeater for height': 'Alternate leg kicks in a circular motion to lift your torso as high out of the water as possible, keeping your hands free.',
  'close-range reaction drill': 'React with your hands and feet, not by over-committing your whole body — most close-range shots don\'t give you time to fully set.',
  'scrummaging technique practice': 'Bind tightly and drive with your legs low and straight — a scrum is won with leg drive and body position, not upper body strength alone.',
  'evasive footwork drill': 'A sharp change of direction beats pure speed — sell one way with your hips before cutting the other way.',
};

function keywordCaption(base) {
  const has = (s) => base.includes(s);
  if (has('push-up') || has('push up')) return 'Keep your core tight and body in a straight line head to heel. Full range of motion, controlled tempo down and up.';
  if (has('squat')) return 'Chest up, sit your hips back and down, knees tracking over your toes. Control the descent, drive up through your heels.';
  if (has('lunge')) return 'Step to a controlled position with your front knee over your ankle, then drive back up through your front heel.';
  if (has('deadlift') || has('hinge') || has('good morning')) return 'Hinge at the hips with a flat back, weight close to your body, and drive your hips forward to stand.';
  if (has('curl')) return 'Keep your elbows still and curl the weight up under control — avoid swinging your torso for momentum.';
  if (has('press') || has('push press')) return 'Press with control, keeping your wrists stacked over your elbows, and avoid locking out violently at the top.';
  if (has('row') || has('pull-up') || has('pulldown') || has('pull up')) return 'Lead with your elbows, squeeze your shoulder blades together at the end of the pull, and control the return.';
  if (has('raise') || has('fly')) return 'Use a slight bend in your joints and lift with control — momentum shouldn\'t be doing the work.';
  if (has('extension')) return 'Isolate the target muscle by keeping the rest of your body still, and control the return each rep.';
  if (has('plank') || has('hold') || has('hollow')) return 'Brace your core and hold a strong, neutral position — quality of the hold matters more than duration.';
  if (has('bridge') || has('thrust') || has('kick') || has('clam') || has('hydrant')) return 'Squeeze your glutes hard at the top of the movement rather than relying on your lower back.';
  if (has('dip')) return 'Lower under control until your upper arms are roughly parallel to the floor, then press back up.';
  if (has('jump') || has('plyo') || has('box')) return 'Land soft with bent knees to absorb the impact before your next rep.';
  if (has('crunch') || has('twist') || has('v-up') || has('sit-up') || has('bicycle')) return 'Move from your core, not your neck or hip flexors, and control the tempo down.';
  if (has('sprint') || has('bike') || has('row') || has('treadmill') || has('stair') || has('cardio')) return 'Match the effort to the interval — go hard when it calls for it, and actually recover during the rest.';
  if (has('warm-up') || has('warm up')) return 'Ease into it gradually — the goal is raising your heart rate and loosening up, not tiring yourself out before the real work.';
  if (has('cool-down') || has('cool down')) return 'Slow, easy effort to bring your heart rate down and start recovery before you stop moving entirely.';
  if (has('dribbl')) return 'Keep your head up and control it with light, relaxed touches rather than watching it the whole time.';
  if (has('footwork') || has('agility') || has('ladder') || has('slide') || has('shuttle')) return 'Stay light on the balls of your feet with quick, controlled steps — speed comes from quick ground contact, not big strides.';
  if (has('shooting') || has('shot') || has('serve')) return 'Repeat the exact same mechanics every rep — consistency in your form is what makes it reliable under pressure.';
  if (has('pass') || has('catch')) return 'Keep your eyes on the target and follow through toward it after release.';
  if (has('rally') || has('shadowbox')) return 'Focus on clean technique here rather than power — this is about grooving the movement, not overpowering it.';
  if (has('bag') || has('combo') || has('punch')) return 'Keep your guard up between combinations and reset to your stance after every strike.';
  if (has('pose') || has('salutation') || has('flow')) return 'Move with your breath rather than forcing the range of motion — inhale to open or lengthen, exhale to fold or engage.';
  if (has('boulder') || has('campus') || has('hang') || has('flag')) return 'Keep your body tension engaged and pull through your legs and core as much as your arms.';
  if (has('swim') || has('stroke') || has('pull')) return 'Prioritize a long, efficient stroke over rushing the tempo — technique breaks down first when you hurry.';
  if (has('dodge') || has('cradl')) return 'Keep it moving and shield it with your body — a stationary target is an easy one.';
  if (has('ground ball')) return 'Get your body low and behind it, running through the play rather than just reaching.';
  if (has('tackl') || has('contact')) return "Head up and across the body, wrap with both arms, and drive your legs through — never lead with the top of your head.";
  if (has('swing')) return 'Smooth tempo back and through the motion — rushing the transition is the most common cause of a mis-hit.';
  if (has('throw')) return 'Step toward your target and let your hips and shoulder rotate through the throw before your arm follows.';
  if (has('grind') || has('rail') || has('trick') || has('flip')) return "Commit fully once you start — a hesitant attempt is more likely to end in a fall than a committed one.";
  if (has('paddle') || has('wave') || has('carve')) return 'Long, deliberate strokes and early positioning — reading the wave early beats reacting to it late.';
  if (has('tempo')) return "Hold a steady, controlled effort — this pace should feel comfortably hard, not all-out.";
  if (has('spar') || has('strike')) return 'Stay controlled and technical — sparring is for testing timing and technique, not going all-out.';
  return 'Move with control through a full range of motion, and keep a rep or two in reserve so your form doesn\'t break down.';
}

export function isRealExercise(name) {
  return !NON_EXERCISE.has(name.trim().toLowerCase());
}

export function getExerciseInfo(name) {
  const base = normalize(name);
  const caption = CAPTIONS[base]
    || CAPTIONS[base.replace(/s$/, '')]
    || CAPTIONS[base + 's']
    || keywordCaption(base);
  const searchUrl = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(name.replace(/\(.*?\)/g, '').trim() + ' exercise proper form tutorial');
  return { name, caption, searchUrl };
}

export function getAllExerciseNames(WORKOUTS) {
  const names = new Set();
  WORKOUTS.forEach(w => {
    const days = w.isProgram && w.weeks ? w.weeks.flatMap(week => week.days) : w.days;
    days.forEach(d => d.exercises.forEach(e => {
      if (isRealExercise(e.name)) names.add(e.name);
    }));
  });
  // Dedupe near-identical variants (e.g. "Back Squat" vs "Back Squat (heavy)")
  // down to one representative per normalized base, for the browse page.
  const seen = new Map();
  [...names].sort().forEach(n => {
    const base = normalize(n);
    if (!seen.has(base)) seen.set(base, n);
  });
  return [...seen.values()].sort();
}
