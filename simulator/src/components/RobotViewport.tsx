'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSimulator, type JointAngles } from '@/hooks/useSimulator';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { CameraResetIcon, GridIcon } from '@/components/icons';

function deg2rad(deg: number): number {
  return (deg * Math.PI) / 180;
}

function rad2deg(rad: number): number {
  return (rad * 180) / Math.PI;
}

// ── Types ────────────────────────────────────────────────────

interface BoneBinding {
  axis: THREE.Vector3;
  node: THREE.Object3D;
  origin: THREE.Quaternion;
}

interface BodyBinding extends BoneBinding {
  basePosition: THREE.Vector3;
}

interface RobotRig {
  baseRootPosition: THREE.Vector3;
  body: BodyBinding;
  feet: THREE.Object3D[];
  frontLeftHip: BoneBinding;
  frontLeftKnee: BoneBinding;
  frontRightHip: BoneBinding;
  frontRightKnee: BoneBinding;
  backLeftHip: BoneBinding;
  backLeftKnee: BoneBinding;
  backRightHip: BoneBinding;
  backRightKnee: BoneBinding;
  root: THREE.Group;
}

interface DOFIndicator {
  group: THREE.Group;
  arc: THREE.Line;
  arcPositions: Float32Array;
  radius: number;
}

// ── Model helpers ────────────────────────────────────────────

function getNamedNode(root: THREE.Object3D, name: string): THREE.Object3D {
  const node = root.getObjectByName(name);
  if (!node) throw new Error(`Missing model node: ${name}`);
  return node;
}

function bindBone(root: THREE.Object3D, name: string, axis: THREE.Vector3): BoneBinding {
  const node = getNamedNode(root, name);
  return { axis, node, origin: node.quaternion.clone() };
}

function tintModel(root: THREE.Object3D) {
  root.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    child.castShadow = true;
    child.receiveShadow = true;
    const materials = Array.isArray(child.material) ? child.material : [child.material];
    for (const material of materials) {
      if (!(material instanceof THREE.MeshStandardMaterial)) continue;
      material.roughness = 0.46;
      material.metalness = 0.2;
      if (child.name === 'Trunk') {
        material.color.set('#4DA2FF');
        material.emissive.set('#011829');
        material.emissiveIntensity = 0.06;
      } else {
        material.color.offsetHSL(0, -0.03, -0.12);
      }
    }
  });
}

function buildRig(model: THREE.Group): RobotRig {
  const body = getNamedNode(model, 'BodyBone');
  return {
    baseRootPosition: model.position.clone(),
    body: { axis: new THREE.Vector3(1, 0, 0), basePosition: body.position.clone(), node: body, origin: body.quaternion.clone() },
    feet: [getNamedNode(model, 'FootFLBone'), getNamedNode(model, 'FootFRBone'), getNamedNode(model, 'FootBLBone'), getNamedNode(model, 'FootBRBone')],
    frontLeftHip: bindBone(model, 'ThighFLBone', new THREE.Vector3(0, 0, 1)),
    frontLeftKnee: bindBone(model, 'CalfFLBone', new THREE.Vector3(0, 0, 1)),
    frontRightHip: bindBone(model, 'ThighFRBone', new THREE.Vector3(0, 0, 1)),
    frontRightKnee: bindBone(model, 'CalfFRBone', new THREE.Vector3(0, 0, 1)),
    backLeftHip: bindBone(model, 'ThighBLBone', new THREE.Vector3(0, 0, 1)),
    backLeftKnee: bindBone(model, 'CalfBLBone', new THREE.Vector3(0, 0, 1)),
    backRightHip: bindBone(model, 'ThighBRBone', new THREE.Vector3(0, 0, 1)),
    backRightKnee: bindBone(model, 'CalfBRBone', new THREE.Vector3(0, 0, 1)),
    root: model,
  };
}

function applyRotation(binding: BoneBinding, radians: number, blend: number) {
  const target = binding.origin.clone().multiply(new THREE.Quaternion().setFromAxisAngle(binding.axis, radians));
  binding.node.quaternion.slerp(target, blend);
}

