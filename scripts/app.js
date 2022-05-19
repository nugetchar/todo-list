import {Todo, TodoList} from './todo.js';

const todoForm = document.querySelector('.todo__form');
const todoDesc = document.getElementById('todo-desc');
const todoWhen = document.getElementById('todo-when');
const submitBtn = document.getElementById('submit-btn');
const todoListDOM = document.querySelector('.todo-list');

const todoList = new TodoList();

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const description = todoDesc.value;
    const when = todoWhen.value ? new Date(todoWhen.value) : null;
    const todo = new Todo(description, when);
    todoList.add(todo);
    todoListDOM.innerHTML = '';
    todoListDOM.append(...todoListToDOM(todoList));
});

todoDesc.addEventListener('input', () => {
    submitBtn.toggleAttribute('disabled', todoDesc.value === '');
});

function todoListToDOM(todoList) {
    return todoList.todos.map((todo) => todoToDOM(todo));
}

function todoToDOM(todo) {
    const divTask = document.createElement('div');
    const divTaskInfo = document.createElement('div');
    const pDesc = document.createElement('p');
    const pWhen = document.createElement('p');
    const checkbox = document.createElement('input');

    divTask.classList.add('task', `task--${todo.getState()}`);
    divTask.appendChild(divTaskInfo);
    divTask.appendChild(checkbox);
    
    divTaskInfo.classList.add('task__info');
    divTaskInfo.appendChild(pDesc);
    divTaskInfo.appendChild(pWhen);

    pDesc.innerText = todo.getDescription();
    pWhen.innerText = todo.getWhen() ? `Pour le : ${todo.getWhenString()}` : `Un jour...`

    checkbox.setAttribute('type', 'checkbox');
    checkbox.toggleAttribute('checked', todo.isDone());
    checkbox.addEventListener('click', () => {
        divTask.classList.remove(`task--${todo.getState()}`);
        todo.toggleDone();
        divTask.classList.add(`task--${todo.getState()}`);
    });

    return divTask;
}