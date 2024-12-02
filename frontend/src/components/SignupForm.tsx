import React, { useState } from "react";

import { createUser } from "../service/users";

const SignupForm: React.FC = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleCreateUser = async () => {
    if (user.password !== user.confirmPassword) {
      alert("Senhas diferentes!");
      return;
    }
    await createUser({
      email: user.email,
      nome: user.username,
      senha: user.password,
    });
    alert("Usuario criado com sucesso!");
  };

  return (
    <form onSubmit={handleCreateUser} className="flex flex-col gap-4 min-w-96">
      <div className="flex flex-col gap-1">
        <label className="label">Nome de Usuário</label>
        <input
          type="text"
          placeholder=""
          className="input"
          required
          value={user.username}
          onChange={(e) =>
            setUser((currentUser) => ({
              ...currentUser,
              username: e.target.value,
            }))
          }
        />
      </div>

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

      <div className="flex flex-col gap-1">
        <label className="label">Confirme a senha</label>
        <input
          type="password"
          placeholder=""
          className="input"
          required
          value={user.confirmPassword}
          onChange={(e) =>
            setUser((currentUser) => ({
              ...currentUser,
              confirmPassword: e.target.value,
            }))
          }
        />
      </div>

      <button type="submit" className="button mt-4">
        Cadastre-se
      </button>
    </form>
  );
};

export default SignupForm;
