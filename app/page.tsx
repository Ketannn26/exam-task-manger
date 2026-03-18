import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">📋 TaskFlow</h1>
      <p className="text-gray-500 mb-8">Manage your tasks efficiently</p>
      <div className="flex gap-4 justify-center">
        <Link
          href="/tasks"
          className="rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700"
        >
          View All Tasks
        </Link>
        <Link
          href="/create"
          className="rounded-lg border px-6 py-3 font-medium hover:bg-gray-50"
        >
          Create Task
        </Link>
      </div>
    </div>
  );
}
