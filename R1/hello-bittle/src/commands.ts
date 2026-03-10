/**
 * Bittle X Serial Commands
 *
 * Commands are sent as ASCII strings over serial.
 * Format: "k" prefix + action name (e.g., "ksit", "kbalance")
 *
 * Full command list: https://docs.petoi.com/apis/serial-protocol
 */

export const COMMANDS = {
  // Basic Postures
  sit: "ksit",
  balance: "kbalance",
  up: "kup",
  rest: "krest",
  zero: "kzero",

  // Movement
  walkForward: "kwkF",
  walkBackward: "kbk",
  walkLeft: "kwkL",
  walkRight: "kwkR",

  // Trotting (faster than walking)
  trotForward: "ktrF",
  trotLeft: "ktrL",
  trotRight: "ktrR",

  // Fun Actions
  hi: "khi",
  pushUp: "kpu",
  jump: "kjmp",
  playDead: "kpd",
  stretch: "kstr",
  backFlip: "kbf",

  // System
  calibrate: "kcalib",
} as const;

export type CommandName = keyof typeof COMMANDS;
