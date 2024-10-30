function convertUnits() {
    const input = parseFloat(document.getElementById("valueInput").value);
    const fromUnit = document.getElementById("fromUnit").value;
    const toUnit = document.getElementById("toUnit").value;
    console.log(fromUnit)
    let result = 0;
    let key=0;
    // Conversion factors
    const conversionFactors = {
        meters: {
            feet: 3.28084,
            kilometers: 0.001,
            millimeters: 1000,
            centimeters: 100,
        },
        feet: {
            meters: 0.3048,
            kilometers: 0.0003048,
            millimeters: 304.8,
            centimeters: 30.48,
        },
        kilometers: {
            meters: 1000,
            feet: 3280.84,
            millimeters: 1000000,
            centimeters: 100000,
        },
        millimeters: {
            meters: 0.001,
            feet: 0.00328084,
            kilometers: 0.000001,
            centimeters: 0.1,
        },
        centimeters: {
            meters: 0.01,
            feet: 0.0328084,
            kilometers: 0.00001,
            millimeters: 10,
        },
        celsius: {
            fahrenheit: (input * 9) / 5 + 32,
            kelvin: input + 273.15,
        },
        fahrenheit: {
            celsius: ((input - 32) * 5) / 9,
            kelvin: (((input - 32) * 5) / 9) + 273.15,
        },
        kelvin: {
            celsius: input - 273.15,
            fahrenheit: ((input - 273.15) * 9) / 5 + 32,
        },
    };

    if (fromUnit === toUnit) {
        result = input;
    } else if (conversionFactors[fromUnit] && conversionFactors[fromUnit][toUnit]) {
        result = input * conversionFactors[fromUnit][toUnit];
    } else if (conversionFactors[toUnit] && conversionFactors[toUnit][fromUnit]) {
        result = input / conversionFactors[toUnit][fromUnit];
    }else{
        key=-1
    }

    if(key==-1){
        document.getElementById("result").innerHTML='Invalid inputs';
    }else{
        document.getElementById("result").innerHTML = `${input} ${fromUnit} = ${result.toFixed(2)} ${toUnit}`;
    }
}
document.getElementById("convertButton").addEventListener("click", convertUnits);
