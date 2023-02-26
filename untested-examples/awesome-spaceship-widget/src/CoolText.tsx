import { registerVevComponent, useScrollTop } from '@vev/react';
import { useEffect, useRef } from 'react';
import './App.css';
import styles from './styles.scss';

function CoolText({...props}) {

  const textRef = useRef<HTMLDivElement>();
  const scroll = useScrollTop();

  useEffect(()=>{
    if(textRef.current){ 
      textRef.current.style.transform = `rotateX(${props.rotateX}deg)`;
    }

  },[props])

	return (
    <div className={styles.holder}>
      <div ref={textRef} className={styles.skewed}>
        {props.textToDisplay}
      </div>
    </div>
	)
}

registerVevComponent(CoolText, 
	{ 
		name: 'CoolText', 
		type: 'widget',
		panelType: 'float',
		knobs: {
			[styles.skewed]: ['font-size', 'color', 'background'],
		},
		size: {
			height: '100%',
			width: 'auto'
		},
		props: [
			{
				name: 'textToDisplay',
				title: 'text',
				type: 'string',
			},
      { name: 'rotateX', title: 'rotateX', type: 'number', initialValue: 45 },
		]
	});
	
export default CoolText;