"use client"; // Tells Next.js this page runs in the browser for interactivity

import { useState } from "react";

export default function HomePage() {
  // State to track emoji likes count
  const [likes, setLikes] = useState(0);

  // State to track what you type in the daily entry box
  const [entryText, setEntryText] = useState("");
  const [savedEntries, setSavedEntries] = useState<string[]>([]);

  // Function that runs when you submit a new entry
  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the browser from refreshing
    if (!entryText.trim()) return; // Don't save empty entries
    
    setSavedEntries([entryText, ...savedEntries]); // Add new entry to the top
    setEntryText(""); // Clear the input box
  };

  return (
    <main className="max-w-xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">My Daily Journal 🚀</h1>

      {/* Form to write today's entry */}
      <form onSubmit={handleSaveEntry} className="space-y-3 bg-white p-4 rounded-xl shadow-sm border">
        <label className="block text-sm font-medium text-gray-700">What did you do today?</label>
        <textarea
          value={entryText}
          onChange={(e) => setEntryText(e.target.value)}
          placeholder="Write your developer log here..."
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Publish Entry
        </button>
      </form>

      {/* Displaying Saved Entries */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Recent Logs</h2>
        
        {savedEntries.length === 0 ? (
          <p className="text-gray-400 text-sm">No entries logged yet today. Write your first one above!</p>
        ) : (
          savedEntries.map((entry, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow-sm border space-y-3">
              <p className="text-gray-700">{entry}</p>

              {/* Emoji Reaction Button */}
              <div className="flex items-center gap-2 pt-2 border-t">
                <button
                  onClick={() => setLikes(likes + 1)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition"
                >
                  🔥 {likes}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}