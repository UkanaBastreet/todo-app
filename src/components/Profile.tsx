import { FC } from "react";
import Card from "./Card";
import { IUser } from "../types/IUser";
import { authApi } from "../api/auth";

interface ProfileProps {
  user: IUser;
}

const Profile: FC<ProfileProps> = ({ user }) => {
  return (
    <Card className="profile">
      <header>
        <h1>{user.displayName}</h1>
        <button onClick={() => authApi.logout()}>exit</button>
      </header>
      <b>{user.email}</b>
    </Card>
  );
};

export default Profile;
