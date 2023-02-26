import React, { useCallback, useEffect } from "react";
import styles from "./MyComponent.module.css";
import { registerVevComponent, useEditorState, useGlobalStore  } from "@vev/react";
import useTimeline, {  TimelineEntry } from "./components/vev-timeline-controller";
import TextToSpeechForm  from "./components/caption-audio-form";
import TextToSpeechConfig from './components/config-form';

type VevElementProps = {
  hostRef: React.RefObject<HTMLDivElement>;
  className: string;
}

interface Slide {
  duration: number;
  slide:{page: string};
  nextSlide: {page: string};
  captions: any[];
}

type Props = {
  slides: Slide[];
  startSlide?: {page?: string}
} & VevElementProps;

const VevAutoNav = ({ slides, hostRef, className }: Props) => {
  const {current, playing, play, pause, reset, destroy, setEntries} = useTimeline();
  const [pages, currentPage, dispatch] = useGlobalStore((s, dispatch) => [s.pages, s.route, dispatch]);


  // Getting the current state of the Vev Design Editor
  // If disabled is false you are VIEWING the content
  // if disabled is true you are EDITING the content
  const {disabled} = useEditorState();

  useEffect(() => {
    if(disabled === false) {
      console.log("##### Viewer mode enabled #####");
      return () => {
        console.log("#### Reset the Timeline #####");
        reset();
      }
    }
  }, [disabled])

  /**
   * When the slides change, we use the setEntries
   * which we fetch from useTimeline further up, to set
   * the slides for the Timeline with updated information
   * which can happen when the user changes the duration of
   * a slide, or changes the target page for the next slide
   * to something else.
   * 
   * Or if the user adds a new slide.
   */
  useEffect(() => {
    if(slides?.length) {
      
      const timelineEntries:TimelineEntry[] = slides.map((slide, index, arr) => {
        return {
          onComplete: () => {
            console.log("trying to navigate");
           
          },
          id: slide?.slide?.page, // This is just so we can show which is the current slide
          pageKey: slide?.slide?.page,
          nextPageKey: slide?.nextSlide?.page,
          duration: slide.duration,
          captions: slide.captions
        }
      });
      setEntries(timelineEntries);
      console.log("slides:", timelineEntries);
    }

  }, [slides]);
 
  useEffect(() => {
    console.log("go to ", current);
    if(current && current.pageKey !== currentPage.pageKey) {

      dispatch('route', {
      pageKey: current.pageKey,
     });
    }
  }, [current])

  const goToAndPause = (pageKey: string) => {
    console.log("go to ", pageKey, currentPage);
    
    dispatch('route', {
      pageKey: pageKey,
    });
  //dispatch('route', { pageKey: pageKey });
  };  
  
  return (
    <div className={[className, styles.debugger].join(' ')}>
      <h1>Playback Debugger</h1>
      <div>EditorState: {disabled === true ? `active` : `inactive`}</div>
      <ol className={styles.timeline}>
      {slides?.length ? slides.map((slide, index) => {
        return <li key={`li${index}`}><a href="" data-tween={{tweenOut: 'fade'}} onClick={() => {
          console.log("timeline click");
          goToAndPause(slide?.nextSlide?.page)
          return false;
        }} key={index} className="debug-timeline-item">{slide?.slide?.page} - {slide?.nextSlide?.page} {current?.id === slide?.nextSlide?.page ? `(current)`: ``}</a>
        {slide?.captions?.length && <ol>
          {slide.captions.map(caption => <li>{caption.startTime || '00:00'} - {caption.captionEntryText}</li>)}
        </ol>}
        </li>
      }) : <h2>No slides</h2>}
    </ol>
        <input type="button" name="Play" onClick={play} value="Play" />
        <input type="button" name="Pause" onClick={pause} value="Pause" />
        <input type="button" name="Reset" onClick={reset} value="Reset" />
    </div>
  );
};

registerVevComponent(VevAutoNav, {
  name: "Vev AutoNav 3000",
  props: [ {
    type: 'array',
    name: 'slides',
    of: {
      type: 'layout',
      options: {
        display: "column",
      },
      fields: [{type: 'link', name: 'slide'},{
        type: 'number',
        name: 'duration'
      }, {
        type: 'link',
        description: 'The next slide to go to',
        label: 'Next slide',
        name: 'nextSlide'
      }, {
        type: 'array',
        name: 'captions',
        of: {
          type: 'layout',
          options: {
            display: "column",
          },
          fields: [{
            name: "captionEntryText",
            type: "string"
          },{
            name: "delay",
            type: "number"
          } ,{
            name: "captionEntryAudio",
            type: 'file',
            options: {
              display: "column",
            },
            component: TextToSpeechForm
          }]
        }
      }]
  }},{
    type: "string",
    name: "apiKey",
    description: "The API Key for your Google Text to Speech synthesis",
    storage: 'account'
  },{
    type: 'object',
    component: TextToSpeechConfig,
    name: 'config',
    fields: [{
      name: 'voice',
      type: 'string'
    }]
  } ],
  type: 'both',
  editableCSS: [
    {
      selector: styles.wrapper,
      properties: ["background"],
    },
    {
      selector: styles.debugger,
      properties: ['font-family', 'color', 'font-size']
    }
  ],
});

export default VevAutoNav;
