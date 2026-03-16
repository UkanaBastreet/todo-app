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
          <Button design="text" color="red" onClick={() => removeTodo(todo.id)}>
            ✖
          </Button>
        </header>
        <main>{todo.body}</main>
        <footer>
          {/* <span style={{ color: "gray" }}> */}
          {todo.updatedAt
            .toLocaleString()
            .split(",")
            .map((item) => (
              <span style={{ color: "gray" }} key={item}>
                {item}
              </span>
            ))}
          {/* </span> */}
          {/* <span></span> */}
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
    padding: 10px 0;
  }
  > header {
    display: flex;
    justify-content: space-between;
  }
  > footer {
    display: flex;
    justify-content: space-between;
  }
`;
export default TodoItem;
