import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./LoginForm.css";

const LoginForm: React.FC = () => {
  return (
    <Form className="login-form">
      <Form.Group controlId="formBasicUsername">
        <Form.Label
          style={{
            color: "#d78794",
          }}
        >
          Nome de Usuário
        </Form.Label>
        <Form.Control
          type="text"
          placeholder=""
          style={{
            backgroundColor: "#e8c6c9", // Rosa claro
            border: "none",
            borderRadius: "8px",
            color: "#e8c6c9",
          }}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label
          style={{
            color: "#d78794",
          }}
        >
          Senha
        </Form.Label>
        <Form.Control
          type="password"
          placeholder=""
          style={{
            backgroundColor: "#e8c6c9", // Rosa claro
            border: "none",
            borderRadius: "8px",
            color: "#e8c6c9",
          }}
        />
      </Form.Group>

      <Form.Group controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          label="Mantenha-me conectado"
          style={{
            color: "#d78794",
          }}
        />
        <a href="#" className="forgot-password" style={{ color: "#d78794" }}>
          Esqueceu a senha?
        </a>
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        style={{
          border: "none",
          width: "100%",
          borderRadius: "8px",
          color: "#f8edeb",
        }}
      >
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
