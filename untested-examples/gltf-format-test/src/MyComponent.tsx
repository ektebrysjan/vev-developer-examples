import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import styles from "./MyComponent.module.css";
import { registerVevComponent } from "@vev/react";

type Props = {
  title: string;
  hostRef?: any;
};

const MyComponent = ({ title = "Vev", hostRef }: Props) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if(hostRef?.current && !loaded) {
      setLoaded(true);
    }
  }, [hostRef, loaded])

  if(!loaded) return null;
  return (
    <div id="canvas-container">
      <FiberApp />
    </div>
  );
};

function FiberApp() {
  const [s, setS] = useState();
  return  <Canvas>
  <ambientLight intensity={0.1} />
  <directionalLight color="red" position={[0, 0, 5]} />
  <mesh>
    <boxGeometry />
    <meshStandardMaterial />
  </mesh>
</Canvas>
}

registerVevComponent(MyComponent, {
  name: "My Component",
  props: [{ name: "title", type: "string", initialValue: "Vev" }],
  editableCSS: [
    {
      selector: styles.wrapper,
      properties: ["background"],
    },
  ],
});

export default MyComponent;
