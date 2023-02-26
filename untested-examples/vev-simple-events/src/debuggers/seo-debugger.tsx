import { useInterval } from "@vev/react";
import React, { useCallback, useEffect, useState } from "react";

export default function SeoDebugger({
  document,
  disabled,
  updateFrequency = 3000,
}: {
  document: Document;
  disabled: boolean;
  updateFrequency: number;
}) {
  const [numH1, setNumH1] = useState<number>(0);
  const [numWords, setNumWords] = useState<number>(0);

  const checkDoc = useCallback(() => {
    if (document && disabled === false) {
      const h1s = document.querySelectorAll("h1").length;
      let numWords = document.body.innerText.split(" ").length;
      setNumH1(h1s);
      setNumWords(numWords);
    }
  }, [disabled, document, setNumH1, setNumWords]);
  useInterval(checkDoc, updateFrequency);
  useEffect(() => {
    if(document) document.addEventListener('onmouseover', () => { console.log("over")});
  }, [document])

  return (
    <fieldset>
      <legend>SEO Debugger</legend>
      <h3>H1 Checks</h3>
      <div
        style={{
          backgroundColor: numH1 === 0 ? "red" : numH1 > 1 ? "yellow" : "green",
        }}
      >
        {numH1 > 1
          ? "Too many H1s"
          : numH1 === 0
          ? "No H1s!"
          : "Heading 1 found"}
      </div>
      <h3>Word count</h3>
      <div
        style={{
          backgroundColor:
            numWords < 300 ? "red" : numWords > 350 ? "yellow" : "green",
        }}
      >
        {numWords} - {checkNumWords(numWords)}
      </div>
      {document?.body?.innerHTML ? <div dangerouslySetInnerHTML={{__html: generateToc(document)}}></div> : <div />}
    </fieldset>
  );
}

function checkNumWords(numWords: number) {
  if (numWords < 300) {
    return "Too few words (<300)";
  } else if (numWords < 750) {
    return "Not optimal word count (<750)";
  } else if (numWords < 1500) {
    return "Optimal word count 750+";
  } else if (numWords < 3000) {
    return "Very high word count 1500+";
  } else {
    return "Crazy word count!";
  }
}

function StructureView({ document }) {
  const [toc, setToc] = useState<string>(null);
  useEffect(() => {
    if (document && document.body.innerText) {
      setToc(toc);
    }
  }, [document]);
  return (
    <div className="toc">
      <h3>TOC</h3>
      <div className="toc-list" dangerouslySetInnerHTML={{ __html: toc }}></div>
    </div>
  );
}

function generateToc(ownerDocument:Document) {
    if(!ownerDocument?.body?.innerHTML) return;
  let toc = "";
  let level = 0;
  
  ownerDocument.body.innerHTML.replace(
    /<h([\d])>([^<]+)<\/h([\d])>/gi,
    function (str, openLevel, titleText, closeLevel) {
      if (openLevel != closeLevel) {
        return str;
      }

      if (openLevel > level) {
        toc += new Array(openLevel - level + 1).join("<ul>");
      } else if (openLevel < level) {
        toc += new Array(level - openLevel + 1).join("</ul>");
      }

      level = parseInt(openLevel);
      const levelHeaders = ownerDocument.body.querySelectorAll('h' + level);
      let tgtTop = 0;
      levelHeaders.forEach(h => {
        if(h.textContent === titleText) {
            tgtTop = h.clientTop;
        }
      })
      toc += '<li><a href="#">[H'+level+']' + titleText + "</a></li>";

      
    }
  );
  if (level) {
    toc += new Array(level + 1).join("</ul>");
  }
  return toc;
}
