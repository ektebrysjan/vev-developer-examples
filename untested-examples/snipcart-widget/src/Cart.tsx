import React from "react";
import { registerVevComponent } from "@vev/react";
import styles from "./styles.scss";
import cart from "./images/cart.svg";

const Cart = () => {
  return (
    <button className={["snipcart-checkout", styles.cart].join(" ")}>
      <img src={cart} alt="cart" />
      <span
        className={["snipcart-total-price", styles.cartPrice].join(" ")}
      ></span>
    </button>
  );
};

registerVevComponent(Cart as any, {
  name: "Snipcart Cart",
  size: {
    width: "auto",
    height: "auto",
  },
  knobs: {
    [styles.cart]: ["background"],
  },
});

export default Cart;
