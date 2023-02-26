import React, { useEffect, useState } from "react";
import { registerVevComponent, Image, useStorage } from "@vev/react";
import { init } from "./snipcart-script";
import styles from "./styles.scss";
import BuyButton from "./BuyButton";

type Props = {
  name: string;
  price: number;
  description: string;
  id: string;
  image: {
    url: string;
  };
};

const Product = ({
  price,
  image,
  name = "",
  description = "",
  id = "",
  ...rest
}: Props) => {
  // const [initialized, setInitialized] = useState(false);
  const apiKey = useStorage("apiKey", "account");

  useEffect(() => {
    if (!apiKey) return;
    init(apiKey);

    /*    const snipcart = async () => {
      document.addEventListener("snipcart.ready", () => {
        setInitialized(true);
      });
    }; */
  }, [apiKey]);

  /*   if (!apiKey) {
    return <div>You need to set API key first</div>;
  } */

  // if (!initialized) return <h2 className={styles.price}>Loading product...</h2>;

  return (
    <div className={styles.product}>
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${image?.url})` }}
      />

      <div className={styles.info}>
        <h2>{name}</h2>
        <p>{description}</p>
        <BuyButton id={id} price={price} image={image} name={name} />
      </div>
    </div>
  );
};

registerVevComponent(Product as any, {
  name: "Snipcart Product",
  panelType: "drawer",
  props: [
    {
      name: "apiKey",
      storage: "account",
      description: "Only add the public API key",
      type: "string",
      hidden: (context: any) => context.apiKey,
    },
    {
      name: "image",
      title: "Product",
      type: "image",
    },
    {
      name: "name",
      title: "Product name",
      type: "string",
    },
    {
      name: "id",
      type: "string",
      description: "Product id/SKU",
    },
    {
      name: "price",
      title: "Product price",
      type: "number",
    },
    {
      name: "description",
      type: "string",
      options: {
        type: "text",
        multiline: true,
      },
    },
  ],
  knobs: {
    [styles.product]: ["background", "border", "padding"],
  },
});

export default Product;
