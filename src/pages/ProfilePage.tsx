import { useEffect, useState } from "react";
import styled from "styled-components";
import Profile from "../components/Profile";
import Card from "../components/UI/Card";
import { authApi } from "../api/auth";
import { IUser } from "../types/IUser";
import Spinner from "../components/UI/Spinner";

const ProfilePage = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authApi.getUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  if (loading || !user) {
    return <Spinner />;
  }

  return (
    <ProfilePageWrapper>
      <Profile user={user} />
      <Card>
        <Section>
          <h2>Личные данные</h2>
          <dl>
            <dt>Имя</dt>
            <dd>{user.displayName || "Не указано"}</dd>
            <dt>Email</dt>
            <dd>{user.email}</dd>
          </dl>
        </Section>
      </Card>
    </ProfilePageWrapper>
  );
};

const ProfilePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
`;

const Section = styled.section`
  text-align: left;

  h2 {
    margin-bottom: 14px;
    font-size: 1.3rem;
  }

  dl {
    display: grid;
    gap: 12px;
    grid-template-columns: 160px 1fr;
    align-items: center;
  }

  dt {
    color: var(--text-muted);
    font-size: 0.95rem;
  }

  dd {
    margin: 0;
    font-size: 1rem;
    color: var(--text-color);
    word-break: break-all;
    text-align: left;
  }
`;

export default ProfilePage;
