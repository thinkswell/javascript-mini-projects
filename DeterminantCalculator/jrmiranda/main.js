const calculateDeterminant = m => {
    const d1 = m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1])
    const d2 = -m[0][1] * (m[1][0]*m[2][2] - m[1][2]*m[2][0])
    const d3 = m[0][2] * (m[1][0]*m[2][1] - m[1][1]*m[2][0])
    
    return d1 + d2 + d3
}

let button = document.getElementById('calculate')

button.addEventListener('click', () => {
    let matrix = []

    for (let i = 1; i <= 3; i++) {
        let row = []

        for (let j = 1; j <= 3; j++) {
            let val = document.getElementById(`m${i}${j}`).value
            val = val ? parseFloat(val) : 0
            row.push(val)
        }

        matrix.push(row)
    }

    let result = calculateDeterminant(matrix)
    let output = document.getElementById('output')

    output.innerHTML = `Result: <b>${result}</b>`
})