function disposeScene(root: THREE.Object3D) {
  root.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    child.geometry.dispose();
    const materials = Array.isArray(child.material) ? child.material : [child.material];
    for (const material of materials) material.dispose();
  });
}

// ── DOF visualization helpers ────────────────────────────────

const ARC_SEGMENTS = 32;

function createDOFIndicator(bone: THREE.Object3D, color: number, radius: number): DOFIndicator {
  const group = new THREE.Group();
  group.visible = false;

  // Torus ring showing rotation plane (Z-axis = XY plane)
  const ringGeom = new THREE.TorusGeometry(radius, radius * 0.06, 8, 32);
  const ringMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.25, depthTest: false });
  const ring = new THREE.Mesh(ringGeom, ringMat);
  group.add(ring);

  // Axis arrow
  const arrow = new THREE.ArrowHelper(
    new THREE.Vector3(0, 0, 1), new THREE.Vector3(), radius * 1.4, color, radius * 0.25, radius * 0.12,
  );
  (arrow.line as THREE.Line).material = new THREE.LineBasicMaterial({ color, depthTest: false });
  ((arrow.cone as THREE.Mesh).material as THREE.MeshBasicMaterial).depthTest = false;
  group.add(arrow);

  // Angle arc (pre-allocated buffer)
  const arcPositions = new Float32Array((ARC_SEGMENTS + 1) * 3);
  const arcGeom = new THREE.BufferGeometry();
  arcGeom.setAttribute('position', new THREE.BufferAttribute(arcPositions, 3));
  arcGeom.setDrawRange(0, 0);
  const arcMat = new THREE.LineBasicMaterial({ color, linewidth: 2, depthTest: false });
  const arc = new THREE.Line(arcGeom, arcMat);
  group.add(arc);

  bone.add(group);
  return { group, arc, arcPositions, radius };
}

function updateDOFArc(indicator: DOFIndicator, angle: number) {
  const { arcPositions, radius, arc } = indicator;
  const absAngle = Math.abs(angle);
  if (absAngle < 0.001) {
    arc.geometry.setDrawRange(0, 0);
    return;
  }
  const segments = Math.min(ARC_SEGMENTS, Math.max(2, Math.ceil(absAngle / (Math.PI / 16))));
  const dir = angle > 0 ? 1 : -1;
  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * absAngle * dir;
    const idx = i * 3;
    arcPositions[idx] = Math.cos(t) * radius * 1.15;
    arcPositions[idx + 1] = Math.sin(t) * radius * 1.15;
    arcPositions[idx + 2] = 0;
  }
  (arc.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
  arc.geometry.setDrawRange(0, segments + 1);
}

function createWorldAxes(): THREE.Group {
  const group = new THREE.Group();
  const len = 0.7;
  const headLen = 0.1;
  const headW = 0.04;
  const yOff = new THREE.Vector3(0, 0.005, 0);

  group.add(new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), yOff, len, 0xef4444, headLen, headW));
  group.add(new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), yOff, len, 0x22c55e, headLen, headW));
  group.add(new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), yOff, len, 0x4da2ff, headLen, headW));

  // Labels
  for (const [text, color, pos] of [
    ['X', '#ef4444', new THREE.Vector3(len + 0.08, 0.005, 0)],
    ['Y', '#22c55e', new THREE.Vector3(0, len + 0.08, 0)],
    ['Z', '#4da2ff', new THREE.Vector3(0, 0.005, len + 0.08)],
  ] as [string, string, THREE.Vector3][]) {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = color;
    ctx.font = 'bold 48px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 32, 32);
    const texture = new THREE.CanvasTexture(canvas);
    const mat = new THREE.SpriteMaterial({ map: texture, depthTest: false });
    const sprite = new THREE.Sprite(mat);
    sprite.position.copy(pos);
    sprite.scale.setScalar(0.12);
    group.add(sprite);
  }

  return group;
}

// ── Joint name mapping ───────────────────────────────────────

