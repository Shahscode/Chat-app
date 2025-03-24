import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext.jsx";

export default function RegisterAndLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginOrRegister, setIsLoginOrRegister] = useState("login");
  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);

  async function handleSubmit(ev) {
    ev.preventDefault();
    const url = isLoginOrRegister === "register" ? "register" : "login";
    const { data } = await axios.post(url, { username, password });
    setLoggedInUsername(username);
    setId(data.id);
  }

  return (
    <div className="bg-blue-50 h-screen flex flex-col items-center justify-center">
      {isLoginOrRegister === "login" && (
        <h1 className="text-4xl font-bold text-blue-600 mb-6">
          Welcome to <span className="text-blue-800">Chit-Chat</span>
        </h1>
      )}
      <form className="w-64 bg-white p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
          type="text"
          placeholder="Username"
          className="block w-full rounded-sm p-2 mb-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          type="password"
          placeholder="Password"
          className="block w-full rounded-sm p-2 mb-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-blue-500 text-white block w-full rounded-sm p-2 font-semibold hover:bg-blue-600 transition duration-200">
          {isLoginOrRegister === "register" ? "Register" : "Login"}
        </button>
        <div className="text-center mt-2 text-gray-600">
          {isLoginOrRegister === "register" ? (
            <div>
              Already a member?
              <button className="ml-1 text-blue-600 underline" onClick={() => setIsLoginOrRegister("login")}>
                Login here
              </button>
            </div>
          ) : (
            <div>
              Don't have an account?
              <button className="ml-1 text-blue-600 underline" onClick={() => setIsLoginOrRegister("register")}>
                Register
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
