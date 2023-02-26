import * as THREE from 'three';
import { CameraEntity } from '../utils';


interface CameraPanelProps {
    camera: CameraEntity;
    cameras: CameraEntity[];
    setCamera: (camera:THREE.Camera) => void;
}
function CameraPanel() {

}

export default CameraPanel;