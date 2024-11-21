import React from "react";

import "./LoginForm.css";

const LoginForm: React.FC = () => {
  return (
    <form className="flex flex-col gap-4 min-w-96">
      <div className="flex flex-col gap-1">
        <label className="label">Nome de Usuário</label>
        <input type="text" placeholder="" className="input" />
      </div>

      <div className="flex flex-col gap-1">
        <label className="label">Senha</label>
        <input type="password" placeholder="" className="input" />
      </div>

      <div className="flex self-end gap-4 items-center">
        <label className="label">Mantenha-me conectado</label>
        <input type="checkbox" />
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
