import "../css/Card.css";
import Input from "../components/Input";
import Button from "./Button";
import Show from "./Show";

const Card = () => {
  return (
    <div className="card">
      <Input></Input>
      <Button></Button>
      <Show></Show>
    </div>
  );
};

export default Card;