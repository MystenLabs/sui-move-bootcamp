/**
 * Analytical Inverse Kinematics for the Unitree GO1
 *
 * Solves the 3-DOF leg IK problem (hip roll + thigh pitch + calf pitch)
 * given a desired foot position in trunk frame.
 *
 * This is the same algorithm used in unitree_legged_sdk's
 * footPositionInHipFrame2JointAngle function.
 */

import { GO1_DIMENSIONS, HIP_ORIGINS, JOINT_LIMITS, type LegPrefix } from '../unitree-go1';

const { thighLength: L1, calfLength: L2, thighOffset: D } = GO1_DIMENSIONS;

export interface IKResult {
  hipRoll: number;
  thigh: number;
  calf: number;
}

/**
 * Solve IK for one leg.
 *
 * @param leg    - Which leg (FR, FL, RR, RL)
 * @param footX  - Foot X position in trunk frame (forward)
 * @param footY  - Foot Y position in trunk frame (left)
 * @param footZ  - Foot Z position in trunk frame (up)
 * @returns      - Joint angles or null if unreachable
 */
export function legIK(
  leg: LegPrefix,
  footX: number,
  footY: number,
  footZ: number,
): IKResult | null {
  const origin = HIP_ORIGINS[leg];
  const sideSign = leg === 'FL' || leg === 'RL' ? 1 : -1;

  // Transform to hip frame
  const px = footX - origin.x;
  const py = footY - origin.y;
  const pz = footZ - origin.z;

  // Solve hip roll from lateral geometry
  const lateralDist = Math.sqrt(py * py + pz * pz);
  if (lateralDist < Math.abs(D * sideSign)) return null; // unreachable

  const hipRoll = Math.atan2(
    -pz,
    sideSign * Math.sqrt(Math.max(0, py * py + pz * pz - D * D)),
  ) - Math.atan2(0, sideSign * D);

  // Rotate into the hip-roll-aligned sagittal plane
  const cr = Math.cos(hipRoll);
  const sr = Math.sin(hipRoll);
  const pzRot = py * sr + pz * cr;
  // pzRot is the effective "downward" distance in the sagittal plane

  // 2R planar IK (thigh + calf)
  const reach = px * px + pzRot * pzRot;
  const L1sq = L1 * L1;
  const L2sq = L2 * L2;

  const cosCalfArg = (reach - L1sq - L2sq) / (2 * L1 * L2);
  if (Math.abs(cosCalfArg) > 1) return null; // unreachable

  // "Elbow back" solution (negative calf angle, matching GO1 convention)
  const calf = -Math.acos(clamp(cosCalfArg, -1, 1));

  const thigh =
    Math.atan2(px, -pzRot) -
    Math.atan2(L2 * Math.sin(calf), L1 + L2 * Math.cos(calf));

  // Clamp to joint limits
  const result: IKResult = {
    hipRoll: clamp(hipRoll, JOINT_LIMITS.hip.lower, JOINT_LIMITS.hip.upper),
    thigh: clamp(thigh, JOINT_LIMITS.thigh.lower, JOINT_LIMITS.thigh.upper),
    calf: clamp(calf, JOINT_LIMITS.calf.lower, JOINT_LIMITS.calf.upper),
  };

  return result;
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

/**
 * Compute default standing foot positions (all legs touching ground).
 * Useful as a starting point for gait planning.
 */
export function defaultStandingFeet(): Record<LegPrefix, [number, number, number]> {
  const standHeight = -(L1 + L2 * 0.85); // slightly bent knees
  return {
    FR: [HIP_ORIGINS.FR.x, HIP_ORIGINS.FR.y - D, standHeight],
    FL: [HIP_ORIGINS.FL.x, HIP_ORIGINS.FL.y + D, standHeight],
    RR: [HIP_ORIGINS.RR.x, HIP_ORIGINS.RR.y - D, standHeight],
    RL: [HIP_ORIGINS.RL.x, HIP_ORIGINS.RL.y + D, standHeight],
  };
}
