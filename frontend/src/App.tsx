import "./App.css";
import LoginForm from "./components/LoginForm"; // O formulário permanece igual
import logo from "./assets/logo.png"; // A logo já está configurada

function App() {
  return (
    <div className="w-full max-w-lg p-12 rounded-2xl shadow bg-neutral-200 opacity-70">
      <div className="flex flex-col gap-5">
        <img src={logo} alt="Bloom Logo" className="logo" />
        <p className="signup-text">
          Não possui conta? <a href="#">Cadastre-se</a>
        </p>
        <LoginForm />
      </div>
    </div>
  );
}

export default App;
