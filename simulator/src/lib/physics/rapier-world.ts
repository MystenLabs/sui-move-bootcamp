/**
 * Rapier3D Physics World
 *
 * Manages the WASM physics engine lifecycle:
 * - Async initialization (WASM loading)
 * - World creation with gravity
 * - Ground plane
 * - Debug rendering to Three.js LineSegments
 */

import * as THREE from 'three';

// Rapier is loaded dynamically to avoid SSR issues
let RAPIER: typeof import('@dimforge/rapier3d-compat') | null = null;

export async function initRapier() {
  if (RAPIER) return RAPIER;
  const rapier = await import('@dimforge/rapier3d-compat');
  await rapier.init();
  RAPIER = rapier;
  return rapier;
}

export function getRapier() {
  if (!RAPIER) throw new Error('Rapier not initialized. Call initRapier() first.');
  return RAPIER;
}

export interface PhysicsWorld {
  world: InstanceType<typeof import('@dimforge/rapier3d-compat').World>;
  groundCollider: unknown;
  debugMesh: THREE.LineSegments;
  step: (dt?: number) => void;
  updateDebugMesh: () => void;
  dispose: () => void;
}

export function createPhysicsWorld(): PhysicsWorld {
  const rapier = getRapier();
  const world = new rapier.World({ x: 0, y: -9.81, z: 0 });

  // Ground plane at y = 0
  const groundDesc = rapier.ColliderDesc.cuboid(50, 0.01, 50)
    .setTranslation(0, -0.01, 0)
    .setFriction(1.0)
    .setRestitution(0.0);
  const groundCollider = world.createCollider(groundDesc);

  // Debug render mesh
  const debugGeom = new THREE.BufferGeometry();
  const debugMat = new THREE.LineBasicMaterial({ color: 0x00ff00, vertexColors: true });
  const debugMesh = new THREE.LineSegments(debugGeom, debugMat);
  debugMesh.visible = false;
  debugMesh.frustumCulled = false;

  function step(dt = 1 / 60) {
    world.timestep = dt;
    world.step();
  }

  function updateDebugMesh() {
    const buffers = world.debugRender();
    debugGeom.setAttribute('position', new THREE.BufferAttribute(buffers.vertices, 3));
    debugGeom.setAttribute('color', new THREE.BufferAttribute(buffers.colors, 4));
  }

  function dispose() {
    world.free();
    debugGeom.dispose();
    debugMat.dispose();
  }

  return { world, groundCollider, debugMesh, step, updateDebugMesh, dispose };
}

/**
 * Load a GLB mesh as static trimesh colliders in the physics world.
 */
export function addEnvironmentMesh(
  world: PhysicsWorld['world'],
  mesh: THREE.Mesh,
): unknown[] {
  const rapier = getRapier();
  const colliders: unknown[] = [];

  const geom = mesh.geometry;
  if (!geom.index) return colliders;

  // Get world-space vertices
  const posAttr = geom.attributes.position;
  const vertices = new Float32Array(posAttr.count * 3);
  const tempVec = new THREE.Vector3();
  mesh.updateMatrixWorld(true);

  for (let i = 0; i < posAttr.count; i++) {
    tempVec.fromBufferAttribute(posAttr, i);
    tempVec.applyMatrix4(mesh.matrixWorld);
    vertices[i * 3] = tempVec.x;
    vertices[i * 3 + 1] = tempVec.y;
    vertices[i * 3 + 2] = tempVec.z;
  }

  const indices = new Uint32Array(geom.index.array);

  const desc = rapier.ColliderDesc.trimesh(vertices, indices)
    .setFriction(0.8)
    .setRestitution(0.1);

  colliders.push(world.createCollider(desc));
  return colliders;
}
