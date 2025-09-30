import { useState } from "react";
import CurrentUserCard from "./User";

export default function StudentList({
  students,
  currentUser,
  setCurrentUser,
  onSignOut,
}) {
  const [allStudents, setAllStudents] = useState(students);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [visiblePasswords, setVisiblePasswords] = useState({});

  function updateCurrentUser(updated) {
    setAllStudents((prev) =>
      prev.map((s) => (s.studentId === updated.studentId ? { ...updated } : s))
    );
    setCurrentUser(updated); // ✅ update parent state too
  }

  function handleDelete(id) {
    setAllStudents(allStudents.filter((s) => s.studentId !== id));
  }

  function handleEdit(student) {
    setEditingId(student.studentId);
    setEditData({ ...student });
  }

  function handleSave(e) {
    e.preventDefault();
    setAllStudents(
      allStudents.map((s) => (s.studentId === editingId ? { ...editData } : s))
    );
    setEditingId(null);
  }

  function togglePassword(id) {
    setVisiblePasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  const filteredStudents = allStudents.filter(
    (s) =>
      s.email !== currentUser.email &&
      [s.firstName, s.lastName, s.studentId, s.email]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
  );
  {/*
  useEffect(() => {
    const header = document.getElementById("main-header");
    const headerHeight = header?.offsetHeight || 0;

    function handleScroll() {
      if (window.scrollY > headerHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  */}

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Current user card */}
      <CurrentUserCard
        currentUser={currentUser}
        onEdit={updateCurrentUser}
        onSignOut={onSignOut}
      />

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name, ID, or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none sticky top-48 bg-white py-2"
      />

      {/* Other students */}
      <ul className="space-y-4">
        {filteredStudents.map((student) => (
          <li
            key={student.studentId}
            className="p-4 border rounded-xl shadow-sm hover:shadow-md transition"
          >
            {editingId === student.studentId ? (
              <form onSubmit={handleSave} className="space-y-2">
                <input
                  type="text"
                  value={editData.firstName}
                  onChange={(e) =>
                    setEditData({ ...editData, firstName: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  placeholder="First name"
                />
                <input
                  type="text"
                  value={editData.lastName}
                  onChange={(e) =>
                    setEditData({ ...editData, lastName: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  placeholder="Last name"
                />
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) =>
                    setEditData({ ...editData, email: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  placeholder="Email"
                />
                <input
                  type="text"
                  value={editData.password}
                  onChange={(e) =>
                    setEditData({ ...editData, password: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  placeholder="Password"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <p className="font-semibold text-lg">
                  Name: {student.firstName} {student.lastName}
                </p>
                <p className="text-gray-600">ID: {student.studentId}</p>
                <p className="text-blue-400">{student.email}</p>
                <p>
                  Password:{" "}
                  {visiblePasswords[student.studentId]
                    ? student.password
                    : "*".repeat(student.password.length)}
                </p>
                <button
                  onClick={() => togglePassword(student.studentId)}
                  className="mt-1 px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  {visiblePasswords[student.studentId]
                    ? "Hide Password"
                    : "View Password"}
                </button>
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => handleEdit(student)}
                    className="h-10 px-3 py-0.5 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(student.studentId)}
                    className="h-10 px-3 py-0.5 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
        {filteredStudents.length === 0 && (
          <p className="text-gray-500">No students found.</p>
        )}
      </ul>
    </div>
  );
}
