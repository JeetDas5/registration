import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const users = [
    {
      id: 1,
      name: "John Doe",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Editor",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Alex Johnson",
      role: "User",
      status: "Active",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#005f73] via-[#0a9396] to-[#00acb0] p-6 sm:p-10 relative overflow-hidden">
      {/* Ambient background decorative glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#00ffd2]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#0a9396]/20 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto z-10 relative">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-[#182035]/65 backdrop-blur-md p-6 rounded-xl border border-slate-800/40 shadow-xl">
          <div>
            <h1 className="text-white text-3xl font-extrabold tracking-tight">Dashboard</h1>
            <p className="text-slate-300 text-sm mt-1">Welcome back, <span className="text-[#00f5d4] font-semibold">{user.name || "User"}</span></p>
          </div>

          <button
            onClick={logout}
            className="bg-[#ef4444] hover:bg-[#dc2626] active:scale-[0.98] transition-all px-6 py-2.5 rounded-lg text-white font-bold text-sm tracking-wide shadow-lg shadow-red-500/25 cursor-pointer"
          >
            Logout
          </button>
        </div>

        <div className="bg-[#182035]/80 backdrop-blur-md rounded-xl border border-slate-800/40 shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#252d43]/90 text-[#00f5d4] uppercase tracking-wider text-xs border-b border-slate-700/50">
                  <th className="p-5 font-bold">Name</th>
                  <th className="p-5 font-bold">Role</th>
                  <th className="p-5 font-bold">Status</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <tr
                    key={u.id}
                    className="border-b border-slate-700/40 hover:bg-[#252d43]/40 text-slate-200 transition-colors"
                  >
                    <td className="p-5 text-sm font-semibold">{u.name}</td>
                    <td className="p-5 text-sm text-slate-300">{u.role}</td>
                    <td className="p-5 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${
                        u.status === "Active" 
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25" 
                          : "bg-rose-500/10 text-rose-400 border border-rose-500/25"
                      }`}>
                        {u.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

