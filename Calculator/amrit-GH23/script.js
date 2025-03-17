let string = "";
let buttons = document.querySelectorAll('.button');

Array.from(buttons).forEach((button) => {
    button.addEventListener('click', (e) => {
        let buttonValue = e.target.innerHTML;

        if (buttonValue === 'AC') {
            string = "";  
            document.querySelector('input').value = string;
        } else if (buttonValue === '=') {
            try {
                string = eval(string);  
                document.querySelector('input').value = string;
            } catch (err) {
                document.querySelector('input').value = "Error";  
            }
        } else if (buttonValue === 'del') {
            string = string.slice(0, -1);
            document.querySelector('input').value = string;
        } else {
            string += buttonValue;  
            document.querySelector('input').value = string;
        }
    });
});




