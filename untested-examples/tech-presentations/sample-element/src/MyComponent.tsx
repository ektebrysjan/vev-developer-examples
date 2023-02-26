import React from "react";
import styles from "./MyComponent.module.css";
import { registerVevComponent } from "@vev/react";
import Snowfall from 'react-snowfall'

type Props = {
  title: string;
};

const MyComponent = ({ title = "World!!!!" }: Props) => {
  return (
    <div className={styles.wrapper}>
      <Snowfall style={{
    position: 'fixed',
    width: '100vw',
    height: '100vh'
  }} />
    </div>
  );
};

registerVevComponent(MyComponent, {
  name: "My Component",
  props: [{ name: "title", type: "string", initialValue: "Vev" }],
  editableCSS: [
    {
      selector: styles.wrapper,
      properties: ["background"],
    },
  ],
});

export default MyComponent;
