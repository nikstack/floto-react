import React, { useEffect, useState } from 'react'
import useTodo from './useTodo'
import {
  Box, Button,
  Checkbox,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField, Typography
} from '@mui/material'
import { Edit } from '@mui/icons-material'

interface Props {
}

const TodoList = ({}: Props) => {
  const {
    todos,
    loadTodos,
    addTodo,
    updateTodo,
    setDone,
    deleteTodo
  } = useTodo()
  const [editTodoText, setEditTodoText] = useState<string>('')
  const [editTodoId, setEditTodoId] = useState<string | undefined>()

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault()

    if (editTodoId) {
      if (editTodoText.length > 0) {
        updateTodo({ id: editTodoId, text: editTodoText, done: false })
      } else {
        deleteTodo(editTodoId)
      }
    } else if (editTodoText.length > 0) {
      addTodo({
        text: editTodoText,
        done: false
      })
    }

    setEditTodoText('')
    setEditTodoId(undefined)
  }

  useEffect(() => {
    loadTodos()
  }, [])

  return (
    <>
      <Box>
        <form onSubmit={e => handleAddTodo(e)}
              style={{ display: 'flex', alignItems: 'center' }}>
          <TextField sx={{ flexGrow: 1 }} label='Todo' variant='standard'
                     value={editTodoText}
                     onChange={e => setEditTodoText(e.target.value)} />
        </form>
      </Box>


      <List>
        {
          todos.map(todo => (
            <>
              <ListItem key={todo.id}
                        secondaryAction={
                          <IconButton edge='end' aria-label='Edit'>
                            <Edit onClick={() => {
                              setEditTodoId(todo.id)
                              setEditTodoText(todo.text)
                            }} />
                          </IconButton>
                        }
                        disablePadding
              >
                <ListItemButton role={undefined}
                                onClick={() => setDone(todo.id, !todo.done)}>
                  <ListItemIcon>
                    <Checkbox
                      edge='start'
                      checked={todo.done}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText><Typography>{todo.text}</Typography></ListItemText>
                </ListItemButton>
              </ListItem>
              <Divider />
            </>
          ))
        }
      </List>
    </>
  )
}

export default TodoList
