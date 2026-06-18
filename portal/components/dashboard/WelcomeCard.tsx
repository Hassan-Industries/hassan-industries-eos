export default function WelcomeCard() {
    return (
      <div className="rounded-2xl bg-[#0b1d33] p-8 text-white shadow">
        <p className="text-lg text-slate-300">Welcome back,</p>
        <h2 className="mt-2 text-4xl font-bold">Jordan Hassan</h2>
        <p className="mt-3 text-slate-300">
          Managing Partner & Chief Executive Officer
        </p>
        <p className="mt-6 max-w-2xl text-lg italic text-slate-200">
          “Purpose governs. Systems empower. Legacy endures.”
        </p>
      </div>
    );
  }