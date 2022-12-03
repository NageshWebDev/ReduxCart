import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { fetchCartData } from '../../store/Thunk';
import { cartItemsActions } from '../../store/redux';

const Cart = (props) => {

  const showCart = useSelector(state => state.cartState.showCart)
  const cartItemArray = useSelector(state => state.cartItems.cartItemArray).slice()
  const grossAmount = useSelector(state => state.cartItems.totalAmount)
  const dispatch = useDispatch()

  useEffect(() => {
    (async function fetchedData() {
      const fetchedData = await dispatch(fetchCartData())
      console.log('fetchCartData')
      dispatch(cartItemsActions.fetchedCartItems(fetchedData.payload))
    })();

  }, [dispatch])


  function compareName(a, b) {
    // converting to uppercase to have case-insensitive comparison
    const title1 = a.title.toUpperCase();
    const title2 = b.title.toUpperCase();
    return (title1.localeCompare(title2))
  }

  return (
    <React.Fragment>
      {showCart &&
        <Card className={classes.cart}>
          <h1 style={{ textAlign: 'center' }}>Your Shopping Cart</h1>
          <ul>
            {
              /*  The issue is that Array.sort sorts the array in-place, 
              //  meaning it attempts to mutate the array. 
              //  That's why you need to pass it a mutable copy of the array.
              */
            }
            {cartItemArray.sort(compareName).map((item) => {
              return (<CartItem key={item.title} item={{ title: item.title, quantity: item.amount, total: (item.price * item.amount), price: item.price }} />)
            })}
            {cartItemArray.length > 0 && <div><p className={classes.totalDiv}><span>Total Amount </span> <span>${grossAmount}</span></p></div>}
            {cartItemArray.length === 0 && <h1 style={{ textAlign: 'center' }}>is Empty &nbsp; <i className="fa-solid fa-cart-shopping"></i></h1>}
          </ul>
        </Card>}
    </React.Fragment>
  );
};

export default Cart;
