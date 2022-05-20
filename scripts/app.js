import {Todo, TodoList} from './todo.js';

const todoList = new TodoList();

const inputTodoDesc = document.getElementById('todo-desc');

inputTodoDesc.addEventListener('input', () => {
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.toggleAttribute('disabled', (inputTodoDesc.value === ''));
});

const todoForm = document.querySelector('.todo__form');
todoForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // récupérer la valeur de la description
    const description = inputTodoDesc.value;

    const inputTodoWhen = document.getElementById('todo-when');

    // Si la value du champ date n'est pas vide, je crée une date, sinon j'affecte la valeur null  
    const date = (inputTodoWhen.value !== '') ? new Date(inputTodoWhen.value) : null;

    const todo = new Todo(description, date);
    todoList.add(todo);

    const todoListHTML = document.querySelector('.todo-list');
    todoListHTML.innerHTML = '';
    // transformer la todoList en un tableau d'éléments HTML
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
    taskDiv.classList.add(todoStateToCSSClass(todo));

    taskInfoDiv.classList.add('task__info');

    pDesc.innerText = todo.name;
    pWhen.innerText = (!!todo.date) ? todo.getDateToString() : 'Un jour...';

    input.setAttribute('type', 'checkbox');
    input.toggleAttribute('checked', todo.isDone());

    input.addEventListener('click', () => {
        taskDiv.classList.remove(todoStateToCSSClass(todo));
        
        if (todo.isDone()) {
            todo.markAsUndone();
        } else {
            todo.markAsDone();
        }

        taskDiv.classList.add(todoStateToCSSClass(todo));

    });

    taskInfoDiv.append(pDesc, pWhen);
    taskDiv.append(taskInfoDiv, input);

    return taskDiv;
}

function todoStateToCSSClass(todo) {
    if (todo.isDone()) {
        return 'task--DONE';
    } else if (todo.isLate()) {
        return 'task--LATE';
    } else {
        return 'task--TODO';
    }
}