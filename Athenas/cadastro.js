let inputNome = document.querySelector('#inputNome');
let labelNome = document.querySelector('#labelNome');
let validarNome = false

let inputSobrenome = document.querySelector('#inputSobrenome');
let labelSobrenome = document.querySelector('#labelSobrenome');
let validarSobrenome = false

let inputEmail = document.querySelector('#inputEmail');
let labelEmail = document.querySelector('#labelEmail');
let validarEmail = false

let inputSenha = document.querySelector('#inputSenha');
let labelSenha = document.querySelector('#labelSenha');
let validarSenha = false


function cadastrar() {
    let listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios') || '[]')

    listaUsuarios.push(
        {
            nome: inputNome.value,
            sobrenome: inputSobrenome.value,
            email: inputEmail.value,
            senha: inputSenha.value
        }
    )

    window.location.href = 'index.html'

    localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios))

}

function validarCampos() {
    if (validarNome & validarSobrenome & validarEmail & validarSenha) {
        document.getElementById('botaoCadastro').disabled = false
    } else {
        document.getElementById('botaoCadastro').disabled = true
    }

}

inputNome.addEventListener('keyup', () => {
    if (inputNome.value == "") {
        labelNome.setAttribute('style', 'color:red')
        labelNome.innerHTML = 'Nome: *Obrigatório'
        validarNome = false
    } else {
        labelNome.setAttribute('style', 'rgba(var(--bs-body-color-rgb), .65)')
        labelNome.innerHTML = 'Nome:'
        validarNome = true
        validarCampos()
    }
})

inputSobrenome.addEventListener('keyup', () => {
    if (inputSobrenome.value == "") {
        labelSobrenome.setAttribute('style', 'color:red')
        labelSobrenome.innerHTML = 'Sobrenome: *Obrigatório'
        validarSobrenome = false
        validarCampos()
    } else {
        labelSobrenome.setAttribute('style', 'rgba(var(--bs-body-color-rgb), .65)')
        labelSobrenome.innerHTML = 'Sobrenome:'
        validarSobrenome = true
        validarCampos()
    }
})

inputSenha.addEventListener('keyup', () => {
    if (inputSenha.value.length <= 7) {
        labelSenha.setAttribute('style', 'color:red')
        labelSenha.innerHTML = 'Senha: *Insira no mínimo 8 caracteres'
        validarSenha = false
        validarCampos()
    } else {
        labelSenha.setAttribute('style', 'rgba(var(--bs-body-color-rgb), .65)')
        labelSenha.innerHTML = 'Senha:'
        validarSenha = true
        validarCampos()
    }
})

inputEmail.addEventListener('keyup', () => {
    if (isEmailValid()) {
        labelEmail.setAttribute('style', 'rgba(var(--bs-body-color-rgb), .65)')
        labelEmail.innerHTML = 'Email:'
        validarEmail = true
        validarCampos()
    } else {
        labelEmail.setAttribute('style', 'color:red')
        labelEmail.innerHTML = 'Email: *Insira um e-mail válido'
        validarEmail = false
        validarCampos()
    }
})

function isEmailValid() {
    const email = inputEmail.value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}
function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

