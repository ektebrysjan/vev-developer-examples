import React, { useEffect, useRef } from "react";

function useAudio():React.RefObject<AudioContext> {
    const audioContextRef = useRef<AudioContext>(null);
    useEffect(() => {

        if (!audioContextRef.current) {
            const AudioContext =
              window.AudioContext || (window as any).webkitAudioContext;
            audioContextRef.current = new AudioContext();
            audioContextRef.current.resume(); // Safari needs this for some reason
          }
    }, [audioContextRef])
    return audioContextRef;
}
export default useAudio;