"use client";
import { useDispatch } from "react-redux";
import { createTask } from "@/store/taskSlice";
import { AppDispatch } from "@/store";
import { useTaskForm } from "@/hooks/useTaskForm";
import { useRouter } from "next/navigation";

export default function CreatePage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { values, handleChange, handleSubmit, errors } = useTaskForm();

  function onSubmit() {
    handleSubmit(async (data) => {
      await dispatch(createTask(data));
      router.push("/tasks");
    });
  }

  return (
    <div className="max-w-lg mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Create New Task</h1>
      <div className="flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium">Title *</label>
          <input
            value={values.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="mt-1 w-full rounded border px-3 py-2 text-sm"
            placeholder="Task title"
          />
          {errors.title && (
            <p className="text-xs text-red-500 mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium">Description</label>
          <textarea
            value={values.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="mt-1 w-full rounded border px-3 py-2 text-sm"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium">Priority</label>
            <select
              value={values.priority}
              onChange={(e) =>
                handleChange(
                  "priority",
                  e.target.value as typeof values.priority,
                )
              }
              className="mt-1 w-full rounded border px-2 py-2 text-sm"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Status</label>
            <select
              value={values.status}
              onChange={(e) =>
                handleChange("status", e.target.value as typeof values.status)
              }
              className="mt-1 w-full rounded border px-2 py-2 text-sm"
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Due Date *</label>
          <input
            type="date"
            min={new Date().toISOString().slice(0, 10)}
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

        <div>
          <label className="text-sm font-medium">Assigned To</label>
          <input
            value={values.assignedTo}
            onChange={(e) => handleChange("assignedTo", e.target.value)}
            className="mt-1 w-full rounded border px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Tags (comma separated)</label>
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
            className="mt-1 w-full rounded border px-3 py-2 text-sm"
            placeholder="design, api, testing"
          />
        </div>

        <button
          onClick={onSubmit}
          className="rounded bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700"
        >
          Create Task
        </button>
      </div>
    </div>
  );
}
