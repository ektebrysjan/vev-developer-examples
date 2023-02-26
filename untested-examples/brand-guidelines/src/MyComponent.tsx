import React from "react";
import styles from "./MyComponent.module.css";
import { registerVevComponent } from "@vev/react";

type Props = {
  title: string;
};

const MyComponent = ({ name = 'Light Sand', color = "#e8ded4" }: Props) => {
  return (
    <div style={{backgroundColor: color, height: '100%', minHeight: '100%' }} title={name}>
      <span>{name}</span>
      <span>↓</span>
      <div className={styles.group} style={{padding: 20}}>
        <span>HEX</span>
        <span>{color}</span>
      </div>
      <div className={styles.group}>
        <span>RGB</span>
        <span>232, 222, 212</span>
      </div>
      <div className={styles.group}>
        <span>CMYK</span>
        <span>08-10-14-00</span>
      </div>
      <div className={styles.group}>
        <span>Pantone</span>
        <span>9226 C/ 9080 U</span>
      </div>
    </div>
  );
};

registerVevComponent(MyComponent, {
  name: "Color",
  props: [{ name: "name", type: "string", initialValue: "Light Sand" }, { name: 'color', type: 'string', initialValue: '#e8ded4'}],
});

export default MyComponent;
