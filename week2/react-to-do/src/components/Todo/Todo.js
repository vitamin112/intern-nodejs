import { useState } from "react";
import TodoForm from "../TodoForm/TodoForm";
import "./Todo.css";

const Todo = () => {
  const [todos, setTodos] = useState([
    {
      text: "Learn about React",
      isCompleted: false,
    },
    {
      text: "Meet friend for lunch",
      isCompleted: false,
    },
    {
      text: "Build really cool todo app",
      isCompleted: false,
    },
  ]);

  const completeTodo = (index) => {
    setTodos((todos) => {
      todos[index].isCompleted = true;
      return [...todos];
    });
  };

  const removeTodo = (index) => {
    todos.splice(index, 1);
    setTodos([...todos]);
  };

  return (
    <div className="todo-list">
      <TodoForm setTodos={setTodos} todos={todos} />
      {todos.map((todo, index) => (
        <div
          className="todo"
          style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
          key={index}
        >
          {todo.text}
          <div>
            <button onClick={() => completeTodo(index)}>Complete</button>
            <button onClick={() => removeTodo(index)}>x</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Todo;
