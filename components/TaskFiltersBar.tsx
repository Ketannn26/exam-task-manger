"use client";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, clearFilters } from "@/store/taskSlice";
import { RootState, AppDispatch } from "@/store";

interface TaskFiltersBarProps {
  className?: string;
}

export function TaskFiltersBar({ className }: TaskFiltersBarProps) {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector((state: RootState) => state.tasks.filters);
  const isActive =
    filters.status !== "all" ||
    filters.priority !== "all" ||
    filters.search !== "";

  const inputClass =
    "w-full rounded border border-gray-300 dark:border-gray-600 px-3 py-1.5 text-sm " +
    "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 " +
    "placeholder:text-gray-400 dark:placeholder:text-gray-400 " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className={`flex gap-2 ${className}`}>
      <input
        type="text"
        placeholder="Search tasks..."
        value={filters.search}
        onChange={(e) => dispatch(setFilters({ search: e.target.value }))}
        className={inputClass}
        suppressHydrationWarning
      />

      <select
        value={filters.status}
        onChange={(e) =>
          dispatch(
            setFilters({ status: e.target.value as typeof filters.status }),
          )
        }
        className={inputClass}
        suppressHydrationWarning
      >
        <option value="all">All Status</option>
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <select
        value={filters.priority}
        onChange={(e) =>
          dispatch(
            setFilters({ priority: e.target.value as typeof filters.priority }),
          )
        }
        className={inputClass}
        suppressHydrationWarning
      >
        <option value="all">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      {isActive && (
        <button
          onClick={() => dispatch(clearFilters())}
          className="w-full rounded bg-gray-100 dark:bg-gray-600 dark:text-gray-100 px-3 py-1.5 text-sm hover:bg-gray-200 dark:hover:bg-gray-500"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}
