import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Task } from "@/types/task";

export function useTaskFilters() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const filters = useSelector((state: RootState) => state.tasks.filters);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task: Task) => {
      if (filters.status !== "all" && task.status !== filters.status)
        return false;
      if (filters.priority !== "all" && task.priority !== filters.priority)
        return false;
      if (filters.search) {
        const term = filters.search.toLowerCase();
        if (
          !task.title.toLowerCase().includes(term) &&
          !task.description.toLowerCase().includes(term)
        )
          return false;
      }
      return true;
    });
  }, [tasks, filters]);

  const isFiltered =
    filters.status !== "all" ||
    filters.priority !== "all" ||
    filters.search !== "";

  return {
    filteredTasks,
    totalCount: filteredTasks.length,
    isFiltered,
  };
}
