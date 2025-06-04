// src/pages/Home.tsx

import React, { useEffect, useState } from "react";
import type { Email } from "../api/emailApi";
import { fetchEmails } from "../api/emailApi"; // adjust if path differs

const Home: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    try {
      const data = await fetchEmails(query);
      setEmails(data);
    } catch (err) {
      console.error("Error fetching emails:", err);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📬 Email Dashboard</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 rounded w-full"
          placeholder="Search emails..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      <div className="space-y-4">
        {emails.map((email, index) => (
          <div
            key={index}
            className="p-4 border rounded bg-white shadow hover:shadow-md transition min-w-full"
          >
            <div className="text-sm text-gray-500">
              📥 {email.from} → {email.to}
            </div>
            <div className="text-lg font-semibold">{email.subject}</div>
            <div className="text-sm mt-1 text-gray-700">{email.text}</div>
            <div className="text-xs mt-2 text-gray-400">
              🗂️ Folder: {email.folder} | 🔐 Account: {email.account} | 🏷️
              Category: {email.category}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
