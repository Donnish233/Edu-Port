import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/header";
import SignIn from "./components/SignIn";
import StudentList from "./components/StudentList";
import SignUp from "./components/SignUp";

function App() {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("students");
    return saved ? JSON.parse(saved) : [];
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isSigningUp, setIsSigningUp] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  function handleSignUp(formData) {
    const lastId =
      students
        .map((s) => parseInt(s.studentId.slice(4), 10)) // slice after "VIII"
        .sort((a, b) => b - a)[0] || 0;

    const nextId = (lastId + 1).toString().padStart(4, "0"); // 0001, 0002...
    const studentId = `VIII${nextId}`;

    const newStudent = { ...formData, studentId };
    setStudents((p) => [newStudent, ...p]);
    setCurrentUser(newStudent);
    setIsLoggedIn(true);
    setIsSigningUp(false);
  }


  function handleSignIn(user) {
    setCurrentUser(user);
    setIsLoggedIn(true);
  }

  function handleSignOut() {
    setCurrentUser(null);
    setIsLoggedIn(false);
  }

  function handleUpdateStudent(updated) {
    setStudents((prev) =>
      prev.map((s) => (s.studentId === updated.studentId ? updated : s))
    );
    setCurrentUser(updated);
  }

  function handleDeleteStudent(id) {
    setStudents((prev) => prev.filter((s) => s.studentId !== id));
    if (currentUser?.studentId === id) {
      setCurrentUser(null);
      setIsLoggedIn(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isSignedIn={isLoggedIn} search={search} setSearch={setSearch} />
      <div className="container mx-auto px-4 py-6">
        {isLoggedIn ? (
          <StudentList
            students={students}
            currentUser={currentUser}
            onSignOut={handleSignOut}
            onUpdateStudent={handleUpdateStudent}
            onDeleteStudent={handleDeleteStudent}
            search={search}
          />
        ) : isSigningUp ? (
          <SignUp
            onSignUp={handleSignUp}
            goToSignIn={() => setIsSigningUp(false)}
          />
        ) : (
          <SignIn
            students={students}
            onSignIn={handleSignIn}
            goToSignUp={() => setIsSigningUp(true)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
