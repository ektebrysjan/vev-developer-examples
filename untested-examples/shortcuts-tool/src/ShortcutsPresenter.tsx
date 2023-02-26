import React, { useEffect, useState } from "react";
import styles from "./ShortcutsPresenter.module.css";
import useMultiKeyPress from "./helpers/use-multi-key-press";
import { registerVevComponent } from "@vev/react";

type Props = {
  title: string;
};

export const Shortcuts: { [shortcutId: string]: any } = {
  /**
   * Design editor shortcuts
   */
  editorInsert: {
    label: 'Open insert dialog',
    desc: 'Opens up the insert dialog when in design mode',
    keys: ['m', 'shift+f'],
  },
  rockVev: {
    label: 'Rock with Vev',
    desc: 'Rock on with Vev 🤘🏽',
    keys: ["r"],
  },
};

const REMOVE_KEYS_DELAY = 10000;

const ShortcutsPresenter = ({ title = "Vev" }: Props) => {
  const keysPressed = useMultiKeyPress({keyDelay: REMOVE_KEYS_DELAY});

  useEffect(() => {
    console.log("Keys presssssed", keysPressed);
  }, [keysPressed]);


  return (
    <div className={styles.wrapper}>
      <h1>Keys pressed</h1>
      <div className={styles.keysContainer}>
        {Object.keys(keysPressed).map(key => {
        return <kbd key={key} className={styles.keyboardButton}>{getKey(key)}</kbd>})}
      </div>
    </div>
  );
};

function getKey(key:string) {
  switch(key) {
    case 'Shift':
      return '⇧SHIFT';
    default:
      return key;
  }
}

registerVevComponent(ShortcutsPresenter, {
  name: "My Component",
  props: [{ name: "title", type: "string", initialValue: "Vev" }],
  editableCSS: [
    {
      selector: styles.wrapper,
      properties: ["background"],
    },
  ],
});

export default ShortcutsPresenter;
