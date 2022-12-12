

let hexademical = document.getElementById('hexadecimal');
hexademical.value = '0x0000000000000000';

let demical = document.getElementById('decimal');
decimal.value = '0';

let bytes = Array.from(document.getElementsByClassName('bitfield'));

bytes.map (hex => {

    let mask = /^[0-9A-Fa-f]+$/;

    hex.addEventListener('keyup', (e) => {

        if (e.key == 'Shift' || e.key == 'Tab') return;

        else if (e.key == 'Backspace') {
            if (e.target.value != '') e.target.value = '';
            else {
                let prev = e.target.previousSibling.previousSibling;
                if (prev) prev.focus();
            }
        }

        else if (e.key == 'ArrowLeft') {
            let prev = e.target.previousSibling.previousSibling;
            if (prev) prev.focus();
        }

        else if (e.key == 'ArrowRight') {
            let next = e.target.nextSibling.nextSibling;
            if (next) next.focus();
        }

        else if (e.key == "Delete") {
            if (e.target.value != '') e.target.value = '';
            let next = e.target.nextSibling.nextSibling;
            if (next) next.focus();
        }

        else if (e.target.value != '') {

            if (mask.test(e.key)) {
                if (e.target.value != e.key) {
                    e.target.value = e.key;
                }
                let next = e.target.nextSibling.nextSibling;    // 2 nexts because of whitespace in HTML
                if (next) next.focus();
            }
            
        }

        let val = getHex();
        hexademical.value = '0x' + val;
        console.log(toDecimal(val));

    });

});

function toDecimal (hex) {

    let sign;
    let exp;
    let fraction;

    switch (hex.charAt(0)) {
        case '0': case '1': case '2': case '3':
        case '4': case '5': case '6': case '7': sign = 0; break;
        default: sign = 1;
    }

    exp = toInt(hex.charAt(2));
    exp += (toInt(hex.charAt(1)) << 4);
    exp += ((toInt(hex.charAt(0))<< 8) & 0x7ff);

    if (exp > 0) fraction = 1;
    else {
        exp = 1;
        fraction = 0;
    }
    if (exp == 2047) return !/^[0]+$/.test(hex.substring(3,hex.length)) ? 'NaN' : sign ? '-Infinity' : '+Infinity';
    exp -= 1023;

    let pow = -1;
    for (let i = 3; i < hex.length; i++) {

        for (let mask = 8; mask > 0; mask /= 2) {
            let f = toInt(hex.charAt(i)) & mask;
            if (f != 0) fraction += 2**pow;
            pow--;
        }
    }

    return ((-1)**sign)*(2**exp)*(fraction);
}

function toInt (hex) {
    switch (hex.toUpperCase()) {
        case '0': return 0; case '8': return 8;
        case '1': return 1; case '9': return 9;
        case '2': return 2; case 'A': return 10;
        case '3': return 3; case 'B': return 11;
        case '4': return 4; case 'C': return 12;
        case '5': return 5; case 'D': return 13;
        case '6': return 6; case 'E': return 14;
        case '7': return 7; case 'F': return 15;
        default: return -1;
    }
}

function getHex () {
    let full_hex = '';
    for (let byte of bytes) {
        for (let child of byte.children) {
            full_hex += child.value;
            if (child.value == '') full_hex += '0';
        }
    }
    return full_hex;
}

