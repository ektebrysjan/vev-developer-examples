import anime from 'animejs';
import React, { useEffect, useState, useRef, RefObject } from 'react';
import { useEditorState } from '@vev/react';

import styles from "./MyComponent.css"


export default function MyComponent(): JSX.Element {
  const wrapperRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const slides = [{
    key: "ecs56DYeaOF",
    name: "Frame1",
    page: "pC1axKuvrYy",
    pageName: "Donnybrook"
  },
  {
    key: "eqIPZ_U0Coo",
    name: "Frame2",
    page: "pC1axKuvrYy",
    pageName: "Donnybrook"
  }];

  return (
    <div style={{ width: '100%', height: '100%' }} ref={wrapperRef} >
      <Carousel width={wrapperRef.current ? wrapperRef.current.offsetWidth : 0} slides={slides} hostRef={wrapperRef} />
    </div>
  );
}


function Carousel({ width, slides, hostRef }: any) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const cardWrapperRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const { disabled } = useEditorState();

  useEffect(() => {
    slides.forEach((slide: any) => {
      if (!cardWrapperRef.current || disabled) return
      const slideNode = document.querySelector('#' + slide.key) as HTMLElement;
      const dimensions = slideNode.getBoundingClientRect();

      const width = dimensions.width + "px";
      const height = dimensions.height + "px";

      slideNode.style.setProperty('width', width);
      slideNode.style.setProperty('height', height);
      slideNode.style.setProperty('margin', 'initial');
      slideNode.style.setProperty('display', 'none');

      cardWrapperRef.current.appendChild(slideNode);
    });
  }, [])

  function slide(newIndex: number) {
    var direction = newIndex - activeIndex;
    if ((activeIndex === slides.length - 1 && direction >= 0) || (activeIndex === 0 && direction <= 0)) return;

    const slideNode = document.querySelector('#' + slides[activeIndex].key) as HTMLElement;
    slideNode.style.setProperty('display', 'none');
    setActiveIndex(newIndex);
  }

  useEffect(() => {
    if (!cardWrapperRef.current || disabled) return
    const slideNode = document.querySelector('#' + slides[activeIndex].key) as HTMLElement;
    slideNode.style.setProperty('display', 'initial');


  }, [activeIndex, disabled]);

  return (
    <>
      <div ref={cardWrapperRef} className={styles.cardWrapper} >
      </div>

      {slides && slides.length > 1 &&
        <div className={styles.nav}>
          {slides.map((_, index: number) => (
            <span key={index} className={`${styles.navOption} ${index === activeIndex ? `${styles.active}` : ''}`} onClick={() => slide(index)}></span>
          ))}
        </div>
      }
    </>
  );
};