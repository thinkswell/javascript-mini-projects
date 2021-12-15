function cleanString(str, invalidRegex) {
    return str.replace(invalidRegex, '');
}

function remove_sep_char(x, sep_char) {
    let specialChars = ['*', '.'];
    if (specialChars.includes(sep_char)) {
        sep_char = '\\' + sep_char;
    }
    let reg = new RegExp(sep_char, 'g');
    return x.toString().replace(reg, '');
}

function super_separator(x, step_length = 4, sep_char = '-') {
    let str = remove_sep_char(x, sep_char);
    if (str.length > step_length) {
        let re = new RegExp(`.{1,${step_length}}`, 'g');
        let matcher = str.match(re);
        let result = '';
        matcher.forEach((element, index, array) => {
            console.log(matcher);
            result += element;
            if (index !== array.length - 1)
                result += sep_char;
        });
        return result;
    } else {
        return str;
    }
}

function getCharOption() {
    let e = document.querySelector('#charInput');
    let char = e.options[e.selectedIndex].text;
    return char;
}

document.querySelector('#numInput').addEventListener('input', (event) => {
    let input = event.target;
    let value = input.value;
    let step_length = parseInt(document.querySelector('#stepInput').value);
    let char = getCharOption();
    console.log(value, step_length, char);
    value = super_separator(x = cleanString(value, /[^\d]/g), step_length, char);
    input.value = value;
});