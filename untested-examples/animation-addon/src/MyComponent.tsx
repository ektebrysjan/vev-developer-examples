import React from "react";
import styles from "./MyComponent.module.css";
import { registerVevComponent, useScrollTop } from "@vev/react";
import AnimationController from "./controls/AnimationController";

type Props = {
  title: string;
  className: string;
};

const AnimationAddon = ({ title = "Vev", className }: Props) => {
  const scrollTop = useScrollTop();

  return (
    <div className={className}>
      {scrollTop}
    </div>
  );
};

// ref https://codesandbox.io/s/quiet-wood-shtdhg

registerVevComponent(AnimationAddon, {
  name: "Animation Addon",
  type: 'action',
  panelType: 'inline',
  props: [{ name: "title", type: "string", initialValue: "Vev" },  {
    type: 'object',
    component: AnimationController,
    name: 'controller',
    fields: [{
      name: 'keyframes',
      type: 'array',
      of: [{
        type: 'object',
        name: 'keyframe',
        fields: [{
          name: 'name',
          type: 'string'
        }]
      }]
    }]
  }],
  editableCSS: [
    {
      selector: styles.wrapper,
      properties: ["background"],
    },
  ],
});

export default AnimationAddon;
