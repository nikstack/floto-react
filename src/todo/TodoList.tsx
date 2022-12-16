import React, { useEffect, useState } from 'react'
import useTodo from './useTodo'
import {
  Box,
  Checkbox,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography
} from '@mui/material'
import { Edit } from '@mui/icons-material'
import { EditTodo } from './Todo'

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
  const [editTodo, setEditTodo] = useState<EditTodo | undefined>()

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault()

    if (!editTodo) {
      return
    }

    if (editTodo.id) {
      if (editTodo.text.length > 0) {
        updateTodo({ id: editTodo.id, text: editTodo.text, done: false })
      } else {
        deleteTodo(editTodo.id)
      }
    } else if (editTodo.text.length > 0) {
      addTodo({
        text: editTodo.text,
        done: false
      })
    }

    setEditTodo(undefined)
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
                     value={editTodo?.text}
                     onChange={e => setEditTodo({
                       ...editTodo,
                       text: e.target.value
                     })} />
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
                              setEditTodo({ id: todo.id, text: todo.text })
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
