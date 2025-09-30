export default function SignIn({ students, onSignIn }) {
  function handleSubmit(e) {
    e.preventDefault();

    const identity = e.target.identity.value.trim().toLowerCase();
    const password = e.target.password.value;
    let validPassword;

    const foundStudent = students.find(
      (student) => {
        if (student.email.toLowerCase() === identity || student.studentId.toString().toLowerCase() === identity) {
          validPassword = student.password;
        } else {
          validPassword = null;
        }
        return student.email.toLowerCase() === identity || student.studentId.toString().toLowerCase() === identity;
      }
    );

    if (foundStudent && password === validPassword) {
      onSignIn(foundStudent);
    } else {
      alert("Invalid email/ID or password.");
    }
  }

  return (
    <div className="max-w-md w-full space-y-8 mx-auto p-6">
      <div>
        <h2 className="mt-6 text-3xl font-semibold text-gray-900 lg:text-left text-center">
          Login
        </h2>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <input
              id="identity"
              name="identity"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Email or Student ID"
            />
          </div>

          <div>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              {" "}
              {/* <!-- Heroicon name: solid/lock-closed --> */}{" "}
              <svg class="h-5 w-5 text-blue-500 group-hover:text-blue-400">
                {" "}
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                ></path>{" "}
              </svg>{" "}
            </span>
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}
