import React, { useEffect, useRef } from "react";
import styles from "./MyComponent.module.css";
import { registerVevComponent, useEditorState } from "@vev/react";

type Props = {
  title: string;
};

const AnimationTimelineController = ({ title = "Vev" }: Props) => {
    const {disabled} = useEditorState();
    const timeline = useAnimationTimeline({disabled});
  return (
    <div className={styles.wrapper}>
      <div className={styles.animationLine}>
        <h1>Timeline</h1>
        <div className={styles.ball}></div>
        <div>{timeline}</div>
      </div>
    </div>
  );
};
function useAnimationTimeline({disabled = true}:{disabled?: boolean}) {
  const timelineElement = useRef<AnimationTimeline>(null);
  const currentTimeRef = useRef<number>(0);
  const timelineIntervalRef = useRef<any>(0);
  function updateTimeline() {
      console.log("Document timelin", document.timeline.currentTime);
    currentTimeRef.current = document.timeline.currentTime;
  }
  useEffect(() => {
    if(!disabled) {

        currentTimeRef.current = document.timeline.currentTime;
        timelineIntervalRef.current = setInterval(updateTimeline, 1000);
        return () => {
            clearInterval(timelineIntervalRef.current)
        }
    }
  }, [disabled])
  return currentTimeRef.current;
}

registerVevComponent(AnimationTimelineController, {
  name: "AnimationTimelineController",
  props: [{ name: "title", type: "string", initialValue: "Vev" }],
  editableCSS: [
    {
      selector: styles.wrapper,
      properties: ["background"],
    },
  ],
});

export default AnimationTimelineController;
