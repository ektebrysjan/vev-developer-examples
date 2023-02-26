import { useInterval } from "@vev/react";
import React, { useCallback, useEffect, useState } from "react";

export default function NetworkDebugger({
  document,
  disabled,
  updateFrequency = 10000,
}: {
  document: Document;
  disabled: boolean;
  updateFrequency?: number;
}) {
  const [running, setRunning] = useState<boolean>(false);
  const [stats, setStats] = useState<{[fileType: string] : { fileType: string, fileCount: number }}>({});
  const [domains, setDomains] = useState<{[domain: string] : number}>({});
  const checkDoc = useCallback(() => {
    if(document && running) {
        console.log("#UPDATNG RERSOURCES");
        const list = performance.getEntriesByType("resource");
        const statsList = {};
        const domainsList = {};
        for (let i=0; i < list.length; i++) {
            const assetInfo = new URL(list[i].name);
            
            const domain = assetInfo.hostname;
            const fileType = list[i].name.split(/[#?]/)[0].split('.').pop().trim();
            if(statsList[fileType]) statsList[fileType].fileCount++;
            else statsList[fileType] = {
                fileCount: 1,
                fileType: fileType
            }
            if(domainsList[domain]) domainsList[domain]++;
            else domainsList[domain] = 1;
        }
        setStats(statsList);
        setDomains(domainsList);
    }
  }, [disabled, document, running, domains, stats]);

  useEffect(() => {
    if(document && !disabled) {
        setRunning(true);
        () => {
            setRunning(false);
            console.log("### CLEAERED RESOURCES");
            performance.clearResourceTimings();
        }
    } else {
        setRunning(false);
    }
  }, [document, disabled])


  useInterval(checkDoc, updateFrequency);

  return (
    <fieldset>
      <legend>Network Debugger</legend>
      {Object.keys(domains).length ? Object.keys(domains).map(d => <div>{d} ({domains[d]})</div>) : <div>nodomains</div>}
    </fieldset>
  );
}

function display_size_data(){
    // Check for support of the PerformanceResourceTiming.*size properties and print their values
    // if supported.
    if (performance === undefined) {
      console.log("= Display Size Data: performance NOT supported");
      return;
    }
  
   
    if (list === undefined) {
      console.log("= Display Size Data: performance.getEntriesByType() is NOT supported");
      return;
    }
  
    // For each "resource", display its *Size property values
    console.log("= Display Size Data");
    for (let i=0; i < list.length; i++) {
      console.log("== Resource[" + i + "] - " + list[i].name);
      if ("decodedBodySize" in list[i])
        console.log("… decodedBodySize[" + i + "] = " + list[i].decodedBodySize);
      else
        console.log("… decodedBodySize[" + i + "] = NOT supported");
  
      if ("encodedBodySize" in list[i])
        console.log("… encodedBodySize[" + i + "] = " + list[i].encodedBodySize);
      else
        console.log("… encodedBodySize[" + i + "] = NOT supported");
  
      if ("transferSize" in list[i])
        console.log("… transferSize[" + i + "] = " + list[i].transferSize);
      else
        console.log("… transferSize[" + i + "] = NOT supported");
    }
  }