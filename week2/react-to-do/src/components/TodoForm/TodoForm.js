import { useState } from "react";

const TodoForm = ({ setTodos, todos }) => {
  const [value, setValue] = useState("");

  const addTodo = (text) => {
    setTodos((todos) => [...todos, { text, isCompleted: false }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) {
      alert("Please enter a value!");
      return;
    }
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
};

export default TodoForm;
