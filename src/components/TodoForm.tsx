import { FC, FormEventHandler, useState } from "react";
import Card from "./UI/Card";
import Input from "./UI/Input";
import Button from "./UI/Button";

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
    <Card>
      <form className="todo-form" onSubmit={handleSubmit}>
        <Input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Todo ..."
          onSubmit={handleSubmit}
        />
        <Button type="submit">Todo</Button>
      </form>
    </Card>
  );
};

export default TodoForm;
