// const flatten = (obj, prefix) => {
//     // store the result
//     let output = {};

//     1; // iterate the object
//     for (let key in obj) {
//         let val = obj[key];

//         // get the type
//         const type = Object.prototype.toString.call(val);

//         // if that is Object
//         if (type === "[object Object]") {
//             // new key
//             const newKey = prefix ? prefix + "." + key : key;
//             const newObject = flatten(val, newKey);
//             output = {...output, ...newObject };
//         }

//         // if that is an array
//         else if (type === "[object Array]") {
//             // iterate the array
//             for (let i = 0; i < val.length; i++) {
//                 // new key
//                 const newKey = prefix ? prefix + "." + key + "." + i : key + "." + i;
//                 output = {...output, [newKey]: val[i] };
//             }
//         }

//         // normal case
//         else {
//             // new key
//             const newKey = prefix ? prefix + "." + key : key;
//             output = {...output, [newKey]: val };
//         }
//     }

//     return output;
// };

// es6
const flatten = (obj, prefix) => {
    // store the result
    let output = {};

    // iterate the Object
    for (let key in obj) {
        let val = obj[key];

        // new key
        const newKey = prefix ? prefix + "." + key : key;

        // array and object both are object in js
        if (typeof val === "object") {
            // if it is array
            if (Array.isArray(val)) {
                // use rest && spread together to convert
                // array to Object
                const {...arrToObject } = val;
                const newObj = flatten(arrToObject, newKey);
                output = {...output, ...newObj };
            }
            // if it is object
            else {
                const newObj = flatten(val, newKey);
                output = {...output, ...newObj };
            }
        }
        // normal case
        else {
            output = {...output, [newKey]: val };
        }
    }

    return output;
};

const nested = {
    A: "12",
    B: 23,
    C: {
        P: 23,
        O: {
            L: 56,
        },
        Q: [1, 2],
    },
};

console.log(flatten(nested));