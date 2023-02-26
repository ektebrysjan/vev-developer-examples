import { Canvas } from '@react-three/fiber'
import './App.css';

function App() {
  return (
    <div className="App">
      <div id="canvas-container">
        <h1>Canvas</h1>
        <Canvas>
          <ambientLight intensity={0.1} />
          <directionalLight color="red" position={[0, 0, 5]} />
          <mesh>
            <boxGeometry />
            <meshStandardMaterial />
          </mesh>
        </Canvas>
      </div>
    </div>
  );
}

export default App;
