import React, { useEffect, useState } from "react";
import axios from "axios";

const Comandos = () => {
  const [comandos, setComandos] = useState([]);

  useEffect(() => {
    // Realiza a requisição GET para a API FastAPI
    axios
      .get("http://localhost:3333/")
      .then((response) => {
        setComandos(response.data.comandos); // Armazena os comandos recebidos na state
      })
      .catch((error) => {
        console.error("Erro ao buscar os comandos:", error);
      });
  }, []);

  return (
    <>
      {comandos.map((comando, index) => (
        <option value={comando} key={index}>
          {comando}
        </option>
      ))}
    </>
  );
};

export default Comandos;
