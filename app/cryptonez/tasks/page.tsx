import { TaskCard } from "@/components/cryptonez/TaskCard";

const taskPreview = [
  { title: "Follow on Twitter", description: "Follow @cryptonez", points: 15, type: "follow_twitter", link: "https://x.com" },
  { title: "Join Discord", description: "Enter the Cryptonez server", points: 20, type: "join_discord", link: "https://discord.com" },
  { title: "Daily Login", description: "Keep your streak active", points: 5, type: "daily_login", link: "#" }
] as const;

export default function TasksPage() {
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">Tasks</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {taskPreview.map((task) => (
          <TaskCard key={task.title} task={task} />
        ))}
      </div>
    </main>
  );
}
