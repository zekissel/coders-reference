let hexademical = document.getElementById('hexadecimal');
hexademical.value = '0x0000000000000000';

let demical = document.getElementById('decimal');
decimal.value = '0';

let bytes = Array.from(document.getElementsByClassName('bitfield'));

bytes.map (hex => {

    let mask = /^[0-9A-Fa-f]+$/;

    hex.addEventListener('keyup', (e) => {

        console.log(e.key);

        if (e.key == 'Shift' || e.key == 'Tab') return;

        else if (e.key == 'Backspace') {
            if (e.target.value != '') e.target.value = '';
            let prev = e.target.previousSibling.previousSibling;
            if (prev) prev.focus();
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

        hexademical.value = getHex();

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

