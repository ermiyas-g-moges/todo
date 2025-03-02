import React, { useEffect, useState } from "react"

import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"

function App() {

    const [todos, setTodos] = useState([])
    const [todoValue, setTodoValue] = useState('')

    function saveTodos(newList) {
      localStorage.setItem('todos', JSON.stringify({todos : newList}))
    }

    function addTodo(newTodo) {
      const newTodoList = [...todos, newTodo]
      saveTodos(newTodoList)
      setTodos(newTodoList)
    }

    function deleteTodo(index) {
      const newTodoList = todos.filter((todo, todoIndex) => {
        return todoIndex !== index
      })
      saveTodos(newTodoList)
      setTodos(newTodoList)
    }

    function editTodo(index) {

      const valueTobeEdited = todos[index]
      setTodoValue(valueTobeEdited)
      deleteTodo(index)
    }

  useEffect(() => {
    if(!localStorage){
        return
    }
      
    let localTodos = localStorage.getItem('todos')
    if(!localTodos){
      return
    }

    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)
  }, [])
    
  return (
    <>
      <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} addTodo={addTodo}/>
      <TodoList editTodo={editTodo}deleteTodo={deleteTodo} todos={todos}/>
    </>
  )
}

export default App
