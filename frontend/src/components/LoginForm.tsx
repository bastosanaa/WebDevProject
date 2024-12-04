import React, { FormEvent, useState } from "react";

import "./LoginForm.css";
import { loginUser } from "../service/users";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email: user.email, senha: user.password });
      if (res.auth) {
        login(res.token);
        navigate("/");
        toast.success("Logado com sucesso!");
      }
    } catch (err) {
      const error = err as { msg: string };
      setError(error.msg);
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 min-w-96">
      {error && <p className="text-red-700 text-sm">{error}</p>}
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

      <button type="submit" className="button mt-8">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
