import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./text-to-speech-field.module.css";
import GoogleTTSApi, { SynthOptions } from "../api";
import useAudio from "../use-audio";
import base64 from "base64-js";
import { VoiceSelector } from "./config-form";
import { Pretty } from "./helpers";

function TextToSpeechField({currentVoiceName, onSave, showDebug = false}:{onSave?: (data) => void, showDebug?: boolean, currentVoiceName?: string}) {
  const [mode, setMode] = useState<"text" | "ssml">("text");
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);
  const [config, setConfig] = useState<{
    input: {
        text?: string;
        ssml?: string;
    },
    voiceConfig: {
        name?: string,
        languageCode?: string,
    },
    audioConfig: {
        audioEncoding: string;
        pitch?: number;
    }
  }>({
    input: {
        text: `There's always money in the banana stand.`,
        ssml: `<speak><phoneme alphabet="ipa" ph="veəv">Vev</phoneme></speak>`
    },
    voiceConfig: {
        languageCode: 'en-GB',
    },
    audioConfig: {
        audioEncoding: 'LINEAR16'
    }
  })
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useAudio();
  const audioDataRef = useRef(null);


  useEffect(() => {
    console.log("Config changed", config);
  }, [config])


  const generateAudio = async (val) => {
    const audioConfig = Object.assign({}, config);
    const audioData = await GoogleTTSApi.synthesize(mode, val, audioConfig);
    console.log("got audioData", audioData);
    // play back the audio or put it in audio element
    audioContextRef.current.decodeAudioData(base64.toByteArray(audioData).buffer, (buffer) => {
        const source =audioContextRef.current.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContextRef.current.destination);
        source.start();
      });
      audioRef.current.src = `data:audio/mpeg;base64,${audioData}`;
      audioDataRef.current = `data:audio/mpeg;base64,${audioData}`;
  };
  const handleMode = (ev) => setMode(ev.currentTarget.value);
  const handleSave = useCallback((ev) => {
    console.log("### SAVE BUFFER TO FILE ###");
    onSave(audioDataRef.current);
  }, [audioDataRef]);

  return (
    <div className={styles.textToSpeechField}>
        {showDebug ? <Pretty data={config} /> : <></>}
      <h2>Configure {mode}</h2>
      <select onChange={handleMode} value={mode}>
        {["text", "ssml"].map((mode) => (
          <option value={mode}>{mode.toUpperCase()}</option>
        ))}
      </select>
      <VoiceSelector showDetails={false} current={currentVoiceName} setVoice={(voice) => {
        config.voiceConfig.name = voice;
        setConfig(Object.assign({}, config))
      }} />
       <AudioConfigForm value={config} onChange={(audioConfig) => {
        console.log("update config f", config);
        config.audioConfig = Object.assign({}, config.audioConfig, audioConfig);
        setConfig(Object.assign({}, config))

      }} />
      <h3>Synthesize this</h3>
      {mode === "text" ? (
        <TextInput
          value={config?.input?.text}
          onSubmit={(text) => generateAudio(text)}
        />
      ) : (
        <SSMLInput
          value={config?.input?.ssml}
          onSubmit={(text) => generateAudio(text)}
        />
      )}
     
        <audio ref={audioRef} />
        <input type="button" className={styles.button} onClick={handleSave} value="Save" />
    </div>
  );
}

function AudioConfigForm({onChange, value}) {
    const [pitch, setPitch] = useState<number>(1.01);
    const handlePitchChange = pitch => {
        onChange({
            pitch
        });
        setPitch(pitch);
    }
    return <div className="toggles" >
        <label>Pitch<input type="number" step="0.01"
        max="20.00"
        min="-20.00" className={styles.inputText} name="pitch" onChange={(ev) => handlePitchChange(ev.currentTarget.value)} value={pitch} /></label>
    </div>
}

function TextInput({ value, onSubmit }) {
  const [textInput, setTextInput] = useState<string>(
    value 
  );
  return (
    <div className="ssmlInput">
      <input
        type="text"
        className={styles.inputText}
        
        value={textInput}
        onChange={(ev) => setTextInput(ev.currentTarget.value)}
      />

      <input
        type="button"
        className={styles.button}
        value="Run"
        onClick={() => {
          onSubmit(textInput);
        }}
      />
    </div>
  );
}

function SSMLInput({ value, onSubmit }) {
  const [ssmlInput, setSsmlInput] = useState<string>(
    value    
  );
  return (
    <div className="ssmlInput">
      <textarea
         className={styles.inputText}
        value={ssmlInput}
        onChange={(ev) => setSsmlInput(ev.currentTarget.value)}
      ></textarea>
      <input
        type="button"
        value="Run"
        className={styles.button}
        onClick={() => {
          onSubmit(ssmlInput);
        }}
      />
    </div>
  );
}

export default TextToSpeechField;
