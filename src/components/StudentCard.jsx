export default function StudentCard({ student, onEdit, onDelete }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
      <div>
        <h3 className="font-bold">
          {student.firstName} {student.lastName}
        </h3>
        <p className="text-sm text-gray-600">{student.email}</p>
        <p className="text-sm">ID: {student.studentId}</p>
        <p className="text-sm">Age: {student.age}</p>
        <p className="text-sm">Phone: {student.phone}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(student)}
          className="bg-yellow-500 text-white px-3 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(student.studentId)}
          className="bg-red-600 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
