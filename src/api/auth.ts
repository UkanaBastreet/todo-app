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
import { NextOrObserver, User } from "@firebase/auth";

interface loginDto {
  email: string;
  password: string;
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
      return e;
    }
  }
  async registration(dto: loginDto) {
    try {
      const credentials = await createUserWithEmailAndPassword(
        this.auth,
        dto.email,
        dto.password
      );
      return credentials;
    } catch (e) {
      return e;
    }
  }
  async logout() {
    try {
      await signOut(this.auth);
    } catch (error) {
      return error;
    }
  }
  async onAuthChanges(cb: NextOrObserver<User>) {
    onAuthStateChanged(this.auth, cb);
  }
  async isAuth() {
    let isAuth = false;
    this.onAuthChanges((user) => {
      if (user !== null) {
        isAuth = true;
      } else {
        isAuth = false;
      }
    });
    return isAuth;
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
}
export const authApi = new AuthAPI(app, getAuth(app));
