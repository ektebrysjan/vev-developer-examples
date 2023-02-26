import { SchemaContextModel } from "@vev/react";
import React, { useRef, useState } from "react";
import styles from "./vev-page-selector.module.scss";
type VideoScrollFormProps = {
  context: SchemaContextModel;
  value: any;
  onChange: (value: any) => void;
};

export function VevPageSelectorForm({
  context,
  value,
  onChange,
}: VideoScrollFormProps) {
  const ref = useRef<HTMLLabelElement>(null);
  
  

  return (
    <label
      ref={ref}
    >
    </label>
  );
}