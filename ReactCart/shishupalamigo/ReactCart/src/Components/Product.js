import React from 'react';

function Product(props) {
  return (
    <article
      key={props.ele.id}
      className="w-1/4 mr-10 mb-10 mt-10 border p-5 shadow-xl bg-green-50 rounded-lg"
    >
      <div className="flex">
        <img
          className="w-full"
          src={'/static/products/' + props.ele.sku + '_1.jpg'}
          alt={'cardimg'}
        />
      </div>
      <div className="flex flex-col items-center mt-5">
        <span className="text-green-500 mb-3">Free shipping</span>
        <h3 className="font-bold text-lg ">{props.ele.title}</h3>
        <div className="border-b-2 border-2 w-full border-green-300 mb-4"></div>
        <h4 className="font-bold text-xl mb-5 text-indigo-900">
          Price: {props.ele.currencyFormat + ' ' + props.ele.price}
        </h4>
        <div className="flex justify-center">
          <button
            className="px-3 py-2 bg-black rounded text-white font-bold hover:bg-green-600"
            onClick={(event) => {
              props.handleAddToCart(event, props.ele);
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default Product;
