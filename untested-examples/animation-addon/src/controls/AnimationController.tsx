import { useGlobalStore, useScrollTop, useStore } from "@vev/react";
import {SilkeBox} from '@vev/silke';
import React, { useCallback, useEffect, useRef, useState } from "react";

function AnimationController({
  context,
  value,
  onChange,
  ...rest
}) {
    const [lastCenter, setLastCenter] = useState<number>();
    const fieldRef = useRef<HTMLDivElement>();

    const saveAudio = async(fileString:string) => {

       
       // onChange();
    }
    
    const getCenter = () => {
      console.log("got viewport", context)
    }
  return (
    <SilkeBox ref={fieldRef}>
        <h1>I am form</h1>
        <fieldset name="viewport">
        </fieldset>
        <button onClick={getCenter}>GET CENTER</button>
    </SilkeBox>
  );
}

export default AnimationController;