import { Task } from "@/types/task";

const tasks: Task[] = [
  {
    id: "1",
    title: "Design System Setup",
    description:
      "Configure Tailwind and shadcn/ui component library for the project.",
    priority: "high",
    status: "done",
    dueDate: new Date(Date.now() - 86400000).toISOString(),
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
  {
    id: "4",
    title: "Implement Authentication",
    description: "Set up login/signup using JWT and session handling.",
    priority: "high",
    status: "in-progress",
    dueDate: new Date(Date.now() + 86400000 * 3).toISOString(),
    createdAt: new Date().toISOString(),
    tags: ["auth", "security"],
    assignedTo: "David",
  },
  {
    id: "5",
    title: "Create Dashboard UI",
    description: "Design and build the main dashboard layout.",
    priority: "medium",
    status: "todo",
    dueDate: new Date(Date.now() + 86400000 * 5).toISOString(),
    createdAt: new Date().toISOString(),
    tags: ["frontend", "ui"],
    assignedTo: "Emma",
  },
  {
    id: "6",
    title: "Database Schema Design",
    description: "Define tables and relationships for tasks and users.",
    priority: "high",
    status: "done",
    dueDate: new Date(Date.now() - 86400000 * 2).toISOString(),
    createdAt: new Date().toISOString(),
    tags: ["database"],
    assignedTo: "Frank",
  },
  {
    id: "7",
    title: "Integrate Payment Gateway",
    description: "Add Stripe integration for subscription billing.",
    priority: "medium",
    status: "todo",
    dueDate: new Date(Date.now() + 86400000 * 10).toISOString(),
    createdAt: new Date().toISOString(),
    tags: ["payments", "integration"],
    assignedTo: "Grace",
  },
  {
    id: "8",
    title: "Optimize Performance",
    description: "Improve app load time and API response speed.",
    priority: "low",
    status: "in-progress",
    dueDate: new Date(Date.now() + 86400000 * 4).toISOString(),
    createdAt: new Date().toISOString(),
    tags: ["performance"],
    assignedTo: "Henry",
  },
  {
    id: "9",
    title: "Setup CI/CD Pipeline",
    description: "Configure GitHub Actions for automated deployments.",
    priority: "medium",
    status: "todo",
    dueDate: new Date(Date.now() + 86400000 * 6).toISOString(),
    createdAt: new Date().toISOString(),
    tags: ["devops"],
    assignedTo: "Ivy",
  },
  {
    id: "10",
    title: "Write Documentation",
    description: "Prepare user and developer documentation.",
    priority: "low",
    status: "todo",
    dueDate: new Date(Date.now() + 86400000 * 8).toISOString(),
    createdAt: new Date().toISOString(),
    tags: ["docs"],
    assignedTo: "Jack",
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
