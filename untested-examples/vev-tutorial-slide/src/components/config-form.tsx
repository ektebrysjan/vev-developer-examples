import React, { useCallback, useEffect, useRef, useState } from "react";
import GoogleTTSApi from "../api";
import styles from "./config-form.module.css";
import base64 from "base64-js";
import useAudio from "../use-audio";
import TextToSpeechField from "./text-to-speech-field";

function TextToSpeechConfig({ context, value, onChange, ...rest }) {
  const [apiKey, setApiKey] = useState<string>(null);

  const setVoice = (voice: string) => {
    console.log("on change!", voice);
    onChange({
      voice,
    });
  };

  useEffect(() => {
    console.log("### VALUE OF CONFIG FORM CHANGE", value);
    if (value.voice) GoogleTTSApi.setVoice(value.voice);
  }, [value]);

  useEffect(() => {
    const { storage } = context;

    storage.getItem("apiKey", "account").then((res) => {
      if (res) {
        console.log("Got res", res);
        setApiKey(res);
        GoogleTTSApi.setApiKey(res);
      }
    });
  }, [context, apiKey]);

  if (!apiKey) return <h3>Loading API</h3>;

  return (
    <div className="config-form">
      <h3>Config form</h3>
      <VoiceSelector
        showEdit={false}
        showDetails={true}
        setVoice={setVoice}
        showSave={true}
        current={value.voice}
      />
      <TextToSpeechTest currentVoice={value?.voice} />
    </div>
  );
}

export function VoiceSelector({
  showEdit = true,
  showDetails = false,
  setVoice,
  current,
  showSave = false
}: {
  showEdit?: boolean;
  showDetails?: boolean;
  current: string;
  setVoice: (name) => void;
  showSave?:boolean;
}) {
  const [currentVoice, setCurrentVoice] = useState<string>(current);
  const [editVoice, setEditVoice] = useState<boolean>(showEdit);
  const [voices, setVoices] = useState<
    {
      name: string;
      ssmlGender: string;
      languageCodes: string[];
    }[]
  >(null);

  useEffect(() => {
    if (!voices || !voices.length) {
      GoogleTTSApi.getVoices().then((voices) => setVoices(voices));
    }
  }, []);
  
  const handleSelectVoice = (voiceName:string) => {
    setVoice(voiceName);
    setCurrentVoice(voiceName);
  }

  const toggleEditVoice = useCallback(() => {
    setEditVoice(!editVoice);
  }, [editVoice]);



  if (!voices || !voices.length) return <h3>no voices</h3>;
  const selected = current ? voices.find((v) => v.name === current) : voices[0];
  return (
    <div>
      <div className="voice-settings-title">
        <h3>Current voice</h3>
       {showSave && <input
          type="button"
          className={styles.button}
          value={editVoice ? "Done" : "Edit"}
          onClick={toggleEditVoice}
        />}
      </div>
      {showDetails ? (
        <div className={styles.voiceInfo}>
          <label>Name: {selected.name}</label>
          <label>LanguageCodes: {selected.languageCodes.join(", ")}</label>
          <label>
            NaturalSampleRateHertz: {selected.naturalSampleRateHertz}
          </label>
          <label>ssmlGender: {selected.ssmlGender}</label>
        </div>
      ) : (
        <></>
      )}
      {editVoice ? (
        <select
          onChange={(ev) => {
            handleSelectVoice(ev.currentTarget.value);
          }}
          value={currentVoice}
        >
          {voices.map((voice) => (
            <option
              label={`${voice.name} (${voice.ssmlGender})`}
              value={voice.name}
            ></option>
          ))}
        </select>
      ) : (
        <></>
      )}
    </div>
  );
}

function TextToSpeechTest({ currentVoice }: { currentVoice: string }) {
  const [text, setText] = useState<string>("");
  const [textSSML, setTextSSML] = useState<string>("veəv");
  const textRef = useRef<HTMLInputElement>(null);
  const textSsmlRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useAudio();

  return (
    <div className={styles.audioGenerate}>
      <audio ref={audioRef} />
      <h2>Generate Audio from Text</h2>
      <p>{currentVoice}</p>
      <TextToSpeechField currentVoiceName={currentVoice} />
    </div>
  );
}

export default TextToSpeechConfig;
