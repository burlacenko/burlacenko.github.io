// ATTENTION:
// need DESTRUCTURING "{todo,index,remove}" inside parameters !!! not only "todo,index,remove"
function Todo({todo,index,remove}){
  function handle(){
    console.log('Ping:',index);
    remove(index);
  }
  const btnDelete = <button
    id={"btn"+index}
    className="btnDelete"
    onClick={ () => {
      remove(index);
    } }
  >X
  </button>;

  return (
   <div>
    <div className="todo" onClick={handle}>{todo.text}{btnDelete}</div>
    <div></div>
   </div>
  )
}
