import { useState } from "react";

export default function SignIn({ students, onSignIn, goToSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const found = students.find(
      (s) => (s.email ?? "").toLowerCase() === email.trim().toLowerCase()
    );

    if (!found) {
      setError("No account found for that email.");
      return;
    }

    if (found.password !== password) {
      setError("Incorrect password.");
      return;
    }

    setError("");
    onSignIn(found);
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          Sign In
        </button>
      </form>

      <p className="mt-3 text-sm text-center">
        Don’t have an account?{" "}
        <button onClick={goToSignUp} className="text-blue-600 underline">
          Sign up
        </button>
      </p>
    </div>
  );
}
