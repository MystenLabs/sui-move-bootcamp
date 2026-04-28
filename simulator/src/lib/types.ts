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
  mood: 'happy' | 'neutral' | 'sleepy' | 'excited';
  battery: number;
  uptime: number;
  commandsExecuted: number;
}

export interface RobotEvent {
  type: 'state_change' | 'command_ack' | 'error' | 'info';
  action?: string;
  message: string;
  timestamp: number;
}

export interface ModuleInfo {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  time: string;
  simScript: string;
  hardware: boolean;
  summary: string;
  artifact: string;
  focus: string[];
  readme?: string;
}

export interface Command {
  code: string;
  serial: string;
  label: string;
  duration: number;
}
