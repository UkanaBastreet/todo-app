import { useState } from "react";
import TodoList from "../components/TodoList";
import { ITodo } from "../types/ITodo";
import TodoForm from "../components/TodoForm";

const HomePage = () => {
  const [todos, setTodos] = useState<ITodo[]>([
    {
      id: Math.random(),
      author: "s.ppp@bk.ru",
      body: "Lorem ipsum",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: Math.random(),
      author: "s.ppp@bk.ru",
      body: "Lorem ipsum",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
  const addTodo = (value: string) => {
    setTodos((todos) => [
      ...todos,
      {
        id: +Date.now(),
        author: "Stepan",
        body: value,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  };
  return (
    <div className="homoe-page">
      <TodoForm addTodo={addTodo} />
      <hr />
      <TodoList todos={todos} />
    </div>
  );
};

export default HomePage;
