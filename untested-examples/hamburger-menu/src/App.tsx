import { registerVevComponent } from "@vev/react";
import { useState, useRef } from "react";
import HamburgerStyles from "./styles.scss";
import OutsideClickHandler from "react-outside-click-handler";

enum BurgerType {
  BORING = "Boring",
  THREE_DX = "3DX",
  THREE_DX_REVERSE = "3DC Reverse",
  THREE_DY = "3DY",
  THREE_DY_REVERSE = "3DY Reverse",
  THREE_DXY = "3DYX",
  THREE_DXY_REVERSE = "3 DYX Reverse",
  ARROW = "Arrow",
  ARROW_RIGHT = "Arrow Right",
  ARROW_ALT = "Arrow Alt",
  ARROW_ALT_RIGHT = "Arrow Alt Right",
  ARROW_TURN = "Arrow Turn",
  ARROW_TURN_REVERSE = "Arrow Turn Reverse",
  COLLAPSE = "Collapse",
  COLLAPSE_REVERSE = "Collapse Reverse",
  ELASTIC = "Elastic",
  ELASTIC_REVERSE = "Elastic Reverse",
  EMPATHIC = "Empathic",
  EMPATHIC_REVERSE = "Empathic Reverse",
  SLIDER = "Slider",
  SLIDER_REVERSE = "Slider Reverse",
  SPIN = "Spin",
  SPIN_REVERSE = "Spin Reverse",
  SPRING = "Spring",
  SPRING_REVERSE = "Spring Reverse",
  STAND = "Stand",
  STAND_REVERSE = "Stand Reverse",
  SQUEEZE = "Squeeze",
  VORTEX = "Squeeze Reverse",
  VORTEX_REVERSE = "Vortex Reverse",
}

const StyleMap: Record<BurgerType, string> = {
  [BurgerType.BORING]: HamburgerStyles.boring,
  [BurgerType.THREE_DX]: HamburgerStyles.hamburger3dx,
  [BurgerType.THREE_DX_REVERSE]: HamburgerStyles.hamburger3dxReverse,
  [BurgerType.THREE_DY]: HamburgerStyles.hamburger3dyReverse,
  [BurgerType.THREE_DY_REVERSE]: HamburgerStyles.hamburger3dyReverse,
  [BurgerType.THREE_DXY]: HamburgerStyles.hamburger3dxyReverse,
  [BurgerType.THREE_DXY_REVERSE]: HamburgerStyles.hamburger3dxyReverse,
  [BurgerType.ARROW]: HamburgerStyles.hamburgerArrow,
  [BurgerType.ARROW_RIGHT]: HamburgerStyles.hamburgerArrowRight,
  [BurgerType.ARROW_ALT]: HamburgerStyles.hamburgerArrowalt,
  [BurgerType.ARROW_ALT_RIGHT]: HamburgerStyles.hamburgerArrowaltRight,
  [BurgerType.ARROW_TURN]: HamburgerStyles.hamburgerArrowTurn,
  [BurgerType.ARROW_TURN_REVERSE]: HamburgerStyles.hamburgerArrowTurn,
  [BurgerType.COLLAPSE]: HamburgerStyles.hamburgerCollapse,
  [BurgerType.COLLAPSE_REVERSE]: HamburgerStyles.hamburgerCollapse,
  [BurgerType.ELASTIC]: HamburgerStyles.hamburgerElastic,
  [BurgerType.ELASTIC_REVERSE]: HamburgerStyles.hamburgerElasticReverse,
  [BurgerType.EMPATHIC]: HamburgerStyles.hamburgerEmpathic,
  [BurgerType.EMPATHIC_REVERSE]: HamburgerStyles.hamburgerEmpathicReverse,
  [BurgerType.SLIDER]: HamburgerStyles.hamburgerSlider,
  [BurgerType.SLIDER_REVERSE]: HamburgerStyles.hamburgerSliderReverse,
  [BurgerType.SPIN]: HamburgerStyles.hamburgerSpin,
  [BurgerType.SPIN_REVERSE]: HamburgerStyles.hamburgerSpinReverse,
  [BurgerType.SPRING]: HamburgerStyles.hamburgerSpring,
  [BurgerType.SPRING_REVERSE]: HamburgerStyles.hamburgerSpringReverse,
  [BurgerType.STAND]: HamburgerStyles.hamburgerStand,
  [BurgerType.STAND_REVERSE]: HamburgerStyles.hamburgerStandReverse,
  [BurgerType.SQUEEZE]: HamburgerStyles.hamburgerSqueeze,
  [BurgerType.VORTEX]: HamburgerStyles.hamburgerVortex,
  [BurgerType.VORTEX_REVERSE]: HamburgerStyles.hamburgerVortexReverse,
};

