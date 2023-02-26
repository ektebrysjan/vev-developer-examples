

async function textToSpeech(synthEl, languageCode, apiKey, useSSML = false) {
    // Reference: https://cloud.google.com/text-to-speech/docs/reference/rest/v1/text/synthesize
      const input:{ssml?: string, text?:string} = {}
      if(useSSML) {
          input.ssml = synthEl.ssml
      } else {
          input.text = synthEl.text
      }
    const response = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input,
          voice: {
            languageCode: languageCode,
          },
          audioConfig: {
            audioEncoding: "LINEAR16",
          },
        }),
      }
    );
  
    const result = await response.json();
  
    if (result.error) {
      throw result.error.message;
    } else {
      return result.audioContent;
    }
  }

  const LIST_HEADERS = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
};

export type VoiceOptions = {
    languageCode?: string;
    name?: string;
}
type AudioConfig = {
        audioEncoding: string,
}

export interface SynthOptions {
    input?: {

        ssml?: string;
        text?:string;
    }
    voiceConfig?: VoiceOptions;
    audioConfig?: AudioConfig;
}
  class GoogleTTSApi {
    apiKey: string;
    apiUrl: string = 'https://texttospeech.googleapis.com/v1';
    languageCode: string = 'en-GB';
    voice?:string;
    constructor() {
    }
    setApiKey(apiKey) {
        this.apiKey = apiKey;
    }
    setVoice(voice) {
        this.voice = voice;
    }
    getVoice() {
        return this.voice;
    }
    async synthesize(type:'text' | 'ssml', content: string, opts:SynthOptions) {
        
        if(type === 'ssml') {
            opts.input = {
                ssml: content
            };
        } else {
            opts.input = {text: content};
        }
        console.log("### Fetch with", opts);
        if(!opts.voiceConfig.languageCode) opts.voiceConfig.languageCode = this.languageCode;
        if(!opts.voiceConfig.name && this.voice) opts.voiceConfig.name = this.voice;
        const res = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${this.apiKey}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                input: opts.input,
                voice: opts.voiceConfig,
                audioConfig: opts.audioConfig
            })
        });
        const result = await res.json();

        if(result.error) {
            console.error(result.error);
        }
        return result.audioContent;

    }
    async getVoices(languageCode = 'en-GB') {
        const res = await fetch(`https://texttospeech.googleapis.com/v1/voices?key=${this.apiKey}&languageCode=${languageCode}`);
        const result =  await res.json();
        console.log("voies", result);
        return result.voices;
        //return this.list('voices');
    }
  }
  const api = new GoogleTTSApi();
  export default api;
