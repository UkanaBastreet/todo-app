import { FC } from "react";
import Card from "./UI/Card";
import { IUser } from "../types/IUser";
import { authApi } from "../api/auth";
import Button from "./UI/Button";

interface ProfileProps {
  user: IUser;
}

const Profile: FC<ProfileProps> = ({ user }) => {
  return (
    <Card className="profile">
      <header>
        <h1>{user.displayName}</h1>
        <Button color="red" design="outline" onClick={() => authApi.logout()}>
          exit
        </Button>
      </header>
      <b>{user.email}</b>
    </Card>
  );
};

export default Profile;
