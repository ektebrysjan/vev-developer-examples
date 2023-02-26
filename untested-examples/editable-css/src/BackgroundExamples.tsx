import React from "react";
import styles from "./BackgroundExamples.module.css";
import { registerVevComponent } from "@vev/react";

type Props = {
  title: string;
};

const BackgroundExamples = ({ title = "Vev" }: Props) => {
  return (
    <div className={[styles.container, styles.backgroundSelector5].join(' ')}>
        <div className={styles.backgroundSelector1}>
            test
        </div>
        <div className={styles.backgroundSelector2}>
            test
        </div>
        <div className={styles.backgroundSelector3}>
            test
        </div>
        <div className={styles.backgroundSelector4}>
            test
        </div>
    </div>
  );
};

registerVevComponent(BackgroundExamples, {
  name: "Background CSS Examples",
  props: [{ name: "title", type: "string", initialValue: "Vev" }],
  editableCSS: [
    {
      selector: styles.wrapper,
      properties: ["background"],
    },
  ],
});

export default BackgroundExamples;
