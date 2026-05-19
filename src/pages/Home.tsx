import { FC, useEffect, useState } from "react";
import { useNotification } from "../components/UI/Toast";
import TodoList from "../components/TodoList";
import { ITodo } from "../types/ITodo";
import TodoForm from "../components/TodoForm";
import { todoApi } from "../api/todo";
import Spinner from "../components/UI/Spinner";
import styled from "styled-components";

interface TasksPageProps {
  todos: ITodo[];
  addTodo: (text: string) => void;
  removeTodo: (id: string) => void;
  fetching: boolean;
}

const TasksPage: FC<TasksPageProps> = ({ addTodo, fetching, removeTodo, todos }) => {
  return (
    <TasksPageStyled className="tasks-page">
      <TodoForm addTodo={addTodo} />
      {fetching ? (
        <Spinner />
      ) : (
        <TodoList todos={todos} removeTodo={removeTodo} />
      )}
    </TasksPageStyled>
  );
};

const TasksPageContainer = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [fetching, setFetching] = useState(true);
  const { notify } = useNotification();

  const addTodo = (text: string) => {
    todoApi
      .addTodo(text)
      .then((todo) => {
        setTodos([...todos, { ...todo }]);
        notify({
          type: "success",
          title: "Задача создана",
          message: "Новая задача добавлена в список.",
        });
      })
      .catch((e) => {
        const message = e instanceof Error ? e.message : String(e);
        notify({
          type: "error",
          title: "Ошибка создания",
          message,
        });
      });
  };

  const removeTodo = (id: string) => {
    todoApi
      .deleteTodo(id)
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
        notify({
          type: "success",
          title: "Задача удалена",
          message: "Задача успешно удалена.",
        });
      })
      .catch((e) => {
        const message = e instanceof Error ? e.message : String(e);
        notify({
          type: "error",
          title: "Ошибка удаления",
          message,
        });
      });
  };

  useEffect(() => {
    setFetching(true);
    todoApi.getTodos().then((todos) => {
      setTodos(todos);
      setFetching(false);
    });
  }, []);

  return (
    <TasksPage
      addTodo={addTodo}
      todos={todos}
      removeTodo={removeTodo}
      fetching={fetching}
    />
  );
};

const TasksPageStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
`;

export default TasksPageContainer;
