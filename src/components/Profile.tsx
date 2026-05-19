import { FC } from "react";
import styled from "styled-components";
import Card from "./UI/Card";
import { IUser } from "../types/IUser";

interface ProfileProps {
  user: IUser;
}

const Profile: FC<ProfileProps> = ({ user }) => {
  return (
    <Card className="profile">
      <ProfileHeader>
        <div>
          <h1>{user.displayName}</h1>
          <span>{user.email}</span>
        </div>
      </ProfileHeader>
    </Card>
  );
};

const ProfileHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  h1 {
    margin-bottom: 6px;
    font-size: 1.8rem;
  }

  span {
    color: var(--text-muted);
    font-size: 0.95rem;
  }
`;

export default Profile;
