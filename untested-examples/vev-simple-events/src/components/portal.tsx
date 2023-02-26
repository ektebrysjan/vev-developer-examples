import React, { ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";

export const Portal = ({
  children,
  anchorEl,
  className = "root-portal",
  element = "div"
}:{
    children: ReactNode[],
    anchorEl: HTMLElement,
    className: string;
    element: string;
}) => {
  const [container] = useState(() => {
    const el = document.createElement(element);
    el.classList.add(className);
    return el;
  });

  useEffect(() => {
    console.log("###", container, anchorEl);
    if(container && anchorEl) {
        console.log("make the stuff", anchorEl);
        anchorEl.appendChild(container);
        return () => {
            anchorEl.removeChild(container);
        };
    }
  }, [container, anchorEl]);

  return ReactDOM.createPortal(children, container);
};