import { useScrollTop, useViewport } from "@vev/react";
import React, { useEffect } from "react";

export default function Viewport() {
  const viewport = useViewport();
  const scrollTop = useScrollTop();
  const scrollTopPercent = useScrollTop(true);

  return (
    <fieldset>
      <legend>Viewport</legend>
      <span>{viewport.width}</span>
      <span>x</span>
      <span>{viewport.height}</span>
      <br />
      <label>ScrollHeight: {viewport.scrollHeight}px</label>
      <br />
      <label>CenterPoint: {scrollTop + (viewport.height/2)}px</label>

      <div>
        <label>
          ScrollTop: {scrollTop}px ({Math.floor(scrollTopPercent) * 100}%)
        </label>
      </div>
    </fieldset>
  );
}
