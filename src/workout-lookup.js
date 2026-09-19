// workouts-data.js / sports-data.js / programs-data.js are large content
// libraries (WORKOUTS + all sport/program plans) — fetched in the background
// instead of being part of the initial bundle every visitor downloads,
// matching the same lazy-chunk pattern brain.js uses for brain-data.js.
let dataPromise = null;
function loadData() {
  if (!dataPromise) {
    dataPromise = Promise.all([
      import('./workouts-data.js'),
      import('./sports-data.js'),
      import('./programs-data.js'),
    ]).then(([w, s, p]) => [...w.WORKOUTS, ...s.SPORTS_WORKOUTS, ...p.PROGRAM_WORKOUTS]);
  }
  return dataPromise;
}

export async function findWorkoutById(id) {
  const allWorkouts = await loadData();
  return allWorkouts.find(w => w.id === id) || null;
}
