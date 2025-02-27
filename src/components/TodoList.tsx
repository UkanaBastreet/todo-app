import { FC } from "react";
import TodoItem from "./TodoItem";
import { ITodo } from "../types/ITodo";

interface TodoListProps {
  todos: ITodo[];
}

const TodoList: FC<TodoListProps> = ({ todos }) => {
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
