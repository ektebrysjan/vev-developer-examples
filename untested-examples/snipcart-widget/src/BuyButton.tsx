import React, { useEffect } from "react";
import styles from "./styles.scss";
import { registerVevComponent, Image, useStorage } from "@vev/react";
import { init } from "./snipcart-script";

type Props = {
  id: string;
  price: number;
  image: { url: string };
  name: string;
};

export const BuyButton = ({ id, price, image, name }: Props) => {
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

  return (
    <div className={styles.buttonWrapper}>
      <button
        className={["snipcart-add-item", styles.button].join(" ")}
        data-item-id={id}
        data-item-price={price}
        data-item-description="High-quality replica of The Starry Night by the Dutch post-impressionist painter Vincent van Gogh."
        data-item-image={image?.url}
        data-item-name={name}
        // data-item-custom1-name="Frame color"
        // data-item-custom1-options="Black|Brown|Gold"
      >
        Add to cart
      </button>
      <span className={styles.price}>${price}</span>
    </div>
  );
};

registerVevComponent(BuyButton as any, {
  name: "Snipcart Buy Button",
  panelType: "drawer",
  size: {
    width: "auto",
    height: "auto",
  },
  knobs: {
    [styles.button]: ["background"],
  },
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
});

export default BuyButton;
