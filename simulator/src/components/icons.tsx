import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

function BaseIcon({ children, className, viewBox = '0 0 24 24', ...props }: IconProps & { viewBox?: string }) {
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function SuiDropletIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 2.75C9.15 6.22 6.6 8.94 5.58 12.15A6.42 6.42 0 0 0 12 21.25a6.42 6.42 0 0 0 6.42-9.1C17.4 8.94 14.85 6.22 12 2.75Z" />
      <path d="M9.6 14.5c.35 1.4 1.38 2.1 3.1 2.1 1.05 0 1.93-.3 2.65-.9" />
    </BaseIcon>
  );
}

export function PlaygroundIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
      <path d="M8 9.5h8" />
      <path d="M8 13.5h5" />
      <circle cx="17.25" cy="13.5" r="1.25" />
    </BaseIcon>
  );
}

export function CurriculumIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M6 4.5h12" />
      <path d="M6 10h12" />
      <path d="M6 15.5h7" />
      <path d="M17.5 14.5v5" />
      <path d="M15 17h5" />
    </BaseIcon>
  );
}

export function TerminalIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
      <path d="M7.25 9.25 10 12l-2.75 2.75" />
      <path d="M12.5 15h4.25" />
    </BaseIcon>
  );
}

export function CompassIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m14.85 9.15-1.65 4.05-4.05 1.65 1.65-4.05 4.05-1.65Z" />
    </BaseIcon>
  );
}

export function BridgeIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 17.5h16" />
      <path d="M6 17.5V11c0-2.1 1.8-3.75 4-3.75s4 1.65 4 3.75v6.5" />
      <path d="M10 17.5V12" />
      <path d="M14 17.5V12" />
    </BaseIcon>
  );
}

export function ShieldWaveIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 3.25c2.55 1.55 4.8 2.32 6.75 2.32v5.25c0 4.2-2.7 7.55-6.75 9.93-4.05-2.38-6.75-5.73-6.75-9.93V5.57c1.95 0 4.2-.77 6.75-2.32Z" />
      <path d="M8.75 11.5c1.1-1.25 2.26-1.88 3.48-1.88 1.18 0 2.19.43 3.02 1.28" />
      <path d="M9.3 14.35c.82-.73 1.69-1.1 2.63-1.1.84 0 1.7.28 2.57.82" />
    </BaseIcon>
  );
}

export function StackIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m12 3.75 8 4.25-8 4.25-8-4.25 8-4.25Z" />
      <path d="m4 11.25 8 4.25 8-4.25" />
      <path d="m4 15.5 8 4.25 8-4.25" />
    </BaseIcon>
  );
}

export function OrbitIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="1.75" />
      <path d="M4.5 12c0-4.1 3.35-7.5 7.5-7.5 2.45 0 4.73 1.15 6.14 3.1" />
      <path d="M19.5 12c0 4.1-3.35 7.5-7.5 7.5-2.45 0-4.73-1.15-6.14-3.1" />
    </BaseIcon>
  );
}

export function CameraResetIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4.5 11.75a7.5 7.5 0 0 1 12.4-5.65" />
      <path d="M18.5 6V2.75" />
      <path d="M18.5 6h-3.25" />
      <path d="M19.5 12.25A7.5 7.5 0 0 1 7.1 17.9" />
      <path d="M5.5 18v3.25" />
      <path d="M5.5 18h3.25" />
    </BaseIcon>
  );
}

export function GridIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2.5" />
      <path d="M12 4v16" />
      <path d="M4 12h16" />
    </BaseIcon>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </BaseIcon>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M19 12H5" />
      <path d="m11 6-6 6 6 6" />
    </BaseIcon>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5v5l3.25 1.75" />
    </BaseIcon>
  );
}

export function SparkIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m12 3.5 1.9 4.6 4.6 1.9-4.6 1.9L12 16.5l-1.9-4.6-4.6-1.9 4.6-1.9L12 3.5Z" />
      <path d="m18.5 15.5.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1Z" />
    </BaseIcon>
  );
}

export function HardwareIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="5" y="7.5" width="14" height="9" rx="2.5" />
      <path d="M9 7.5V5.25" />
      <path d="M15 7.5V5.25" />
      <circle cx="9" cy="12" r="1.2" />
      <path d="M12 12h3" />
    </BaseIcon>
  );
}
