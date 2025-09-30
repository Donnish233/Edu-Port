import { useState } from "react";

export default function CurrentUserCard({ currentUser, onEdit, onSignOut }) {
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({ ...currentUser });
  const [showPassword, setShowPassword] = useState(false);

  function handleSave(e) {
    e.preventDefault();
    onEdit(editData); // ✅ update currentUser & allStudents
    setEditing(false);
  }

  return (
    <div className="mb-6 p-4 border rounded-lg bg-gray-100 fixed top-60 left-10 w-96 hidden">
      <button
        onClick={onSignOut}
        className="absolute top-2 right-2 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-red-600"
      >
        ← Back
      </button>

      {editing ? (
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
            type="number"
            value={editData.age}
            onChange={(e) => setEditData({ ...editData, age: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="Age"
          />
          <input
            type="text"
            value={editData.phone}
            onChange={(e) =>
              setEditData({ ...editData, phone: e.target.value })
            }
            className="w-full p-2 border rounded"
            placeholder="Phone number"
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
              onClick={() => setEditing(false)}
              className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <h2 className="text-xl font-bold mt-10">
            Welcome back,{" "}
            <span className="text-3xl">{currentUser.firstName}</span>
          </h2>
          <p className="text-gray-600">ID: {currentUser.studentId}</p>
          <p className="text-blue-600">{currentUser.email}</p>
          <p>Age: {currentUser.age} years</p>
          <p>Phone No.: {currentUser.phone}</p>
          <p>
            Password:{" "}
            {showPassword
              ? currentUser.password
              : "*".repeat(currentUser.password.length)}
          </p>
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="mt-1 px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            {showPassword ? "Hide Password" : "View Password"}
          </button>
          <button
            onClick={() => {
              setEditData({ ...currentUser });
              setEditing(true);
            }}
            className="mt-2 ml-2 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Edit Profile
          </button>
        </>
      )}
    </div>
  );
}
