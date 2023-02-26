import React, { useRef} from "react";
import styles from "./MyComponent.module.css";
import { registerVevComponent } from "@vev/react";
import { Canvas, useFrame } from "@react-three/fiber";

type Props = {
  title: string;
};

function Box(props) {
  const mesh = useRef();
  return (
     <mesh {...props} ref={mesh}>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial color={"orange"} />
     </mesh>
  );
}
const MyComponent = ({ title = "Vev" }: Props) => {
  return (
    <div className={styles.wrapper}>
      <Canvas>
        <mesh>
          <boxBufferGeometry args={[1, 1, 1]} attach="geometry">
            <meshBasicMaterial color={0x000000} attach="material" />
          </boxBufferGeometry>
        </mesh>
        </Canvas>
    </div>
  );
};

registerVevComponent(MyComponent, {
  name: "AWESOME GLTF",
  props: [{ name: "title", type: "string", initialValue: "Vev" }],
  editableCSS: [
    {
      selector: styles.wrapper,
      properties: ["background"],
    },
  ],
});

export default MyComponent;
