export interface BaseTodo {
  text: string
  done: boolean
}

export interface Todo extends BaseTodo {
  id: string
}

export interface EditTodo {
  id?: string
  text: string
}
