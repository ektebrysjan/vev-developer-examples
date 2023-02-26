import React, { useEffect, useState } from "react";
import styles from "./MyComponent.module.css";
import { registerVevComponent } from "@vev/react";
import SchemaFileField from "./form/SchemaFileField";
import SwaggerComp from "./SwaggerComponent";

type Props = {
  title: string;
  schemaFile: {
    name?: string;
    url?: string;
    dynamicUrl?: string;
  }
};

const MyComponent = ({ hostRef, title = "Vev", schemaFile }: Props) => {
  const [spec, setSpec] = useState(null);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [specFile, setSpecFile] = useState(null);

  const handleFile = async(files:FileList|null) => {
    const parseSpec = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    };
  });

const parseSpecFiles = async () => {
  const parsedSpec = [];
if(files === null) return parsedSpec;
  for (let i = 0; i < files.length; i++) {
    const data = await parseSpec(files[i]);
    parsedSpec.push(data);
  }

  return parsedSpec;
};

parseSpecFiles().then((parsedData) => setSpec(parsedData[0]));
}

  useEffect(() => {
    if(schemaFile?.url) {
      const getSchemaFile = async() => {
        const res = await fetch(schemaFile.url);
        const data = await res.json();
        return data;
      }
      getSchemaFile().then(setSpecFile);
    }
  }, [schemaFile])
  console.log("...props", schemaFile)

  useEffect(() => {
    console.log("got spec file", specFile);
  }, [specFile])

  useEffect(() => {
    if(!loaded) setLoaded(true);
  }, [loaded]);

  return (
    <div className={styles.wrapper}>
      {loaded && <SwaggerComp documentEl={hostRef?.current?.ownerDocument} schemaUrl={schemaFile.url} />}
    </div>
  );
};

registerVevComponent(MyComponent, {
  name: "My Component",
  props: [{ name: "title", type: "string", initialValue: "Vev" }, {
    name: "schemaFile",
    type: "string",
    component: SchemaFileField
  }],
  editableCSS: [
    {
      selector: styles.wrapper,
      properties: ["background"],
    },
  ],
});

export default MyComponent;
