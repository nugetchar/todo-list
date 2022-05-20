const todoList = [];
const todoInputDesc = document.getElementById('todo-desc');

const todoForm = document.querySelector('.todo__form');

const todoListDOM = document.querySelector('.todo-list');

todoForm.addEventListener('submit', (event) => {
    // on empêche de recharger la page
    event.preventDefault();

    // on crée une task vide
    const task = {};

    // on récupère l'input date
    const todoInputDate = document.getElementById('todo-when');
    // on récupère la valeur dans l'input (par ex '2022-05-12')
    const inputDateValue = todoInputDate.value;

    // si on a une date de spécifiée, alors on l'affecte à la task
    if (inputDateValue !== '') {
        // on crée une date à partir de cette valeur
        task.date = new Date(inputDateValue);
    }

    // on récupère la valeur dans l'input (par ex 'faire les courses')
    const description = todoInputDesc.value;
    // on ajoute la description à la tâche
    task.description = description;

    // on rajoute la tâche dans le tableau
    todoList.push(task);

    todoListDOM.innerHTML = '';
    todoListDOM.append(...todoListToHTML(todoList));
});

todoInputDesc.addEventListener('input', () => {
    const submitBtn = document.getElementById('submit-btn');
    // Je récupère la valeur de l'input
    const description = todoInputDesc.value;
    submitBtn.toggleAttribute('disabled', (description === ''));
});

function todoListToHTML(todoList) {

    return todoList.map((todo) => {
        const task = document.createElement('div');
        const taskInfo = document.createElement('div');
        const pDesc = document.createElement('p');
        const pDate = document.createElement('p');
        const checkbox = document.createElement('input');
    
        task.classList.add('task');
        taskInfo.classList.add('task__info');
        pDesc.innerText = todo.description;
        pDate.innerText = todo.date 
            ? todo.date.getDate() + '/' + todo.date.getMonth() + 1 + '/' + todo.date.getFullYear() 
            : 'Un jour...';
        checkbox.setAttribute('type', 'checkbox');
        
        checkbox.addEventListener('click', () => {
            task.classList.toggle('task--DONE');
        });

        // On met les paragraphes dans la div
        taskInfo.append(pDesc, pDate);
        task.append(taskInfo, checkbox);
        return task;
    });
    
}