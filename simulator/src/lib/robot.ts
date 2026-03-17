// Virtual Bittle Robot — State Machine
// Simulates the Petoi Bittle X command protocol

export interface JointAngles {
  headPitch: number;
  headYaw: number;
  tailWag: number;
  frontLeftHip: number;
  frontLeftKnee: number;
  frontRightHip: number;
  frontRightKnee: number;
  backLeftHip: number;
  backLeftKnee: number;
  backRightHip: number;
  backRightKnee: number;
}

export interface RobotState {
  action: string;
  actionLabel: string;
  joints: JointAngles;
  bodyHeight: number;
  bodyPitch: number;
  bodyRoll: number;
  moving: boolean;
  walkCycle: number;
  mood: "happy" | "neutral" | "sleepy" | "excited";
  battery: number;
  uptime: number;
  commandsExecuted: number;
}

export interface RobotEvent {
  type: "state_change" | "command_ack" | "error" | "info";
  action?: string;
  message: string;
  timestamp: number;
}

type StateListener = (state: RobotState, event: RobotEvent) => void;

// Default standing pose
const STAND_JOINTS: JointAngles = {
  headPitch: 0,
  headYaw: 0,
  tailWag: 0,
  frontLeftHip: 0,
  frontLeftKnee: 0,
  frontRightHip: 0,
  frontRightKnee: 0,
  backLeftHip: 0,
  backLeftKnee: 0,
  backRightHip: 0,
  backRightKnee: 0,
};

// Alias map: alternate command names → canonical Bittle action codes
// Supports R3's command set, R1's command names, and common shortcuts
const ALIASES: Record<string, string> = {
  // R3 WebSocket protocol commands
  forward: "wkF",
  backward: "bk",
  left: "wkL",
  right: "wkR",
  stand: "balance",
  lie: "rest",
  wave: "hi",
  sleep: "rest",
  wake: "balance",
  reset: "balance",
  // R1 command names (camelCase)
  walkForward: "wkF",
  walkBackward: "bk",
  walkLeft: "wkL",
  walkRight: "wkR",
  trotForward: "trF",
  trotLeft: "trL",
  trotRight: "trR",
  pushUp: "pu",
  playDead: "pd",
  stretch: "str",
  backFlip: "bf",
  calibrate: "balance",
  zero: "balance",
  standUp: "up",
  // R5/R7/R10 common names
  sitDown: "sit",
  standUp2: "up",
  jump: "jmp",
  trot: "trF",
  pushup: "pu",
  playdead: "pd",
  standup: "up",
  // Short aliases
  walk: "wkF",
  back: "bk",
  hello: "hi",
  // Underscore variants (from blockchain action names)
  walk_forward: "wkF",
  walk_backward: "bk",
  walk_left: "wkL",
  walk_right: "wkR",
  trot_forward: "trF",
  push_up: "pu",
  play_dead: "pd",
  stand_up: "up",
  back_flip: "bf",
};

// Command → pose definitions
const POSES: Record<
  string,
  {
    label: string;
    joints: Partial<JointAngles>;
    bodyHeight?: number;
    bodyPitch?: number;
    bodyRoll?: number;
    mood?: RobotState["mood"];
    duration: number;
    moving?: boolean;
  }
