import classes from './CartButton.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCartActions } from '../../store/redux';
import { useState, useEffect } from 'react';

const CartButton = (props) => {

  const [totalItemsInCart, setTotalItemsInCart] = useState(0)
  const cartItemArray = useSelector(state => state.cartItems.cartItemArray)
  const total = cartItemArray.reduce((preVal, currentVal) => preVal + currentVal.amount, 0)
  const dispatch = useDispatch()

  useEffect(() => { setTotalItemsInCart(total) }, [total])

  return (
    <button onClick={() => { return dispatch(toggleCartActions.toggle()) }} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalItemsInCart}</span>
    </button>
  );
};

export default CartButton;