const JOINT_LABELS: Record<string, string> = {
  frontLeftHip: 'FL Hip',
  frontLeftKnee: 'FL Knee',
  frontRightHip: 'FR Hip',
  frontRightKnee: 'FR Knee',
  backLeftHip: 'BL Hip',
  backLeftKnee: 'BL Knee',
  backRightHip: 'BR Hip',
  backRightKnee: 'BR Knee',
};

const JOINT_COLORS: Record<string, number> = {
  frontLeftHip: 0xffa726, frontRightHip: 0xffa726, backLeftHip: 0xffa726, backRightHip: 0xffa726,
  frontLeftKnee: 0x26c6da, frontRightKnee: 0x26c6da, backLeftKnee: 0x26c6da, backRightKnee: 0x26c6da,
};

// ── Component ────────────────────────────────────────────────

export default function RobotViewport() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { robotState } = useSimulator();

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const rigRef = useRef<RobotRig | null>(null);
  const gridRef = useRef<THREE.GridHelper | null>(null);
  const frameRef = useRef<number>(0);
  const modelRootRef = useRef<THREE.Group | null>(null);
  const dofMapRef = useRef<Map<string, DOFIndicator>>(new Map());
  const worldAxesRef = useRef<THREE.Group | null>(null);
  const displayAnglesRef = useRef<Record<string, number>>({});

  const targetJointsRef = useRef<JointAngles>({
    headPitch: 0, headYaw: 0, tailWag: 0,
    frontLeftHip: 0, frontLeftKnee: 0, frontRightHip: 0, frontRightKnee: 0,
    backLeftHip: 0, backLeftKnee: 0, backRightHip: 0, backRightKnee: 0,
  });
  const targetBodyRef = useRef({ height: 0, pitch: 0, roll: 0 });
  const movingRef = useRef(false);
  const actionRef = useRef('idle');

  const [gridVisible, setGridVisible] = useState(true);
  const [showDof, setShowDof] = useState(false);
  const [assetState, setAssetState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [displayAngles, setDisplayAngles] = useState<Record<string, number>>({});
  const showDofRef = useRef(false);

  // Sync ref for animation loop
  useEffect(() => { showDofRef.current = showDof; }, [showDof]);

  // Throttled angle display sync
  useEffect(() => {
    if (!showDof) return;
    const id = setInterval(() => {
      setDisplayAngles({ ...displayAnglesRef.current });
    }, 100);
    return () => clearInterval(id);
  }, [showDof]);

  // ── Main scene setup ─────────────────────────────────────

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const scene = new THREE.Scene();
    scene.background = null;
    scene.fog = new THREE.FogExp2(0xf5f5f5, 0.035);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(3.5, 1.95, 3.1);
    camera.lookAt(0, 0.75, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.target.set(0, 0.7, 0);
    controls.minDistance = 2;
    controls.maxDistance = 8;
    controls.maxPolarAngle = Math.PI / 2.05;
    controls.update();
    controlsRef.current = controls;

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    scene.add(new THREE.HemisphereLight(0xffffff, 0xdfe8f2, 1.05));
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.25);
    keyLight.position.set(5, 8, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.left = -4;
    keyLight.shadow.camera.right = 4;
    keyLight.shadow.camera.top = 4;
    keyLight.shadow.camera.bottom = -4;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 18;
    scene.add(keyLight);
    scene.add(new THREE.DirectionalLight(0x4da2ff, 0.38).translateX(-3).translateY(4).translateZ(-2));

    // Ground
    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(8, 64),
      new THREE.MeshStandardMaterial({ color: 0xf0f0f0, metalness: 0, roughness: 1 }),
    );
    ground.receiveShadow = true;
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    // Grid with colored axis lines
    const grid = new THREE.GridHelper(8, 16, 0xcccccc, 0xe0e0e0);
    grid.position.y = 0.01;
    scene.add(grid);
    gridRef.current = grid;

    const xAxisLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-4, 0.012, 0), new THREE.Vector3(4, 0.012, 0)]),
      new THREE.LineBasicMaterial({ color: 0xef4444, linewidth: 2 }),
    );
    const zAxisLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0.012, -4), new THREE.Vector3(0, 0.012, 4)]),
      new THREE.LineBasicMaterial({ color: 0x4da2ff, linewidth: 2 }),
    );
    scene.add(xAxisLine, zAxisLine);

    // World coordinate axes
    const worldAxes = createWorldAxes();
    scene.add(worldAxes);
    worldAxesRef.current = worldAxes;

    // Load model
    const loader = new GLTFLoader();
    loader.load(
      '/robot-dog-unitree-go1/source/go1.glb',
      (gltf) => {
        try {
          const model = gltf.scene;
          tintModel(model);
          model.rotation.y = Math.PI / 2;
          model.scale.setScalar(2.55);
          const bounds = new THREE.Box3().setFromObject(model);
          model.position.y -= bounds.min.y;
          model.position.x = 0;
          model.position.z = 0;
          scene.add(model);
          modelRootRef.current = model;

          const rig = buildRig(model);
          rigRef.current = rig;

          // Create DOF indicators for each joint
          const dofRadius = 0.025; // in bone-local space
          const map = new Map<string, DOFIndicator>();
          const jointBindings: [string, BoneBinding][] = [
            ['frontLeftHip', rig.frontLeftHip], ['frontLeftKnee', rig.frontLeftKnee],
            ['frontRightHip', rig.frontRightHip], ['frontRightKnee', rig.frontRightKnee],
            ['backLeftHip', rig.backLeftHip], ['backLeftKnee', rig.backLeftKnee],
            ['backRightHip', rig.backRightHip], ['backRightKnee', rig.backRightKnee],
          ];
          for (const [name, binding] of jointBindings) {
            const color = JOINT_COLORS[name] ?? 0xffa726;
            map.set(name, createDOFIndicator(binding.node, color, dofRadius));
          }
          // Body pitch + roll indicators
          map.set('bodyPitch', createDOFIndicator(rig.body.node, 0xef5350, dofRadius * 1.5));
          map.set('bodyRoll', createDOFIndicator(rig.body.node, 0x42a5f5, dofRadius * 1.5));

          dofMapRef.current = map;
          setAssetState('ready');
        } catch {
          setAssetState('error');
        }
      },
      undefined,
      () => setAssetState('error'),
    );

    // Animation
    const clock = new THREE.Clock();
    const footPosition = new THREE.Vector3();

    function animate() {
      frameRef.current = requestAnimationFrame(animate);
      const dt = clock.getDelta();
      const blend = Math.min(1, dt * 7);
      const rig = rigRef.current;

      if (rig) {
        const joints = targetJointsRef.current;
        const body = targetBodyRef.current;
        const moving = movingRef.current;
        const action = actionRef.current;
        const elapsed = clock.getElapsedTime();

        let frontLeftHip = deg2rad(joints.frontLeftHip);
        let frontRightHip = deg2rad(joints.frontRightHip);
        let backLeftHip = deg2rad(joints.backLeftHip);
        let backRightHip = deg2rad(joints.backRightHip);
        let frontLeftKnee = deg2rad(joints.frontLeftKnee);
        let frontRightKnee = deg2rad(joints.frontRightKnee);
        let backLeftKnee = deg2rad(joints.backLeftKnee);
        let backRightKnee = deg2rad(joints.backRightKnee);
        let bodyPitch = deg2rad(body.pitch);
        let bodyRoll = deg2rad(body.roll);
        let bodyLift = body.height * 0.18;

        if (moving) {
          const gaitSpeed = action.startsWith('tr') ? 10 : 7;
          const gaitAmplitude = action.startsWith('tr') ? 0.38 : 0.24;
          const kneeAmplitude = action.startsWith('tr') ? 0.28 : 0.18;
          const phase = elapsed * gaitSpeed;
          const pairA = Math.sin(phase);
          const pairB = Math.sin(phase + Math.PI);
          const steering = action === 'wkL' || action === 'trL' ? 1 : action === 'wkR' || action === 'trR' ? -1 : 0;

          frontLeftHip += pairA * gaitAmplitude;
          backRightHip += pairA * gaitAmplitude;
          frontRightHip += pairB * gaitAmplitude;
          backLeftHip += pairB * gaitAmplitude;
          frontLeftKnee += Math.max(0, -pairA) * kneeAmplitude;
          backRightKnee += Math.max(0, -pairA) * kneeAmplitude;
          frontRightKnee += Math.max(0, -pairB) * kneeAmplitude;
          backLeftKnee += Math.max(0, -pairB) * kneeAmplitude;
          bodyPitch += action === 'bk' ? -0.08 : 0.06;
          bodyRoll += steering * 0.1 + Math.sin(phase * 0.5) * 0.035;
          bodyLift += Math.abs(Math.sin(phase * 2)) * 0.035;
        }

        // Store display angles
        displayAnglesRef.current = {
          frontLeftHip, frontLeftKnee, frontRightHip, frontRightKnee,
          backLeftHip, backLeftKnee, backRightHip, backRightKnee,
          bodyPitch, bodyRoll,
        };

        applyRotation(rig.frontLeftHip, frontLeftHip, blend);
        applyRotation(rig.frontRightHip, frontRightHip, blend);
        applyRotation(rig.backLeftHip, backLeftHip, blend);
        applyRotation(rig.backRightHip, backRightHip, blend);
        applyRotation(rig.frontLeftKnee, frontLeftKnee, blend);
        applyRotation(rig.frontRightKnee, frontRightKnee, blend);
        applyRotation(rig.backLeftKnee, backLeftKnee, blend);
        applyRotation(rig.backRightKnee, backRightKnee, blend);

        const bodyTarget = rig.body.origin.clone()
          .multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), bodyPitch))
          .multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), bodyRoll));
        rig.body.node.quaternion.slerp(bodyTarget, blend);

        const bodyPosition = rig.body.basePosition.clone();
        bodyPosition.y += bodyLift;
        rig.body.node.position.lerp(bodyPosition, blend);

        rig.root.updateMatrixWorld(true);

        // Ground clamping
        let minFootY = Number.POSITIVE_INFINITY;
        for (const foot of rig.feet) {
          foot.getWorldPosition(footPosition);
          if (footPosition.y < minFootY) minFootY = footPosition.y;
        }
        if (minFootY < 0.004) {
          rig.root.position.y += -minFootY + 0.004;
          rig.root.updateMatrixWorld(true);
        }

        // Update DOF arcs
        if (showDofRef.current) {
          const angles: Record<string, number> = displayAnglesRef.current;
          for (const [name, indicator] of dofMapRef.current) {
            const angle = angles[name] ?? 0;
            updateDOFArc(indicator, angle);
          }
        }
      }

      controls.update();
      renderer.render(scene, camera);
    }

    animate();

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width <= 0 || height <= 0) continue;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    });
    observer.observe(container);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameRef.current);
      controls.dispose();
      renderer.dispose();
      if (modelRootRef.current) disposeScene(modelRootRef.current);
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    if (!robotState) return;
    targetJointsRef.current = { ...robotState.joints };
    targetBodyRef.current = { height: robotState.bodyHeight, pitch: robotState.bodyPitch, roll: robotState.bodyRoll };
    movingRef.current = robotState.moving;
    actionRef.current = robotState.action;
  }, [robotState]);

  const resetCamera = useCallback(() => {
    if (!cameraRef.current || !controlsRef.current) return;
    cameraRef.current.position.set(3.5, 1.95, 3.1);
    controlsRef.current.target.set(0, 0.7, 0);
    controlsRef.current.update();
  }, []);

  const toggleGrid = useCallback(() => {
    if (!gridRef.current) return;
    const next = !gridRef.current.visible;
    gridRef.current.visible = next;
    setGridVisible(next);
  }, []);

  const toggleDof = useCallback(() => {
    const next = !showDof;
    setShowDof(next);
    for (const indicator of dofMapRef.current.values()) {
      indicator.group.visible = next;
    }
    if (worldAxesRef.current) worldAxesRef.current.visible = next || true; // axes always visible
  }, [showDof]);

  const actionLabel = robotState?.actionLabel ?? 'Idle';

  return (
    <div className="relative flex min-h-[360px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white sm:min-h-[440px] xl:min-h-[620px]">
      {/* Header bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3">
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-gray-400">Simulator</div>
            <h2 className="mt-1 text-[15px] font-medium tracking-[-0.02em] text-black sm:text-[17px]">
              Unitree GO1
            </h2>
          </div>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-gray-500">
            {actionLabel}
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-gray-400">
          <span className="hidden rounded-full bg-gray-100 px-3 py-1.5 font-medium md:inline-flex">
            Orbit camera
          </span>
          <span className="rounded-full bg-gray-100 px-3 py-1.5 font-medium">
            {gridVisible ? 'Grid on' : 'Grid off'}
          </span>
          {showDof && (
            <span className="rounded-full bg-orange-100 px-3 py-1.5 font-medium text-orange-600">
              DOF
            </span>
          )}
        </div>
      </div>

      {/* 3D Canvas */}
      <div ref={containerRef} className="relative z-10 flex-1" />

      {/* Joint angles panel */}
      {showDof && assetState === 'ready' && (
        <div className="absolute left-4 top-[72px] z-20 w-44 rounded-xl border border-gray-200 bg-white/92 px-3 py-3 shadow-sm backdrop-blur-sm">
          <div className="mb-2 text-[10px] font-medium uppercase tracking-[0.12em] text-gray-400">
            Joint angles
          </div>
          {Object.entries(JOINT_LABELS).map(([key, label]) => (
            <div key={key} className="flex items-center justify-between py-[3px]">
              <span className="text-[10px] text-gray-500">{label}</span>
              <span className="font-mono-ui text-[10px] text-gray-700">
                {rad2deg(displayAngles[key] ?? 0).toFixed(1)}°
              </span>
            </div>
          ))}
          <div className="mt-1.5 border-t border-gray-100 pt-1.5">
            <div className="flex items-center justify-between py-[3px]">
              <span className="text-[10px] text-red-400">Pitch</span>
              <span className="font-mono-ui text-[10px] text-gray-700">
                {rad2deg(displayAngles.bodyPitch ?? 0).toFixed(1)}°
              </span>
            </div>
            <div className="flex items-center justify-between py-[3px]">
              <span className="text-[10px] text-blue-400">Roll</span>
              <span className="font-mono-ui text-[10px] text-gray-700">
                {rad2deg(displayAngles.bodyRoll ?? 0).toFixed(1)}°
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Loading state */}
      {assetState !== 'ready' && (
        <div className="pointer-events-none absolute inset-x-0 bottom-5 z-20 flex justify-center">
          <div className="rounded-full bg-white px-4 py-2 text-[12px] font-medium text-gray-500 shadow-md">
            {assetState === 'loading' ? 'Loading GO1 model...' : 'GO1 model could not be loaded.'}
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className="absolute bottom-4 right-4 z-20 flex gap-2">
        <button
          onClick={toggleDof}
          className={`flex h-9 items-center gap-1.5 rounded-full border px-3 text-[11px] font-medium shadow-sm transition ${
            showDof
              ? 'border-orange-300 bg-orange-50 text-orange-600'
              : 'border-gray-200 bg-white text-gray-500 hover:text-black'
          }`}
          title="Toggle DOF visualization"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
          DOF
        </button>
        <button
          onClick={resetCamera}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:text-black"
          title="Reset camera"
        >
          <CameraResetIcon className="h-[18px] w-[18px]" />
        </button>
        <button
          onClick={toggleGrid}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:text-black"
          title="Toggle grid"
        >
          <GridIcon className="h-[18px] w-[18px]" />
        </button>
      </div>
    </div>
  );
}
