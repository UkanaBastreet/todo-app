import { FirebaseApp } from "firebase/app";
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  deleteUser,
} from "firebase/auth";
import { app } from "./firebase";
import { NextOrObserver, updateProfile, User } from "@firebase/auth";
import { IUser } from "../types/IUser";

interface loginDto {
  email: string;
  password: string;
}
interface registrationDto {
  email: string;
  password: string;
  name: string;
}

class AuthAPI {
  constructor(private app: FirebaseApp, private auth: Auth) {}
  async login(dto: loginDto) {
    try {
      const credentials = await signInWithEmailAndPassword(
        this.auth,
        dto.email,
        dto.password
      );
      return credentials;
    } catch (e) {
      throw e;
    }
  }
  async registration(dto: registrationDto) {
    try {
      const credentials = await createUserWithEmailAndPassword(
        this.auth,
        dto.email,
        dto.password
      );
      await updateProfile(credentials.user, {
        displayName: dto.name,
      });
      return credentials;
    } catch (e) {
      return e;
    }
  }
  async logout() {
    try {
      await signOut(this.auth);
    } catch (error) {
      throw error;
    }
  }
  async onAuthChanges(cb: NextOrObserver<User>) {
    return onAuthStateChanged(this.auth, cb);
  }
  async isAuth() {
    return this.auth.currentUser !== null;
  }
  async resetPassword(email: string) {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (e) {
      return e;
    }
  }
  async deleteUser() {
    try {
      if (this.auth.currentUser) {
        await deleteUser(this.auth.currentUser);
      }
    } catch (error) {
      return error;
    }
  }
  getUser(): IUser {
    if (
      this.auth.currentUser !== null &&
      this.auth.currentUser.displayName &&
      this.auth.currentUser.email
    ) {
      return {
        displayName: this.auth.currentUser.displayName,
        email: this.auth.currentUser.email,
      };
    } else {
      throw Error("Unauthorized");
    }
  }
}
export const authApi = new AuthAPI(app, getAuth(app));
