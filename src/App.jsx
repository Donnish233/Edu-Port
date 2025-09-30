import { useState } from "react";
import "./App.css";
import Logo from "./components/header";
import SignIn from "./components/sign-in-form";
import StudentList from "./components/stud-list";

const cohort = "XIII";

const studList = [
  {
    studentId: cohort + 250701,
    firstName: "Emily",
    lastName: "Johnson",
    age: 28,
    email: "emily.johnson@x.dummyjson.com",
    phone: "+81 965-431-3024",
    password: "emilyspass",
  },
  {
    studentId: cohort + 250702,
    firstName: "Michael",
    lastName: "Williams",
    age: 35,
    email: "michael.williams@x.dummyjson.com",
    phone: "+49 258-627-6644",
    password: "michaelwpass",
  },
  {
    studentId: cohort + 250703,
    firstName: "Sophia",
    lastName: "Brown",
    age: 42,
    email: "sophia.brown@x.dummyjson.com",
    phone: "+81 210-652-2785",
    password: "sophiabpass",
  },
  {
    studentId: cohort + 250704,
    firstName: "James",
    lastName: "Davis",
    age: 45,
    email: "james.davis@x.dummyjson.com",
    phone: "+49 614-958-9364",
    password: "jamesdpass",
  },
  {
    studentId: cohort + 250705,
    firstName: "Michael",
    lastName: "Okoronkwo",
    age: 18,
    email: "okoronkwomikec@gmail.com",
    phone: "+234 704-370-5162",
    password: "1234",
  },
  {
    studentId: cohort + 250706,
    firstName: "Olivia",
    lastName: "Wilson",
    age: 22,
    email: "olivia.wilson@x.dummyjson.com",
    phone: "+91 607-295-6448",
    password: "oliviawpass",
  },
  {
    studentId: cohort + 250707,
    firstName: "Alexander",
    lastName: "Jones",
    age: 38,
    email: "alexander.jones@x.dummyjson.com",
    phone: "+61 260-824-4986",
    password: "alexanderjpass",
  },
  {
    studentId: cohort + 250708,
    firstName: "Ava",
    lastName: "Taylor",
    age: 27,
    email: "ava.taylor@x.dummyjson.com",
    phone: "+1 458-853-7877",
    password: "avatpass",
  },
  {
    studentId: cohort + 250709,
    firstName: "Ethan",
    lastName: "Martinez",
    age: 33,
    email: "ethan.martinez@x.dummyjson.com",
    phone: "+92 933-608-5081",
    password: "ethanmpass",
  },
  {
    studentId: cohort + 250710,
    firstName: "Isabella",
    lastName: "Anderson",
    age: 31,
    email: "isabella.anderson@x.dummyjson.com",
    phone: "+49 770-658-4885",
    password: "isabelladpass",
  },
  {
    studentId: cohort + 250711,
    firstName: "Emma",
    lastName: "Miller",
    age: 30,
    email: "emma.miller@x.dummyjson.com",
    phone: "+91 759-776-1614",
    password: "emmajpass",
  },
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  function handleSignIn(user) {
    setCurrentUser(user);
    setIsLoggedIn(true);
  }

  function handleSignOut() {
    setCurrentUser(null);
    setIsLoggedIn(false);
  }

  return (
    <>
      <Logo />
      <div>
        {isLoggedIn ? (
          <StudentList
            students={studList}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            onSignOut={handleSignOut}
          />
        ) : (
          <SignIn students={studList} onSignIn={handleSignIn} />
        )}
      </div>
    </>
  );
}

export default App;
