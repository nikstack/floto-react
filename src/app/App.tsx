import React from 'react'
import TodoList from '../todo/TodoList'
import { Paper, styled } from '@mui/material'

const Page = styled(Paper)`
  min-height: 100vh;
  padding: 16px;
  background-color: ${props => props.theme.palette.background.default};
`

function App() {
  return (
    <Page>
      <TodoList />
    </Page>

  )
}

export default App
