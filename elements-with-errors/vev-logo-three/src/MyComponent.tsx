import { useState, useRef, Suspense, Fragment } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

import styles from "./MyComponent.module.css";
import { registerVevComponent } from "@vev/react";
import { useEffect } from 'react';

type Props = {
  title: string;
};

const MyComponent = ({  }: Props) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);
  if(!loaded) return <h1>loading</h1>
  return (
    <div>
      <MyScene />
    </div>
  );
};


function MyScene(props) {
  const canvasRef = useRef();
  return <Canvas camera={{}} ref={canvasRef}>
        <ambientLight intensity={0.8} />
        <spotLight intensity={0.7} position={[300, 300, 400]} />
        <OutlineBox />
      </Canvas>
}

const OutlineBox = () => {
  const mesh = useRef(null);
  const outline = useRef(null);
  const geometry = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  return <>
    <mesh ref={mesh}>
      <boxGeometry args={[2, 2, 2]} ref={geometry} />
      <meshBasicMaterial color={0xFF0000} attach="material" />
      <mesh ref={outline} scale={1.05}>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial color={0x000000} attach="material" side={THREE.BackSide} />
      </mesh>
    </mesh>
  </>;
}

function VevLogo(props) {
  const { logo } = props;
  //const gltf = useLoader(GLTFLoader, logo)
  return null;
  return (
    <Suspense fallback={null}>
      <primitive object={gltf.scene} />
    </Suspense>
  )
}

registerVevComponent(MyComponent, {
  name: "My Component",
  props: [],
  editableCSS: [
    {
      selector: styles.wrapper,
      properties: ["background"],
    },
  ],
});

export default MyComponent;
