let hexademical = document.getElementById('hexadecimal');
let bytes = Array.from(document.getElementsByClassName('bitfield'));

bytes.map (hex => {

    let mask = /[0-9A-Fa-f]/;

    hex.addEventListener('keyup', (e) => {

        if (e.key == 'Shift' || e.key == 'Tab') return;

        if (e.key == 'Backspace') {
            let prev = e.target.previousSibling.previousSibling;
            if (prev) prev.focus();
        }

        else if (e.target.value) {

            if (e.target.value != e.key) {
                if (mask.test(e.key)) e.target.value = e.key;
            }
            let next = e.target.nextSibling.nextSibling;    // because of whitespace in HTML
            if (next) next.focus();
        }

        hexademical.innerText = getHex(); // fix this

    });

});

function getHex () {
    let full_hex = '0x';
    for (let byte of bytes) {
        for (let child of byte.children) {
            full_hex += child.value;
            if (child.value == '') full_hex += '0';
        }
    }
    return full_hex;
}

