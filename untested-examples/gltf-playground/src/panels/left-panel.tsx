import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { degToRad } from 'three/src/math/MathUtils';
import { RangeSlider } from '../controls/slider';
import './left-panel.css';

interface LeftPanelProps {
    
}
function LeftPanel() {

    const [rotate, setRotate] = useState<{x: number, y: number, z: number}>({
        x: 0,
        y: 0,
        z: 0,
    })
    
    const panLeft = () => {
       // camera.rotateY(degToRad(-5))
    }
    const handleSliderChange = (num: string) => {
        const {y, ...rest} = rotate;
        console.log("set rotate to", y);
        setRotate({
            y: parseInt(num),
            ...rest
        });
    }
    useEffect(() => {
        //camera.rotation.set(degToRad(rotate.x), degToRad(rotate.y), degToRad(rotate.z));
    }, [rotate])
    return <div className="left-panel">

        left-panel
        <button onClick={panLeft}>Pan Left</button>
        <RangeSlider value={rotate.y} onChange={handleSliderChange} max={400} />
        <p>test</p>
    </div>
}
export default LeftPanel;