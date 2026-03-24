/**
 * Forward Kinematics for the Unitree GO1
 *
 * Computes foot position in trunk frame given 3 joint angles per leg.
 * Uses the kinematic dimensions from the URDF (unitree-go1.ts).
 */

import { GO1_DIMENSIONS, HIP_ORIGINS, type LegPrefix } from '../unitree-go1';

const { thighLength: L1, calfLength: L2, thighOffset: D } = GO1_DIMENSIONS;

/**
 * Compute foot position in trunk frame for one leg.
 *
 * @param leg     - Which leg (FR, FL, RR, RL)
 * @param hipRoll - Hip roll angle in radians (rotation around X-axis)
 * @param thigh   - Thigh pitch angle in radians (rotation around Y-axis)
 * @param calf    - Calf pitch angle in radians (rotation around Y-axis)
 * @returns       - [x, y, z] foot position in trunk frame (meters)
 */
export function legFK(
  leg: LegPrefix,
  hipRoll: number,
  thigh: number,
  calf: number,
): [number, number, number] {
  const origin = HIP_ORIGINS[leg];
  const sideSign = leg === 'FL' || leg === 'RL' ? 1 : -1;

  // Hip roll rotates the leg plane around X
  const cr = Math.cos(hipRoll);
  const sr = Math.sin(hipRoll);

  // Thigh + calf pitch in the sagittal plane
  const kneeAngle = thigh + calf;
  const dx = -L1 * Math.sin(thigh) - L2 * Math.sin(kneeAngle);
  const dz = -L1 * Math.cos(thigh) - L2 * Math.cos(kneeAngle);

  // Lateral offset from hip roll
  const lateralOffset = sideSign * D;
  const dy = lateralOffset * cr - dz * sr;
  const dzFinal = lateralOffset * sr + dz * cr;

  return [
    origin.x + dx,
    origin.y + dy,
    origin.z + dzFinal,
  ];
}

/**
 * Compute all 4 foot positions given 12 joint angles.
 *
 * @param angles - Array of 12 angles in order: [FR_hip, FR_thigh, FR_calf, FL_..., RR_..., RL_...]
 * @returns      - Object with foot positions for each leg
 */
export function allFeetFK(angles: number[]): Record<LegPrefix, [number, number, number]> {
  return {
    FR: legFK('FR', angles[0], angles[1], angles[2]),
    FL: legFK('FL', angles[3], angles[4], angles[5]),
    RR: legFK('RR', angles[6], angles[7], angles[8]),
    RL: legFK('RL', angles[9], angles[10], angles[11]),
  };
}
