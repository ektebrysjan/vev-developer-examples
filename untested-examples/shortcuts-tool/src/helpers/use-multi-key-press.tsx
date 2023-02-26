import { useState, useEffect } from "react";

export default function useMultiKeyPress({keyDelay}) {
  const [keysPressed, setKeyPressed] = useState({});

  function downHandler({ key }) {
    keysPressed[key] = 1;
    setKeyPressed(Object.assign({}, keysPressed));
  }

  const upHandler = ({ key }) => {
    setTimeout(() => {

      keysPressed[key] = 0;
      delete keysPressed[key];
      setKeyPressed(Object.assign({}, keysPressed));
    }, keyDelay);
  };

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return keysPressed;
}
