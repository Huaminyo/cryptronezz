import { TaskCard } from "@/components/cryptonez/TaskCard";
import type { Task } from "@/lib/db/schema";
import { fetchJsonSafe, getInternalBaseUrl } from "@/lib/cryptonez/fetcher";

type TasksResponse = {
  tasks: Task[];
};

export default async function TasksPage() {
  const baseUrl = await getInternalBaseUrl();
  const data = await fetchJsonSafe<TasksResponse>(`${baseUrl}/api/tasks`, { tasks: [] });

  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">Tasks</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {data.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </main>
  );
}
