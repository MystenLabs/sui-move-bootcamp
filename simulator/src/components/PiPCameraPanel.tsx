'use client';

import { useEffect, useRef } from 'react';

interface PiPCameraPanelProps {
  names: string[];
  canvasRefs: React.RefObject<(HTMLCanvasElement | null)[]>;
}

export default function PiPCameraPanel({ names, canvasRefs }: PiPCameraPanelProps) {
  return (
    <div className="absolute bottom-14 left-4 z-20 flex gap-1.5 rounded-xl border border-gray-200 bg-white/92 p-2 shadow-sm backdrop-blur-sm">
      {names.map((name, i) => (
        <div key={name} className="flex flex-col items-center gap-1">
          <canvas
            ref={(el) => {
              if (canvasRefs.current) canvasRefs.current[i] = el;
            }}
            width={160}
            height={120}
            className="h-[60px] w-[80px] rounded border border-gray-200 bg-gray-900 object-cover"
          />
          <span className="text-[8px] font-medium uppercase tracking-[0.08em] text-gray-400">
            {name}
          </span>
        </div>
      ))}
    </div>
  );
}
