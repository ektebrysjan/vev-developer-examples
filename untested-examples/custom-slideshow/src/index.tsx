import { registerVevComponent } from '@vev/react';

import './index.css';
import MyComponent from './MyComponent';

registerVevComponent(MyComponent, {
  name: "My awesome component",
  props: [{
    type: 'string',
    name: 'hello',
  },
  {
    name: "widgetSelect",
    type: 'select',
    options: {
      display: 'autocomplete',
      items: (context: any) => {
        return context.content?.map(m => ({ label: m.name || 'Untitled element', value: m.key })) || [];
      },
    },
  },
  {
    name: "arrayField",
    type: "array",
    of:
      [{
        type: 'string',
        name: 'hello',
      }],
  },
  ]
});

export default MyComponent;