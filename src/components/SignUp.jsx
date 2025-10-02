import { useState } from "react";

export default function SignUp({ onSignUp, goToSignIn }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    phone: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // basic validation
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError("Please fill first name, last name, email and password.");
      return;
    }

    // send plain form to parent — App will generate ID
    onSignUp({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      age: form.age ? Number(form.age) : "",
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim(),
      password: form.password,
    });

    // clear form (optional)
    setForm({
      firstName: "",
      lastName: "",
      age: "",
      email: "",
      phone: "",
      password: "",
    });
    setError("");
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex gap-2">
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First name"
            className="w-1/2 border px-3 py-2 rounded"
            required
          />
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last name"
            className="w-1/2 border px-3 py-2 rounded"
            required
          />
        </div>

        <input
          name="age"
          value={form.age}
          onChange={handleChange}
          type="number"
          min="0"
          placeholder="Age (optional)"
          className="w-full border px-3 py-2 rounded"
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          type="tel"
          placeholder="Phone"
          className="w-full border px-3 py-2 rounded"
        />

        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded"
          required
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Create Account
        </button>
      </form>

      <p className="mt-3 text-sm text-center">
        Already have an account?{" "}
        <button onClick={goToSignIn} className="text-blue-600 underline">
          Sign in
        </button>
      </p>
    </div>
  );
}
