let bits = Array.from(document.getElementsByClassName('bitfield'));

bits.map (hex => {

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

    });

});

