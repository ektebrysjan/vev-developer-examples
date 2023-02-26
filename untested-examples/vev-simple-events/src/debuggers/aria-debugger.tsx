import React, { useEffect, useState } from "react";
import { Portal } from "@vev/react";

export default function AriaDebugger({
  document,
  disabled,
}: {
  document: Document;
  disabled: boolean;
}) {
  const [numAria, setNumAria] = useState<number>(0);
  useEffect(() => {
    if (document && !disabled) {
      const arias = document.querySelectorAll("[aria-label],[aria-describedby]");
        
      setNumAria(arias.length);
    } else {
    }
  }, [document, disabled]);
  return (
    <fieldset>
      <legend>Ara Debugger</legend>
      <label>Aria: {numAria}</label>
      <p>{numAria < 10 ? 'OK Many Arias' : 'Too many Arias!'}</p>
    </fieldset>
  );
}

const AriaAreaDebugger = ({ altText }: { altText: string }) => {
  const tooLong = altText.length > 125;
  const decorative = altText === "" ? true : false;
  return (
    <div style={{ backgroundColor: "#000000", padding: 5, height: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      {decorative === false ? (
        <>
          <h2 style={{ fontSize: 18, color: "#FFFFFF" }}>{altText}</h2>
          <h3 style={{ fontSize: 14, color: "#FFFFFF" }}>
            {tooLong
              ? "Alt text too long (>125 chars)"
              : "Alt text length OK! (<125 chars)"}
          </h3>
        </>
      ) : (
        <h3 style={{ fontSize: 14, color: "#FFFFFF" }}>
          {decorative ? "Image is Decorative" : "Image is NOT Decorative"}
        </h3>
      )}
    </div>
  );
};
