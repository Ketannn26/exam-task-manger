"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTasks, removeTask } from "@/store/taskSlice";
import { AppDispatch } from "@/store";
import { Task } from "@/types/task";
import { TaskCard } from "./TaskCard";
import { ConfirmDialog } from "./ConfirmDialog";
import { useTaskFilters } from "@/hooks/useTaskFilters";
import { usePagination } from "@/hooks/usePagination";
import { useRouter } from "next/navigation";

export function TaskListClient({ initialTasks }: { initialTasks: Task[] }) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { filteredTasks, totalCount } = useTaskFilters();
  const { currentPage, totalPages, nextPage, prevPage, pageItems } =
    usePagination(totalCount, 6);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(setTasks(initialTasks));
  }, [initialTasks, dispatch]);

  function handleEdit(task: Task) {
    router.push(`/tasks/${task.id}/edit`);
  }

  async function handleDeleteConfirm() {
    if (deleteId) {
      await dispatch(removeTask(deleteId));
      setDeleteId(null);
    }
  }

  return (
    <>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        {totalCount} tasks found
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pageItems(filteredTasks).map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={handleEdit}
            onDelete={(id) => setDeleteId(id)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="rounded border px-3 py-1 text-sm disabled:opacity-40"
          >
            ← Prev
          </button>
          <span className="text-sm">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="rounded border px-3 py-1 text-sm disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Task"
        description="This action cannot be undone. Are you sure?"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteId(null)}
        confirmLabel="Delete"
        destructive
      />
    </>
  );
}
