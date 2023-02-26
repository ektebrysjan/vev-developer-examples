import React, { useEffect, useState } from "react";
import styles from "./MyComponent.module.css";
import { registerVevComponent, useEditorState, useViewport } from "@vev/react";
import Viewport from "./debuggers/viewport";
import Performance from "./debuggers/performance";
import EditorState from "./debuggers/editor-state";
import EventListeners from "./debuggers/event-listeners";
import Accessibility from "./debuggers/accessibility";
import AlternativeText from "./debuggers/alternative-text";
import AriaDebugger from "./debuggers/aria-debugger";
import SeoDebugger from "./debuggers/seo-debugger";
import ColorDebugger from "./debuggers/color-debugger";
import NetworkDebugger from "./debuggers/network-debugger";

type Props = {
  showViewport: boolean;
  showFPS: boolean;
  showEditorState: boolean;
  hostRef: React.RefObject<HTMLDivElement>;
  showEventListeners: boolean;
  showAccessibility: boolean;
  showAlternativeText: boolean;
  showAriaDebugger: boolean;
  showSeoDebugger: boolean;
};

const VevDebugger = ({
  showFPS,
  showViewport,
  showEditorState,
  showAccessibility,
  showAlternativeText,
  showAriaDebugger,
  showEventListeners,
  showSeoDebugger,
  hostRef,
}: Props) => {
  const [ownerDocument, setOwnerDocument] = useState<Document>(null);
  useEffect(() => {
    if (hostRef.current)
      setOwnerDocument(hostRef.current.getRootNode() as Document);
  }, [hostRef]);
  // 1. Get
  const { disabled, ruleKey, selected } = useEditorState();
  return (
    <div className={styles.wrapper}>
      <div className="title" style={{ fontSize: 18, textAlign: "center" }}>
        Vev Debugger
      </div>
      {showViewport && <Viewport />}
      {showFPS && <Performance disabled={disabled} />}
      {showEditorState && (
        <EditorState
          ruleKey={ruleKey}
          selected={selected}
          disabled={disabled}
        />
      )}
      {showEventListeners && <EventListeners document={ownerDocument} />}
      {showAccessibility && <Accessibility document={ownerDocument} />}
      {showAlternativeText && (
        <AlternativeText document={ownerDocument} disabled={disabled} />
      )}
      {showAriaDebugger && (
        <AriaDebugger document={ownerDocument} disabled={disabled} />
      )}
      {showSeoDebugger && (
        <SeoDebugger updateFrequency={3000} document={ownerDocument} disabled={disabled} />
      )}
      {<ColorDebugger  document={ownerDocument} disabled={disabled}  />}
      {<NetworkDebugger  document={ownerDocument} disabled={disabled} />}
    </div>
  );
};

registerVevComponent(VevDebugger, {
  name: "Vev Debugger+",
  type: "standard",
  props: [
    { name: "showViewport", type: "boolean", initialValue: true },
    { name: "showFPS", type: "boolean", initialValue: true },
    { name: "showEditorState", type: "boolean", initialValue: true },
    { name: "showEventListeners", type: "boolean", initialValue: true },
    { name: "showAccessibility", type: "boolean", initialValue: true },
    { name: "showAlternativeText", type: "boolean", initialValue: true },
    { name: "showAriaDebugger", type: "boolean", initialValue: true },
    { name: "showSeoDebugger", type: "boolean", initialValue: true },
  ],
  editableCSS: [
    {
      selector: styles.wrapper,
      properties: ["background"],
    },
  ],
});

export default VevDebugger;
