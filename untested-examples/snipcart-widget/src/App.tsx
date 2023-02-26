import React from "react";

import Product from "./Product";
import Cart from "./Cart";

const App = () => {
  return (
    <>
      <Cart />
      <Product
        id="1"
        name="My product"
        price={100}
        image={{
          url: "https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
        }}
        description=""
      />
    </>
  );
};

export default App;
