"use client";
import { use, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editTask } from "@/store/taskSlice";
import { AppDispatch } from "@/store";
import { useTaskForm } from "@/hooks/useTaskForm";
import { useRouter } from "next/navigation";
import { Task } from "@/types/task";

// ✅ Inner form component — only mounts when real task data exists
function EditForm({ task, id }: { task: Task; id: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { values, handleChange, handleSubmit, errors } = useTaskForm(task);

  function onSubmit() {
    handleSubmit(async (data) => {
      await dispatch(editTask({ id, data }));
      router.push("/tasks");
    });
  }

  return (
    <div className="max-w-lg mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Edit Task
      </h1>

      <div className="flex flex-col gap-4">
        {/* Title */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Title *
          </label>
          <input
            value={values.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="mt-1 w-full rounded border dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Task title"
            suppressHydrationWarning
          />
          {errors.title && (
            <p className="text-xs text-red-500 mt-1">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            value={values.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="mt-1 w-full rounded border dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            rows={3}
          />
        </div>

        {/* Priority + Status */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Priority
            </label>
            <select
              value={values.priority}
              onChange={(e) =>
                handleChange(
                  "priority",
                  e.target.value as typeof values.priority,
                )
              }
              className="mt-1 w-full rounded border dark:border-gray-600 px-2 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              suppressHydrationWarning
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Status
            </label>
            <select
              value={values.status}
              onChange={(e) =>
                handleChange("status", e.target.value as typeof values.status)
              }
              className="mt-1 w-full rounded border dark:border-gray-600 px-2 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              suppressHydrationWarning
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>

        {/* Due Date */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Due Date *
          </label>
          <input
            type="date"
            min={new Date().toISOString().slice(0, 10)} // ← today as minimum
            value={values.dueDate ? values.dueDate.slice(0, 10) : ""}
            onChange={(e) =>
              handleChange("dueDate", new Date(e.target.value).toISOString())
            }
            className="mt-1 w-full rounded border dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            suppressHydrationWarning
          />
          {errors.dueDate && (
            <p className="text-xs text-red-500 mt-1">{errors.dueDate}</p>
          )}
        </div>

        {/* Assigned To */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Assigned To
          </label>
          <input
            value={values.assignedTo}
            onChange={(e) => handleChange("assignedTo", e.target.value)}
            className="mt-1 w-full rounded border dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Person's name"
            suppressHydrationWarning
          />
        </div>

        {/* Tags */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Tags (comma separated)
          </label>
          <input
            value={values.tags.join(", ")}
            onChange={(e) =>
              handleChange(
                "tags",
                e.target.value
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean),
              )
            }
            className="mt-1 w-full rounded border dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="design, api, testing"
            suppressHydrationWarning
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={onSubmit}
            className="flex-1 rounded bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700"
          >
            Save Changes
          </button>
          <button
            onClick={() => router.push("/tasks")}
            className="flex-1 rounded border dark:border-gray-600 px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ✅ Outer component — fetches data, only renders EditForm when ready
export default function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [existing, setExisting] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/tasks/${id}`)
      .then((r) => r.json())
      .then((data: Task) => {
        setExisting(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-blue-600" />
      </div>
    );
  }

  if (!existing) {
    return <div className="p-10 text-center text-red-500">Task not found.</div>;
  }

  // EditForm only mounts here — after data is confirmed available
  return <EditForm task={existing} id={id} />;
}
