// CurrentUserCard.jsx
import { useState, useEffect } from "react";
import { calculateAge } from "../utils";

export default function CurrentUserCard({ currentUser, onEdit, onSignOut }) {
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({ ...currentUser });
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setEditData({ ...currentUser });
  }, [currentUser]);

  function handleSave(e) {
    e.preventDefault();
    onEdit({ ...editData });
    setEditing(false);
  }

  return (
    <>
      {/* Mobile toggle button (visible only on small screens) */}
      <button
        onClick={() => setOpen((s) => !s)}
        className="md:hidden fixed bottom-5 right-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg"
      >
        {open ? "Close Profile" : "My Profile"}
      </button>

      {/* Panel: slide-in on small screens; static/sticky on large screens */}
      <aside
        className={`
          fixed top-20 left-0 h-full bg-gray-50 shadow-lg p-4 w-80 z-40
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:sticky lg:top-24 lg:h-auto lg:w-80 lg:rounded-lg
        `}
        aria-hidden={!open && window.innerWidth < 1024}
      >
        <button
          onClick={onSignOut}
          className="absolute top-2 right-2 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-red-600"
        >
          ← Sign Out
        </button>

        {editing ? (
          <form onSubmit={handleSave} className="space-y-2 mt-8">
            <div className="grid grid-cols-1 gap-2">
              <input
                type="text"
                value={editData.firstName || ""}
                onChange={(e) =>
                  setEditData({ ...editData, firstName: e.target.value })
                }
                className="w-full p-2 border rounded"
                placeholder="First name"
              />
              <input
                type="text"
                value={editData.lastName || ""}
                onChange={(e) =>
                  setEditData({ ...editData, lastName: e.target.value })
                }
                className="w-full p-2 border rounded"
                placeholder="Last name"
              />
              <input
                type="date"
                value={editData.dateOfBirth || ""}
                onChange={(e) =>
                  setEditData({ ...editData, dateOfBirth: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                value={editData.phone || ""}
                onChange={(e) =>
                  setEditData({ ...editData, phone: e.target.value })
                }
                className="w-full p-2 border rounded"
                placeholder="Phone number"
              />
              <input
                type="email"
                value={editData.email || ""}
                onChange={(e) =>
                  setEditData({ ...editData, email: e.target.value })
                }
                className="w-full p-2 border rounded"
                placeholder="Email"
              />
              <input
                type="text"
                value={editData.password || ""}
                onChange={(e) =>
                  setEditData({ ...editData, password: e.target.value })
                }
                className="w-full p-2 border rounded"
                placeholder="Password"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="px-3 py-1 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-10">
            <h2 className="text-xl font-bold">
              Welcome back,{" "}
              <span className="text-2xl">{currentUser.firstName}</span>
            </h2>
            <p className="text-gray-600">ID: {currentUser.studentId}</p>
            <p className="text-blue-600">{currentUser.email}</p>
            <p>Age: {calculateAge(currentUser.dateOfBirth)} years</p>
            <p>Phone: {currentUser.phone}</p>
            <p>
              Password:{" "}
              {showPassword
                ? currentUser.password
                : "*".repeat(currentUser.password?.length || 0)}
            </p>

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => setShowPassword((s) => !s)}
                className="px-2 py-1 bg-gray-500 text-white rounded"
              >
                {showPassword ? "Hide Password" : "View Password"}
              </button>

              <button
                onClick={() => {
                  setEditData({ ...currentUser });
                  setEditing(true);
                }}
                className="px-3 py-1 bg-yellow-500 text-white rounded"
              >
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}