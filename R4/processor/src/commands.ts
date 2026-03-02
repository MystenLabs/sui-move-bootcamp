/**
 * Command Mapping - Maps blockchain action names to Bittle serial commands
 *
 * This is the bridge between the digital and physical world!
 */

export interface BittleCommand {
  code: string; // Serial command to send
  duration: number; // How long the action takes (ms)
  description: string;
}

/**
 * Maps action names (from blockchain) to Bittle commands (for serial)
 *
 * Action names are what users submit to the blockchain.
 * Bittle codes are what we send over serial to the robot.
 */
export const ACTION_TO_COMMAND: Record<string, BittleCommand> = {
  // ============================================
  // BASIC POSTURES
  // ============================================
  sit: {
    code: "ksit",
    duration: 2000,
    description: "Sit down",
  },
  stand: {
    code: "kup",
    duration: 2000,
    description: "Stand up",
  },
  balance: {
    code: "kbalance",
    duration: 2000,
    description: "Balance on all fours",
  },
  rest: {
    code: "krest",
    duration: 3000,
    description: "Lie down",
  },
  stretch: {
    code: "kstr",
    duration: 3000,
    description: "Stretch",
  },

  // ============================================
  // WALKING
  // ============================================
  walk_forward: {
    code: "kwkF",
    duration: 4000,
    description: "Walk forward",
  },
  walk_backward: {
    code: "kbk",
    duration: 4000,
    description: "Walk backward",
  },
  walk_left: {
    code: "kwkL",
    duration: 3000,
    description: "Walk left",
  },
  walk_right: {
    code: "kwkR",
    duration: 3000,
    description: "Walk right",
  },

  // ============================================
  // TROTTING (faster)
  // ============================================
  trot_forward: {
    code: "ktrF",
    duration: 3000,
    description: "Trot forward",
  },
  trot_left: {
    code: "ktrL",
    duration: 2500,
    description: "Trot left",
  },
  trot_right: {
    code: "ktrR",
    duration: 2500,
    description: "Trot right",
  },

  // ============================================
  // FUN ACTIONS
  // ============================================
  wave: {
    code: "khi",
    duration: 3000,
    description: "Wave hello",
  },
  jump: {
    code: "kjmp",
    duration: 2000,
    description: "Jump",
  },
  push_up: {
    code: "kpu",
    duration: 5000,
    description: "Do a push-up",
  },
  play_dead: {
    code: "kpd",
    duration: 3000,
    description: "Play dead",
  },
  back_flip: {
    code: "kbf",
    duration: 3500,
    description: "Backflip",
  },

  // ============================================
  // SYSTEM
  // ============================================
  calibrate: {
    code: "kcalib",
    duration: 5000,
    description: "Calibrate servos",
  },
  zero: {
    code: "kzero",
    duration: 2000,
    description: "Zero position",
  },
};

/**
 * Get the Bittle command for an action name
 */
export function getCommand(actionName: string): BittleCommand | null {
  // Normalize: lowercase and replace spaces/dashes with underscores
  const normalized = actionName.toLowerCase().replace(/[-\s]/g, "_");
  return ACTION_TO_COMMAND[normalized] || null;
}

/**
 * Get list of all supported actions
 */
export function getSupportedActions(): string[] {
  return Object.keys(ACTION_TO_COMMAND);
}
