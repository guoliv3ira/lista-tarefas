//pegar o input, botão e lista do html
const inputTarefa = document.querySelector('.input-tarefa')
const btnTarefa = document.querySelector('.btn-tarefa')
const tarefas = document.querySelector('.tarefas')


inputTarefa.addEventListener('keypress', (e)=>{ //quando pressionar uma tecla no input
    if (e.keyCode === 13){ //se a tecla for enter
        if (!inputTarefa.value) return; //se estiver vazio, finaliza (não há ação)
        criaTarefa(inputTarefa.value); //chama a função de criar tarefa enviando o texto do input
    }
})

btnTarefa.addEventListener('click', (e)=>{ //quando clicar no botão
    if (!inputTarefa.value) return; //se estiver vazio, finaliza (não há ação)
    criaTarefa(inputTarefa.value); //chama a função de criar tarefa enviando o texto do input
})

const limpaInput = () =>{
    inputTarefa.value = ''; //função para limpar o input e deixar em foco
    inputTarefa.focus();
}

const criaTarefa = (textoInput) =>{
    const li = criaLi(); //chama a função de criar li e armazena o li criado na constante
    li.innerText = textoInput; //coloca o texto do input no li criado
    tarefas.appendChild(li); //coloca o li na lista ul tarefas
    limpaInput(); //chama a função para limpar o input
    criaBotaoApagar(li); //chama a função de criar o botão apagar
    salvarTarefa(); //chama a função para salvar os li no storage
}

const criaLi = () => { //função para criar e retornar o li 
    const li = document.createElement('li');
    li.setAttribute('class', 'list-group-item') //adicionando classe no li para o CSS
    return li;
}

const criaBotaoApagar = (li) =>{ //função para criar o botão apagar
    li.innerText += ' '; //adiciona um espaço entre o texto e o botão
    const botaoApagar = document.createElement('img'); //cria a imagem
    botaoApagar.setAttribute('class', 'apagar imgX'); //adiciona classe para o CSS
    botaoApagar.setAttribute('src', 'assets/img/x.svg') //adiciona o source da imagem
    li.appendChild(botaoApagar); //coloca a imagem no li
}

document.addEventListener('click', (e)=>{ //identifica clique no documento
    const el = e.target; //salva esse clique na variável
    if (el.classList.contains('apagar')){ //se o clique for no botão apagar (que contém a classe 'apagar')
        el.parentElement.remove(); //remove o elemento pai (li)
        salvarTarefa(); //salva no storage
    }
})

const salvarTarefa = () =>{
    const liTarefas = tarefas.querySelectorAll('li') //todos os li para uma variável
    const listaDeTarefas = []; // criar um array
    
    for (let tarefa of liTarefas) { //percorre os li salvos na variável liTarefas
        let tarefaTexto = tarefa.innerText; // texto dos li para uma variável
        tarefaTexto = tarefaTexto.trim(); // tirar espaço adicionado ao criar o botão excluir
        listaDeTarefas.push(tarefaTexto); // adicionar os textos no array criado
    }
    const tarefasJSON = JSON.stringify(listaDeTarefas); //transformar o array para string
    localStorage.setItem('tarefas', tarefasJSON); //armazenar a string no local storage com o nome "tarefas"
}

const addSavedTask = () =>{ //função para carregar as li salvas o local storage
    
    const tarefas = localStorage.getItem('tarefas'); // pegar a string no local storage
    const listaDeTarefas = JSON.parse(tarefas); // transormar a string em array
    for (let tarefa of listaDeTarefas){ //percorre o array
        criaTarefa(tarefa)       // chama a função de criar tarefa para cada li do array
    }
}

addSavedTask(); //chama a função para carregar os li
