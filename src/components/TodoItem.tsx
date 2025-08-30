import { FC } from "react";
import { ITodo } from "../types/ITodo";
import Card from "./UI/Card";
import styled from "styled-components";
import Button from "./UI/Button";

interface TodoItemProps {
  todo: ITodo;
  removeTodo: (id: string) => void;
}

const TodoItem: FC<TodoItemProps> = ({ todo, removeTodo }) => {
  return (
    <Card className="todo-item">
      <TodoItemStyled>
        <header>
          <b>{todo.author}</b>
          <Button  design="text" color="red" onClick={() => removeTodo(todo.id)}>✖</Button>
        </header>
        <main>{todo.body}</main>
        <footer>
          <span></span>
          <span style={{ color: "gray" }}>
            {todo.updatedAt.toLocaleString()}
          </span>
        </footer>
      </TodoItemStyled>
    </Card>
  );
};

const TodoItemStyled = styled.div`
  & > main {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  > header {
    border-bottom: 1px solid lightgray;
    display: flex;
    justify-content: space-between;
  }
  > footer {
    display: flex;
    justify-content: space-between;
  }
`;
export default TodoItem;
