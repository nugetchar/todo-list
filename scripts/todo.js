export class Todo {
    constructor(description, date) {
        this.description = description;
        this.date = date;
        this.done = false;
    }

    isDone() {
        return this.done;
    }

    isLate() {
        // si elle a une date => on teste si sa date est passée
        // sinon elle n'est pas en retard
        return this.date ? this.date < new Date() : false;
    }

    markAsDone() {
        this.done = true;
    }

    markAsUndone() {
        this.done = false;
    }

    getDateAsString() {
        const day = (this.date.getDate() < 10) ? '0' + this.date.getDate() : this.date.getDate(); 
        const month = ((this.date.getMonth() + 1) < 10) ? '0' + (this.date.getMonth() + 1) : (this.date.getMonth() + 1);
        const year = this.date.getFullYear();
        
        return day + '/' + month + '/' + year;
    }
}

export class TodoList {
    constructor() {
        this.list = [];
    }

    add(todo) {
        this.list.push(todo);
        this.list.sort((todoA, todoB) => {

            // Si A doit être après B => on retourne une valeur > 0
            // Si A doit être avant B => on retourne une valeur < 0
            // Si A et B sont égaux en terme de critères de tri, on retourne 0

            // Si todoA est finie => on la met après todoB => 1
            if (todoA.isDone()) {
                return 1;
            }

            // Si todoB est finie => on la met après todoA => -1
            if (todoB.isDone()) {
                return -1;
            }

            // Si todoA n'a pas d'échéance => on la met après todoB => 1
            if (!todoA.date) {
                return 1;
            }

            // Si todoB n'a pas d'échéance => on la met après todoA => -1
            if (!todoB.date) {
                return -1;
            }

            return todoA.date - todoB.date;
        });
    }
}