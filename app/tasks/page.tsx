import { Task } from "@/types/task";
import { TaskListClient } from "@/components/TaskListClient";

export default async function TasksPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/api/tasks`,
    {
      cache: "no-store",
    },
  );
  const tasks: Task[] = await res.json();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
        All Tasks
      </h1>
      <TaskListClient initialTasks={tasks} />
    </div>
  );
}
