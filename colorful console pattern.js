function colorfulConsolePattern() {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    const patternSize = 10;

    for (let i = 0; i < patternSize; i++) {
        let line = '';

        for (let j = 0; j < patternSize; j++) {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            line += `%c${String.fromCharCode(9786)}`; // Unicode smiley
            line += `color: ${randomColor};`;

            if (j < patternSize - 1) {
                line += ' ';
            }
        }

        console.log(line);
    }

    console.log('Colorful Console Pattern!');
}

colorfulConsolePattern();
