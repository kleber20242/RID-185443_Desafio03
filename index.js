let contador = 0;
let input = document.getElementById('inputTarefa');
let btnAdd = document.getElementById('btn-add');
let main = document.getElementById('areaLista');
let tarefasConcluidas = 0; 
let contadorTarefas = document.getElementById('contadorTarefas'); 

// Adicionar a tarefa quando clicar
function addTarefa() {
    let valorInput = input.value;
    if (valorInput !== "") {
        ++contador;
        let novoItem = `<div id="${contador}" class="item">
            <div onclick="marcarTarefa(${contador})" class="item-icone">
                <i id="icone_${contador}" class="fa-regular fa-circle"></i>
            </div>
            <div onclick="marcarTarefa(${contador})" class="item-nome">
                ${valorInput}
            </div>
            <div class="item-botao">
                <button onclick="deletar(${contador})" class="delete"><i class="fa-solid fa-trash-can"></i>Deletar</button>
            </div>
        </div>`;

        // Adiciona novo item na pesquisa
        main.innerHTML += novoItem;
        // Zera os campos após digitar e enviar
        input.value = "";
        input.focus();
    }
    atualizarContador()
}

// Comando para deletar as informações adicionadas
function deletar(id) {
    var tarefa = document.getElementById(id);
    if(tarefa.classList.contains('clicado')){
        tarefasConcluidas--;
    }
    tarefa.remove();
    contador--;
    atualizarContador()
}

function removeTarefaConcluida() {
    const tarefas = document.querySelectorAll('.item.clicado'); // Seleciona as tarefas com a classe 'clicado'
    
    tarefas.forEach(tarefa => {
        tarefa.remove(); // Remove a tarefa
        tarefasConcluidas--;
    });

    if (tarefas.length > 0) {
        contador -= tarefas.length; // Decrementa o contador total
    }

    // Se não houver mais tarefas, reseta os contadores
    if (contador === 0) {
        tarefasConcluidas = 0; // Reseta o contador de tarefas concluídas
    }
    atualizarContador()
}

function marcarTarefa(id) {
    var item = document.getElementById(id);
    var classe = item.getAttribute('class');

    if (classe === 'item') {
        item.classList.add('clicado');
        tarefasConcluidas++;

        var icone = document.getElementById('icone_' + id);
        icone.classList.remove('fa-circle'); 
        icone.classList.add('fa-circle-check'); 
    } else {
        item.classList.remove('clicado');
        tarefasConcluidas--;

        var icone = document.getElementById('icone_' + id);
        icone.classList.remove('fa-circle-check'); 
        icone.classList.add('fa-circle'); 
    }
    atualizarContador()
}

// Comando para fazer o botão enter do teclado enviar a informação
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        btnAdd.click();
        atualizarContador()
    }
});

function atualizarContador() {
    contadorTarefas.innerText = `${tarefasConcluidas}/${contador} concluídas`;
}