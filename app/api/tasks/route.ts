import { NextRequest, NextResponse } from "next/server";
import { getTasks, addTask } from "@/lib/taskStore";
import { Task } from "@/types/task";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const priority = searchParams.get("priority");
  const search = searchParams.get("search")?.toLowerCase();

  let tasks = getTasks();

  if (status && status !== "all") {
    tasks = tasks.filter((t) => t.status === status);
  }
  if (priority && priority !== "all") {
    tasks = tasks.filter((t) => t.priority === priority);
  }
  if (search) {
    tasks = tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(search) ||
        t.description.toLowerCase().includes(search),
    );
  }

  return NextResponse.json(tasks);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (
    !body.title ||
    typeof body.title !== "string" ||
    body.title.trim() === ""
  ) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }
  if (!body.dueDate || isNaN(Date.parse(body.dueDate))) {
    return NextResponse.json(
      { error: "Valid dueDate is required" },
      { status: 400 },
    );
  }

  const newTask: Task = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    title: body.title.trim(),
    description: body.description ?? "",
    priority: body.priority ?? "medium",
    status: body.status ?? "todo",
    dueDate: body.dueDate,
    tags: body.tags ?? [],
    assignedTo: body.assignedTo ?? "",
  };

  addTask(newTask);
  return NextResponse.json(newTask, { status: 201 });
}
