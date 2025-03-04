import { FC } from "react";
import TodoItem from "./TodoItem";
import { ITodo } from "../types/ITodo";
import styled from "styled-components";

interface TodoListProps {
  todos: ITodo[];
  removeTodo: (id: string) => void;
}

const TodoList: FC<TodoListProps> = ({ todos, removeTodo }) => {
  return (
    <StyledTodoList className="todo-list">
      {todos.length > 0 ? (
        todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} removeTodo={removeTodo} />
        ))
      ) : (
        <div>Нет задач</div>
      )}
    </StyledTodoList>
  );
};

const StyledTodoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default TodoList;
