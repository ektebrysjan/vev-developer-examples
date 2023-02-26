import { useEditorState, useViewport } from "@vev/react";
import React, { useEffect, useState } from "react";

export default function Accessibility({ document }: { document: Document }) {
  const { disabled } = useEditorState();
  const [lang, setLang] = useState<string>(null);
  useEffect(() => {
    if (document) {
      setLang(document.documentElement.lang);
    }
  }, [disabled, document]);
  return (
    <fieldset>
      <legend>Accessibility</legend>
      <label>Lang: {lang ?? "No language set (bad)"}</label>
    </fieldset>
  );
}
