import React, { useState } from "react";

import "./LoginForm.css";
import { loginUser } from "../service/users";

const LoginForm: React.FC = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    const res = await loginUser({ email: user.email, senha: user.password });
    alert("usuario logado!");
    console.log("res", res);
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 min-w-96">
      <div className="flex flex-col gap-1">
        <label className="label">Email</label>
        <input
          type="email"
          placeholder=""
          className="input"
          required
          value={user.email}
          onChange={(e) =>
            setUser((currentUser) => ({
              ...currentUser,
              email: e.target.value,
            }))
          }
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="label">Senha</label>
        <input
          type="password"
          placeholder=""
          className="input"
          required
          value={user.password}
          onChange={(e) =>
            setUser((currentUser) => ({
              ...currentUser,
              password: e.target.value,
            }))
          }
        />
      </div>

      <a href="#" className="forgot-password" style={{ color: "#d78794" }}>
        Esqueceu a senha?
      </a>

      <button type="submit" className="button">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
