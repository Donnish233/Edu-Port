import { useState } from "react";
import Header from "./components/header";
import CurrentUserCard from "./components/CurrentUserCard";
import StudentList from "./components/StudentList";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

let idCounter = 1;
function generateStudentId() {
  return `VIII${String(idCounter++).padStart(4, "0")}`;
}

export default function App() {
  const [students, setStudents] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [search, setSearch] = useState("");

  function addStudent(student) {
    const newStudent = { ...student, studentId: generateStudentId() };
    setStudents((prev) => [...prev, newStudent]);
    setCurrentUser(newStudent);
    setIsSigningUp(false);
  }

  function updateStudent(updated) {
    setStudents((prev) =>
      prev.map((s) => (s.studentId === updated.studentId ? updated : s))
    );
    setCurrentUser(updated);
  }

  function deleteStudent(studentId) {
    setStudents((prev) => prev.filter((s) => s.studentId !== studentId));
    if (currentUser?.studentId === studentId) setCurrentUser(null);
  }

  return (
    <div className="min-h-screen bg-gray-100 w-screen">
      <Header
        isSignedIn={!!currentUser}
        search={search}
        setSearch={setSearch}
      />
      <main className="max-w-6xl mx-auto px-4 py-6">
        {currentUser ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sticky current user card */}
            <div className="lg:col-span-1">
              <div className="sticky top-60">
                <CurrentUserCard
                  currentUser={currentUser}
                  onSignOut={() => setCurrentUser(null)}
                  onUpdateStudent={updateStudent}
                  onDeleteStudent={deleteStudent}
                />
              </div>
            </div>

            {/* Scrollable list */}
            <div>
              <StudentList
                students={students}
                currentUser={currentUser}
                onUpdateStudent={updateStudent}
                onDeleteStudent={deleteStudent}
                onSignOut={() => setCurrentUser(null)}
                search={search}
              />
            </div>
          </div>
        ) : isSigningUp ? (
          <SignUp
            onSignUp={addStudent}
            goToSignIn={() => setIsSigningUp(false)}
          />
        ) : (
          <SignIn
            students={students}
            onSignIn={setCurrentUser}
            goToSignUp={() => setIsSigningUp(true)}
          />
        )}
      </main>
    </div>
  );
}
