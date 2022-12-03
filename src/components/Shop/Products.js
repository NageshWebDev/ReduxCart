import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        <ProductItem
          title='Test-1'
          price={5}
          description='This is a first product - amazing!'
          amount={1}
        />
        <ProductItem
          title='Test-2'
          price={10}
          description='This is a first product - fascinating!'
          amount={1}
        />
        <ProductItem
          title='Test-3'
          price={15}
          description='This is a first product - surprising!'
          amount={1}
        />
        <ProductItem
          title='Test-4'
          price={20}
          description='This is a first product - excited!'
          amount={1}
        />
      </ul>
    </section>
  );
};

export default Products;
