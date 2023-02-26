import React, { useEffect, useRef } from "react";
import styles from "./MyComponent.module.css";
import { registerVevComponent } from "@vev/react";

type Props = {
  title: string;
};

const MyComponent = ({ title = "Vev" }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.animationLine}>
        <AnimationObject />
      </div>
    </div>
  );
};

const AnimationObject = () => {
  const animationElement = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if(animationElement.current) {
      const parentWidth = animationElement.current.parentElement.getBoundingClientRect().width;
      animationElement.current.animate([{
        transform: 'rotateX(0deg) translateX(0%)'
      }, {
        transform: `rotateX(360deg) translateX(${parentWidth - animationElement.current.clientWidth}px)`
      
      }], {
        duration: 4000,
        iterations: Infinity,
        easing: 'ease-in'
      })
    }
  }, [animationElement])
  return <div className={styles.animationObject} ref={animationElement}>
          
  </div>
}

registerVevComponent(MyComponent, {
  name: "My Component",
  props: [{ name: "title", type: "string", initialValue: "Vev" }],
  editableCSS: [
    {
      selector: styles.wrapper,
      properties: ["background"],
    },
  ],
});

export default MyComponent;
