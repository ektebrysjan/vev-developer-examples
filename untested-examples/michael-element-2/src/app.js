import React from 'react';
import { registerVevComponent } from '@vev/react';

const MyComponent = () => {
  return <div>Hello, VeV</div>;
}

registerVevComponent(MyComponent, {
  name: "My awesome component",
});

export default MyComponent;
