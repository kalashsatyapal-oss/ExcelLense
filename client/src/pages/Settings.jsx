import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState(user.username);
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(user.profileImage || "");
  const [preview, setPreview] = useState(
    user.profileImage
      ? user.profileImage.startsWith("data:")
        ? user.profileImage
        : `${process.env.REACT_APP_API_URL}${user.profileImage}`
      : "/default-avatar.png"
  );
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNameChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.put("/auth/update-name", { name });
      setUser((prev) => ({ ...prev, username: res.data.username }));
      setMessage("Name updated!");
    } catch {
      setMessage("Failed to update name.");
    }
    setLoading(false);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put("/auth/update-password", { password });
      setMessage("Password updated!");
      setPassword("");
    } catch {
      setMessage("Failed to update password.");
    }
    setLoading(false);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setLoading(true);
    const formData = new FormData();
    formData.append("profileImage", file);
    try {
      const res = await api.post("/auth/update-profile-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProfileImage(res.data.profileImage);
      setPreview(res.data.profileImage); // Use base64 or url from backend
      setUser((prev) => ({ ...prev, profileImage: res.data.profileImage }));
      setMessage("Profile image updated!");
    } catch {
      setMessage("Failed to update image.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-blue-50 to-cyan-50 text-slate-800 font-inter">
      <div className="container mx-auto max-w-lg mt-10 px-6 py-8 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/30">
        <h2 className="text-2xl font-bold text-cyan-700 mb-6 flex items-center gap-2">
          <span className="material-icons text-cyan-600">settings</span> Settings
        </h2>
        {message && <div className="mb-4 text-green-700">{message}</div>}
        <form onSubmit={handleNameChange} className="mb-6">
          <label className="block mb-2 font-semibold">Change Name</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="flex-1 px-4 py-2 border rounded mb-2"
              disabled={loading}
            />
            <button type="submit" className="px-4 py-2 bg-cyan-600 text-white rounded" disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
        <form onSubmit={handlePasswordChange} className="mb-6">
          <label className="block mb-2 font-semibold">Change Password</label>
          <div className="flex gap-2">
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="flex-1 px-4 py-2 border rounded mb-2"
              disabled={loading}
            />
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded" disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
        <div className="mb-6">
          <label className="block mb-2 font-semibold">Change Profile Image</label>
          <img
            src={preview}
            alt="Profile"
            className="h-20 w-20 rounded-full mb-2 object-cover border bg-gray-100"
          />
          <input type="file" accept="image/*" onChange={handleImageChange} disabled={loading} />
        </div>
        <button onClick={() => navigate("/dashboard")} className="mt-4 px-4 py-2 bg-gray-300 rounded">Back</button>
      </div>
    </div>
  );
}