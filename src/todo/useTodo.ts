import axios from 'axios'
import { useRef, useState } from 'react'
import { BaseTodo, Todo } from './Todo'

interface Props {
}

export default function useTodo(): {
  todos: Todo[],
  loadTodos: () => void,
  addTodo: (todo: BaseTodo) => void,
  updateTodo: (todo: Todo) => void,
  setDone: (todoId: string, doneFlag: boolean) => void,
  deleteTodo: (todoId: string) => void
} {
  const [todos, setTodos] = useState<Todo[]>([])
  const baseUrl = useRef<string>('http://localhost:8080/todos')

  const setBaseUrl = (url: string) => {
    baseUrl.current = url
  }

  const setDone = (todoId: string, doneFlag: boolean) => {
    axios.patch<Todo>(`${baseUrl.current}/${todoId}`, { done: doneFlag })
      .then(response => {
        setTodos(prevState => prevState?.map(todo => todo.id === todoId ? response.data : todo))
      })
  }

  const addTodo = (todo: BaseTodo) => {
    axios.post<Todo>(`${baseUrl.current}`, todo)
      .then(response => {
        setTodos(prevState => [...prevState, response.data])
      })
  }

  const loadTodos = () => {
    axios.get<Todo[]>(baseUrl.current)
      .then(response => setTodos(response.data))
  }

  const deleteTodo = (todoId: string) => {
    axios.delete<string>(`${baseUrl.current}/${todoId}`)
      .then(({ data }) => setTodos(todos.filter(todo => todo.id !== todoId)))
  }

  const updateTodo = (todo: Todo) => {
    axios.patch<Todo>(`${baseUrl.current}/${todo.id}`, todo)
      .then(({ data }) => {
        setTodos(prevState => prevState?.map(todo => todo.id === data.id ? data : todo))
      })
  }

  return { todos, loadTodos, addTodo, updateTodo, setDone, deleteTodo }
}
