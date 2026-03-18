import { Task } from "@/types/task";

const tasks: Task[] = [
  {
    id: "1",
    title: "Design System Setup",
    description:
      "Configure Tailwind and shadcn/ui component library for the project.",
    priority: "high",
    status: "done",
    dueDate: new Date(Date.now() - 86400000).toISOString(), // yesterday
    createdAt: new Date().toISOString(),
    tags: ["design", "setup"],
    assignedTo: "Alice",
  },
  {
    id: "2",
    title: "Build API Routes",
    description: "Implement all CRUD endpoints under /api/tasks.",
    priority: "high",
    status: "in-progress",
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
    createdAt: new Date().toISOString(),
    tags: ["backend", "api"],
    assignedTo: "Bob",
  },
  {
    id: "3",
    title: "Write Unit Tests",
    description: "Add Jest tests for hooks and utility functions.",
    priority: "medium",
    status: "todo",
    dueDate: new Date(Date.now() + 86400000 * 7).toISOString(),
    createdAt: new Date().toISOString(),
    tags: ["testing"],
    assignedTo: "Carol",
  },
];

export function getTasks(): Task[] {
  return tasks;
}

export function getTaskById(id: string): Task | undefined {
  return tasks.find((t) => t.id === id);
}

export function addTask(task: Task): Task {
  tasks.push(task);
  return task;
}

export function updateTask(id: string, updates: Partial<Task>): Task | null {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return null;
  tasks[index] = { ...tasks[index], ...updates };
  return tasks[index];
}

export function deleteTask(id: string): boolean {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}
