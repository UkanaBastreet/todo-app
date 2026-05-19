import { useEffect, useState } from "react";
import TodoList from "../components/TodoList";
import { ITodo } from "../types/ITodo";
import { todoApi } from "../api/todo";
import Spinner from "../components/UI/Spinner";
import styled from "styled-components";

const PublicWallPage = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    todoApi.getPublicTodos().then((loadedTodos) => {
      setTodos(loadedTodos);
      setFetching(false);
    });
  }, []);

  return (
    <PublicWallStyled>
      <Header>
        <h1>Стена всех задач</h1>
      </Header>
      {fetching ? <Spinner /> : <TodoList todos={todos} />}
    </PublicWallStyled>
  );
};

const PublicWallStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 860px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default PublicWallPage;
