import React from "react";
import styles from "./MyComponent.module.css";
import { registerVevComponent } from "@vev/react";

type Props = {
  title: string;
};

const MyComponent = ({ title = "Vev" }: Props) => {
  return (
    <div className={styles.container}>

      <div className={styles.wrapper}>
        
      </div>
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
