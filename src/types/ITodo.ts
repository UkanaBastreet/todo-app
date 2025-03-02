export interface ITodo {
  id: string;
  userId: string;
  completed: boolean;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  body: string;
  order: number;
  author: string;
}
