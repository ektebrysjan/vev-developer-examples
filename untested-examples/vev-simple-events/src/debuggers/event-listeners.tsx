import { useEditorState, useViewport } from "@vev/react";
import React, { useEffect, useState } from "react";

export default function EventListeners({document}:{document:Document}) {
    const [numListeners, setNumListeners] = useState<number>(0);
    const [colors, setColors] = useState<string[]>();
    useEffect(() => {
        if(document) {

            const listeners = listAllEventListeners(document);
            setNumListeners(listeners.length);
        }
    }, [document]); 
    return <fieldset>
    <legend>Event Listeners</legend>
    <label>Count: {numListeners}</label>
  </fieldset>
}

function listAllEventListeners(docRef:Document) {
    const allElements = Array.prototype.slice.call(docRef.querySelectorAll('*'));
    allElements.push(document);
    allElements.push(window);
  
    const types = [];
  
    for (let ev in window) {
      if (/^on/.test(ev)) types[types.length] = ev;
    }
  
    let elements = [];
    for (let i = 0; i < allElements.length; i++) {
      const currentElement = allElements[i];
      for (let j = 0; j < types.length; j++) {
        if (typeof currentElement[types[j]] === 'function') {
          elements.push({
            "node": currentElement,
            "type": types[j],
            "func": currentElement[types[j]].toString(),
          });
        }
      }

      // Traversing ALL elements. Get all colors used
      let usedColors = [];
    }
  
    return elements.sort(function(a,b) {
      return a.type.localeCompare(b.type);
    });
  }