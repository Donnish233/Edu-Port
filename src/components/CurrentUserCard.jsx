import { useState } from "react";

export default function CurrentUserCard({
  currentUser,
  onSignOut,
  onUpdate,
  onDelete,
}) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(currentUser);
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

function handleSave() {
  onUpdate(form);
  setEditing(false);
}


  return (
    <div className="bg-white p-6 rounded-lg shadow mb-4 sticky top-[110px] z-40 hidden lg:block">
      <h2 className="text-xl font-bold mb-2">
        Welcome back, <span className="text-3xl">{currentUser.firstName}</span>{" "}
        👋
      </h2>

      {editing ? (
        <>
          <div className="flex gap-2">
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First name"
              className="w-1/2 border px-2 py-1 rounded"
            />
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last name"
              className="w-1/2 border px-2 py-1 rounded"
            />
          </div>
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder="Age"
            className="w-full border px-2 py-1 rounded mt-2"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border px-2 py-1 rounded mt-2"
          />
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full border px-2 py-1 rounded mt-2"
          />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border px-2 py-1 rounded mt-2"
          />
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="bg-gray-400 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="font-semibold text-lg">
            {currentUser.firstName} {currentUser.lastName}
          </p>
          <p>ID: {currentUser.studentId}</p>
          <p>
            E-mail address:
            <span className="text-blue-400"> {currentUser.email}</span>
          </p>
          <p>Age: {currentUser.age}</p>
          <p>Phone: {currentUser.phone}</p>
          <p>
            Password:{" "}
            {showPassword
              ? currentUser.password
              : "*".repeat(currentUser.password.length)}
          </p>
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="mt-2 text-sm text-blue-600"
          >
            {showPassword ? "Hide Password" : "View Password"}
          </button>
          <button
            onClick={() => {
              setForm(currentUser);
              setEditing(true);
            }}
            className="ml-2 mt-2 bg-yellow-500 text-white px-3 py-1 rounded"
          >
            Edit
          </button>
        </>
      )}

      <div className="mt-3 flex gap-2">
        <button
          onClick={onSignOut}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Sign Out
        </button>
        <button
          onClick={() => onDelete(currentUser.studentId)}
          className="bg-red-600 text-white px-3 py-1 rounded"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
