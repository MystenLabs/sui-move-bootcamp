'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSimulator, type JointAngles } from '@/hooks/useSimulator';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { CameraResetIcon, GridIcon, SuiDropletIcon } from '@/components/icons';

function deg2rad(deg: number): number {
  return (deg * Math.PI) / 180;
}

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

function getNamedNode(root: THREE.Object3D, name: string): THREE.Object3D {
  const node = root.getObjectByName(name);

  if (!node) {
    throw new Error(`Missing model node: ${name}`);
  }

  return node;
}

function bindBone(root: THREE.Object3D, name: string, axis: THREE.Vector3): BoneBinding {
  const node = getNamedNode(root, name);
  return {
    axis,
    node,
    origin: node.quaternion.clone(),
  };
}

function tintModel(root: THREE.Object3D) {
  root.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) {
      return;
    }

    child.castShadow = true;
    child.receiveShadow = true;

    const materials = Array.isArray(child.material) ? child.material : [child.material];

    for (const material of materials) {
      if (!(material instanceof THREE.MeshStandardMaterial)) {
        continue;
      }

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
    body: {
      axis: new THREE.Vector3(1, 0, 0),
      basePosition: body.position.clone(),
      node: body,
      origin: body.quaternion.clone(),
    },
    feet: [
      getNamedNode(model, 'FootFLBone'),
      getNamedNode(model, 'FootFRBone'),
      getNamedNode(model, 'FootBLBone'),
      getNamedNode(model, 'FootBRBone'),
    ],
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
    if (!(child instanceof THREE.Mesh)) {
      return;
    }

    child.geometry.dispose();

    const materials = Array.isArray(child.material) ? child.material : [child.material];
    for (const material of materials) {
      material.dispose();
    }
  });
}

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

  const targetJointsRef = useRef<JointAngles>({
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
  });
  const targetBodyRef = useRef({ height: 0, pitch: 0, roll: 0 });
  const movingRef = useRef(false);
  const actionRef = useRef('idle');

  const [gridVisible, setGridVisible] = useState(true);
  const [assetState, setAssetState] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const container = containerRef.current;
    const scene = new THREE.Scene();
    scene.background = null;
    scene.fog = new THREE.FogExp2(0xeef6ff, 0.048);
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

    scene.add(new THREE.AmbientLight(0xffffff, 0.9));

    const hemisphere = new THREE.HemisphereLight(0xffffff, 0xdfe8f2, 1.05);
    scene.add(hemisphere);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.25);
    keyLight.position.set(5, 8, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.left = -4;
    keyLight.shadow.camera.right = 4;
    keyLight.shadow.camera.top = 4;
    keyLight.shadow.camera.bottom = -4;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 18;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x4da2ff, 0.38);
    fillLight.position.set(-3, 4, -2);
    scene.add(fillLight);

    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(8, 64),
      new THREE.MeshStandardMaterial({
        color: 0xf6fbff,
        metalness: 0,
        roughness: 1,
      }),
    );
    ground.receiveShadow = true;
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    const grid = new THREE.GridHelper(8, 16, 0xb8d8f4, 0xe1edf8);
    grid.position.y = 0.01;
    scene.add(grid);
    gridRef.current = grid;

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
          rigRef.current = buildRig(model);
          setAssetState('ready');
        } catch {
          setAssetState('error');
        }
      },
      undefined,
      () => {
        setAssetState('error');
      },
    );

    const clock = new THREE.Clock();
    const footPosition = new THREE.Vector3();
    const targetRootPosition = new THREE.Vector3();

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
          const steering =
            action === 'wkL' || action === 'trL' ? 1 : action === 'wkR' || action === 'trR' ? -1 : 0;

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

        applyRotation(rig.frontLeftHip, frontLeftHip, blend);
        applyRotation(rig.frontRightHip, frontRightHip, blend);
        applyRotation(rig.backLeftHip, backLeftHip, blend);
        applyRotation(rig.backRightHip, backRightHip, blend);
        applyRotation(rig.frontLeftKnee, frontLeftKnee, blend);
        applyRotation(rig.frontRightKnee, frontRightKnee, blend);
        applyRotation(rig.backLeftKnee, backLeftKnee, blend);
        applyRotation(rig.backRightKnee, backRightKnee, blend);

        const bodyTarget = rig.body.origin
          .clone()
          .multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), bodyPitch))
          .multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), bodyRoll));
        rig.body.node.quaternion.slerp(bodyTarget, blend);

        const bodyPosition = rig.body.basePosition.clone();
        bodyPosition.y += bodyLift;
        rig.body.node.position.lerp(bodyPosition, blend);

        rig.root.updateMatrixWorld(true);

        let minFootY = Number.POSITIVE_INFINITY;
        for (const foot of rig.feet) {
          foot.getWorldPosition(footPosition);
          if (footPosition.y < minFootY) {
            minFootY = footPosition.y;
          }
        }

        const groundOffset = minFootY < 0 ? -minFootY + 0.004 : 0;
        targetRootPosition.copy(rig.baseRootPosition);
        targetRootPosition.y += groundOffset;
        rig.root.position.lerp(targetRootPosition, blend);
      }

      controls.update();
      renderer.render(scene, camera);
    }

    animate();

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width <= 0 || height <= 0) {
          continue;
        }

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

      if (modelRootRef.current) {
        disposeScene(modelRootRef.current);
      }

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    if (!robotState) {
      return;
    }

    targetJointsRef.current = { ...robotState.joints };
    targetBodyRef.current = {
      height: robotState.bodyHeight,
      pitch: robotState.bodyPitch,
      roll: robotState.bodyRoll,
    };
    movingRef.current = robotState.moving;
    actionRef.current = robotState.action;
  }, [robotState]);

  const resetCamera = useCallback(() => {
    if (!cameraRef.current || !controlsRef.current) {
      return;
    }

    cameraRef.current.position.set(3.5, 1.95, 3.1);
    controlsRef.current.target.set(0, 0.7, 0);
    controlsRef.current.update();
  }, []);

  const toggleGrid = useCallback(() => {
    if (!gridRef.current) {
      return;
    }

    const next = !gridRef.current.visible;
    gridRef.current.visible = next;
    setGridVisible(next);
  }, []);

  const actionLabel = robotState?.actionLabel ?? 'Idle';

  return (
    <div className="surface-panel relative flex min-h-[360px] flex-col overflow-hidden sm:min-h-[440px] xl:min-h-[620px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(77,162,255,0.12),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(192,230,255,0.22),transparent_36%),linear-gradient(180deg,#fbfdff_0%,#edf5fc_100%)]" />

      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-[#d7e6f4] px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-[14px] border border-[#d7e6f4] bg-white text-[#4DA2FF] shadow-[0_8px_16px_rgba(1,24,41,0.05)]">
            <SuiDropletIcon className="h-5 w-5" />
          </div>
          <div>
            <div className="lesson-eyebrow">Powered by Sui</div>
            <h2 className="font-brand mt-1 text-[15px] font-medium tracking-[-0.03em] text-[#011829] sm:text-[17px]">
              Unitree GO1 simulator
            </h2>
          </div>
          <span className="rounded-full border border-[#d7e6f4] bg-white/85 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#6f8ba6]">
            {actionLabel}
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-[#6f8ba6]">
          <span className="hidden rounded-full border border-[#d7e6f4] bg-white/85 px-3 py-1.5 md:inline-flex">
            Orbit camera
          </span>
          <span className="rounded-full border border-[#d7e6f4] bg-white/85 px-3 py-1.5">{gridVisible ? 'Grid on' : 'Grid off'}</span>
        </div>
      </div>

      <div ref={containerRef} className="relative z-10 flex-1" />

      {assetState !== 'ready' ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-5 z-20 flex justify-center">
          <div className="rounded-full border border-[#d7e6f4] bg-white/92 px-4 py-2 text-[12px] text-[#5d7893] shadow-[0_10px_20px_rgba(1,24,41,0.06)]">
            {assetState === 'loading' ? 'Loading GO1 model...' : 'GO1 model could not be loaded.'}
          </div>
        </div>
      ) : null}

      <div className="absolute bottom-4 right-4 z-20 flex gap-2">
        <button
          onClick={resetCamera}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d7e6f4] bg-white/92 text-[#36526c] shadow-[0_8px_18px_rgba(1,24,41,0.06)] transition hover:border-[#bfd6ea] hover:text-[#011829]"
          title="Reset camera"
        >
          <CameraResetIcon className="h-[18px] w-[18px]" />
        </button>
        <button
          onClick={toggleGrid}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d7e6f4] bg-white/92 text-[#36526c] shadow-[0_8px_18px_rgba(1,24,41,0.06)] transition hover:border-[#bfd6ea] hover:text-[#011829]"
          title="Toggle grid"
        >
          <GridIcon className="h-[18px] w-[18px]" />
        </button>
      </div>
    </div>
  );
}
