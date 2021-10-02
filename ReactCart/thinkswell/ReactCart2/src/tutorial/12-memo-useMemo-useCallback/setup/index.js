import React, { useState, useCallback, useMemo } from "react";
import { useFetch } from "../../9-custom-hooks/setup/2-useFetch";

// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/javascript-store-products";

// every time props or state changes, component re-renders
const mostExpensiveProduct = (data) => {
  console.log("Doing big calculation!!");
  return (
    data.reduce((mxPrice, item) => {
      const { price } = item.fields;
      if (price > mxPrice) {
        mxPrice = price;
      }
      return mxPrice;
    }, 0) / 100
  );
};

const Index = () => {
  const { products } = useFetch(url);
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState(0);

  const addToCart = useCallback(() => {
    setCart(cart + 1);
  }, [cart]);

  const mostExpensive = useMemo(
    () => mostExpensiveProduct(products),
    [products]
  );

  console.log("Index re-rendered");
  return (
    <>
      <h1>Count : {count}</h1>
      <button className="btn" onClick={() => setCount(count + 1)}>
        click me
      </button>
      <h1>Cart Items: {cart}</h1>
      <h2>Most Expensive Product: ${mostExpensive}</h2>
      <BigList products={products} addToCart={addToCart} />
    </>
  );
};

const BigList = React.memo(({ products, addToCart }) => {
  console.log("BigList re-rendered");

  return (
    <section className="products">
      {products.map((product) => {
        return (
          <SingleProduct
            key={product.id}
            {...product}
            addToCart={addToCart}
          ></SingleProduct>
        );
      })}
    </section>
  );
});

const SingleProduct = ({ fields, addToCart }) => {
  console.count("SingleProduct re-rendered");

  let { name, price } = fields;
  price = price / 100;
  const image = fields.image[0].url;

  return (
    <article className="product">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>${price}</p>
      <button className="btn" onClick={addToCart}>
        Add To Cart
      </button>
    </article>
  );
};
export default Index;
