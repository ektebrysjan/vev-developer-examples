# Getting started with Vev CLI

> This project was bootstrapped with [Create Vev App](https://github.com/vev-design/create-vev-app).


### Initialize 

In your project directory run:
```bash 
vev init
```

This will initialize a new components package in the Vev platform.

### Run

```
vev start
```
Now you can open the [Vev design editor](https://editor.vev.design/), your components will be available in all your projects as long as the CLI is running.

### Build 

Open `./src/MyComponent.tsx` and start building your  React components.

* [Register Vev component](https://developer.vev.design/docs/cli/react/register-vev-component)
* [Vev props](https://developer.vev.design/docs/cli/react/vev-props)
* [Vev components]([/docs/cli/react/components](https://developer.vev.design/docs/cli/react/components))
* [Vev hooks](https://developer.vev.design/docs/cli/react/hooks)
* [React documentation](https://reactjs.org/docs/getting-started.html)

### Deploy 

Deploy your package:

```
vev deploy
```

You can choose to share your components with your account, workspace or team. Configuration is done in the [vev.json](https://developer.vev.design/docs/cli/configuration) file.


---

<a href="https://film.vev.design/XoYKo6hk0m/9dDmtRbbmg.390sr734i.mp4"><img src="https://film.vev.design/XoYKo6hk0m/9dDmtRbbmg.390sr734i.360.webm-00001.png"></a>

[Vev Developer Documentation](https://developer.vev.design/docs/cli/)

You can use `three.js` with Vev. Vev uses React and this document will highlight how to get started with `three.js` in `react`and `react-three-fiber`.



## Basic Example: three.js

Following the getting started example from [threejs documentation](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene), we will create a component in Vev to draw a rotating 3d cube in Vev.

- Creating the code package
- Creating the threejs scene
- Rendering the scene
- Adding a cube
- Animating the cube

### Creating the code package

Create a code package by running `vev create threejs-elements && cd threejs-elements && vev init`.

> INFO: The boilerplate from `vev create` comes with a `package-lock.json` and you should use `npm` as your package manager, or delete this file if using `yarn`

> You **can** use the browser based Code Editor for this as well. See attached example HERE.

> If you are used to writing regular `javascript`, there are some things to keep in mind. (Link to article explaining).

### Creating the threejs scene

```
> npm install three @types/three --save
```

```tsx
import React, { useEffect, useRef } from "react";
import styles from "./MyComponent.module.css";
import * as THREE from 'three';
import { registerVevComponent } from "@vev/react";

type Props = {
  title: string;
};

// Using this as the style for the root element of the default export
// to make it take up the same size and position as it is given in Vev
const canvasStyle = { width: '100%', height: '100%', backgroundColor: 'indigo' }

const MyThreeComponent = ({ title = "Vev", }: Props) => {
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

  // the animation loop
  const animateLoop = () => {
    const raf = requestAnimationFrame(animateLoop);
    rendererRef.current.render(sceneRef.current, cameraRef.current);
    cubeRef.current.rotation.x += 0.01;
    cubeRef.current.rotation.y += 0.01;
    // return a reference to the animation loop so we can easily clear it
    // when the component unmounts.
    return raf;
  }

  useEffect(() => {
    if(canvasRef.current) {
      const {width, height} = canvasRef.current.getBoundingClientRect();
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
      camera.position.z = 5;
      cameraRef.current = camera;

      // adding a cube
      const geometry = new THREE.BoxGeometry( 1, 1, 1 );
      const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      const cube = new THREE.Mesh( geometry, material );
      cubeRef.current = cube;
      sceneRef.current.add(cube);

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
  }, [canvasRef])

  return (
    <canvas style={canvasStyle} ref={canvasRef}>
    </canvas>
  );
};

registerVevComponent(MyThreeComponent, {
  name: "My Three Component",
  props: [],
  editableCSS: [],
});

export default MyThreeComponent;

```

This gives us the same spinning cube as the [scene example](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) on `threejs`. 

## Adding Camera Controls

When working with 3D it can be useful to move around. Following the [OrbitControls](https://threejs.org/docs/index.html#examples/en/controls/OrbitControls) guide, we first need to import the `OrbitControls` from the examples directory.

## Adding interactions

## Loading GLTF

## react-three-fiber

## Debugging

You may see a `fs.js:3 WARNING: Multiple instances of Three.js being imported.` when viewing the javascript console while inside the Editor. Try publishing your project, open the published page to check if this is just due to your code getting re-bundled.