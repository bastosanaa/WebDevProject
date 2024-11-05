import "./App.css";
import LoginForm from "./components/LoginForm";
import Card from "react-bootstrap/Card";

function App() {
  return (
    <Card
      style={{
        width: "100%",
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <Card.Body>
        <Card.Title className="mb-4">Login</Card.Title>
        <LoginForm />
      </Card.Body>
    </Card>
  );
}
export default App;
