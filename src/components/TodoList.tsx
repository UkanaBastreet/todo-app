import { FC } from "react";
import TodoItem from "./TodoItem";
import { ITodo } from "../types/ITodo";

interface TodoListProps {
  todos: ITodo[];
  removeTodo: (id: string) => void;
}

const TodoList: FC<TodoListProps> = ({ todos, removeTodo }) => {
  return (
    <div className="todo-list">
      {todos.length > 0 ? (
        todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} removeTodo={removeTodo} />
        ))
      ) : (
        <div>Нет задач</div>
      )}
    </div>
  );
};

export default TodoList;
