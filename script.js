const input = document.querySelector('#input');
const botaoAdicionar = document.querySelector('.btn-add')
const tarefas = document.querySelector('.tarefas');

function clear(){
    input.value = '';
    input.focus();
}

function criaTarefa(text) {
    const li = document.createElement('li');
    li.innerText = text;
    tarefas.appendChild(li);
    criaBtnDeletar(li)
    salvar();
}

function criaBtnDeletar(li){
    li.innerText += ' ';
    const botaoDeletar = document.createElement('button');
    botaoDeletar.innerText = 'Deletar';
    botaoDeletar.className = 'btn-remove';
    li.appendChild(botaoDeletar)
}

function salvar(){
    const liTarefas = tarefas.querySelectorAll('li')
    const listaTarefas = [];

    for(let tarefa of liTarefas){
        let textTarefa = tarefa.innerText;
        textTarefa = textTarefa.replace('Deletar', '').trim();
        listaTarefas.push(textTarefa);
    }

    const tarefasJSON = JSON.stringify(listaTarefas);
    localStorage.setItem('tarefas', tarefasJSON)
}

function getTarefasSalvas (){
    const tarefas =  localStorage.getItem('tarefas');
    const listaTarefas = JSON.parse(tarefas);

    for(let tarefa of listaTarefas){
        criaTarefa(tarefa);
    }
}

getTarefasSalvas()

input.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        if (!input.value) return;
        criaTarefa(input.value);
        clear();
    }
})

botaoAdicionar.addEventListener('click', () => {
    if (!input.value) return;
    criaTarefa(input.value);
    clear();
})

document.addEventListener('click', (e)=>{
    const element = e.target;
    if(element.classList.contains('btn-remove')){
        element.parentElement.remove();
        salvar()
    }
})

