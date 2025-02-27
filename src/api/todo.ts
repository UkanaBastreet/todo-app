import { FirebaseApp } from "firebase/app";
import { app } from "./firebase";
import { Auth, getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

class TodoApi {
  constructor(private auth: Auth, private db: Firestore) {}
  async addTodo(text: string, isPublic: boolean = false) {
    const user = this.auth.currentUser;
    if (!user) return;
    await addDoc(collection(this.db, "todos"), {
      userId: user.uid,
      text,
      completed: false,
      isPublic,
    });
  }
  async getTodos() {
    const user = this.auth.currentUser;
    if (!user) return [];

    const q = query(
      collection(this.db, "todos"),
      where("userId", "==", user.uid)
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
  async getPublicTodos() {
    const q = query(
      collection(this.db, "todos"),
      where("isPublic", "==", true)
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
  async updateTodo(
    todoId: string,
    updates: Partial<{ text: string; completed: boolean; isPublic: boolean }>
  ) {
    const user = this.auth.currentUser;
    if (!user) return;

    const todoRef = doc(this.db, "todos", todoId);
    await updateDoc(todoRef, updates);
  }
  async deleteTodo(todoId: string) {
    const user = this.auth.currentUser;
    if (!user) return;

    const todoRef = doc(this.db, "todos", todoId);
    await deleteDoc(todoRef);
  }
}

export const todoApi = new TodoApi(getAuth(app), getFirestore());
