import { useContext, useEffect, useRef, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "./../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [btnAnimate, setBtnAnimate] = useState(false);
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;

  const numberOfCartItems = items.reduce(
    (total, item) => total + item.amount,
    0
  );
  const btnClasses = `${classes.button} ${btnAnimate ? classes.bump : ""}`;
  const buttonRef = useRef(null);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnAnimate(true);
    setTimeout(() => {
      setBtnAnimate(false);
    }, 300);
  }, [items]);

  return (
    <button className={btnClasses} ref={buttonRef} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
