import { FC } from "react";
import { ITodo } from "../types/ITodo";
import Card from "./Card";

interface TodoItemProps {
  todo: ITodo;
  removeTodo: (id: string) => void;
}

const TodoItem: FC<TodoItemProps> = ({ todo, removeTodo }) => {
  return (
    <Card className="todo-item">
      <header>
        <b>{todo.author}</b>
        <span
          className="btn-link"
          style={{ cursor: "pointer" }}
          onClick={() => removeTodo(todo.id)}
        >
          ✖
        </span>
      </header>
      <main>{todo.body}</main>
      <footer>
        <span></span>
        <span style={{ color: "gray" }}>
          {todo.updatedAt.toLocaleTimeString()}
        </span>
      </footer>
    </Card>
  );
};
export default TodoItem;
