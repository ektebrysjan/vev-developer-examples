import { useInterval } from "@vev/react";
import React, { useEffect, useRef } from "react";
import styles from "./debuggers.module.css";
import FPSMeter from "./fps-meter";

export default function Performance({disabled}:{disabled?: boolean}) {
  const fpsRef = useRef<HTMLDivElement>();
  const meterRef = useRef<FPSMeter>();

  useEffect(() => {
    
    if (fpsRef.current) {
      meterRef.current = new FPSMeter({
        element: fpsRef.current
      });
    }
  }, [fpsRef]);

  useEffect(() => {
    if(meterRef.current && !disabled) {
        meterRef.current.start();
    } else if(disabled) {
        meterRef.current.stop();
        meterRef.current.element.textContent = "0 fps (disabled)";
    }
  }, [disabled])

  return (
    <fieldset>
      <legend>Performance</legend>
      <div className={styles.Performance}>
        <div className="fps" ref={fpsRef}>
          4
        </div>
      </div>
    </fieldset>
  );
}
