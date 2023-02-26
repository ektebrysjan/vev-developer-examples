import React, { useEffect, useRef, useState } from 'react';
import './Scene.css';
import { registerVevComponent } from '@vev/react';
import LeftPanel from './panels/left-panel';
import {  DefaultCamera } from './utils';
import { Canvas, useThree } from "@react-three/fiber";
import { useRecoilState } from 'recoil';

/**
 * Scene consists of
 * - Canvas
 * - Cameras
 * - Lights
 * - Models
 * - Animations
 * - Materials
 * @returns 
 */
function Scene() {
  const cameras = useRef<{current: number, list:THREE.Camera[] }>({
    current: 0,
    list: [DefaultCamera]
  })
  
  return (
    <div className="root">
      <LeftPanel />
      <div className="canvas-container">
       sdf
      </div>
    </div>
  );
}

registerVevComponent(Scene, {
  name: "My App"
})

export default Scene;
