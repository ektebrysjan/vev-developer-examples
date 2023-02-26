import React, { useEffect, useState } from "react";
import styles from "./ShowcaseElement.module.css";
import { ArrayField, LayoutField, LinkField, NumberField, registerVevComponent, StringField, useEditorState, useGlobalStore, VevProps } from "@vev/react";

type VevAddonProps = {
  children: React.ReactNode[]
  className: string;
}


type VevElementProps = {
  hostRef: React.RefObject<HTMLDivElement>;
  className: string;
}

type ShowcaseProps = {l
    stringField: string
} & VevElementProps;

const VevShowcaseElement = ({ stringFIeld, hostRef, className }: Props) => {

  return (
    <div className={className}>
      <h1>Vev Showcase: Elements / Sections</h1>
      <p>Show various features from a element / section standpoint</p>
      <PageStuff />
    </div>
  );
};

const VevSlideDebugger = ({slideys}:{slideys: any[]}) => {
  if(!slideys.length) {
    return <span>No slides</span>
  }
  return <div className="debug-timeline">
      {slideys.map((slide, index) => {
        console.log("slide ", index, slide);
      return <div key={index} className="debug-timeline-item">S</div>})}
    </div>
}

function PageStuff() {
  const [pages, currentPage, dispatch] = useGlobalStore((s, dispatch) => [s.pages, s.route, dispatch]);

  const navigateToPage = (targetPageKey, tweenIn?:any, tweenOut?:any) => {
    console.log("Dispatching route is one way to navigate to a sub-page")
    dispatch('route', {
        pageKey: currentPage.pageKey,
        transition: { toPageKey: targetPageKey, tween: { tweenIn: tweenIn, tweenOut: tweenOut, inFront: tweenIn ? true : false } }
      });
    };

  return <div className="page-stuff">
    {!pages?.length ? <span>No pages!</span> : pages.map(page => {
        return <div className="page-stuff-page-item" onClick={(page) => navigateToPage(page.key)}>
            {page.key}
            </div>
    })}
  </div>

}
/*
type VevAutoNavFieldProps = {
  name: VevStringField;

}
*/

// interface SlideProps {
//   duration: NumberField;
//   nextSlide: LinkField;
// }

// interface VevFieldProps {
//   name: StringField,
//   slides: ArrayField<SlideProps>
// }


registerVevComponent(VevShowcaseElement, {
  name: "Vev Showcase: Element / Section",
  props: [{
    type: 'string',
    name: "stringField",
    description: "A simple regular String Field"
  },{
    type: 'array', of: {
      type: 'layout',
      fields: [{
        type: 'number',
        name: 'duration'
      }, {
        type: 'link',
        name: 'nextSlide'
      }]
    }, name: "slideys"
  }],
  type: 'both',
  editableCSS: [
    {
      selector: styles.wrapper,
      properties: ["background"],
    },
  ],
});

export default VevShowcaseElement;
