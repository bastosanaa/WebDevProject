import "./LoginPage.css";
import LoginForm from "../LoginForm";
import SignupForm from "../SignupForm";
import logo from "../../assets/logo.png"; // A logo já está configurada
import { useState } from "react";

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  return (
    <div className="w-full max-w-lg p-12 rounded-2xl shadow bg-neutral-200 opacity-70">
      <div className="flex flex-col gap-5 items-center">
        <img src={logo} alt="Bloom Logo" className="logo" />
        {isSignUp ? (
          <>
            <button
              className="flex gap-2 self-start text-rosa-escuro text-sm font-semibold"
              onClick={() => setIsSignUp(false)}
            >
              <span>{"<"}</span>
              <span>Voltar para login</span>
            </button>
            <SignupForm />
          </>
        ) : (
          <>
            <p className="text-rosa-escuro text-sm">
              Não possui conta?{" "}
              <button
                className="font-semibold"
                onClick={() => setIsSignUp(true)}
              >
                Cadastre-se
              </button>
            </p>
            <LoginForm />
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
