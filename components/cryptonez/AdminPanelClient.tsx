"use client";

import { useState } from "react";
import { supportedTaskTypes } from "@/lib/cryptonez/types";

type AdminData = {
  users: Array<{ id: number; name: string }>;
  suspiciousActivity: Array<{ id: number; action: string; reason: string }>;
  tasks: Array<{ id: number; title: string; isActive: boolean }>;
  referralStats: Array<{ userId: number; name: string; referrals: number }>;
};

type TaskType = (typeof supportedTaskTypes)[number];

const defaultForm = {
  title: "",
  description: "",
  points: 1,
  type: "visit_link" as TaskType,
  link: ""
};

export function AdminPanelClient({ initialData }: { initialData: AdminData }) {
  const [data, setData] = useState(initialData);
  const [form, setForm] = useState(defaultForm);

  async function createTask() {
    const response = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, points: Number(form.points) })
    });

    if (!response.ok) return;
    const created = (await response.json()) as { id: number; title: string; isActive: boolean };
    setData((prev) => ({ ...prev, tasks: [created, ...prev.tasks] }));
    setForm(defaultForm);
  }

  async function toggleTask(taskId: number, isActive: boolean) {
    const response = await fetch("/api/admin", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskId, isActive: !isActive })
    });

    if (!response.ok) return;
    setData((prev) => ({
      ...prev,
      tasks: prev.tasks.map((task) => (task.id === taskId ? { ...task, isActive: !isActive } : task))
    }));
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <section className="glass rounded-xl p-5">
        <h2 className="font-semibold">Task Management</h2>
        <p className="mt-1 text-sm text-slate-300">Create tasks and set reward points.</p>
        <div className="mt-3 grid gap-2">
          <input className="rounded-lg bg-black/20 p-2" placeholder="Title" value={form.title} onChange={(e) => setForm((v) => ({ ...v, title: e.target.value }))} />
          <textarea className="rounded-lg bg-black/20 p-2" placeholder="Description" value={form.description} onChange={(e) => setForm((v) => ({ ...v, description: e.target.value }))} />
          <input className="rounded-lg bg-black/20 p-2" placeholder="Points" type="number" min={1} value={form.points} onChange={(e) => setForm((v) => ({ ...v, points: Number(e.target.value) }))} />
          <select className="rounded-lg bg-black/20 p-2" value={form.type} onChange={(e) => setForm((v) => ({ ...v, type: e.target.value as TaskType }))}>
            {supportedTaskTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <input className="rounded-lg bg-black/20 p-2" placeholder="https://task-link" value={form.link} onChange={(e) => setForm((v) => ({ ...v, link: e.target.value }))} />
          <button onClick={createTask} className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold">Create Task</button>
        </div>
      </section>

      <section className="glass rounded-xl p-5">
        <h2 className="font-semibold">Task Management</h2>
        <p className="mt-1 text-sm text-slate-300">Disable or re-enable active tasks.</p>
        <ul className="mt-3 space-y-2 text-sm">
          {data.tasks.map((task) => (
            <li key={task.id} className="flex items-center justify-between gap-3">
              <span>{task.title}</span>
              <button className="rounded bg-white/10 px-3 py-1" onClick={() => toggleTask(task.id, task.isActive)}>
                {task.isActive ? "Disable" : "Enable"}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="glass rounded-xl p-5">
        <h2 className="font-semibold">Risk Monitor</h2>
        <p className="mt-1 text-sm text-slate-300">Review users and suspicious activity.</p>
        <ul className="mt-3 space-y-1 text-sm text-slate-300">
          {data.users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
        <ul className="mt-3 space-y-1 text-sm text-rose-300">
          {data.suspiciousActivity.map((activity) => (
            <li key={activity.id}>{activity.action}: {activity.reason}</li>
          ))}
        </ul>
      </section>

      <section className="glass rounded-xl p-5">
        <h2 className="font-semibold">Risk Monitor</h2>
        <p className="mt-1 text-sm text-slate-300">Referral stats overview.</p>
        <ul className="mt-3 space-y-1 text-sm text-slate-300">
          {data.referralStats.map((stat) => (
            <li key={stat.userId}>{stat.name}: {stat.referrals} referrals</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
