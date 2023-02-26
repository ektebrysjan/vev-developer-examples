import React, { useEffect, useState } from "react";
import { Portal } from "@vev/react";

export default function AlternativeText({
  document,
  disabled,
}: {
  document: Document;
  disabled: boolean;
}) {
  const [altNodes, setAltNodes] = useState<Portal>();
  const [imgCount, setImgCount] = useState<number>(0);
  useEffect(() => {
    if (document && !disabled) {
      const imgs = document.querySelectorAll("img");
      let imgPortals = [];
      for (let i = 0; i < imgs.length; i++) {
        imgPortals.push(
          <Portal
            style={{ width: imgs[i].width, height: imgs[i].height, opacity: 0.5 }}
            anchorOrigin={"top left"}
            key={i}
            anchor={imgs[i]}
          >
            <AltTextDebugger altText={imgs[i].alt} />
          </Portal>
        );
      }
      setImgCount(imgs.length);
      setAltNodes(imgPortals);
      return () => {
        setAltNodes([]);
      };
    } else {
    }
  }, [document, disabled]);
  return (
    <fieldset>
      <legend>Alternative Text</legend>
      <label>Image Count: {imgCount}</label>
      {altNodes}
    </fieldset>
  );
}

const AltTextDebugger = ({ altText }: { altText: string }) => {
  const tooLong = altText.length > 125;
  const decorative = altText === "" ? true : false;
  return (
    <div style={{ backgroundColor: "rgba(0,0,0,0.6) ", opacity: 0.5, padding: 5, height: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
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
