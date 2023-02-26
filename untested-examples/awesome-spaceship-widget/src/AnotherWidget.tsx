import { registerVevComponent } from '@vev/react';
import './App.css';


function AnotherWidget({...props}) {
	return (
		<div>
			Hello
		</div>
	)
}

registerVevComponent(AnotherWidget, 
	{ 
		name: 'AnotherWidget', 
		type: 'widget',
		panelType: 'float',
		size: {
			height: '100%',
			width: 'auto'
		},
		props: [
			{
				name: 'image1',
				title: 'Image 1',
				type: 'image',
			}
		]
	});
	
export default AnotherWidget;