// Valid robot actions supported by the contracts
export const VALID_ACTIONS = [
  "sit",
  "stand",
  "wave",
  "walk_forward",
  "walk_backward",
  "turn_left",
  "turn_right",
  "jump",
  "balance",
  "rest",
  "push_up",
  "play_dead",
  "stretch",
  "greeting",
  "sniff",
  "pee",
] as const;

export type RobotAction = (typeof VALID_ACTIONS)[number];

// Action cost in TREAT tokens
export const ACTION_COST = 1;

// Faucet limits
export const MAX_PER_REQUEST = 10;
export const MAX_PER_DAY = 100;

// Session constants
export const SESSION_TIMEOUT_MS = 600_000; // 10 minutes
export const MIN_RENTAL_MINUTES = 1;
export const MAX_RENTAL_MINUTES = 60;

// Action display info
export const ACTION_INFO: Record<
  RobotAction,
  { label: string; description: string; duration: number }
> = {
  sit: { label: "Sit", description: "Robot sits down", duration: 2000 },
  stand: { label: "Stand", description: "Robot stands up", duration: 2000 },
  wave: { label: "Wave", description: "Robot waves hello", duration: 3000 },
  walk_forward: {
    label: "Walk Forward",
    description: "Robot walks forward",
    duration: 4000,
  },
  walk_backward: {
    label: "Walk Backward",
    description: "Robot walks backward",
    duration: 4000,
  },
  turn_left: {
    label: "Turn Left",
    description: "Robot turns left",
    duration: 2000,
  },
  turn_right: {
    label: "Turn Right",
    description: "Robot turns right",
    duration: 2000,
  },
  jump: { label: "Jump", description: "Robot jumps", duration: 2000 },
  balance: {
    label: "Balance",
    description: "Robot balances on two legs",
    duration: 3000,
  },
  rest: { label: "Rest", description: "Robot rests", duration: 2000 },
  push_up: {
    label: "Push Up",
    description: "Robot does push ups",
    duration: 4000,
  },
  play_dead: {
    label: "Play Dead",
    description: "Robot plays dead",
    duration: 3000,
  },
  stretch: { label: "Stretch", description: "Robot stretches", duration: 3000 },
  greeting: {
    label: "Greeting",
    description: "Robot greets you",
    duration: 3000,
  },
  sniff: { label: "Sniff", description: "Robot sniffs around", duration: 2000 },
  pee: { label: "Pee", description: "Robot pretends to pee", duration: 3000 },
};
