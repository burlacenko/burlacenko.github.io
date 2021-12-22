import React from 'react';
// import { Button } from 'bootstrap';  
// import { Card, Accordion, Button, Container, Row, Col, Image, Input,} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';

function App(){
  const [todos, setTodos] = React.useState([
    {
      text: 'learn react',
      isCompleted: false,
    },
    {
      text: 'meet friend for lunch',
      isCompleted: false,
    },
    {
      text: 'build todo app',
      isCompleted: false,
    }        
  ]);

  const addTodo = text => {
    const newTodos = [...todos, {text, isCompleted:false}];
    setTodos(newTodos);
  }
  const removeTodo = index => {
    let temp = [...todos];    
    temp.splice(index, 1);
    setTodos(temp);
  }

  function Todo({todo,index,remove}){
    function handle(){
      console.log('Ping:',index);
      remove(index);
    }
    const btnDelete = <Button
      id={"btn"+index}
      className="btnDelete"
      onClick={ () => {
        remove(index);
      } }
    >X
    </Button>;
  
    return (
     <div>
      <div className="todo" onClick={handle}>{todo.text}{btnDelete}</div>
      <div></div>
     </div>
    )
  }

  function TodoForm({addTodo}){
    const [value,setValue] = React.useState('');
    
    const handleSubmit = e => {
      e.preventDefault();
      if(!value) return;
      addTodo(value);
      setValue('');
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <label>Add todo:</label>
        <input 
          type="text"
          className="input"
          value={value}
          placeholder="Add Todo..."
          onChange={e => setValue(e.target.value)} />
          <button>
            Add #1
          </button>
      </form>
    )
  }

  return(
    <div className="app">
      <h1 className='title'>ToDo List</h1>
      <div className="todo-list" >
        {todos.map((todo, i) => (
          <Todo key={i} index={i} todo={todo} remove={removeTodo}/>
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;
