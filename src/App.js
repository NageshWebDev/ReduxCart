import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { sendCartData } from './store/Thunk';
import Notification from './components/UI/Notification';

let renderedOnce = false;

function App() {

  const cartItem = useSelector(state => state.cartItems.cartItemArray)
  const sendDataToserver = useSelector(state => state.cartItems.sendDataToserver)
  const notification = useSelector(state => state.cartState.notification)
  const dispatch = useDispatch()

  useEffect(() => {

    if (renderedOnce && sendDataToserver) {
      dispatch(sendCartData(cartItem))
    } else if (!renderedOnce) {
      renderedOnce = true
    }
  }, [cartItem, dispatch, sendDataToserver])

  return (
    <React.Fragment>
      {
        notification && <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      }
      <Layout>
        <Cart />
        <Products />
      </Layout>
    </React.Fragment>
  );
}

export default App;
