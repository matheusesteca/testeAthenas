let inputTitulo = document.querySelector('#inputTitulo');
let labelTitulo = document.querySelector('#labelTitulo');
let validarTitulo = false;

let inputData = document.querySelector('#inputData');
let labelData = document.querySelector('#labelData');
let validarData = false;

let inputDescricao = document.querySelector('#inputDescricao');

function inicializarContadorId() {
    if (!localStorage.getItem('contadorId')) {
        localStorage.setItem('contadorId', '1');
    }
}

function gerarProximoId() {
    inicializarContadorId();

    let contadorId = parseInt(localStorage.getItem('contadorId'), 10);
    if (isNaN(contadorId)) {
        contadorId = 1;
    }

    localStorage.setItem('contadorId', (contadorId + 1).toString());
    return contadorId;
}


if (inputData.value.length == 10) {
    let partesData = inputData.split("/");
    let dataAtual = new Date(partesData[2], partesData[1] - 1, partesData[0]);
}

let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

let nome = document.querySelector('#botaoNome')

let email = usuarioLogado.email

nome.innerHTML = usuarioLogado.nome


if (localStorage.getItem('token') == null) {
    window.location.href = 'index.html'
}

function sair() {
    localStorage.removeItem('token')
    localStorage.removeItem('usuarioLogado')
    window.location.href = 'index.html'
}

function validarCampos() {
    if (validarTitulo & validarData) {
        document.getElementById('botaoTarefa').disabled = false
    } else {
        document.getElementById('botaoTarefa').disabled = true
    }

}

inputTitulo.addEventListener('keyup', () => {
    if (inputTitulo.value.length <= 2) {
        labelTitulo.setAttribute('style', 'color:red');
        labelTitulo.innerHTML = 'Título: *Insira no mínimo 3 caracteres'
        validarTitulo = false
        validarCampos()
    } else {
        labelTitulo.setAttribute('style', 'color:black');
        labelTitulo.innerHTML = 'Título:'
        validarTitulo = true
        validarCampos()
    }
})

inputData.addEventListener('keyup', () => {
    if (inputData.value.length != 10) {
        labelData.setAttribute('style', 'color:red');
        labelData.innerHTML = 'Data de conclusão: *Insira uma data válida'
        validarData = false
        validarCampos()
    } else {
        labelData.setAttribute('style', 'color:black');
        labelData.innerHTML = 'Data de conclusão:';
        validarData = true;
        validarCampos();
    }
})



function criarTarefa() {
    let listaTarefas = JSON.parse(localStorage.getItem(`lista${email}`) || '[]')
    let id = gerarProximoId();
    listaTarefas.push(
        {
            id: id,
            tarefa: inputTitulo.value,
            descricao: inputDescricao.value,
            dataConclusao: inputData.value,
            status: 'pendente'
        }
    )

    localStorage.setItem(`lista${email}`, JSON.stringify(listaTarefas))

    document.querySelector('#inputTitulo').value = ""
    document.querySelector('#inputDescricao').value = ""
    document.querySelector('#inputData').value = ""
    displayItems()

}


function apagarTarefa(id) {

    let listaTarefas = JSON.parse(localStorage.getItem(`lista${email}`) || '[]');

    let listaAtualizada = listaTarefas.filter(listaTarefa => listaTarefa.id !== id);

    localStorage.setItem(`lista${email}`, JSON.stringify(listaAtualizada));

    location.reload()

}
function preencherTarefa(id, tarefa, descricao, data, status) {
    document.getElementById("idModal").value = id;
    document.getElementById("inputTituloModal").value = tarefa;
    document.getElementById("inputDescricaoModal").value = descricao;
    document.getElementById("inputDataModal").value = data;
}

function editarTarefa() {
    let id = document.getElementById("idModal").value;
    let tarefa = document.getElementById("inputTituloModal").value;
    let descricao = document.getElementById("inputDescricaoModal").value;
    let data = document.getElementById("inputDataModal").value;

    let chave = `lista${email}`;
    let tarefas = JSON.parse(localStorage.getItem(chave)) || [];

    let alterarTarefa = {
        id: parseInt(id, 10),
        tarefa: tarefa,
        descricao: descricao,
        dataConclusao: data,
        status: "pendente"
    };

    let tarefaAtualizada = false;
    tarefas = tarefas.map(tarefa => {
        if (tarefa.id == id) {
            tarefaAtualizada = true;
            return alterarTarefa;
        }
        return tarefa;
    });

    localStorage.setItem(`lista${email}`, JSON.stringify(tarefas));
    location.reload();
}

function concluirTarefa(id) {
    let chave = `lista${email}`;
    let tarefas = JSON.parse(localStorage.getItem(chave)) || [];

    let dataAtual = new Date();
    let tarefaConcluida = false;

    tarefas = tarefas.map(tarefa => {
        if (tarefa.id == id) {
            let dataConclusao = new Date(tarefa.dataConclusao);


            if (dataConclusao > dataAtual) {
                tarefaConcluida = true;
                return { ...tarefa, status: 'concluída' };
            } else {
                return tarefa;
            }
        }
        return tarefa;
    });

    if (tarefaConcluida) {
        localStorage.setItem(chave, JSON.stringify(tarefas));
        exibirToast('success');
        setTimeout(() => {
            location.reload();
        }, 3000);
    } else {
        exibirToast('error');
    }

}

function exibirToast(tipo) {
    let toastId = tipo === 'success' ? 'successToast' : 'errorToast';
    let toastElement = document.getElementById(toastId);

    let toast = new bootstrap.Toast(toastElement);
    toast.show();
}


function displayItems() {
    let listaTarefas = JSON.parse(localStorage.getItem(`lista${email}`) || '[]')
    let items = ""
    for (let i = 0; i < listaTarefas.length; i++) {
        let listaAuxiliar = listaTarefas[i];
        items += `<a href="#" class="list-group-item list-group-item-action" aria-current="true">` +
            `   <div class="w-100 mb-1 justify-content-between">` +
            `       <h5 class="mb-1">${listaAuxiliar.tarefa}</h5>` +
            `       <small>${listaAuxiliar.dataConclusao}</small>` +
            `   </div>` +
            `   <div>` +
            `<small>${listaAuxiliar.descricao}</small> <br>` +
            `<small class=${listaAuxiliar.status === "pendente" ? "text-warning" : "text-success"}>${listaAuxiliar.status.toUpperCase()}</small>` +
            `       <br><br> <div class="btn-group d-flex align-items-center" role="group" aria-label="Basic mixed styles example">` +
            `            <button type="button" class="btn btn-outline-danger" onclick="apagarTarefa(${listaAuxiliar.id})">Apagar</button>` +
            `<button type="button" class="btn btn-outline-warning" 
        data-bs-toggle="modal" 
        data-bs-target="#staticBackdrop" 
        onclick="preencherTarefa(${listaAuxiliar.id}, '${listaAuxiliar.tarefa}', '${listaAuxiliar.descricao}', '${listaAuxiliar.dataConclusao}', '${listaAuxiliar.status}')"> 
    Alterar
</button>` +
            `            <button type="button" class="btn btn-outline-success" onclick="concluirTarefa(${listaAuxiliar.id})">Concluir</button>` +
            `        </div>` +
            `    </div>` +
            `</a>`;
    }
    document.querySelector(".list-group").innerHTML = items
}

window.onload = function () {
    displayItems()
}

