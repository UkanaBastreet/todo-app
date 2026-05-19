import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNotification } from "../components/UI/Toast";
import { authApi } from "../api/auth";
import Spinner from "../components/UI/Spinner";

interface IUserPublic {
  id: string;
  displayName: string;
  email: string;
  createdAt: Date;
}

const UsersPage = () => {
  const [users, setUsers] = useState<IUserPublic[]>([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { notify } = useNotification();

  useEffect(() => {
    authApi
      .getUsers()
      .then((userList) => {
        setUsers(userList);
      })
      .catch((e) => {
        const message = e instanceof Error ? e.message : String(e);
        setError(message);
        notify({
          type: "error",
          title: "Ошибка доступа",
          message: "Нет прав на просмотр списка пользователей.",
        });
      })
      .finally(() => {
        setFetching(false);
      });
  }, [notify]);

  return (
    <UsersPageStyled>
      <PageTitle>Пользователи</PageTitle>
      {fetching ? (
        <Spinner />
      ) : error ? (
        <ErrorState>{error}</ErrorState>
      ) : users.length === 0 ? (
        <EmptyState>Пользователи не найдены.</EmptyState>
      ) : (
        <UsersGrid>
          {users.map((user) => (
            <UserCard key={user.id}>
              <UserHeader>
                <UserName>{user.displayName}</UserName>
                <UserEmail>{user.email}</UserEmail>
              </UserHeader>
              <UserFooter>
                <span>UID: {user.id}</span>
                <span>{new Date(user.createdAt).toLocaleDateString()}</span>
              </UserFooter>
            </UserCard>
          ))}
        </UsersGrid>
      )}
    </UsersPageStyled>
  );
};

const UsersPageStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 860px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  margin: 0;
  font-size: 2rem;
  text-align: left;
`;

const EmptyState = styled.div`
  padding: 28px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.03);
  color: var(--text-muted);
  text-align: center;
`;

const UsersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
`;

const UserCard = styled.div`
  padding: 20px;
  border-radius: 24px;
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: var(--card-shadow);
`;

const UserHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const UserName = styled.div`
  font-weight: 700;
  font-size: 1.05rem;
`;

const UserEmail = styled.div`
  color: var(--text-muted);
  font-size: 0.95rem;
`;

const UserFooter = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  color: var(--text-muted);
  font-size: 0.9rem;
  flex-wrap: wrap;
`;

const ErrorState = styled.div`
  padding: 22px;
  border-radius: 24px;
  background: rgba(255, 91, 103, 0.08);
  border: 1px solid rgba(255, 91, 103, 0.18);
  color: #ffb3b8;
  text-align: center;
`;

export default UsersPage;
