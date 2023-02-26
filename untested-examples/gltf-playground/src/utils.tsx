import * as THREE from 'three';
export interface CameraPosition {
    fov: number,
    near: number,
    far: number,
    position: [x:number,y:number, z:number]
}

export interface CameraEntity {
    name:string;
    camera: THREE.Camera;
}

const FOV = 70;
const NEAR = 0.1;
const FAR = 1000;
const POSITION = [0, 1, 5];
const cameras:CameraEntity[] = []
function getDefaultCamera():THREE.PerspectiveCamera {
    const cam = new THREE.PerspectiveCamera(FOV, window.innerWidth / window.innerHeight, NEAR, FAR);

    cam.position.set(POSITION[0], POSITION[1], POSITION[2])
    cameras.push({
        name: "Default",
        camera: cam
    })
    return cam;
}

const DefaultCamera = getDefaultCamera();
export {DefaultCamera}