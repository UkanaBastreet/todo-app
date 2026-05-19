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
import {
  NextOrObserver,
  updateProfile,
  User,
} from "@firebase/auth";
import {
  Firestore,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
} from "firebase/firestore";
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
  constructor(
    private app: FirebaseApp,
    private auth: Auth,
    private db: Firestore
  ) {}
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
      await setDoc(doc(this.db, "users", credentials.user.uid), {
        displayName: dto.name,
        email: dto.email,
        createdAt: new Date(),
      });
      return credentials;
    } catch (e) {
      throw e;
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

  async getUsers() {
    const q = query(collection(this.db, "users"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((docSnapshot) => {
      const data = docSnapshot.data();
      return {
        id: docSnapshot.id,
        displayName: data.displayName || "User",
        email: data.email || "",
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt,
      } as { id: string; displayName: string; email: string; createdAt: Date };
    });
  }
  getUser(): IUser | null {
    const user = this.auth.currentUser;
    if (!user) {
      return null;
    }

    return {
      displayName:
        user.displayName || user.email?.split("@")[0] || "User",
      email: user.email || "",
    };
  }
}
export const authApi = new AuthAPI(app, getAuth(app), getFirestore());
