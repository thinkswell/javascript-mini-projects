const result = document.getElementById('result');


document.addEventListener('DOMContentLoaded', function () {
    // Set a small delay to ensure focus is applied after the DOM is fully rendered
    setTimeout(function() {
        document.getElementById('searchField').focus();
    }, 110);
});


if (searchField.value === '') {
    result.innerHTML = '';
}

searchField.addEventListener('input', function () {
    const inputValue = searchField.value.trim();

  
    if (inputValue === '') {
        result.innerHTML = '';
        return result;     
    }  


let matchedElement = null;



// Check if the input matches the beginning of any element in the periodic table
for (const element in periodicTable) {
    if (element.startsWith(inputValue)) {
        matchedElement = element;
        break;
    }
}

if (matchedElement) {
    const molarMass = periodicTable[matchedElement];
    result.innerHTML = `${matchedElement} moolimassa on: ${molarMass} g /mol`;

    navigator.clipboard.writeText(molarMass.toString() + " \\frac{g}{mol} ").then(function () {
       // console.log('Molar mass copied to clipboard:', molarMass);
    }).catch(function (error) {
        console.error('Clipboard write failed:', error);
    });



} else {
    result.innerHTML = `Alkuainetta "${inputValue}" ei löytynyt`;
 }

});




const periodicTable = {
    vety: 1.008,
    helium: 4.0026,
    lithium: 6.94,
    beryllium: 9.0122,
    boori: 10.81,
    hiili: 12.011,
    typpi: 14.007,
    happi: 16.00,
    fluori: 18.998,
    neon: 20.180,
    natrium: 22.990,
    magnesium: 24.305,
    alumiini: 26.982,
    pii: 28.085,
    fosfori: 30.974,
    rikki: 32.06,
    kloori: 35.45,
    argon: 39.948,
    kalium: 39.098,
    kalsium: 40.078,
    skandium: 44.956,
    titaani: 47.867,
    vanadiini: 50.942,
    kromi: 51.996,
    mangaani: 54.938,
    rauta: 55.85,
    koboltti: 58.933,
    nikkeli: 58.693,
    kupari: 63.546,
    sinkki: 65.38,
    gallium: 69.723,
    germanium: 72.630,
    arseeni: 74.922,
    seleeni: 78.971,
    bromi: 79.904,
    krypton: 83.798,
    rubidium: 85.468,
    strontium: 87.62,
    yttrium: 88.906,
    zirkonium: 91.224,
    niobi: 92.906,
    molybdeeni: 95.95,
    teknetium: 98,
    ruthenium: 101.07,
    rodium: 102.91,
    palladium: 106.42,
    hopea: 107.87,
    kadmium: 112.41,
    indium: 114.82,
    tina: 118.71,
    antimonio: 121.76,
    telluuri: 127.60,
    jodi: 126.90,
    ksenon: 131.29,
    seesium: 132.91,
    baarium: 137.33,
    lantaani: 138.91,
    cerium: 140.12,
    praseodyymi: 140.91,
    neodyymi: 144.24,
    prometium: 145,
    samarium: 150.36,
    europium: 151.96,
    gadolinium: 157.25,
    terbium: 158.93,
    dysprosium: 162.50,
    holmium: 164.93,
    erbium: 167.26,
    tulium: 168.93,
    ytterbium: 173.04,
    luteettium: 174.97,
    hafnium: 178.49,
    tantaali: 180.95,
    volframi: 183.84,
    renium: 186.21,
    osmium: 190.23,
    iridium: 192.22,
    platina: 195.08,
    kulta: 196.97,
    elohopea: 200.59,
    tallium: 204.38,
    lyijy: 207.2,
    vismutti: 208.98,
    polonium: 209,
    astatine: 210,
    radon: 222,
    francium: 223,
    radium: 226,
    aktinium: 227,
    torium: 232.04,
    protaktinium: 231.04,
    uraani: 238.03,
    neptunium: 237,
    plutonium: 244,
    amerikium: 243,
    kurium: 247,
    berkelium: 247,
    kalifornium: 251,
    einsteinium: 252,
    fermium: 257,
    mendelevium: 258,
    nobelium: 259,
    lawrencium: 262,
    rutherfordium: 267,
    dubnium: 270,
    seaborgium: 271,
    bohrium: 270,
    hassium: 277,
    meitnerium: 276,
    darmstadtium: 281,
    roentgenium: 280,
    copernicium: 285,
    nihonium: 284,
    flerovium: 289,
    moscovium: 288,
    livermorium: 293,
    tennessine: 294,
    oganessoni: 294,
  };


