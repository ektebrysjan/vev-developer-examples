import { registerVevComponent, useSize } from "@vev/react";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ReactYoutube from 'react-youtube';
import './MyReactMultiCarousel.css'

const responsive = {
    doesntmatter: {
        breakpoint: { max: 9000, min: 0 },
        items: 1
    }
};

const some_youtube_videos = ["EJxwWpaGoJs", "zsJpUCWfyPE", "GNJpoP642wc"];

const MyReactMultiCarousel = (props: Props) => {
    const { hostRef } = props;
    const { width, height } = useSize(hostRef);
    return <Carousel swipeable={false} draggable={false} responsive={responsive} >
        {some_youtube_videos.map((id, index) => <ReactYoutube id={id} videoId={id} style={{ width, height }} />)}
    </Carousel>
}

registerVevComponent(MyReactMultiCarousel, {
    name: 'My Multi Carousel',
    type: 'both',
    
});

export default MyReactMultiCarousel;
