import React, { Children, useEffect, useMemo, useRef, useState } from "react";
import styles from "./MyComponent.module.css";
import { registerVevComponent, useViewport, useDevice , useGlobalStore, useEditorState} from "@vev/react";
import * as ReactDOM from 'react-dom';

type Props = {
  title: string;
  hostRef:React.RefObject<HTMLDivElement>
};


const MyComponent = ({ children, className, hostRef }: Props) => {
  const [containerWidth, setContainerWidth] = useState<number>(null);
  const [numIterations, setNumIterations] = useState<number>(null);
  const {disabled} = useEditorState();
  useEffect(() => {
    if(hostRef.current) {
      const rect =hostRef.current.getBoundingClientRect();
      console.log("GOt rect", rect);
      const numInstances = Math.ceil(viewport.width / rect.width) + 1;
        console.log("draw instances",  numInstances );
      setContainerWidth(rect.width);
      setNumIterations(numInstances);
    }
  }, [hostRef])
  const viewport = useViewport();
  
  if(!hostRef?.current) return null;
  if(disabled || containerWidth === 0) return children;
  const clones = []
  for(let i=0;i<numIterations;i++) {
    clones.push(<Repeater totalIterations={numIterations} key={i} offset={i} windowWidth={viewport.width} repeat={children} container={hostRef.current} />)
  }
  return (
    <div className={[styles.wrapper, className].join(' ')}>
    
    {clones}
      
    </div>
  );
};

const Repeater = ({repeat, totalIterations, offset, container, key, windowWidth}:{container: HTMLDivElement, totalIterations: number, windowWidth: number, offset: number}) => {
  const [clonedElement, setClonedElements] = useState(null);
  const ref = useRef<HTMLDivElement>(null);
  const cloneRef = useRef(null)
  const portalRef = useRef<HTMLDivElement>(null);
  const contentSize = 1024;

  console.log("got window width", windowWidth, container.clientWidth)
  useEffect(() => {
        cloneRef.current = React.createElement('div',
            { key },
            React.Children.map(repeat, (child => React.cloneElement(child))));
        
        const numInstances = Math.ceil(windowWidth / contentSize) + 1;
        console.log("draw instances",  numInstances );
        setClonedElements(cloneRef.current)
      }, [windowWidth, contentSize, ref])

      useEffect(() => {
        console.log("poratal fref????", portalRef)
        if(portalRef.current) {
        console.log("poratal fref????", portalRef)

          const anim = portalRef.current.animate([
            {
              opacity: 0.5,
              transform: 'translateX(-100%)',
            },  
            {
              opacity: 1,
              transform: 'translateX(100%)',
              
            },
            ], {
              duration: totalIterations*3000,
              delay: 0,
              easing: 'linear',
              direction: 'normal',
              fill:"forwards",
              iterations: Infinity
          });
          anim.pause();
          setTimeout(() => anim.play(), 3000*offset);
        };
      }, [portalRef, offset])
      console.log("### DRAW CLONE ###");
    //    if(!clonedElement) return null;
  return <div className="portal" ref={portalRef} style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}>
    {offset === 0 ? repeat : clonedElement}
    </div>
  ;
}


registerVevComponent(MyComponent, {
  name: "My Component",
  type: 'action',
  props: [{ name: "title", type: "string", initialValue: "Vev" }],
  editableCSS: [
    {
      selector: styles.wrapper,
      properties: ["background"],
    },
  ],
});

export default MyComponent;
