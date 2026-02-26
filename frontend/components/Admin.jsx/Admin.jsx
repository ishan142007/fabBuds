import { useState } from "react";

export default function FabbudsAdminPanel() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1c3f] to-[#1e3a8a] text-white">
      {/* Header */}
    

      {/* Main Section */}
     

      {/* Admin Panel Section (Example) */}
      <div className="px-8 pb-16">
        <div className="max-w-6xl mx-auto bg-[#0c1633] rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-teal-400">Admin Dashboard</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#1b2a52] p-6 rounded-xl shadow-lg hover:scale-105 transition">
              <h3 className="text-lg font-semibold">Users</h3>
              <p className="text-gray-400 mt-2">Manage registered users</p>
            </div>
            <div className="bg-[#1b2a52] p-6 rounded-xl shadow-lg hover:scale-105 transition">
              <h3 className="text-lg font-semibold">Analytics</h3>
              <p className="text-gray-400 mt-2">View system reports</p>
            </div>
            <div className="bg-[#1b2a52] p-6 rounded-xl shadow-lg hover:scale-105 transition">
              <h3 className="text-lg font-semibold">Settings</h3>
              <p className="text-gray-400 mt-2">Configure application</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
