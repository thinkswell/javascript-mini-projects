import React from 'react';
import Product from './Product';

function Products(props) {
  return (
    <section className="w-full">
      <div className="flex w-full flex-wrap justify-around">
        {props.arrOfItems.map((ele) => {
          return (
            <Product
              key={ele.id}
              ele={ele}
              handleAddToCart={props.handleAddToCart}
            />
          );
        })}
      </div>
    </section>
  );
}

export default Products;