> = {
  sit: {
    label: "Sitting",
    joints: {
      backLeftHip: -60,
      backLeftKnee: 90,
      backRightHip: -60,
      backRightKnee: 90,
      frontLeftHip: 10,
      frontLeftKnee: -5,
      frontRightHip: 10,
      frontRightKnee: -5,
    },
    bodyHeight: -0.3,
    bodyPitch: -15,
    mood: "neutral",
    duration: 2000,
  },
  balance: {
    label: "Standing (balanced)",
    joints: { ...STAND_JOINTS },
    bodyHeight: 0,
    bodyPitch: 0,
    mood: "neutral",
    duration: 2000,
  },
  up: {
    label: "Standing tall",
    joints: {
      frontLeftKnee: -15,
      frontRightKnee: -15,
      backLeftKnee: -15,
      backRightKnee: -15,
    },
    bodyHeight: 0.15,
    mood: "happy",
    duration: 2000,
  },
  rest: {
    label: "Resting",
    joints: {
      frontLeftHip: -45,
      frontLeftKnee: 90,
      frontRightHip: -45,
      frontRightKnee: 90,
      backLeftHip: -45,
      backLeftKnee: 90,
      backRightHip: -45,
      backRightKnee: 90,
    },
    bodyHeight: -0.55,
    bodyPitch: 0,
    mood: "sleepy",
    duration: 3000,
  },
  hi: {
    label: "Waving hello!",
    joints: {
      frontRightHip: -80,
      frontRightKnee: -40,
      frontLeftHip: 10,
      frontLeftKnee: 5,
      backLeftHip: -10,
      backLeftKnee: 15,
      backRightHip: -10,
      backRightKnee: 15,
    },
    bodyPitch: -8,
    bodyRoll: 8,
    mood: "happy",
    duration: 3000,
  },
  wkF: {
    label: "Walking forward",
    joints: { ...STAND_JOINTS },
    mood: "happy",
    duration: 4000,
    moving: true,
  },
  bk: {
    label: "Walking backward",
    joints: { ...STAND_JOINTS },
    mood: "neutral",
    duration: 4000,
    moving: true,
  },
  trF: {
    label: "Trotting forward",
    joints: { ...STAND_JOINTS },
    mood: "excited",
    duration: 3000,
    moving: true,
  },
  jmp: {
    label: "Jumping!",
    joints: {
      frontLeftKnee: -30,
      frontRightKnee: -30,
      backLeftKnee: -30,
      backRightKnee: -30,
    },
    bodyHeight: 0.4,
    mood: "excited",
    duration: 2000,
  },
  pu: {
    label: "Doing a push-up",
    joints: {
      frontLeftHip: -30,
      frontLeftKnee: 50,
      frontRightHip: -30,
      frontRightKnee: 50,
      backLeftHip: 5,
      backLeftKnee: -10,
      backRightHip: 5,
      backRightKnee: -10,
    },
    bodyPitch: 20,
    bodyHeight: -0.2,
    mood: "excited",
    duration: 5000,
  },
  pd: {
    label: "Playing dead",
    joints: {
      frontLeftHip: 30,
      frontLeftKnee: 60,
      frontRightHip: -60,
      frontRightKnee: 60,
      backLeftHip: 30,
      backLeftKnee: 60,
      backRightHip: -60,
      backRightKnee: 60,
    },
    bodyHeight: -0.6,
    bodyRoll: 90,
    mood: "sleepy",
    duration: 3000,
  },
  str: {
    label: "Stretching",
    joints: {
      frontLeftHip: 30,
      frontLeftKnee: -20,
      frontRightHip: 30,
      frontRightKnee: -20,
      backLeftHip: -40,
      backLeftKnee: 30,
      backRightHip: -40,
      backRightKnee: 30,
    },
    bodyPitch: 15,
    bodyHeight: -0.15,
    mood: "happy",
    duration: 3000,
  },
  // Additional movement commands
  wkL: {
    label: "Walking left",
    joints: { ...STAND_JOINTS },
    bodyRoll: -5,
    mood: "neutral",
    duration: 4000,
    moving: true,
  },
  wkR: {
    label: "Walking right",
    joints: { ...STAND_JOINTS },
    bodyRoll: 5,
    mood: "neutral",
    duration: 4000,
    moving: true,
  },
  trL: {
    label: "Trotting left",
    joints: { ...STAND_JOINTS },
    bodyRoll: -5,
    mood: "excited",
    duration: 3000,
    moving: true,
  },
  trR: {
    label: "Trotting right",
    joints: { ...STAND_JOINTS },
    bodyRoll: 5,
    mood: "excited",
    duration: 3000,
    moving: true,
  },
  bf: {
    label: "Back flip!",
    joints: {
      frontLeftKnee: -40,
      frontRightKnee: -40,
      backLeftKnee: -40,
      backRightKnee: -40,
    },
    bodyHeight: 0.5,
    bodyPitch: -30,
    mood: "excited",
    duration: 3000,
  },
};

