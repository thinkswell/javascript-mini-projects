import React from 'react';
import _ from 'lodash';
import CartProduct from './CartProduct';

function Cart(props) {
  return (
    <section
      className={
        props.toggleCart
          ? 'absolute top-0 right-0 w-2/6 bg-gray-800 p-5'
          : 'absolute top-0 right-0 w-2/6 bg-gray-800 p-5 disable'
      }
    >
      <div className="flex justify-between">
        <div>
          <button className="text-blue-600 text-2xl">
            <i className="fas fa-shopping-cart text-2xl"></i>
            {props.cart.items.length === 0 ? (
              ''
            ) : (
              <span>{props.cart.items.length}</span>
            )}
          </button>
        </div>
        <button
          className="text-xl text-white font-bold"
          onClick={(event) => props.handleCartClose(event)}
        >
          X
        </button>
      </div>

      <div className="p-6">
        <h2 className="text-white text-center text-xl font-bold mb-10">
          Cart has ({props.cart.items.length}) items
        </h2>
        <div className="cart-contaienr">
          {_.uniq(props.cart.items).map((ele, i) => {
            return (
              <CartProduct
                ele={ele}
                cart={props.cart}
                handleIncInCart={props.handleIncInCart}
                handleDecInCart={props.handleDecInCart}
                key={i}
              />
            );
          })}
        </div>
        <div className="">
          <h3 className="text-center text-blue-600 text-xl font-bold">
            Total Amount:- {props.cart.total}
          </h3>
          <div className="flex justify-center">
            <button className="bg-green-600 text-white font-bold rounded-md mt-5 px-3 py-2 shadow-md">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Cart;
