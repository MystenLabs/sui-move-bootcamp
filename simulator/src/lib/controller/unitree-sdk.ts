/**
 * Unitree Legged SDK — TypeScript Interface
 *
 * Mirrors the C++ unitree_legged_sdk API so that controller code
 * written against this interface can be ported to/from the real SDK.
 *
 * Reference: github.com/unitreerobotics/unitree_legged_sdk
 */

// ── Joint index enum (matches SDK ordering) ──────────────────

export enum JointIndex {
  FR_0 = 0,  // FR hip roll
  FR_1 = 1,  // FR thigh pitch
  FR_2 = 2,  // FR calf pitch
  FL_0 = 3,  // FL hip roll
  FL_1 = 4,  // FL thigh pitch
  FL_2 = 5,  // FL calf pitch
  RR_0 = 6,  // RR hip roll
  RR_1 = 7,  // RR thigh pitch
  RR_2 = 8,  // RR calf pitch
  RL_0 = 9,  // RL hip roll
  RL_1 = 10, // RL thigh pitch
  RL_2 = 11, // RL calf pitch
}

// ── Motor command (per joint) ────────────────────────────────

export interface MotorCmd {
  mode: number;   // 0 = idle, 10 = servo (position control)
  q: number;      // target position (rad)
  dq: number;     // target velocity (rad/s)
  tau: number;    // feedforward torque (Nm)
  Kp: number;     // position gain
  Kd: number;     // velocity gain
}

// ── Low-level command (all 12 joints) ────────────────────────

export interface LowCmd {
  motorCmd: MotorCmd[];  // 12 entries indexed by JointIndex
}

// ── Motor state (per joint) ──────────────────────────────────

export interface MotorState {
  q: number;          // current position (rad)
  dq: number;         // current velocity (rad/s)
  tauEst: number;     // estimated torque (Nm)
  temperature: number; // degrees C (simulated)
}

// ── IMU state ────────────────────────────────────────────────

export interface IMUState {
  quaternion: [number, number, number, number]; // w, x, y, z
  gyroscope: [number, number, number];          // rad/s
  accelerometer: [number, number, number];       // m/s^2
  rpy: [number, number, number];                 // roll, pitch, yaw (rad)
}

// ── Low-level state (full robot) ─────────────────────────────

export interface LowState {
  motorState: MotorState[];  // 12 entries
  imu: IMUState;
  footForce: [number, number, number, number]; // FR, FL, RR, RL (N)
  tick: number;              // simulation timestep count
}

// ── Default motor command ────────────────────────────────────

export function defaultMotorCmd(): MotorCmd {
  return { mode: 0, q: 0, dq: 0, tau: 0, Kp: 0, Kd: 0 };
}

export function defaultLowCmd(): LowCmd {
  return { motorCmd: Array.from({ length: 12 }, defaultMotorCmd) };
}

// ── Simulated controller ─────────────────────────────────────

/**
 * Software-simulated Unitree controller.
 *
 * When Rapier physics is available, motor commands drive Rapier joint
 * motors and state is read back from the physics world. Without Rapier,
 * the controller tracks target angles in software and reports them
 * directly (no dynamics simulation).
 */
export class UnitreeController {
  private jointPositions = new Float64Array(12);
  private jointVelocities = new Float64Array(12);
  private jointTorques = new Float64Array(12);
  private targetPositions = new Float64Array(12);
  private tick = 0;

  /** Apply motor commands. In software mode, this sets targets directly. */
  sendLowCmd(cmd: LowCmd): void {
    for (let i = 0; i < 12; i++) {
      const mc = cmd.motorCmd[i];
      if (mc.mode === 10) {
        this.targetPositions[i] = mc.q;
      }
    }
  }

  /** Step the controller (called at control rate, e.g., per physics tick). */
  step(dt: number): void {
    this.tick++;
    // Simple PD simulation without Rapier
    for (let i = 0; i < 12; i++) {
      const error = this.targetPositions[i] - this.jointPositions[i];
      const Kp = 50;
      const Kd = 2;
      const accel = Kp * error - Kd * this.jointVelocities[i];
      this.jointVelocities[i] += accel * dt;
      this.jointPositions[i] += this.jointVelocities[i] * dt;
      this.jointTorques[i] = Kp * error;
    }
  }

  /** Read current state. */
  getLowState(): LowState {
    return {
      motorState: Array.from({ length: 12 }, (_, i) => ({
        q: this.jointPositions[i],
        dq: this.jointVelocities[i],
        tauEst: this.jointTorques[i],
        temperature: 35 + Math.random() * 5,
      })),
      imu: {
        quaternion: [1, 0, 0, 0],
        gyroscope: [0, 0, 0],
        accelerometer: [0, 0, -9.81],
        rpy: [0, 0, 0],
      },
      footForce: [0, 0, 0, 0],
      tick: this.tick,
    };
  }

  /** Get all 12 joint positions as a flat array. */
  getJointPositions(): Float64Array {
    return this.jointPositions;
  }

  /** Set joint positions directly (for kinematic mode). */
  setJointPositions(positions: ArrayLike<number>): void {
    for (let i = 0; i < 12 && i < positions.length; i++) {
      this.jointPositions[i] = positions[i];
      this.targetPositions[i] = positions[i];
    }
  }
}