interface MenuItem {
  title: string;
  url: string;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  burgerType: BurgerType;
  isOpen: boolean;
}

const MenuButton = ({ burgerType, isOpen, ...rest }: ButtonProps) => {
  const styles = [
    HamburgerStyles.hamburger,
    StyleMap[burgerType] || HamburgerStyles.boring,
  ];

  if (isOpen) styles.push(HamburgerStyles.active);

  return (
    <button
      className={styles.join(" ")}
      type="button"
      aria-pressed={isOpen}
      {...rest}
    >
      <span className={HamburgerStyles.box}>
        <span className={HamburgerStyles.inner} />
      </span>
    </button>
  );
};

const MenuButtonDemo = ({ burgerType, onSelect, selected }) => {
  const [open, setOpen] = useState(false);

  const className: string = selected
    ? `${HamburgerStyles.demoButton} ${HamburgerStyles.demoButtonSelected}`
    : HamburgerStyles.demoButton;

  return (
    <div className={className}>
      <MenuButton
        burgerType={burgerType}
        isOpen={open}
        onClick={onSelect}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      />
      <span>{burgerType}</span>
    </div>
  );
};

interface AppProps {
  burgerType: BurgerType;
  items: MenuItem[];
}

function App({ burgerType, items = [] }: AppProps) {
  const [open, setOpen] = useState(false);

  const menuClass: string = open
    ? `${HamburgerStyles.menuBox} ${HamburgerStyles.menuBoxOpen}`
    : HamburgerStyles.menuBox;

  const ref = useRef(null);

  return (
    <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
      <div className={HamburgerStyles.menu}>
        <MenuButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpen((wasOpen) => {
              console.log("Was", wasOpen);
              return !open;
            });
          }}
          burgerType={burgerType || BurgerType.BORING}
          isOpen={open}
        />
        <div className={menuClass} ref={ref}>
          <ul className={HamburgerStyles.menuList}>
            {items.map((item, index) => {
              return (
                <li
                  className={HamburgerStyles.menuItem}
                  key={(item.title || "item") + index}
                >
                  <a
                    tabIndex={open ? 0 : -1}
                    className={HamburgerStyles.menuItemLink}
                    href={item.url}
                  >
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </OutsideClickHandler>
  );
}

registerVevComponent(App, {
  name: "Hamburger Menu",
  knobs: {
    [HamburgerStyles.menuBox]: ["background", "box-shadow", "width"],
    [HamburgerStyles.menuItemLink]: ["font-family", "font-size"],
    "a:hover": ["color", "text-decoration"],
    "a:focus": ["background-color"],
  },
  props: [
    {
      type: "select",
      title: "Burger Type",
      name: "burgerType",
      initialValue: "boring",
      display: "dropdown",
      component: ({ onChange, value: currentValue }) => {
        return (
          <div className={HamburgerStyles.buttonGrid}>
            {Object.values(BurgerType).map((value) => {
              return (
                <MenuButtonDemo
                  burgerType={value}
                  onSelect={() => onChange(value)}
                  selected={value === currentValue}
                />
              );
            })}
          </div>
        );
      },
    },
    {
      type: "array",
      name: "items",
      title: "Menu Items",
      of: [
        { type: "string", name: "title" },
        { type: "string", name: "url" },
      ],
    },
  ],
});

export default App;
