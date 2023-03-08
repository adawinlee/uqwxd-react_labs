import React from "react";
import "./App.css";
const App = () => {
  // states for todo list
  // todos and setTodos is an array of items in the todo list
  // todo and setTodo is the current item to add to the todo list
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");

  // states for editing text
  // todoEditing and setTodoEditing change to and from editing mode
  // editingText and setEditingText store the new edited text to change to
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");

  // useEffect hook, saves new todos into localstorage
  React.useEffect(() => {
      const json = localStorage.getItem("todos");
      const loadedTodos = JSON.parse(json);
      if (loadedTodos) {
          setTodos(loadedTodos);
      }
  }, []);

  React.useEffect(() => {
      const json = JSON.stringify(todos);
      localStorage.setItem("todos", json);
  }, [todos]);
  
  // Add the handlesubmit code here
  function handleSubmit(e) {
      e.preventDefault();

      // create new todo item with id, text, and completion status
      const newTodo = {
          id: new Date().getTime(),
          text: todo.trim(),
          completed: false,
      };
      // if text is not blank, add the item to the todos array
      if (newTodo.text.length > 0) {
          setTodos([...todos].concat(newTodo));
          // reset the current todo item to empty string
          setTodo("");
      }
      // pop up if the entered text is blank
      else {
          alert("Enter Valid Task");
          setTodo("");
      }
  }
  
  // Add the deleteToDo code here
  function deleteToDo(id) {
      // change the todos array to exclude the deleted id
      let updatedTodos = [...todos].filter((todo) => todo.id !== id);
      setTodos(updatedTodos)
  }

  // Add the toggleComplete code here
  function toggleComplete(id) {
      let updatedTodos = [...todos].map((todo) => {
          // change the completion status of the current id's checkbox
          if (todo.id === id) {
              todo.completed = !todo.completed;
          }
        return todo;
      });
      setTodos(updatedTodos);
  }

  // Add the submitEdits code here
  function submitEdits(id) {
    const updatedTodos = [...todos].map((todo) => {
        // change the current id's text to the edited new text
        if (todo.id === id) {
            todo.text = editingText;
        }
        return todo;
    });
    setTodos(updatedTodos);
    // leave editing mode
    setTodoEditing(null);
  }

  
    return(
        <div id ="todo-list">
            <h1>Todo List</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type ="text"
                    onChange={(e) => setTodo(e.target.value)}
                    placeholder="Add a new task"
                    value={todo} 
                />
                <button type ="submit">Add Todo</button>
            </form>
            {todos.map((todo) => 
                <div className="todo" key={todo.id}>
                    <div className="todo-text">
                        <input 
                            type="checkbox" 
                            id="completed" 
                            checked={todo.completed}
                            onChange={() => toggleComplete(todo.id)}
                        />
                        {todo.id === todoEditing ? (
                            <input
                                type="text"
                                onChange={(e) => setEditingText(e.target.value)}
                            />
                        ) : (
                            <div>{todo.text}</div>
                        )}
                    </div>
                    <div className="todo-actions">
                        {todo.id === todoEditing ? (
                            <button onClick={() => submitEdits(todo.id)}>Submit Edits</button>
                        ) : (
                            <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
                        )}
                        <button onClick={() => deleteToDo(todo.id)}>Delete</button>
                    </div>
                </div>
            )}
        </div>
    );
};
export default App;
