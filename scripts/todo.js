export class Todo {
    constructor(name, date) {
        this.name = name;
        this.date = date;
        this.done = false;
    }

    isDone() {
        return this.done;
    }

    markAsDone() {
        this.done = true;
    }

    markAsUndone() {
        this.done = false;
    }

    isLate() {
        const today = new Date();
        return this.date < today;
    }

    getDateToString() {
        const day = this.date.getDate();
        const month = this.date.getMonth() + 1;
        const year = this.date.getFullYear();
        return (day < 10 ? '0' + day : day) + '/' + (month < 10 ? '0' + month : month) + '/' + year;
    }
}

export class TodoList {
    constructor() {
        this.list = [];
    }

    add(todo) {
        this.list.push(todo);
        this.list.sort((todoA, todoB) => {
            // Si A doit être avant B, on retourne une valeur < 0
            // Si A doit être après B, on retourne une valeur > 0
            // Si A === B, on retourne 0


            // Si la tâche A est faite => elle est après la tâche B
            if (todoA.isDone()) {
                return 1;
            }

            // Si la tâche B est faite => elle est après la tâche A
            if (todoB.isDone()) {
                return -1;
            }

            // Si la tâche A n'a pas de date => elle est après la tâche B
            if (!todoA.date) {
                return 1;
            }

            // Si la tâche B n'a pas de date => elle est après la tâche
            if (!todoB.date) {
                return -1;
            }

            // Sinon, on retourne la différence entre les deux dates
            return todoA.date - todoB.date;
        });
    }
}