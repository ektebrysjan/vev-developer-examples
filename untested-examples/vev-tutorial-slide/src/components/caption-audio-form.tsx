import { SchemaContextModel } from "@vev/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./caption-audio-form.module.css";
import base64 from "base64-js";
import GoogleTTSApi from '../api';
import useAudio from "../use-audio";
import TextToSpeechField from "./text-to-speech-field";

type TextToSpeechForm = {
  context: SchemaContextModel;
  value: any;
  onChange: (value: any) => void;
};

export default function TextToSpeechForm({
  context,
  value,
  onChange,
  ...rest
}: TextToSpeechForm) {
  
    const saveAudio = async(fileString:string) => {
        console.log("savre audio", fileString);


      // Ok this works!)
      const uploadFile = context.actions?.uploadFile;

      if (!uploadFile) return;
      // setUnpacking(true);
      // setError(null);
        
        const file = await uploadFile(fileString);
        console.log("GOt file", file);
        onChange(file);
    }
  return (
    <div className="column">
    {value && <AudioPlaybackComponent captionEntryAudio={value} />}
    <h2>Generate audio captions</h2>
    <TextToSpeechField onSave={(buffer => saveAudio(buffer))} />
    </div>
  );
}

const AudioPlaybackComponent = ({captionEntryAudio}) => {
    console.log("generating url to playback", captionEntryAudio.url);
    let url = captionEntryAudio.url;
    return <audio controls crossOrigin={"false"}>
     <source src={url} type="audio/mp3" />
  </audio>;
}

