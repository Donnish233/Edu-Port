export default function StudentList({
  students,
  currentUser,
  onUpdateStudent,
  onDeleteStudent,
  search,
}) {
  const filtered = students.filter((s) => {
    const fullName = `${s.firstName ?? ""} ${s.lastName ?? ""}`;
    return (
      fullName.toLowerCase().includes(search.toLowerCase()) ||
      (s.email ?? "").toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-center z-auto bg-gray-100 h-16 py-4 lg:sticky top-52">
        Available Students ({filtered.length})
      </h2>
      <div className="flex flex-col justify-center items-center">
        {filtered.length === 0 ? (
          <p className="text-gray-500 text-center">No students found</p>
        ) : (
          <ul className="space-y-4">
            {filtered
              .filter((s) => s.studentId !== currentUser?.studentId)
              .map((student) => (
                <li
                  key={student.studentId}
                  className="p-4 border rounded-lg bg-white shadow flex flex-col sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="w-11/12 lg:w-80">
                    <p className="font-semibold text-lg">
                      {student.firstName} {student.lastName}
                    </p>
                    <p className="text-sm text-gray-400">
                      ID: {student.studentId}
                    </p>
                    <p>
                      E-mail:
                      <span className="text-blue-400"> {student.email}</span>
                    </p>
                    <p className="text-sm">Age: {student.age}</p>
                    <p className="text-sm">Phone: {student.phone}</p>
                  </div>
                  <div className="flex gap-2 mt-2 sm:mt-0">
                    <button
                      onClick={() => onUpdateStudent(student)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDeleteStudent(student.studentId)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
