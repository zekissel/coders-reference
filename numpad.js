let display = document.getElementById('display');
let history = document.getElementById('history');
let display_reset = false;
let fresh_answer = false;
let prev_answer = undefined;

let buttons = Array.from(document.getElementsByClassName('buttons'));

buttons.map( button => {

    button.addEventListener('click', (e) => {

        let fresh_reset = false;

        if (display_reset) {
            display.innerText = '';
            display_reset = false;
            fresh_reset = true;
        }

        switch (e.target.innerText) {
            case '+':
            case '-':
            case '<<':
            case '>>':
            case '%': 
                fresh_answer = false; display.innerText += e.target.innerText; break;
            case 'C':
                if (display.innerText) display.innerText = '';
                else if (!fresh_reset) history.innerText = '';
                break;
            case '←':
                if (display.innerText) {
                    display.innerText = display.innerText.slice(0, -1);
                } fresh_answer = false; break;
            case 'xˣ':
                if (display.innerText) {
                    display.innerText += '**';
                } fresh_answer = false; break;
            case '÷':
                if (display.innerText) {
                    display.innerText += '/';
                } fresh_answer = false; break;
            case '×':
                if (display.innerText) {
                    display.innerText += '*';
                } fresh_answer = false; break;
            case '~':
                display.innerText = '~' + display.innerText; 
                fresh_answer = false; break;
            case 'ANS':
                if (fresh_answer) display.innerText = '';
                if (prev_answer) display.innerText += prev_answer;
                fresh_answer = false; break;
            case 'log':
                if (fresh_answer) display.innerText = ''; // optionally, this string could be '*' (and do += )if the user wants to mult by ANS
                display.innerText += 'Math.log2('; 
                fresh_answer = false; break;
            case 'sin':
                if (fresh_answer) display.innerText = ''; // also here and for cos, tan
                display.innerText += 'Math.sin('; 
                fresh_answer = false; break;
            case 'cos':
                if (fresh_answer) display.innerText = '';
                display.innerText += 'Math.cos(';
                fresh_answer = false; break;
            case 'tan':
                if (fresh_answer) display.innerText = '';
                display.innerText += 'Math.tan(';
                fresh_answer = false; break;
            case '=':
                if (!display.innerText) break;
                let left = validParenth(display.innerText);

                while (left > 0) {
                    display.innerText += ')';
                    left--;
                }
                try {
                    let result = eval(display.innerText);
                    let equation = "<span style=\"color:gray\">" + display.innerText + " = </span>";
                    display.innerText = result;
                    history.innerHTML = "<br>" + history.innerHTML;
                    history.innerHTML = equation + result + history.innerHTML;
                    prev_answer = result;
                    fresh_answer = true; break;
                } catch {
                    display.innerText = 'ERR';
                    display_reset = true; break;
                }
            default:
                if (fresh_answer) {
                    display.innerText = '';
                    fresh_answer = false;
                }
                display.innerText += e.target.innerText;
        }
    });
});

validParenth = s => {
    let stack = [];
    for (let i = 0; i < s.length; i++) {

        if (s[i] == '(') stack.push(s[i]);

        else if (s[i] == ')' && stack.length) stack.pop();

    }
    return stack.length;
}