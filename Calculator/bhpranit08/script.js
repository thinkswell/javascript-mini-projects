const addItem = (item) => {
    const inputEl = document.getElementById("input-el")
    const realInput = document.getElementById("real-input-el")

    const specials = ["*", "/", "-", "+"]
    const currentValue = inputEl.value

    const replacements = {
        "*": "×",
        "-": "−", 
        "/": "÷", 
        "+": "+",
        "+": "+",
    }

    if(specials.includes(item)) {
        inputEl.value += replacements[item]
        realInput.value += item
        return
    }

    if (item === '.') {
        const numberSegments = currentValue.split(/[\*\+\-\/]/)
        const currentSegment = numberSegments.at(-1)
        if (currentSegment.includes('.')) {
            return; 
        }
    }

    const lastChar = currentValue.slice(-1)
    if (specials.includes(item) && specials.includes(lastChar)) {
        return
    }

    realInput.value += item
    inputEl.value += item
}

const clearScreen = () => {
    document.getElementById("input-el").value = ""
    document.getElementById("real-input-el").value = ""
}

const deleteEl = () => {
    const inputEl = document.getElementById("input-el")
    const realInput = document.getElementById("real-input-el")
    inputEl.value = inputEl.value.slice(0, -1)
    realInput.value = realInput.value.slice(0, -1)
}

const equal = () => {
    const realInput = document.getElementById("real-input-el")
    const inputEl = document.getElementById("input-el")
    try {
        realInput.value = eval(realInput.value)
        inputEl.value = realInput.value
    } catch (err) {
        realInput.value = "Error"
        inputEl.value = "Error"
    }
}

const squareRoot = () => {
    const inputEl = document.getElementById("input-el")
    const realInput = document.getElementById("real-input-el")
    
    const currentValue = realInput.value
    
    if (currentValue === "" || currentValue === "Error") {
        return
    }
    
    const number = parseFloat(currentValue)
    
    if (number < 0) {
        inputEl.value = "请输入非负数"
        realInput.value = ""
        return
    }
    
    const result = Math.sqrt(number)
    realInput.value = result.toString()
    inputEl.value = result.toString()
}