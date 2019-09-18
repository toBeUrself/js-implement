var data = {
    text: 'string',
};
var label = docuemnt.getElementById('label');
var input = document.getElementById('input');

Object.defineProperty(data, 'text', {
    enumerable: true,
    configurable: false,
    get() {
        return data.text;
    },
    set() {
        label.innerHTML = data.text;
        input.value = data.text;
    }
});


input.addEventListener('change', function(e) {
    data.text = e.target.value;
});