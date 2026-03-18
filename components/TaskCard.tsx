"use client";
import { Task } from "@/types/task";
import { TaskStatusBadge } from "./TaskStatusBadge";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  compact?: boolean;
  className?: string;
}

const priorityColors = {
  low: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  medium:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  high: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
};

export function TaskCard({
  task,
  onEdit,
  onDelete,
  compact,
  className,
}: TaskCardProps) {
  const isOverdue =
    new Date(task.dueDate) < new Date() && task.status !== "done";

  return (
    <div
      className={cn(
        "group rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 p-4 shadow-sm transition-shadow hover:shadow-md flex flex-col gap-3",
        isOverdue && "border-red-400 dark:border-red-500",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
          {task.title}
        </h3>
        <span
          className={cn(
            "rounded-full text-xs px-2 py-0.5 font-medium shrink-0",
            priorityColors[task.priority],
          )}
        >
          {task.priority}
        </span>
      </div>

      {isOverdue && (
        <div className="flex items-center gap-1 text-xs text-red-500 font-semibold">
          <span>⚠</span>
          <span>Overdue</span>
        </div>
      )}

      {!compact && (
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
          {task.description}
        </p>
      )}

      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {task.tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 text-xs text-gray-600 dark:text-gray-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <TaskStatusBadge status={task.status} size="sm" />
        <span className="text-xs text-gray-400 dark:text-gray-500">
          Due {new Date(task.dueDate).toLocaleDateString()}
        </span>
      </div>

      <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          onClick={() => onEdit(task)}
          className="flex-1 rounded bg-blue-50 dark:bg-blue-900 px-2 py-1 text-xs text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="flex-1 rounded bg-red-50 dark:bg-red-900 px-2 py-1 text-xs text-red-600 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-800"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
