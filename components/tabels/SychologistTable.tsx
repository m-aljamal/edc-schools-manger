import React, { useContext } from "react";
import { useAuth } from "../../context/AuthContext";

export default function SychologistTable() {
  console.log("syc log");
  // @ts-ignore
  const { currentUsercontext, setCurrent } = useAuth();
  console.log(currentUsercontext);
  const handle = () => {
    setCurrent("mohddda");
  };
  return (
    <div>
      <button onClick={handle}>Set curr</button>
    </div>
  );
}
