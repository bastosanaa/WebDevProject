import "./App.css";
import "./styles/custom.scss";
import LoginForm from "./components/LoginForm"; // O formulário permanece igual
import Card from "react-bootstrap/Card";
import logo from "./assets/logo.png"; // A logo já está configurada

function App() {
  return (
    <Card
      style={{
        width: "100%",
        maxWidth: "600px",
        padding: "60px",
        backgroundColor: "rgba(255, 245, 245, 0.9)", // Fundo rosado
        borderRadius: "16px", // Bordas arredondadas
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Sombra suave
      }}
    >
      <Card.Body className="card-body">
        <img src={logo} alt="Bloom Logo" className="logo" />
        <p className="signup-text">
          Não possui conta? <a href="#">Cadastre-se</a>
        </p>
        <LoginForm />
      </Card.Body>
    </Card>
  );
}

export default App;
