const pressed = [];
const secrectCode = 'wesbos';
function logKeys(e) {
    pressed.push(e.key);
    pressed.splice(-secrectCode.length - 1, pressed.length - secrectCode.length);
    if(pressed.join('').includes(secrectCode)) {
        console.log('winner winner')
        cornify_add();
    };
}

window.addEventListener('keyup', logKeys);
