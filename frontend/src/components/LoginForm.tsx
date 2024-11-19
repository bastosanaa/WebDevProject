import React from "react";

import "./LoginForm.css";

const LoginForm: React.FC = () => {
  return (
    <form className="login-form">
      <div>
        <label
          style={{
            color: "#d78794",
          }}
        >
          Nome de Usuário
        </label>
        <input
          type="text"
          placeholder=""
          style={{
            backgroundColor: "#e8c6c9", // Rosa claro
            border: "none",
            borderRadius: "8px",
            color: "#e8c6c9",
          }}
        />
      </div>

      <div>
        <label
          style={{
            color: "#d78794",
          }}
        >
          Senha
        </label>
        <input
          type="password"
          placeholder=""
          style={{
            backgroundColor: "#e8c6c9", // Rosa claro
            border: "none",
            borderRadius: "8px",
            color: "#e8c6c9",
          }}
        />
      </div>

      <div>
        <label>Mantenha-me conectado</label>
        <input
          type="checkbox"
          style={{
            color: "#d78794",
          }}
        />
        <a href="#" className="forgot-password" style={{ color: "#d78794" }}>
          Esqueceu a senha?
        </a>
      </div>

      <button
        type="submit"
        style={{
          border: "none",
          width: "100%",
          borderRadius: "8px",
          color: "#f8edeb",
        }}
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
