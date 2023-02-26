import React, { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import {registerVevComponent, useScrollTop, useViewport } from '@vev/react'
import * as THREE from 'three';
import * as Scroll from 'react-scroll';
import './App.css';
import styles from './styles.scss';
import { Vector3 } from 'three';

const defaultCamPos = 40;
const vevLogoUrl = 'https://devcdn.vev.design/cdn-cgi/image/f=auto,q=82,h=1920/private/o0EcNyxCnQMPFbaUNfOEdVLDPL22/image/uh1h3FRylX.png';
const scrollAnimated = Scroll.animateScroll;

function App({...props}) {
  const canvasRef = useRef<MutableRefObject<HTMLCanvasElement | undefined>>();
  console.log('props: ', props)

  const scroll = useScrollTop();
  const { height } = useViewport();

  const cubeRef = useRef<THREE.Points>();
  const cameraRef = useRef<THREE.Camera>();
  const sceneRef = useRef<THREE.Scene>();
  const observerRef = useRef<HTMLDivElement>();
  const voffRef = useRef<HTMLDivElement>();
  const imagesRef = useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.MeshLambertMaterial>[]>([]);
  const mouseXRef = useRef<number>(0);
  const mouseYRef = useRef<number>(0);

  const planetsRef = useRef<HTMLDivElement>();

  const [voff, setVoff] = useState(false);

  const getRandomPosition = (size: number) => {
    const arr = new Float32Array(size * 3);
    for (let i = 0; i < size; i++) {
      if (i % 3 === 0) { // x
        arr[i] = (Math.random() - 0.5) * 155;
      } else if (i % 3 === 1) { // y
        arr[i] = (Math.random() - 0.5) * 155;
      } else { // z
        arr[i] = (Math.random() - 0.7) * 375;
      }
    }
    return arr;
  };

  const getRandomColor = (size: number) => { 
    // not so random
    const arr = new Float32Array(size * 3);
    for (let i = 0; i < size; i++) {
      if (i % 0 === 0) { 
        arr[i] = Math.random() * 0.3;
      } else if (i % 1 === 0) {
        arr[i] = Math.random() * 0.59;
      } else {
        arr[i] = Math.random() * 0.11;
      }
    }
    return arr;
  }

  const resizeRendererToDisplaySize = (renderer: THREE.WebGLRenderer) => {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    // resize only when necessary
    if (needResize) {
      renderer.setSize(width, height, false);
    }

    return needResize;
  };

  const onMouseMove = (event : MouseEvent) => {
    mouseXRef.current = event.clientX;
    mouseYRef.current = event.clientY;

    if (observerRef.current)
      observerRef.current.style.transform = `rotate(${(event.clientX - window.innerWidth / 2) / window.innerWidth * 15}deg)`;
  }

  const createImageTexture = (url: string, scene: THREE.Scene, position: THREE.Vector3) => { 
    const imagePlane = new Image();
    imagePlane.crossOrigin = "";   // ask for CORS permission
    imagePlane.src = url;

    const texturePlane = new THREE.Texture(imagePlane);
    imagePlane.onload = () => { texturePlane.needsUpdate = true };

    // plane to display the image
    const geometryPlane = new THREE.PlaneGeometry(imagePlane.width / 100, imagePlane.height / 100, 1);
    const imgMaterial = new THREE.MeshLambertMaterial({ map: texturePlane })
    imgMaterial.transparent = true;
    imgMaterial.opacity = 0.5;
    const meshPlane = new THREE.Mesh(geometryPlane, imgMaterial )

    meshPlane.position.copy(position);

    scene.add(meshPlane)

    return meshPlane;
  }

  const calculatePercentage = (value: number, min:number, max: number) => { 
    return (value - min) / (max - min);
  }

  const createScene = useCallback((canvas: HTMLCanvasElement) => {
    const renderer = new THREE.WebGLRenderer( { canvas } );
  
    // camera parameters
    const fov = 70;
    const near = 0.01;
    const far = 600;
    const aspect = 2;
    cameraRef.current = new THREE.PerspectiveCamera(fov, aspect, near, far);

    cameraRef.current.position.z = defaultCamPos;

    sceneRef.current = new THREE.Scene();

    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    sceneRef.current.add(light);

    const geometry = new THREE.BufferGeometry();
    const numPoints = 5500;

    geometry.setAttribute('position', new THREE.BufferAttribute(getRandomPosition(numPoints), 3));
    const loader = new THREE.TextureLoader();
    const material = new THREE.PointsMaterial({
      size: props.starSize,
      color: '#A0A0A0',
      map: loader.load(
        "https://raw.githubusercontent.com/Kuntal-Das/textures/main/sp2.png"
      ),
      transparent: true,
    })

    geometry.setAttribute('color', new THREE.BufferAttribute(getRandomColor(numPoints), 3));

    // const cube = new THREE.Points(geometry, material);
    cubeRef.current = new THREE.Points(geometry, material);
    cubeRef.current.position.z = -5;

    sceneRef.current.add(cubeRef.current);
    // random: Math.random() * -200 - Math.random() * 60;

    const imgs = props.images;
    for (const image of imgs) {
      imagesRef.current.push(createImageTexture(image.img.url, sceneRef.current, new Vector3(image.posX, image.posY, image.posZ)));
    }

    imagesRef.current.push(createImageTexture(vevLogoUrl, sceneRef.current, new Vector3(0, 0, -235)));

    const render = (time: number) => {
      time *= 0.001;

      if (cameraRef.current && sceneRef.current) { 
        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement;
          console.log('resizing: ', canvas.clientWidth, canvas.height);
          cameraRef.current.aspect = canvas.clientWidth / canvas.height;
          cameraRef.current.updateProjectionMatrix();
        }
  
        if (cubeRef.current) {
          cubeRef.current.position.x = mouseXRef.current * 0.001;
          cubeRef.current.position.y = mouseYRef.current * -0.001;
        }
  
        renderer.render(sceneRef.current, cameraRef.current);
      }

      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }, [])

  useEffect(()=>{
    if (cubeRef.current && cameraRef.current) {
      const pos = scroll / 50 - defaultCamPos;
      cameraRef.current.position.z = -pos;

      for (const image of imagesRef.current) {
        const percentage = calculatePercentage(pos, image.position.z, defaultCamPos);
        image.material.opacity = percentage;
       }

       console.log('scroll: ', scroll)
       console.log('section height: ', props.hostRef.current.clientHeight)
       setVoff(scroll + height >= props.hostRef.current.clientHeight)
    }
  },[scroll])

  useEffect(()=>{
    if (canvasRef.current) {
      createScene(canvasRef.current);
    }
  },[canvasRef, createScene])


  useEffect(()=>{
    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
     }
  },[])  

  const handleScroll = (name: string, posZ: number) => {
    // debugger
    const scrollPos = (defaultCamPos - posZ);
    scrollAnimated.scrollTo(scrollPos * 45)
  }

  return (
    <div className="App">
      <canvas ref={canvasRef} id="main-comp" className={styles.mainComp} />
      <div ref={planetsRef} className={styles.tagsHolder}>
        {props.images.map((image) => (
          <div className={styles.tag} onClick={() => handleScroll(image.planet, image.posZ)}>
            {image.planet}
          </div>
        ))
        }
      </div>
      <div ref={observerRef} className={styles.observerHolder}></div>
      {voff && <div ref={voffRef} id="voff" className={styles.voffHolder}> VOFF!! </div>}

    </div>
  );
}

registerVevComponent(App, 
  { 
    name: 'Starship', 
    type: 'section',
    panelType: 'float',
    size: {
      height: '100%',
      width: 'auto'
    },
    props: [
      {
        name: 'images',
        type: 'array',
        of: [
          {
            type: 'string',
            name: 'planet'
          },
          {
            type: 'image',
            title: 'Image',
            name: 'img'
          },
          {
            type: 'number',
            title: 'X',
            name: 'posX'
          },
          {
            type: 'number',
            title: 'Y',
            name: 'posY'
          },
          {
            type: 'number',
            title: 'Z',
            name: 'posZ'
          }
        ]
      },
      {
        name: 'starSize',
        type: 'number',
        title: 'Star Size',
        initialValue: 0.5
      }
    ]
  });
export default App;
