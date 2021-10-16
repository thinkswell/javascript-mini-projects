import React from 'react';

function Header(props) {
  return (
    <header className="bg-green-100 p-5 rounded-lg flex justify-between items-center">
      <h1 className="text-3xl text-gray-700 font-bold">ShopCart</h1>
      <button className="w-20" onClick={() => props.handleCartClose()}>
        <img src="/static/cart.png" alt="Cart" />
        {props.cart.items.length === 0 ? (
          ''
        ) : (
          <span className="absolute top-12 right-10 text-3xl w-8 h-8 font-bold bg-yellow-400 rounded-full">
            {props.cart.items.length}
          </span>
        )}
      </button>
    </header>
  );
}

export default Header;
