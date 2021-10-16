import React from 'react';

function Aside(props) {
  let allSizes = props.arrOfSize;
  return (
    <aside className="w-1/4 bg-green-100 flex flex-col items-center mr-10 rounded">
      <div className="flex flex-wrap p-5 mb-10">
        {allSizes.map((size, i) => {
          return (
            <button
              key={size}
              onClick={(event) => props.handleSortBySize(event, size)}
              className={
                props.activeSize === size
                  ? 'active-btn bg-white w-10 h-10 font-bold mr-3 ml-1 mt-4 rounded-full shadow-xl'
                  : 'bg-green-50 w-10 h-10 font-bold mr-3 ml-1 mt-4 rounded-full hover:bg-green-400 hover:text-white shadow-md'
              }
            >
              {size}
            </button>
          );
        })}
      </div>
      <button
        className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded text-white font-bold"
        onClick={() => props.handleResetSort()}
      >
        Reset
      </button>
    </aside>
  );
}

export default Aside;
