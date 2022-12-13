//DOM element
const colorColDis = document.getElementById('color-columns') 
const form = document.getElementById('generator-form')
const zero = document.getElementById('zero')
const one = document.getElementById('one')
const two = document.getElementById('two')
const three = document.getElementById('three')
const four = document.getElementById('four')
const hexValZero = document.getElementsByClassName('hex-value-0')[0]
const hexValOne = document.getElementsByClassName('hex-value-1')[0]
const hexValTwo = document.getElementsByClassName('hex-value-2')[0]
const hexValThree = document.getElementsByClassName('hex-value-3')[0]
const hexValFour = document.getElementsByClassName('hex-value-4')[0]

const colorBlockArray = [zero, one, two, three, four]
const hexValArray = [hexValZero, hexValOne, hexValTwo, hexValThree, hexValFour]
let colorAPIArray = ["#D55114", "#ED6B2F", "#F28C5D", "#F6AD8B", "#FACEBA"]

//Initializing background colors on columns
colorBlockArray.forEach((column, n = 0) => {
    column.style.background = colorAPIArray[n]
    n++
})

form.addEventListener('submit', e => {
    e.preventDefault()
    
   let colorWheel = document.getElementById('color-wheel').value
   let colorSelectorDrop = document.getElementById('color-selector-drop').value
   
   colorWheel = colorWheel.slice(1,7)
   
   fetch(`https://www.thecolorapi.com/scheme?hex=${colorWheel}&mode=${colorSelectorDrop}`)
        .then(res => res.json())
        .then(data => {
            
            colorAPIArray = []
            let colorArr = data.colors
            
            colorArr.forEach(color => colorAPIArray.push(color.hex.value))
            
            colorAPIArray.forEach((hexVal, num = 0) => {
                colorBlockArray[num].style.background = hexVal
                hexValArray[num].innerHTML = hexVal

                num++
            })
            
        })
})

// Convert RGB value to hex value taken from
// https://stackoverflow.com/questions/1740700/how-to-get-hex-color-value-rather-than-rgb-value
function rgb2hex(rgb) {
    if(/^#/.test(rgb))return rgb;// if returns colors as hexadecimal
    let re = /\d+/g;
    let hex = x => (x >> 4).toString(16)+(x & 0xf).toString(16);
    return "#"+hex(re.exec(rgb))+hex(re.exec(rgb))+hex(re.exec(rgb));
}

function getBackgroundHexValue (rgbValue) {
    let hexValue = rgb2hex(rgbValue)
    navigator.clipboard.writeText(hexValue)
    return hexValue
}

function clickDisplayCopied() {
    let columnClicked = event.target.parentElement.style.background
    getBackgroundHexValue(columnClicked)
    n = event.target.children[0]
    n.style.display = 'block'
    n.innerHTML = "Hex Value Copied!"
    setTimeout(function() {
        n.style.display = 'none'
    }, 700)
}

colorColDis.addEventListener('click', clickDisplayCopied)