export class VirtualBittle {
  state: RobotState;
  private listeners: StateListener[] = [];
  private actionTimer: ReturnType<typeof setTimeout> | null = null;
  private startTime: number;

  constructor() {
    this.startTime = Date.now();
    this.state = {
      action: "idle",
      actionLabel: "Idle",
      joints: { ...STAND_JOINTS },
      bodyHeight: 0,
      bodyPitch: 0,
      bodyRoll: 0,
      moving: false,
      walkCycle: 0,
      mood: "neutral",
      battery: 100,
      uptime: 0,
      commandsExecuted: 0,
    };
  }

  onStateChange(listener: StateListener) {
    this.listeners.push(listener);
  }

  removeListener(listener: StateListener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  private emit(event: RobotEvent) {
    for (const listener of this.listeners) {
      listener(this.state, event);
    }
  }

  /** Resolve an action name through the alias table */
  private resolveAction(name: string): string {
    // Direct match first
    if (POSES[name]) return name;
    // Check aliases
    const aliased = ALIASES[name];
    if (aliased && POSES[aliased]) return aliased;
    return name; // Return as-is (will fail in executeAction with helpful error)
  }

  /** Parse a raw serial command (e.g., "ksit\n") and execute it */
  processCommand(raw: string): string {
    const cmd = raw.trim();

    // Bittle commands start with 'k' prefix for skills
    if (cmd.startsWith("k")) {
      const action = cmd.slice(1); // Strip 'k' prefix
      return this.executeAction(action);
    }

    // Also accept bare action names and aliases (for WebSocket/R3 compat)
    return this.executeAction(cmd);
  }

  /** Execute a named action */
  executeAction(action: string): string {
    // Resolve aliases
    action = this.resolveAction(action);
    const pose = POSES[action];

    if (!pose) {
      const msg = `Unknown action: "${action}" (valid: ${Object.keys(POSES).join(", ")})`;
      this.emit({
        type: "error",
        action,
        message: msg,
        timestamp: Date.now(),
      });
      return msg;
    }

    // Cancel any in-progress action
    if (this.actionTimer) {
      clearTimeout(this.actionTimer);
    }

    // Apply the pose
    this.state.action = action;
    this.state.actionLabel = pose.label;
    this.state.moving = pose.moving || false;
    this.state.mood = pose.mood || "neutral";
    this.state.commandsExecuted++;
    this.state.uptime = Math.floor((Date.now() - this.startTime) / 1000);

    // Drain battery slightly
    this.state.battery = Math.max(0, this.state.battery - 0.5);

    // Merge joint angles
    this.state.joints = {
      ...STAND_JOINTS,
      ...(pose.joints as JointAngles),
    };
    if (pose.bodyHeight !== undefined) this.state.bodyHeight = pose.bodyHeight;
    if (pose.bodyPitch !== undefined) this.state.bodyPitch = pose.bodyPitch;
    if (pose.bodyRoll !== undefined) this.state.bodyRoll = pose.bodyRoll;

    const msg = `[OK] ${pose.label}`;
    this.emit({
      type: "state_change",
      action,
      message: msg,
      timestamp: Date.now(),
    });

    // After duration, return to idle standing
    this.actionTimer = setTimeout(() => {
      this.state.action = "idle";
      this.state.actionLabel = "Idle";
      this.state.moving = false;
      this.state.joints = { ...STAND_JOINTS };
      this.state.bodyHeight = 0;
      this.state.bodyPitch = 0;
      this.state.bodyRoll = 0;
      this.state.mood = "neutral";

      this.emit({
        type: "info",
        message: "Action complete, returned to idle",
        timestamp: Date.now(),
      });
    }, pose.duration);

    return msg;
  }

  getState(): RobotState {
    this.state.uptime = Math.floor((Date.now() - this.startTime) / 1000);
    return { ...this.state };
  }

  /** List all available commands */
  static getCommands(): Array<{
    code: string;
    serial: string;
    label: string;
    duration: number;
  }> {
    return Object.entries(POSES).map(([code, pose]) => ({
      code,
      serial: `k${code}`,
      label: pose.label,
      duration: pose.duration,
    }));
  }
}
