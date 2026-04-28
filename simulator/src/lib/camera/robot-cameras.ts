/**
 * Robot Camera Simulation
 *
 * Creates 5 PerspectiveCamera objects matching the GO1's camera positions
 * from the URDF, renders them to off-screen render targets, and provides
 * utilities to copy the output to canvas elements for PiP display.
 */

import * as THREE from 'three';
import { CAMERAS } from '../unitree-go1';

const CAM_WIDTH = 160;
const CAM_HEIGHT = 120;

export interface RobotCameraRig {
  cameras: THREE.PerspectiveCamera[];
  renderTargets: THREE.WebGLRenderTarget[];
  names: string[];
  renderCamera: (index: number, renderer: THREE.WebGLRenderer, scene: THREE.Scene) => void;
  copyToCanvas: (index: number, renderer: THREE.WebGLRenderer, canvas: HTMLCanvasElement) => void;
  dispose: () => void;
}

export function createRobotCameraRig(bodyBone: THREE.Object3D): RobotCameraRig {
  const cameras: THREE.PerspectiveCamera[] = [];
  const renderTargets: THREE.WebGLRenderTarget[] = [];
  const names: string[] = [];
  const pixelBuffer = new Uint8Array(CAM_WIDTH * CAM_HEIGHT * 4);

  for (const camDef of CAMERAS) {
    const cam = new THREE.PerspectiveCamera(70, CAM_WIDTH / CAM_HEIGHT, 0.01, 10);
    cam.position.set(camDef.position.x, camDef.position.z, -camDef.position.y);

    // Orient cameras based on their position
    if (camDef.name === 'face' || camDef.name === 'chin') {
      cam.lookAt(cam.position.x + 1, cam.position.y, cam.position.z);
    } else if (camDef.name === 'left') {
      cam.lookAt(cam.position.x, cam.position.y, cam.position.z + 1);
    } else if (camDef.name === 'right') {
      cam.lookAt(cam.position.x, cam.position.y, cam.position.z - 1);
    } else if (camDef.name === 'rearDown') {
      cam.lookAt(cam.position.x - 1, cam.position.y - 0.5, cam.position.z);
    }

    bodyBone.add(cam);
    cameras.push(cam);
    names.push(camDef.name);

    const rt = new THREE.WebGLRenderTarget(CAM_WIDTH, CAM_HEIGHT, {
      format: THREE.RGBAFormat,
      type: THREE.UnsignedByteType,
    });
    renderTargets.push(rt);
  }

  function renderCamera(index: number, renderer: THREE.WebGLRenderer, scene: THREE.Scene) {
    if (index < 0 || index >= cameras.length) return;
    renderer.setRenderTarget(renderTargets[index]);
    renderer.render(scene, cameras[index]);
    renderer.setRenderTarget(null);
  }

  function copyToCanvas(index: number, renderer: THREE.WebGLRenderer, canvas: HTMLCanvasElement) {
    if (index < 0 || index >= cameras.length) return;
    renderer.readRenderTargetPixels(renderTargets[index], 0, 0, CAM_WIDTH, CAM_HEIGHT, pixelBuffer);

    canvas.width = CAM_WIDTH;
    canvas.height = CAM_HEIGHT;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.createImageData(CAM_WIDTH, CAM_HEIGHT);
    // Flip vertically (WebGL reads bottom-up)
    for (let y = 0; y < CAM_HEIGHT; y++) {
      const srcRow = (CAM_HEIGHT - 1 - y) * CAM_WIDTH * 4;
      const dstRow = y * CAM_WIDTH * 4;
      for (let x = 0; x < CAM_WIDTH * 4; x++) {
        imageData.data[dstRow + x] = pixelBuffer[srcRow + x];
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }

  function dispose() {
    for (const rt of renderTargets) rt.dispose();
    for (const cam of cameras) {
      cam.removeFromParent();
    }
  }

  return { cameras, renderTargets, names, renderCamera, copyToCanvas, dispose };
}
