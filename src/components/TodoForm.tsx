import { FC, FormEventHandler, useState } from "react";
import Card from "./UI/Card";
import Input from "./UI/Input";
import Button from "./UI/Button";
import styled from "styled-components";

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
      <StyledTodoForm onSubmit={handleSubmit}>
        <Input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Todo ..."
          onSubmit={handleSubmit}
        />
        <Button type="submit">Todo</Button>
      </StyledTodoForm>
    </Card>
  );
};

const StyledTodoForm = styled.form`
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 18px;
  border-radius: 24px;
  background: var(--surface-soft);
  border: 1px solid var(--border);

  & > input {
    width: 100%;
    min-height: 52px;
    background: rgba(255, 255, 255, 0.9);
  }

  button {
    min-width: 128px;
  }
`;

export default TodoForm;
