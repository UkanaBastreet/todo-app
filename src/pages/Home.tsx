import { FC, useEffect, useState } from "react";
import TodoList from "../components/TodoList";
import { ITodo } from "../types/ITodo";
import TodoForm from "../components/TodoForm";
import { todoApi } from "../api/todo";
import { authApi } from "../api/auth";
import Spinner from "../components/UI/Spinner";
import Profile from "../components/Profile";
import { IUser } from "../types/IUser";
import styled from "styled-components";

interface HomePageProps {
  user: IUser;
  todos: ITodo[];
  addTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  fetching: boolean;
}

const HomePage: FC<HomePageProps> = ({
  addTodo,
  fetching,
  removeTodo,
  todos,
  user,
}) => {
  return (
    <HomePageStyled className="home-page">
      <Profile user={user} />
      <TodoForm addTodo={addTodo} />
      {fetching ? (
        <Spinner />
      ) : (
        <TodoList todos={todos} removeTodo={removeTodo} />
      )}
    </HomePageStyled>
  );
};

const HomePageContainer = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [user, setUser] = useState<IUser>(authApi.getUser());

  const [fetching, setFetching] = useState(false);
  const addTodo = (text: string) => {
    todoApi.addTodo(text).then((todo) => {
      setTodos([...todos, { ...todo }]);
    });
  };
  const removeTodo = (id: string) => {
    todoApi.deleteTodo(id).then(() => {
      setTodos(todos.filter((todo) => todo.id !== id));
    });
  };
  useEffect(() => {
    const newUser = authApi.getUser();
    setUser(newUser);

    if (todos.length === 0 && !fetching) {
      setFetching(true);
      todoApi.getTodos().then((todos) => {
        setTodos(todos);
        setFetching(false);
      });
    }
  }, [fetching, todos.length]);
  return (
    <HomePage
      user={user}
      addTodo={addTodo}
      todos={todos}
      removeTodo={removeTodo}
      fetching={fetching}
    />
  );
};

const HomePageStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default HomePageContainer;
