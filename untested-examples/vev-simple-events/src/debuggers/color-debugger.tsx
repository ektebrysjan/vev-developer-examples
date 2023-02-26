import { useInterval } from '@vev/react';
import React, { useCallback, useEffect, useState } from 'react';

export default function ColorDebugger({document, disabled, updateFrequency = 10000}) {
    const [colors, setColors] = useState([]);
    const checkDoc = useCallback(() => {
        const allColors = getAllColors();
        console.log("got all colors", allColors);
        setColors(allColors);
      }, [disabled, document]);
      useInterval(checkDoc, updateFrequency);

    return <fieldset>
    <legend>Color Debugger</legend>
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap', width: '100%'}}>

        {colors.length ? colors.map(c => <div style={{backgroundColor: c, width: 100, height:60}}>{c}</div>) : <span>colorless...</span>}
    </div>
  </fieldset>
}

function getAllColors() {
    // regex via http://stackoverflow.com/a/7543829/149636
    var rgbRegex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;

    var allColors = [];

    var elems = document.getElementsByTagName('*');
    var total = elems.length;

    var x,y,elemStyles,styleName,styleValue,rgbVal;

    for(x = 0; x < total; x++) {
        elemStyles = window.getComputedStyle(elems[x]);

        for(y = 0; y < elemStyles.length; y++) {
            styleName = elemStyles[y];
            styleValue = elemStyles[styleName];

            if(!styleValue) {
                continue;
            }

            // convert to string to avoid match exceptions
            styleValue += "";

            rgbVal = styleValue.match(rgbRegex);
            if(!rgbVal) { // property does not contain a color
                continue;
            }

            if(allColors.indexOf(rgbVal.input) == -1) { // avoid duplicate entries
                allColors.push(rgbVal.input);
            }

        }

    }

    return allColors;
}