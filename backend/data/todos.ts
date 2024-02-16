export const todoData = {
    todos: [
        {
            "id": 1,
            "title": "delectus aut autem",
            "completed": false
        },
        {
            "id": 2,
            "title": "quis ut nam facilis et officia qui",
            "completed": true
        },
        {
            "id": 3,
            "title": "fugiat veniam minus",
            "completed": false
        }
    ],
    getNextId: function () {
        return this.todos.sort((a, b) => b.id - a.id)[0].id + 1
    },
    createTodo: function (newTodo: string) {

        this.todos = [...this.todos, {
            "id": this.getNextId(),
            "title": newTodo,
            "completed": false,
        }]

        return this.todos
    },
    updateTodo: function (todoId: number) {

        const otherTodos = this.todos.filter(todo => todo.id !== todoId)
        const todo = this.todos.filter(todo => todo.id === todoId)[0]

        this.todos = [...otherTodos, {
            ...todo, completed: !todo.completed
        }]

        return this.todos
    },
    deleteTodo: function (todoId: number) {

        this.todos = this.todos.filter(todo => todo.id !== todoId)

        return this.todos
    },
}