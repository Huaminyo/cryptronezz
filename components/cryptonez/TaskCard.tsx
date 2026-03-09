import type { Task } from "@/lib/db/schema";

export function TaskCard({ task }: { task: Pick<Task, "title" | "description" | "points" | "type" | "link"> }) {
  return (
    <article className="glass p-5">
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="mt-2 text-sm text-slate-300">{task.description}</p>
      <p className="mt-4 text-sm text-indigo-300">{task.points} points · {task.type}</p>
      <a className="mt-4 inline-block rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold" href={task.link}>
        Complete
      </a>
    </article>
  );
}
