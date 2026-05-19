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
      name: "Michael Holz",
      dateCreated: "04/10/2013",
      role: "Admin",
      status: "Active",
      avatar: "https://i.pravatar.cc/150?u=michael",
    },
    {
      id: 2,
      name: "Paula Wilson",
      dateCreated: "05/08/2014",
      role: "Publisher",
      status: "Active",
      avatar: "https://i.pravatar.cc/150?u=paula",
    },
    {
      id: 3,
      name: "Antonio Moreno",
      dateCreated: "11/05/2015",
      role: "Publisher",
      status: "Suspended",
      avatar: "https://i.pravatar.cc/150?u=antonio",
    },
    {
      id: 4,
      name: "Mary Saveley",
      dateCreated: "06/09/2016",
      role: "Reviewer",
      status: "Active",
      avatar: "https://i.pravatar.cc/150?u=mary",
    },
    {
      id: 5,
      name: "Martin Sommer",
      dateCreated: "12/08/2017",
      role: "Moderator",
      status: "Inactive",
      avatar: "https://i.pravatar.cc/150?u=martin",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]";
      case "Suspended":
        return "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]";
      case "Inactive":
        return "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]";
      default:
        return "bg-slate-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#005f73] via-[#0a9396] to-[#00acb0] p-6 sm:p-10 relative overflow-hidden">
      {/* Ambient background decorative glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#00ffd2]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#0a9396]/20 blur-[120px] pointer-events-none" />

      <div className="max-w-[1000px] mx-auto z-10 relative">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-[#182035]/65 backdrop-blur-md p-6 rounded-xl border border-slate-800/40 shadow-xl">
          <div>
            <h1 className="text-white text-3xl font-extrabold tracking-tight">
              Dashboard
            </h1>
            <p className="text-slate-300 text-sm mt-1">
              Welcome back,{" "}
              <span className="text-[#00f5d4] font-semibold">
                {user.name || "User"}
              </span>
            </p>
          </div>

          <button
            onClick={logout}
            className="bg-[#ef4444] hover:bg-[#dc2626] active:scale-[0.98] transition-all px-6 py-2.5 rounded-lg text-white font-bold text-sm tracking-wide shadow-lg shadow-red-500/25 cursor-pointer"
          >
            Logout
          </button>
        </div>

        <div className="bg-[#182035]/90 backdrop-blur-md rounded-xl border border-slate-800/50 shadow-2xl overflow-hidden p-4 sm:p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="text-slate-400 font-medium text-sm border-b border-slate-700/50">
                  <th className="py-4 px-4">#</th>
                  <th className="py-4 px-4">Name</th>
                  <th className="py-4 px-4">Date Created</th>
                  <th className="py-4 px-4">Role</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <tr
                    key={u.id}
                    className="border-b border-slate-700/40 hover:bg-[#252d43]/50 text-slate-200 transition-colors"
                  >
                    <td className="py-4 px-4 text-sm font-semibold text-slate-400">
                      {u.id}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={u.avatar}
                          alt={u.name}
                          className="w-8 h-8 rounded-full border border-slate-600 object-cover"
                        />
                        <span className="text-sm font-semibold">{u.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-300">
                      {u.dateCreated}
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-300">
                      {u.role}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${getStatusColor(
                            u.status
                          )}`}
                        ></div>
                        <span className="text-sm">{u.status}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-400 hover:text-blue-300 transition-colors p-1 cursor-pointer">
                          <svg
                            className="w-[18px] h-[18px]"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.06-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.73,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.06,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.43-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.49-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
                          </svg>
                        </button>
                        <button className="text-red-500 hover:text-red-400 transition-colors p-1 cursor-pointer">
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4 text-sm text-slate-400">
            <div>Showing 5 out of 25 entries</div>
            <div className="flex items-center gap-1">
              <button className="px-3 py-1 hover:text-white transition-colors cursor-pointer">
                Previous
              </button>
              <button className="w-7 h-7 flex items-center justify-center rounded-sm hover:bg-slate-700 hover:text-white transition-colors cursor-pointer">
                1
              </button>
              <button className="w-7 h-7 flex items-center justify-center rounded-sm hover:bg-slate-700 hover:text-white transition-colors cursor-pointer">
                2
              </button>
              <button className="w-7 h-7 flex items-center justify-center rounded-sm bg-[#00f5d4] text-[#121824] font-bold shadow-[0_2px_8px_rgba(0,245,212,0.4)] cursor-pointer">
                3
              </button>
              <button className="w-7 h-7 flex items-center justify-center rounded-sm hover:bg-slate-700 hover:text-white transition-colors cursor-pointer">
                4
              </button>
              <button className="w-7 h-7 flex items-center justify-center rounded-sm hover:bg-slate-700 hover:text-white transition-colors cursor-pointer">
                5
              </button>
              <button className="px-3 py-1 hover:text-white transition-colors cursor-pointer">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


