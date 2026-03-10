import { TaskCard } from "@/components/cryptonez/TaskCard";
import { listActiveTasks } from "@/lib/cryptonez/tasks";

export default async function TasksPage() {
  const tasks = await listActiveTasks();

  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">Available Tasks</h1>
      {tasks.length === 0 ? (
        <p className="text-slate-400">No tasks available at the moment. Check back soon!</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </main>
  );
}
