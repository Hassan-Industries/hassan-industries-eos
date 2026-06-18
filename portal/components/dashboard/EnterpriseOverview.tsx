"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { overviewData } from "@/data/dashboard";

export default function EnterpriseOverview() {
  return (
    <div className="mt-6 rounded-xl bg-white p-6 shadow">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Enterprise Overview</h3>
        <span className="text-sm text-slate-500">This Quarter</span>
      </div>

      <div className="mt-6 grid grid-cols-4 gap-4">
        {[
          ["Open Projects", "7"],
          ["Pending Reviews", "2"],
          ["Pending Signatures", "1"],
          ["Active Publications", "24"],
        ].map(([label, value]) => (
          <div key={label} className="border-r last:border-r-0">
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-1 text-2xl font-bold">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 h-64 min-h-[256px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={overviewData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="activity" strokeWidth={3} />
            <Line type="monotone" dataKey="projects" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}