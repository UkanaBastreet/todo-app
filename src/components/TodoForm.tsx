import { FC, FormEventHandler, useState } from "react";
import { ITodo } from "../types/ITodo";

interface TodoFormProps {
  addTodo: (value: string) => void;
}

const TodoForm: FC<TodoFormProps> = ({ addTodo }) => {
  const [value, setValue] = useState("");
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (value.trim() !== "") {
      addTodo(value);
      setValue("");
    }
  };
  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Todo ..."
        onSubmit={handleSubmit}
      />
      <button type="submit">Todo</button>
    </form>
  );
};

export default TodoForm;
