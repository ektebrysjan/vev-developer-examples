import React, { useEffect } from 'react';
import styles from "./SwaggerComponent.module.css";
declare const SwaggerUIBundle;

export default function SwaggerComp({documentEl, schemaUrl}:{schemaUrl?:string, documentEl?: Document}) {
    
    useEffect(() => {
        if(documentEl) {

            const sheets =documentEl.querySelectorAll('link[href="https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui.css"]');
            if(sheets.length) {
                
            } else {
                const sheet = documentEl.createElement('link');
                sheet.rel = "stylesheet";
                sheet.href = 'https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui.css';
                documentEl.body.appendChild(sheet);
            }
            const scripts = documentEl.querySelectorAll('script[src="https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui-bundle.js"]');
            const swaggerLoaded = () => {
                console.log("Loading swagger for url", schemaUrl)
                SwaggerUIBundle({
                    url: schemaUrl,
                    dom_id: '#swagger-ui',
                  });
            }
            if(scripts.length) {
                swaggerLoaded();
            } else {


                const script = documentEl.createElement('script');
                script.crossOrigin = "true";
                script.onload = swaggerLoaded;
                script.src = 'https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui-bundle.js';
                documentEl.body.appendChild(script);
            }

        } else {
            console.log("No doc el swagger");
        }
    }, [documentEl])
    return <div className={styles.container}>
    <div style={{flex: 1, overflowY: 'auto', overflowX: 'hidden'}} id="swagger-ui"></div>
    </div>
}