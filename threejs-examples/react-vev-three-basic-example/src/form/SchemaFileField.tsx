import { SchemaContextModel } from "@vev/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./caption-audio-form.module.css";

type SchemaFileField = {
    context: SchemaContextModel;
    value: any;
    onChange: (value: any) => void;
};

export default function SchemaFileField({
    context,
    value,
    onChange,
    ...rest
}: SchemaFileField) {
    const handleFile = async (files: FileList | null) => {
        const filesArray = Array.from(files);
        const uploadFile = context.actions?.uploadFile;
        if (!uploadFile) return;
        const res = await uploadFile(filesArray[0]);

        onChange(res);
        return;
        const added_files = [];
        for (let i = 0; i < filesArray.length; i++) {
            const file = filesArray[i];
            added_files.push(file);
            console.log("GOt file", res);
        }

    };
    return (
        <div className="column">
            <input type="file" onChange={(e) => handleFile(e.target.files)} />
        </div>
    );
}

const AudioPlaybackComponent = ({ captionEntryAudio }) => {
    console.log("generating url to playback", captionEntryAudio.url);
    let url = captionEntryAudio.url;
    return <audio controls crossOrigin={"false"}>
        <source src={url} type="audio/mp3" />
    </audio>;
}

