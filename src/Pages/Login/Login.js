import { useState } from "react";
import { useAuthContext } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

function Login() {
  const { login, message } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch {}
  }

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      {message && <p>{message}</p>}

      <form className={styles.loginForm} onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      <p>
        New user? <Link to="/signup">Create account</Link>
      </p>
    </div>
  );
}

export default Login;
