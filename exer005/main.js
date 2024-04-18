const form = document.getElementById('form-deposito');
const numeroAInput = document.getElementById('numeroA');
const numeroBInput = document.getElementById('numeroB');
const submitButton = document.getElementById('submit');
const successMessage = document.querySelector('.success-message');

let formEValido = false;

function bMaiorQueA(numeroA, numeroB) {
    return numeroB > numeroA;
}

function validarCampos() {
    const numeroA = parseFloat(numeroAInput.value);
    const numeroB = parseFloat(numeroBInput.value);

    formEValido = bMaiorQueA(numeroA, numeroB);

    const mensagem = formEValido ? 'Número A é menor que o número B.' : 'Número A deve ser menor que o número B.';
    const classe = formEValido ? 'success' : 'error';

    successMessage.textContent = mensagem;
    successMessage.classList.remove('success', 'error');
    successMessage.classList.add(classe);
    submitButton.disabled = !formEValido;
}

numeroAInput.addEventListener('input', validarCampos);
numeroBInput.addEventListener('input', validarCampos);

form.addEventListener('submit', function(event) {
    if (!formEValido) {
        event.preventDefault();
    }
});
