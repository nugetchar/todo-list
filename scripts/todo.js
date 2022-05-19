export class Todo {
    static STATES = {
        TODO: 'TODO',
        DONE: 'DONE',
        LATE: 'LATE'
    };

    constructor(description, when) {
        const today = new Date();
        this.description = description;
        this.when = when;
        this.done = false;
        this.state = (!!when && when < today) ? Todo.STATES.LATE : Todo.STATES.TODO;
    }

    getDescription() {
        return this.description;
    }

    getWhen() {
        return this.when;
    }

    getWhenString() {
        const day = (this.when.getDate()) < 10 ? `0${this.when.getDate()}` : this.when.getDate();
        const month = (this.when.getMonth() + 1) < 10 ? `0${this.when.getMonth() + 1}` : this.when.getMonth() + 1;
        const year = this.when.getFullYear();
        return `${day}/${month}/${year}`;
    }

    getState() {
        return this.state;
    }

    toggleDone() {
        const today = new Date();
        if (this.state !== Todo.STATES.DONE) {
            this.state = Todo.STATES.DONE;
        } else {
            this.state = (!!this.when && this.when < today) ? Todo.STATES.LATE : Todo.STATES.TODO;
        }
    }

    isDone() {
        return this.state === Todo.STATES.DONE;
    }
}

export class TodoList {
    constructor(...todos) {
        this.todos = !!todos ? todos : [];
    }

    add(todo) {
        this.todos.push(todo);
        this.todos.sort((a, b) => {
            if (a.state === Todo.STATES.DONE) {
                return 1;
            }

            if (b.state === Todo.STATES.DONE) {
                return -1;
            }

            if (!a.when) {
                return 1;
            }

            if (!b.when) {
                return -1;
            }

            return a.when - b.when;
        });
    }
}