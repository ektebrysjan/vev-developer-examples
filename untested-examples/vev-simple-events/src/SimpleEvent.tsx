import React, { useEffect, useLayoutEffect, useRef } from "react";
import styles from "./MyComponent.module.css";
import { registerVevComponent, useEditorState, useGlobalStateRef, useScrollTop } from "@vev/react";
import anime, { AnimeTimelineInstance } from 'animejs';
type Props = {
  title: string;
  children: React.ReactElement;
};

const DEMO_SCROLL_SETTING = [{
    position: 'center',
    offsetY: 0,
    keyframe: {
        opacity: 0
    }
}, {
    position: 'center',
    offsetY: 500,
    keyframe: {
        opacity: 1
    }
}]

const VevSimpleEvent = ({ children, className, hostRef }: Props) => {
    const globalState = useGlobalStateRef();
    const editorState = useEditorState();
    const animeRef = useRef<AnimeTimelineInstance>(null);
    const scrollTop = useScrollTop();
    console.log("globalState", editorState);
    useEffect(() => {
        if(!animeRef.current) {
            animeRef.current = anime.timeline({
                duration: 900,
                targets: [(hostRef.current.getRootNode() as Document).documentElement],
                easing: 'linear',
                
                
            });
            animeRef.current.add({
                targets: children.props.hostRef.current as HTMLDivElement,
                opacity: 0,
                easing: 'linear'
            }, 0)
            animeRef.current.add({
                targets: children.props.hostRef.current as HTMLDivElement,
                opacity: 1,
                easing: 'linear'
            }, 900);
        }
        console.log("SEEEK animatino", scrollTop);
        animeRef.current.seek(900 - scrollTop);
    }, [scrollTop, children])
    useLayoutEffect(() => {
        if(children?.props?.hostRef?.current) {

            // const target = children.props.hostRef.current as HTMLDivElement;
            // target.animate([
            //     {
            //         opacity: 0
            //     },
            //     {
            //         opacity: 1
            //     }
            // ], {
            //     duration: 3000,
            //     iterations: Infinity
            // });
        }
    }, [children]);

    useEffect(() => {
        // if(!editorState.disabled) {
        //     // Scroll
        //     animeRef.current = anime.timeline({
        //         autoplay: true,
        //         duration: 900,
        //         targets: [(hostRef.current.getRootNode() as Document).documentElement],
        //         easing: 'linear',
        //         loop: true,
                
        //     });
        //     animeRef.current.add({
        //         scrollTop: 400,
        //     })
        //     animeRef.current.add({
        //         scrollTop: 0,
        //     })
        //     return () => {
        //         animeRef.current.pause();
        //     }

        // } else {
        //     console.log("stawp");
        // }
    }, [editorState, hostRef])
  return (
    children
  );
};

registerVevComponent(VevSimpleEvent, {
  name: "VevSimpleEvent",
  type: 'action',
  props: [{ name: "title", type: "string", initialValue: "Vev" }],
  editableCSS: [
    {
      selector: styles.wrapper,
      properties: ["background"],
    },
  ],
});

export default VevSimpleEvent;
