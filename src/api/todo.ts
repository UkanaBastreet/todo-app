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
import { ITodo } from "../types/ITodo";

class TodoApi {
  constructor(private auth: Auth, private db: Firestore) {}
  async addTodo(text: string, isPublic: boolean = false): Promise<ITodo> {
    const user = this.auth.currentUser;
    const todos = await this.getTodos();
    const order = todos.length === 0 ? 1 : todos[todos.length - 1].order + 1;
    if (!user) {
      throw new Error("User is not authenticated");
    }
    const todo: Omit<ITodo, "id"> = {
      userId: user.uid,
      body: text,
      completed: false,
      isPublic,
      createdAt: new Date(),
      updatedAt: new Date(),
      order,
      author: user.displayName as string,
    };
    const docRef = await addDoc(collection(this.db, "todos"), todo);
    return { id: docRef.id, ...todo };
  }
  async getTodos(): Promise<ITodo[]> {
    const user = this.auth.currentUser;
    if (!user) return [];

    const q = query(
      collection(this.db, "todos"),
      where("userId", "==", user.uid)
    );
    const querySnapshot = await getDocs(q);

    const todos: ITodo[] = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
        updatedAt: doc.data().updatedAt.toDate(),
      } as ITodo;
    });

    return todos;
  }
  async getPublicTodos() {
    const q = query(
      collection(this.db, "todos"),
      where("isPublic", "==", true)
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
  async updateTodo(todoId: string, updates: Partial<ITodo>) {
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
