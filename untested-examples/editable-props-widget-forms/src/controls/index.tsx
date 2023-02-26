import { SchemaContextModel } from "@vev/react";
import React, { useCallback, useEffect, useRef, useState } from "react";

function Controls({
  context,
  value,
  onChange,
  ...rest
}) {
  
    const saveAudio = async(fileString:string) => {
       
       // onChange();
    }
    console.log("rest", rest);
  return (
    <div className="column">
        <h1>I am form</h1>
    </div>
  );
}

export default Controls;