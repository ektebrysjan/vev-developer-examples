import React, { useEffect, useRef } from "react";
import styles from "./MyComponent.module.css";
import * as THREE from 'three';
import { OrbitControls } from './orbit-controls'
import { GLTFLoader } from './gltf-loader';
import { AnimationClip, VectorKeyframeTrack, NumberKeyframeTrack } from "three";
import SchemaFileField from "./form/SchemaFileField";

import { registerVevComponent } from "@vev/react";

type Props = {
  schemaFile: {
    name?: string;
    url?: string;
    dynamicUrl?: string;
  },
  showCube: boolean;

};
// Using this as the style for the root element of the default export
// to make it take up the same size and position as it is given in Vev
const canvasStyle = { width: '100%', height: '100%', backgroundColor: 'indigo' }

const loader = new GLTFLoader();




const MyThreeComponent = ({ title = "Vev", uploadFile = 'https://cdn.vev.design/private/b8EJjK6PvUOw7TWBLQYJJk2cwb23/nQyoB9i08w_zpZwD0FwzC_vev-logo.gltf.gltf.gltf', showCube }: Props) => {
  /*
    ThreeJS needs a Canvas to render to, and we need to make sure
    we don't lose the reference to this element.

    we do this by using a reference, and assigning this to the
    HTMLCanvasElement this component returns

  */
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // We need to setup a Scene and store that in sceneRef
  const sceneRef = useRef<THREE.Scene>(new THREE.Scene());

  // And we need a camera
  const cameraRef = useRef<THREE.Camera>(null);

  // We also need a renderer
  const rendererRef = useRef<THREE.WebGLRenderer>(null)

  // to be able to rotate our cube we need a rerefence to it
  const cubeRef = useRef<THREE.Mesh>(null);

  // adding a ref to our controls
  const controlsRef = useRef<OrbitControls>();

  // adding a ref to the vev logo
  const logoRef = useRef<THREE.Mesh>(null);

  // adding an animation mixer and a Clock to synchronize our animation with the threejs instances `delta` (aka time passed since start.)
  const cubeAnimationMixerRef = useRef<THREE.AnimationMixer>();
  const clockRef = useRef<THREE.Clock>(new THREE.Clock());

  // the animation loop
  const animateLoop = () => {
    const raf = requestAnimationFrame(animateLoop);
    rendererRef.current.render(sceneRef.current, cameraRef.current);
    cubeRef.current.rotation.x += 0.01;
    cubeRef.current.rotation.y += 0.01;

    if (logoRef.current) {
      //logoRef.current.rotation.x += 0.01;
    }

    // Need to call update on our controls, if enabled
    if (controlsRef.current) controlsRef.current.update();

    // Need to call update with the current delta for our animationMixer
    //if (cubeAnimationMixerRef.current) cubeAnimationMixerRef.current.update(clockRef.current.getDelta());

    // return a reference to the animation loop so we can easily clear it
    // when the component unmounts.
    return raf;
  }

  const hideMesh = (mesh: THREE.Mesh) => {
    const mixer = new THREE.AnimationMixer(mesh);

    const times = [0, 3, 6];
    const values = [0, 0, 0, 0, 2, 2, 0, 0, 0];

    const opacityKF = new NumberKeyframeTrack(
      ".material.opacity",
      [0, 1, 2, 3, 4, 5, 6],
      [0, 1, 0, 1, 0, 1, 0]
    );

    const positionKF = new VectorKeyframeTrack(".position", times, values);

    // just one track for now
    const tracks = [positionKF, opacityKF];

    // use -1 to automatically calculate
    // the length from the array of tracks
    const length = -1;

    const clip = new AnimationClip("slowmove", length, tracks);

    cubeAnimationMixerRef.current = mixer;
    const animationAction = cubeAnimationMixerRef.current.clipAction(clip);
    animationAction.play();
  }

  useEffect(() => {
    if (canvasRef.current) {
      const { width, height } = canvasRef.current.getBoundingClientRect();
      // Our reference to the canvas has been set by React
      // meaning we have a <canvas /> element we can work with
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: true // turns off the background allowing you to see Vev behind your 3D element
      });
      // Set the size of the renderer to the size of our canvas
      renderer.setSize(width, height);

      // For better quality on screens with more pixels per inch
      renderer.setPixelRatio(window.devicePixelRatio);
      rendererRef.current = renderer;

      // Set up the camera
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 2000);
      // Move it away from the center towards you
      // so we can see our model and not be inside it
      cameraRef.current = camera;

      const orbitControls = new OrbitControls(cameraRef.current, canvasRef.current)
      controlsRef.current = orbitControls;

      camera.position.z = 5;
      controlsRef.current.update(); // Need to update controls.update() after any changes to camera


      // adding a cube
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      cubeRef.current = cube;
      if(showCube) sceneRef.current.add(cube);

      // Dont forget lights (!)
      const light = new THREE.AmbientLight(0x404040, 5);
      sceneRef.current.add(light);

      // We'll set this state variable to start the animation loop
      // you can do this in many different ways
      const animate = animateLoop();
      return () => {
        // if you remove the element from the canvas
        // or run the same code many times while editing 
        // it is important to clean up so you don't create an infinite
        // amount of animation loops.
        window.cancelAnimationFrame(animate);
      }
    }
  }, [canvasRef]);

  /**
   * The reason we are doing this as a useEffect, which responds to
   * the url in the `props` of the component changing, is so we can
   * create a form field to upload a GLTF file into the component, instead
   * of having to refer to the GLTF file directly in the code.
   */
  useEffect(() => {
    if (rendererRef.current && sceneRef.current && uploadFile.url) {
      console.log("Loading GLTF file", uploadFile);
      loader.load(uploadFile.url, function (res) {
        console.log("Successfully loaded the GLTF file", res);
        sceneRef.current.add(res.scene);
        const { scene } = res;
        logoRef.current = scene;

        hideMesh(cubeRef.current);

      }, function (err) {
        console.error("Something went wrong loading the GLTF file", err)
      });
    }
  }, [uploadFile, sceneRef, rendererRef])

  return (
    <canvas style={canvasStyle} ref={canvasRef}>
    </canvas>
  );
};

registerVevComponent(MyThreeComponent, {
  name: "My Three Component",
  type: 'both',
  props: [{type: 'string', name: 'uploadFile', component: SchemaFileField }, {type: 'boolean', name: 'showCube', description: 'Show the cuube', initialValue: true}], 
  editableCSS: [],
});

export default MyThreeComponent;
