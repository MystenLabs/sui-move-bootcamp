/**
 * Unitree GO1 Robot Configuration
 *
 * Kinematic parameters extracted from the official unitree_ros SDK:
 * https://github.com/unitreerobotics/unitree_ros
 *
 * Source files:
 *   robots/go1_description/xacro/const.xacro  — dimensions, joint limits, inertias
 *   robots/go1_description/xacro/robot.xacro   — assembly (trunk + 4 legs + sensors)
 *   robots/go1_description/xacro/leg.xacro      — parametric leg macro
 *   robots/go1_description/config/robot_control.yaml — PID gains
 *
 * Coordinate frame convention (ROS REP-103):
 *   X = forward, Y = left, Z = up
 *
 * The GO1 has 12 actuated revolute joints (3 per leg):
 *   hip_joint   — abduction/adduction (roll around X-axis)
 *   thigh_joint — flexion/extension (pitch around Y-axis)
 *   calf_joint  — knee flexion (pitch around Y-axis)
 */

// ── Joint limits (radians) from const.xacro ──────────────────

export const JOINT_LIMITS = {
  hip:   { lower: -0.863, upper: 0.863 },   // ±49.4°
  thigh: { lower: -0.686, upper: 4.501 },   // -39.3° to 257.8°
  calf:  { lower: -2.818, upper: -0.888 },  // -161.5° to -50.9°
} as const;

export const JOINT_EFFORT = {
  hip:   23.7,   // Nm
  thigh: 23.7,   // Nm
  calf:  35.55,  // Nm
} as const;

export const JOINT_VELOCITY = {
  hip:   30.1,   // rad/s
  thigh: 30.1,   // rad/s
  calf:  20.06,  // rad/s
} as const;

// ── Link dimensions (meters) from const.xacro ───────────────

export const GO1_DIMENSIONS = {
  trunkLength:  0.3762,
  trunkWidth:   0.0935,
  trunkHeight:  0.114,
  hipOffset:    0.08,    // lateral offset of hip housing
  thighOffset:  0.08,    // lateral offset from hip joint to thigh joint
  thighLength:  0.213,   // upper leg (hip-to-knee)
  calfLength:   0.213,   // lower leg (knee-to-foot)
  footRadius:   0.02,
  legOffsetX:   0.1881,  // longitudinal offset of hip from trunk center
  legOffsetY:   0.04675, // lateral offset of hip from trunk center
} as const;

export const GO1_MASS = {
  trunk: 5.204,
  hipRotorInertia:   0.891,
  hipLink:           0.696,
  thighRotorInertia: 0.891,
  thighLink:         1.013,
  calfLink:          0.166,
  totalApprox:       12.84, // kg
} as const;

// ── URDF joint names ─────────────────────────────────────────

export type LegPrefix = 'FR' | 'FL' | 'RR' | 'RL';

export const LEG_PREFIXES: LegPrefix[] = ['FR', 'FL', 'RR', 'RL'];

export const LEG_LABELS: Record<LegPrefix, string> = {
  FR: 'Front Right',
  FL: 'Front Left',
  RR: 'Rear Right',
  RL: 'Rear Left',
};

/** Returns the 3 URDF joint names for a given leg */
export function getJointNames(leg: LegPrefix) {
  return {
    hip:   `${leg}_hip_joint`,
    thigh: `${leg}_thigh_joint`,
    calf:  `${leg}_calf_joint`,
  } as const;
}

/** Returns the URDF link names for a given leg */
export function getLinkNames(leg: LegPrefix) {
  return {
    hip:   `${leg}_hip`,
    thigh: `${leg}_thigh`,
    calf:  `${leg}_calf`,
    foot:  `${leg}_foot`,
  } as const;
}

/** All 12 actuated joint names in URDF order */
export const ALL_JOINT_NAMES = LEG_PREFIXES.flatMap((leg) => {
  const names = getJointNames(leg);
  return [names.hip, names.thigh, names.calf];
});

// ── Joint axis definitions (from URDF) ───────────────────────

export const JOINT_AXES = {
  hip:   { x: 1, y: 0, z: 0 },  // roll around X
  thigh: { x: 0, y: 1, z: 0 },  // pitch around Y
  calf:  { x: 0, y: 1, z: 0 },  // pitch around Y
} as const;

// ── Hip joint origins from trunk center ──────────────────────

export const HIP_ORIGINS: Record<LegPrefix, { x: number; y: number; z: number }> = {
  FR: { x:  0.1881, y: -0.04675, z: 0 },
  FL: { x:  0.1881, y:  0.04675, z: 0 },
  RR: { x: -0.1881, y: -0.04675, z: 0 },
  RL: { x: -0.1881, y:  0.04675, z: 0 },
};

// ── Controller PID gains (from robot_control.yaml) ───────────

export const PID_GAINS = {
  hip:   { p: 100, i: 0, d: 5 },
  thigh: { p: 300, i: 0, d: 8 },
  calf:  { p: 300, i: 0, d: 8 },
} as const;

// ── Sensor configuration ─────────────────────────────────────

export const CAMERAS = [
  { name: 'face',     position: { x: 0.2785,  y: 0.0125,  z: 0.0167 } },
  { name: 'chin',     position: { x: 0.2522,  y: 0.0125,  z: -0.0436 } },
  { name: 'left',     position: { x: -0.066,  y: 0.082,   z: -0.0176 } },
  { name: 'right',    position: { x: -0.041,  y: -0.082,  z: -0.0176 } },
  { name: 'rearDown', position: { x: -0.0825, y: 0.0125,  z: -0.04365 } },
] as const;

export const ULTRASOUND_SENSORS = [
  { name: 'left',  position: { x: -0.0535, y: 0.0826,  z: 0.00868 } },
  { name: 'right', position: { x: -0.0535, y: -0.0826, z: 0.00868 } },
  { name: 'face',  position: { x: 0.2747,  y: 0.0,     z: -0.0088 } },
] as const;

export const IMU_POSITION = { x: -0.01592, y: -0.06659, z: -0.00617 } as const;

// ── Mapping: simulator joint names → URDF joint names ────────
// Our simulator uses frontLeftHip/frontLeftKnee naming;
// the URDF uses FL_hip_joint/FL_thigh_joint/FL_calf_joint.
// The simulator currently lacks hip roll joints; thigh = hip, knee = calf.

export const SIMULATOR_TO_URDF: Record<string, string> = {
  frontLeftHip:    'FL_thigh_joint',
  frontLeftKnee:   'FL_calf_joint',
  frontRightHip:   'FR_thigh_joint',
  frontRightKnee:  'FR_calf_joint',
  backLeftHip:     'RL_thigh_joint',
  backLeftKnee:    'RL_calf_joint',
  backRightHip:    'RR_thigh_joint',
  backRightKnee:   'RR_calf_joint',
};

export const URDF_TO_SIMULATOR: Record<string, string> = Object.fromEntries(
  Object.entries(SIMULATOR_TO_URDF).map(([k, v]) => [v, k]),
);

// ── Link hierarchy (for reference/visualization) ─────────────

export const LINK_HIERARCHY = `
base (root)
  └── trunk  (floating_base, fixed)
        ├── imu_link
        ├── FR_hip → FR_thigh → FR_calf → FR_foot
        ├── FL_hip → FL_thigh → FL_calf → FL_foot
        ├── RR_hip → RR_thigh → RR_calf → RR_foot
        ├── RL_hip → RL_thigh → RL_calf → RL_foot
        ├── camera_face, camera_chin, camera_left, camera_right, camera_rearDown
        └── ultraSound_left, ultraSound_right, ultraSound_face
` as const;
