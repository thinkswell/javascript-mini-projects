import React from 'react';

function Hero(props) {
  return (
    <section className="w-full">
      <div className="flex justify-between">
        <h4 className="text-2xl font-medium text-gray-600">
          {props.productCount ? props.productCount : props.length} Products
          found !
        </h4>
        <div className="flex center">
          <h4 className="text-lg mr-2 text-gray-600">Sort : </h4>
          <select
            className="p-2 rounded"
            onChange={(event) => {
              props.handleSortByMRP(event);
            }}
          >
            <option value="normal">Normal</option>
            <option value="desc">Highest to Lowest</option>
            <option value="asc">Lowest to Highest</option>
          </select>
        </div>
      </div>
    </section>
  );
}

export default Hero;
