import { WORKOUTS } from './workouts-data.js';
import { SPORTS_WORKOUTS } from './sports-data.js';
import { PROGRAM_WORKOUTS } from './programs-data.js';

const ALL_WORKOUTS = [...WORKOUTS, ...SPORTS_WORKOUTS, ...PROGRAM_WORKOUTS];

export function findWorkoutById(id) {
  return ALL_WORKOUTS.find(w => w.id === id) || null;
}
