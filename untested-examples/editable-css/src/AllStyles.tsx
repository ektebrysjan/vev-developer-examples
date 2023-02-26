import React from "react";
import styles from "./AllStyles.module.css";
import { registerVevComponent } from "@vev/react";

type Props = {
  title: string;
};

const AllStyles = () => {
  return (
    <div className={styles.container}>
        <h1 className={styles.headerOne}>Header one</h1>
        <h2>Header two</h2>
        <h3>Header three</h3>
        <h4>Header four</h4>
        <h4>Header five</h4>
        <h4>Header six</h4>
        <p>Paragraph containing some <strong>bold</strong> text as well as some which is <i>Italic?</i></p>
    </div>
  );
};

registerVevComponent(AllStyles, {
  name: "AllStyles",
  props: [{ name: "title", type: "string", initialValue: "Vev" }],
  editableCSS: [
    {
      selector: styles.wrapper,
      properties: ["background"],
    },
    {
        selector: styles.headerOne,
        properties: ["font-family", "font-size", "color", "font-weight", "text-decoration"]
    }
  ],
});

export default AllStyles;
