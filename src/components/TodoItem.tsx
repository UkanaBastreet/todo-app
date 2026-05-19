import { FC } from "react";
import { ITodo } from "../types/ITodo";
import Card from "./UI/Card";
import styled from "styled-components";
import Button from "./UI/Button";

interface TodoItemProps {
  todo: ITodo;
  removeTodo?: (id: string) => void;
}

const TodoItem: FC<TodoItemProps> = ({ todo, removeTodo }) => {
  return (
    <Card className="todo-item">
      <TodoItemStyled>
        <header>
          <b>{todo.author}</b>
          {removeTodo && (
            <Button design="text" color="red" onClick={() => removeTodo(todo.id)}>
              ✖
            </Button>
          )}
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
  display: flex;
  flex-direction: column;
  gap: 14px;

  > header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;

    b {
      font-size: 1rem;
    }
  }

  > main {
    color: var(--text-color);
    font-size: 1rem;
    line-height: 1.7;
    text-align: left;
  }

  > footer {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 10px;
    color: var(--text-muted);
    font-size: 0.9rem;
  }
`;
export default TodoItem;
