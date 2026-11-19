export type TodoTask = {
  id: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  editing?: boolean;
};

export type Filter = "all" | "active" | "completed";
