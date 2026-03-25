'use client';

import { useCallback, useRef, useState } from 'react';

interface EnvironmentLoaderProps {
  onLoadFile: (file: File) => void;
  onClear: () => void;
  hasEnvironment: boolean;
  loading: boolean;
}

export default function EnvironmentLoader({ onLoadFile, onClear, hasEnvironment, loading }: EnvironmentLoaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && (file.name.endsWith('.glb') || file.name.endsWith('.gltf'))) {
        onLoadFile(file);
      }
    },
    [onLoadFile],
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) onLoadFile(file);
      e.target.value = '';
    },
    [onLoadFile],
  );

  if (hasEnvironment) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-emerald-500">Environment loaded</span>
        <button
          onClick={onClear}
          className="rounded bg-gray-100 px-2 py-0.5 text-[10px] text-gray-500 hover:bg-gray-200"
        >
          Clear
        </button>
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`cursor-pointer rounded-lg border border-dashed px-3 py-2 text-center text-[10px] transition ${
        dragging ? 'border-[#4da2ff] bg-[#4da2ff]/5 text-[#4da2ff]' : 'border-gray-300 text-gray-400 hover:border-gray-400'
      }`}
    >
      {loading ? 'Loading...' : 'Drop GLB file or click to load environment'}
      <input ref={inputRef} type="file" accept=".glb,.gltf" className="hidden" onChange={handleFileInput} />
    </div>
  );
}
