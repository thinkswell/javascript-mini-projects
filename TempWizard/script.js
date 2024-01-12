let celsius =  
            document.getElementById('celsius'); 
        let fahrenheit =  
            document.getElementById('fahrenheit'); 
        let kelvin =  
            document.getElementById('kelvin'); 
        celsius.oninput = function () { 
            let f = (parseFloat(celsius.value) * 9) / 5 + 32; 
            fahrenheit.value = parseFloat(f.toFixed(2)); 
  
            let k = (parseFloat(celsius.value) + 273.15); 
            kelvin.value = parseFloat(k.toFixed(2)); 
        } 
        fahrenheit.oninput = function () { 
            let c = ((parseFloat( 
                fahrenheit.value) - 32) * 5) / 9; 
            celsius.value = parseFloat(c.toFixed(2)); 
  
            let k = (parseFloat( 
                fahrenheit.value) - 32) * 5 / 9 + 273.15; 
            kelvin.value = parseFloat(k.toFixed(2)); 
        } 
        kelvin.oninput = function () { 
            let f = (parseFloat( 
                kelvin.value) - 273.15) * 9 / 5 + 32; 
            fahrenheit.value = parseFloat(f.toFixed(2)); 
  
            let c = (parseFloat(kelvin.value) - 273.15); 
            celsius.value = parseFloat(c.toFixed(2)); 
        }