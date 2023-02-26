import React, { useState } from "react";
import styles from "./MyComponent.module.css";
import { registerVevComponent } from "@vev/react";

type Props = {
  title: string;
};

const MyComponent = ({ title = "Vev" }: Props) => {
  const [active, setActive] = useState<number>(0);
  return (
    <div className={[styles.wrapper, styles.options].join(' ')}>
      <div className={[styles.option, active === 0 ? styles.active : ''].join(' ')} onClick={() => setActive(0)}>Slide 12</div>
      <div className={[styles.option, active === 1 ? styles.active : ''].join(' ')} onClick={() => setActive(1)}>Slide 2</div>
      <div className={[styles.option, active === 2 ? styles.active : ''].join(' ')} onClick={() => setActive(2)}>Slide 3</div>
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
