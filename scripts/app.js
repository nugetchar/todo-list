import {Todo, TodoList} from './todo.js';

const todoList = new TodoList();
const todoDesc = document.getElementById('todo-desc');
const todoForm = document.querySelector('.todo__form');

todoDesc.addEventListener('input', () => {
    const submitBtn = document.getElementById('submit-btn');

    // Quand la valeur de mon input est vide => je désactive le bouton
    // Quand elle n'est pas vide => j'active le bouton
    submitBtn.toggleAttribute('disabled', todoDesc.value === '');
});


todoForm.addEventListener('submit', (event) => {
    // Rechargement de la page empêché à la soumission du formulaire
    event.preventDefault();

    const todoWhen = document.getElementById('todo-when');
    const todoWhenValue = todoWhen.value;
    const date = (todoWhenValue !== '') ? new Date(todoWhenValue) : null;

    const task = new Todo(todoDesc.value, date);


    todoList.add(task);

    const todoListHTML = document.querySelector('.todo-list');
    todoListHTML.innerHTML = '';
    todoListHTML.append(...todoListToHTML(todoList));
});


function todoListToHTML(todoList) {
    return todoList.list.map((todo) => todoToHTML(todo));
}

function todoToHTML(todo) {
    const taskDiv = document.createElement('div');
    const taskInfoDiv = document.createElement('div');
    const pDesc = document.createElement('p');
    const pWhen = document.createElement('p');
    const input = document.createElement('input');

    taskDiv.classList.add('task');    

    taskDiv.classList.add(getCSSClassFromTodoState(todo));

    taskInfoDiv.classList.add('task__info');

    pDesc.innerText = todo.description;
    
    if (todo.date) {
        pWhen.innerText = 'Pour le : ' + todo.getDateAsString();
    } else {
        pWhen.innerText = 'Un jour...'
    }

    input.setAttribute('type', 'checkbox');
    input.addEventListener('click', () => {
        taskDiv.classList.remove(getCSSClassFromTodoState(todo));

        if (todo.isDone()) {
            todo.markAsUndone();
        } else {
            todo.markAsDone();
        }

        taskDiv.classList.add(getCSSClassFromTodoState(todo));
    });

    taskInfoDiv.append(pDesc, pWhen);
    taskDiv.append(taskInfoDiv, input);

    return taskDiv;
}

function getCSSClassFromTodoState(todo) {
    const today = new Date();

    if (todo.done) {
        return 'task--DONE';
    } else if (todo.date && todo.date < today) {
        return 'task--LATE';
    } else {
        return 'task--TODO';
    }
}