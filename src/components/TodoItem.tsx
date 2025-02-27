import { FC } from "react";
import { ITodo } from "../types/ITodo";

interface TodoItemProps {
  todo: ITodo;
}

const TodoItem: FC<TodoItemProps> = ({ todo }) => {
  return (
    <div className="todo-item">
      <header>
        <b>{todo.author}</b>
      </header>
      <main>{todo.body}</main>
      <footer>
        <i>{todo.createdAt.toDateString()}</i>
      </footer>
    </div>
  );
};
export default TodoItem;

