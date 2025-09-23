import React, { useContext } from "react";
import Header from "../components/Header";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);

  const formatDate = (dateString) => {
    if (!dateString) return "Not available";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "Not available" : date.toLocaleString();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-blue-50 to-cyan-50 text-slate-800 font-inter">
      <Header showAdminButtons={true} />
      <main className="container mx-auto px-6 py-10 space-y-8 flex-grow">
        <section className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/30">
          <h2 className="text-xl font-bold text-cyan-700 mb-4 flex items-center gap-2">
            <span className="material-icons text-cyan-600">person</span> My
            Profile
          </h2>
          <div className="flex items-center gap-6 mb-4">
            <img
              src={user.profileImage || "/default-avatar.png"}
              alt="Profile"
              className="h-8 w-8 rounded-full object-cover border bg-gray-100 shadow"
            />
            <div className="space-y-2">
              <p>
                <span className="material-icons text-cyan-600 align-middle mr-1">
                  badge
                </span>
                <strong>Username:</strong> {user.username || "Not available"}
              </p>
              <p>
                <span className="material-icons text-cyan-600 align-middle mr-1">
                  email
                </span>
                <strong>Email:</strong> {user.email || "Not available"}
              </p>
              <p>
                <span className="material-icons text-cyan-600 align-middle mr-1">
                  security
                </span>
                <strong>Role:</strong> {user.role || "Not available"}
              </p>
              <p>
                <span className="material-icons text-cyan-600 align-middle mr-1">
                  calendar_today
                </span>
                <strong>Account Created:</strong> {formatDate(user.createdAt)}
              </p>
              <p>
                <span className="material-icons text-cyan-600 align-middle mr-1">
                  update
                </span>
                <strong>Last Updated:</strong> {formatDate(user.updatedAt)}
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gradient-to-r from-gray-100 to-cyan-100 py-6 mt-auto border-t border-gray-200">
        <div className="container mx-auto text-center text-slate-500 text-sm">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-cyan-700">ExcelLense</span>. Built
          with precision and passion.
        </div>
      </footer>
    </div>
  );
}
