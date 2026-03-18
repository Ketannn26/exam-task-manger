import { TaskFiltersBar } from "@/components/TaskFiltersBar";

export default function TasksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 shrink-0 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hidden md:block">
        <h2 className="mb-4 font-semibold text-gray-700 dark:text-gray-200">
          Filters
        </h2>
        <TaskFiltersBar className="flex-col" />
      </aside>
      <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-900">{children}</div>
    </div>
  );
}
