import { useState } from "react";
import { Task } from "@/types/task";

type FormValues = Omit<Task, "id" | "createdAt">;
type FormErrors = Partial<Record<keyof FormValues, string>>;

const defaultValues: FormValues = {
  title: "",
  description: "",
  priority: "medium",
  status: "todo",
  dueDate: "",
  tags: [],
  assignedTo: "",
};

export function useTaskForm(initialValues?: Partial<Task>) {
  const [values, setValues] = useState<FormValues>({
    ...defaultValues,
    ...initialValues,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  function handleChange<K extends keyof FormValues>(
    field: K,
    value: FormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user types
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!values.title.trim()) newErrors.title = "Title is required";
    if (!values.dueDate) newErrors.dueDate = "Due date is required";
    else if (isNaN(Date.parse(values.dueDate)))
      newErrors.dueDate = "Invalid date";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(onSubmit: (values: FormValues) => void) {
    if (validate()) onSubmit(values);
  }

  function reset() {
    setValues({ ...defaultValues, ...initialValues });
    setErrors({});
  }

  return { values, handleChange, handleSubmit, errors, reset };
}
