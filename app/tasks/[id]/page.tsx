import { notFound } from "next/navigation";
import { Task } from "@/types/task";
import Link from "next/link";

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/api/tasks/${id}`,
    { cache: "no-store" },
  );
  if (!res.ok) notFound();
  const task: Task = await res.json();

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <Link
          href={`/tasks/${task.id}/edit`}
          className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
        >
          Edit
        </Link>
      </div>
      <p className="text-gray-600 mb-4">{task.description}</p>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-medium">Status:</span> {task.status}
        </div>
        <div>
          <span className="font-medium">Priority:</span> {task.priority}
        </div>
        <div>
          <span className="font-medium">Due:</span>{" "}
          {new Date(task.dueDate).toLocaleDateString()}
        </div>
        <div>
          <span className="font-medium">Assigned:</span> {task.assignedTo}
        </div>
      </div>
    </div>
  );
}
