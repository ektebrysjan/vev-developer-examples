import { useCallback, useEffect, useRef, useState } from "react";
import useAudio from "../use-audio";
import base64 from "base64-js";


interface TimelineProps {
    entries: TimelineEntry[]
}

export interface Timeline {
    playing: boolean;
    play: () => void;
    pause: () => void;
    current: TimelineEntry | null;
    reset: () => void;
    destroy: () => void;
    setEntries: (entries: TimelineEntry[]) => void;
}

interface TimelineCaption {
    captionEntryText: string;
    captionEntryAudio?: {
        name: string;
        url: string;
        dynamicUrl: string;
    };
    startTime: string;
    delay?: number;
    audioBytes?: string|ArrayBuffer;
}

export interface TimelineEntry {
    duration: number;
    id?: string;
    pageKey?: string;
    captions: TimelineCaption[];
    onComplete: () => void;
}

export default function useTimeline():Timeline {
    const [playing, setPlaying] = useState<boolean>(false);
    const [queue, setQueue] = useState<TimelineEntry[]>([]);
    const [current, setCurrent] = useState<TimelineEntry>(null);
    const tlTimeout = useRef(null);

    const audioContextRef = useAudio();
    useEffect(() => {
        if(current) {
            playEntry(current);
        }
    }, [current]);

    const playEntry = (timeline:TimelineEntry) => {
        if(timeline.captions) {
            let audio = new Audio();
            console.log("### PLAY captions");
            for(let i=0;i<timeline.captions.length;i++) {
                const caption = timeline.captions[i];
                console.log("##PORCESS CAPTION", caption);
                // audioContextRef.current.decodeAudioData(buffer, (buffer) => {
                //     console.log("got bufff", buffer);
                //     const source =audioContextRef.current.createBufferSource();
                //     source.buffer = buffer;
                //     source.connect(audioContextRef.current.destination);
                //     source.start();
                //   });
                
                setTimeout(() => {
                    audio.src = caption.audioBytes as string;
                    audio.play()
                }, caption.delay);
              };
        }
        tlTimeout.current = setTimeout(() => {
            console.log("### Done playing slide with ms duration set to : ", timeline.duration);
            const currentIndex = queue.indexOf(current);
            
            timeline.onComplete();

            console.log("play the captions", timeline.captions)
            if(queue[currentIndex+1]) setCurrent(queue[currentIndex+1]);
        }, timeline.duration);
    };

    return {
        playing,
        current: current,
        play: async () => {
            setPlaying(true)
            console.log("#### START ####", queue);
            // Buffer all audio first
            if(queue.length) {
                for(let i=0;i<queue.length;i++) {
                    const item = queue[i];
                    if(item?.captions?.length) {
                        for(let j=0;j<item.captions.length;j++) {
                            // load bytes from url
                            const caption = item.captions[j];
                            if(caption.captionEntryAudio) {

                                const res = await fetch(caption.captionEntryAudio.url);
                                const blob = await res.blob();
                                const b64 = await blobToBase64(blob) as string;
                                console.log("b64,", b64);
                                caption.audioBytes = b64;
                            }
                        }
                    }
                }
            }
            if(queue.length) setCurrent(queue[0]);
        },
        pause: () => {
            console.log("Not implemented yet");
        },
        reset: () => {
            console.log("#### RESETTING ###");
            setCurrent(null);
            setPlaying(false)
        },
        destroy: () => {
            setCurrent(null);
            setPlaying(false);
            if(tlTimeout.current) clearTimeout(tlTimeout.current)
        },
        setEntries: (entries:TimelineEntry[]) => {
            setQueue(entries);
            setCurrent(null);
        }
    }
}
function playSample(audioContext, audioBuffer, time) {
    const sampleSource = audioContext.createBufferSource();
    sampleSource.buffer = audioBuffer;
    sampleSource.playbackRate.value = 1;
    sampleSource.connect(audioContext.destination)
    sampleSource.start(time);
    return sampleSource;
}


function blobToBase64(blob):Promise<string|ArrayBuffer> {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }