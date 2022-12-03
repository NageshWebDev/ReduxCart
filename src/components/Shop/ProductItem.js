import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { useDispatch } from 'react-redux';
import { cartItemsActions } from '../../store/redux';

const ProductItem = (props) => {
  const { title, price, description, amount } = props;
  const dispatch = useDispatch()

  function onClickHandler(){
    dispatch(cartItemsActions.AddToCartItems({title, price, amount, addToCartClicked : true}))
  }

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={onClickHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;