let inputEmail = document.querySelector('#inputEmail');
let labelEmail = document.querySelector('#labelEmail');
let validarEmail = false

let inputSenha = document.querySelector('#inputSenha');
let labelSenha = document.querySelector('#labelSenha');
let validarSenha = false

function validarCampos() {
    if (validarEmail & validarSenha) {
        document.getElementById('botaoLogin').disabled = false
    } else {
        document.getElementById('botaoLogin').disabled = true
    }

}

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

function loginAthenas() {
    let listaUsuarios = []

    let usuario = {
        nome: '',
        sobrenome: '',
        email: '',
        senha: ''
    }

    listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios'))
    listaUsuarios.forEach((item) => {
        if (inputEmail.value == item.email && inputSenha.value == item.senha) {
            usuario = {
                nome: item.nome,
                sobrenome: item.sobrenome,
                email: item.email,
                senha: item.senha
            }
        }
    })
    if (inputEmail.value == usuario.email && inputSenha.value == usuario.senha) {
        let token = Math.random().toString(16).substring(2)
        localStorage.setItem('token', token)
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario))
        window.location.href = 'tarefas.html'

    } else {
        inputEmail.focus();
        alert("E-mail ou senha incorretos")
    }
}