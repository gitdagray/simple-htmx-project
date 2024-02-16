import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { html } from 'hono/html'
import { cors } from 'hono/cors'
import { todoData } from '../data/todos'

const app = new Hono()

app.use('/*', cors())

app.get('/todo', (c) => {
  const listItems = getListItems(todoData.todos)

  return c.html(
    html`${listItems}`
  )
})

app.post('/todo', async (c) => {
  const { newTodo } = await c.req.parseBody()
  todoData.createTodo(newTodo as string)

  const listItems = getListItems(todoData.todos)

  return c.html(
    html`${listItems}`
  )
})

app.put('/todo/:id', async (c) => {
  const todoId = await c.req.param('id')
  todoData.updateTodo(Number(todoId))

  const listItems = getListItems(todoData.todos)

  return c.html(
    html`${listItems}`
  )
})

app.delete('/todo/:id', async (c) => {
  const todoId = await c.req.param('id')
  todoData.deleteTodo(Number(todoId))

  const listItems = getListItems(todoData.todos)

  return c.html(
    html`${listItems}`
  )
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})

function getListItems(todos: typeof todoData.todos) {
  return todos.sort((a, b) => a.id - b.id).map(todo => (
    html`<li>
      <input 
        type="checkbox" 
        id="todo_${todo.id}" 
        ${todo.completed ? 'checked' : ''} 
        hx-put="http://localhost:3000/todo/${todo.id}"
        hx-trigger="click" 
        hx-target="#todo-list" 
      />
      <label for="todo_${todo.id}">${todo.title}</label>
      <button
        hx-delete="http://localhost:3000/todo/${todo.id}"
        hx-trigger="click" 
        hx-target="#todo-list" 
      >❌</button>
    </li>`
  ))
}
