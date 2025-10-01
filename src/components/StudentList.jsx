// StudentList.jsx
import { useState } from "react";
import CurrentUserCard from "./User";
import { calculateAge } from "../utils";

export default function StudentList({
  students,
  currentUser,
  onUpdateStudent,
  onDeleteStudent,
  onSignOut,
  search,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [visiblePasswords, setVisiblePasswords] = useState({});

  const filtered = students
    .filter((s) => s.studentId !== currentUser?.studentId)
    .filter((s) =>
      [s.firstName, s.lastName, s.studentId, s.email, s.phone]
        .join(" ")
        .toLowerCase()
        .includes((search || "").toLowerCase())
    );

  function startEdit(student) {
    setEditingId(student.studentId);
    setEditData({ ...student });
  }

  function saveEdit(e) {
    e.preventDefault();
    onUpdateStudent(editData);
    setEditingId(null);
  }

  function confirmDelete(id) {
    if (confirm("Delete this student? This cannot be undone.")) {
      onDeleteStudent(id);
    }
  }

  return (
    <div className="max-w-6xl mx-auto lg:flex lg:gap-6">
      {/* CurrentUserCard: it's responsive internally (sticky on lg, toggle on small) */}
      <div className="mb-4 lg:mb-0 lg:w-80 flex-shrink-0">
        {currentUser && (
          <CurrentUserCard
            currentUser={currentUser}
            onEdit={onUpdateStudent}
            onSignOut={onSignOut}
          />
        )}
      </div>

      {/* Main list */}
      <main className="flex-1">
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="font-semibold text-lg mb-3">
            Students ({filtered.length})
          </h3>

          <ul className="space-y-3">
            {filtered.map((s) => (
              <li
                key={s.studentId}
                className="p-3 border rounded flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div>
                  <p className="font-medium">
                    {s.firstName} {s.lastName}
                  </p>
                  <p className="text-sm text-gray-600">ID: {s.studentId}</p>
                  <p className="text-sm text-gray-600">
                    Age: {calculateAge(s.dateOfBirth)}
                  </p>
                  <p className="text-sm text-blue-600">{s.email}</p>
                </div>

                <div className="flex items-center gap-2">
                  {editingId === s.studentId ? (
                    <form
                      onSubmit={saveEdit}
                      className="grid grid-cols-1 gap-2 w-full sm:w-auto"
                    >
                      <input
                        type="text"
                        value={editData.firstName}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            firstName: e.target.value,
                          })
                        }
                        className="p-1 border rounded"
                      />
                      <input
                        type="text"
                        value={editData.lastName}
                        onChange={(e) =>
                          setEditData({ ...editData, lastName: e.target.value })
                        }
                        className="p-1 border rounded"
                      />
                      <input
                        type="date"
                        value={editData.dateOfBirth}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            dateOfBirth: e.target.value,
                          })
                        }
                        className="p-1 border rounded"
                      />
                      <input
                        type="email"
                        value={editData.email}
                        onChange={(e) =>
                          setEditData({ ...editData, email: e.target.value })
                        }
                        className="p-1 border rounded"
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          type="submit"
                          className="px-3 py-1 bg-green-500 text-white rounded"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          className="px-3 py-1 bg-gray-400 text-white rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(s)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => confirmDelete(s.studentId)}
                        className="px-3 py-1 bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() =>
                          setVisiblePasswords((p) => ({
                            ...p,
                            [s.studentId]: !p[s.studentId],
                          }))
                        }
                        className="px-2 py-1 bg-gray-500 text-white rounded"
                      >
                        {visiblePasswords[s.studentId] ? "Hide" : "View"}
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
            {filtered.length === 0 && (
              <p className="text-gray-500">No other students found.</p>
            )}
          </ul>
        </div>
      </main>
    </div>
  );
}