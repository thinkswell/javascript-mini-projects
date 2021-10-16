import React from 'react';

function CartProduct(props) {
  return (
    <article className="p-5 bg-blue-300 flex mb-5">
      <div className="w-1/2 mr-3">
        <img
          className="w-full"
          src={'/static/products/' + props.ele.sku + '_1.jpg'}
          alt={'cardimg'}
        />
      </div>
      <div className="w-1/2 text-center flex flex-col justify-between mb-5">
        <div>
          <h5 className="font-bold text-xl text-white">{props.ele.title}</h5>
          <h6 className="text-lg font-medium">{props.ele.style}</h6>

          <span className="text-xl font-bold text-pink-800">
            Price:- {props.ele.currencyFormat} {props.ele.price}
          </span>
        </div>
        <div className="flex justify-center addRemove-cart">
          <button
            onClick={(event) => {
              props.handleIncInCart(event, props.ele);
            }}
          >
            <i className="fas fa-plus-circle mr-2"></i>
          </button>
          <h4>
            {props.cart.items.reduce((acc, cv) => {
              if (cv.title === props.ele.title) {
                acc = acc + 1;
              }
              return acc;
            }, 0)}
          </h4>
          <button
            onClick={(event) => {
              props.handleDecInCart(event, props.ele);
            }}
          >
            <i className="fas fa-minus-circle ml-2"></i>
          </button>
        </div>
      </div>
    </article>
  );
}

export default CartProduct;
