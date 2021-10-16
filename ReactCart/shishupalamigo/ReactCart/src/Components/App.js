import React from 'react';
import { useState, useEffect } from 'react';
import { products } from '../data.json';
import _ from 'lodash';
import '../stylesheet/style.css';
import Header from './Header';
import Aside from './Aside';
import Hero from './Hero';
import Products from './Products';
import Cart from './Cart';

function App(props) {
  let arrOfSize = _.uniq(
    _.flattenDeep(products.map((item) => item.availableSizes))
  );
  let [arrOfItems, setArrOfItems] = useState(products);

  let [productCount, setProductCount] = useState(products.length);
  let [cart, setCart] = useState(
    JSON.parse(localStorage.getItem('cart')) || { items: [], total: 0 }
  );
  let [sizeToSort, setSizeTosort] = useState('all');
  let [toggleCart, setToggleCart] = useState(false);
  let [activeSize, setActiveSize] = useState('');

  //handle local storage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    return () => {};
  }, [cart]);

  //handle sort by size
  function handleSortBySize(event, size) {
    let newArr = products.filter((ele) => {
      if (ele.availableSizes.includes(size)) {
        return true;
      } else {
        return false;
      }
    });
    setArrOfItems(newArr);
    setProductCount(newArr.length);
    setSizeTosort(size);
    setActiveSize(size);
  }

  function handleResetSort() {
    setArrOfItems(products);
    setProductCount(products.length);
    setSizeTosort('');
    setActiveSize('');
  }

  //handle sort by MRP

  function handleSortByMRP({ target }) {
    let newArrFor = [];
    switch (target.value) {
      case 'normal':
        let size = sizeToSort;
        let newArr = products.filter((ele) => {
          if (ele.availableSizes.includes(size)) {
            return true;
          } else {
            return false;
          }
        });
        setArrOfItems(newArr);
        setProductCount(newArr.length);
        setSizeTosort(size);
        break;

      case 'asc':
        newArrFor = [...arrOfItems];
        newArrFor.sort(function (a, b) {
          return a.price - b.price;
        });
        setArrOfItems(newArrFor);
        setProductCount(newArrFor.length);
        break;

      case 'desc':
        newArrFor = [...arrOfItems];
        newArrFor.sort(function (a, b) {
          return b.price - a.price;
        });
        setArrOfItems(newArrFor);
        setProductCount(newArrFor.length);
        break;

      default:
        break;
    }
  }

  //handle add to cart

  function handleAddToCart(event, product) {
    if (cart.items.includes(product)) {
      alert('item already exist in cart');
    } else {
      let newArr = [...cart.items];
      newArr.push(product);
      let total = newArr.reduce((acc, cv) => {
        acc = acc + cv.price;
        return acc;
      }, 0);
      setCart({ items: newArr, total: total });
      alert(`item "${product.title} " added to cart successfully`);
    }
  }

  //hadnle cart close

  function handleCartClose(event) {
    // this.setState({ toggleCart: !this.state.toggleCart });
    setToggleCart(!toggleCart);
  }

  //handle increment in cart

  function handleIncInCart(event, item) {
    cart.items.push(item);
    let updatedPrice = cart.total + item.price;
    setCart({ items: cart.items, total: updatedPrice });
  }

  //handle dec in cart
  function handleDecInCart(event, item) {
    const index = cart.items.findIndex((ele) => ele.title === item.title);
    cart.items.splice(index, 1);

    let updatedPrice = cart.total - item.price;
    setCart({ items: cart.items, total: updatedPrice });
  }

  return (
    <>
      <Header cart={cart} handleCartClose={handleCartClose} />
      <main className="flex mt-10">
        <Aside
          arrOfSize={arrOfSize}
          activeSize={activeSize}
          handleSortBySize={handleSortBySize}
          handleResetSort={handleResetSort}
        />
        <section className="w-3/4 bg-green-100 p-10 rounded">
          <Hero productCount={productCount} handleSortByMRP={handleSortByMRP} />

          <Products arrOfItems={arrOfItems} handleAddToCart={handleAddToCart} />

          <Cart
            toggleCart={toggleCart}
            cart={cart}
            handleCartClose={handleCartClose}
            handleIncInCart={handleIncInCart}
            handleDecInCart={handleDecInCart}
          />
        </section>
      </main>
    </>
  );
}

export default App;
