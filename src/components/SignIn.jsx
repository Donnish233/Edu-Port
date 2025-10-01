```// SignIn.jsx
import { useState } from "react";

export default function SignIn({ students, onSignIn, goToSignUp }) {
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const id = identity.trim();
    const found = students.find(
      (s) =>
        s.email.toLowerCase() === id.toLowerCase() ||
        String(s.studentId).toLowerCase() === id.toLowerCase()
    );
    if (!found || found.password !== password) {
      alert("Invalid email/ID or password.");
      return;
    }
    onSignIn(found);
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          value={identity}
          onChange={(e) => setIdentity(e.target.value)}
          placeholder="Email or Student ID"
          className="p-2 border rounded w-full"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="p-2 border rounded w-full"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Sign In
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        Don’t have an account?{" "}
        <button onClick={goToSignUp} className="text-blue-600 underline">
          Sign Up
        </button>
      </p>
    </div>
  );
}
```