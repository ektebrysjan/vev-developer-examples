import { useEditorState, useViewport } from "@vev/react";
import React from "react";

export default function EditorState({ruleKey, selected, disabled}) {
    
    return <fieldset>
    <legend>Editor State</legend>
    <label>Viewer: {disabled ? 'Disabled' : 'Enabled'}</label>
  </fieldset>
}