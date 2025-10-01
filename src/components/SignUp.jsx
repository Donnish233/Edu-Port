```// SignUp.jsx
import { useState } from "react";

export default function SignUp({ onSignUp, goToSignIn, cohort }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // minimal validation
    if (
      !form.firstName ||
      !form.lastName ||
      !form.dateOfBirth ||
      !form.email ||
      !form.password
    ) {
      alert("Please fill required fields.");
      return;
    }
    // App will build studentId; pass the form
    onSignUp(form);
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First name"
            className="p-2 border rounded"
          />
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last name"
            className="p-2 border rounded"
          />
        </div>
        <input
          name="dateOfBirth"
          value={form.dateOfBirth}
          onChange={handleChange}
          type="date"
          className="p-2 border rounded w-full"
          required
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          placeholder="Email"
          className="p-2 border rounded w-full"
          required
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          type="tel"
          placeholder="Phone"
          className="p-2 border rounded w-full"
        />
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          type="password"
          placeholder="Password"
          className="p-2 border rounded w-full"
          required
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 rounded"
          >
            Create Account
          </button>
          <button
            type="button"
            onClick={goToSignIn}
            className="flex-1 bg-gray-200 text-gray-700 py-2 rounded"
          >
            Back to Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
```