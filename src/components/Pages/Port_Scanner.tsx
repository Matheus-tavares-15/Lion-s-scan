import "../CSS/PortScanner.css";
import Comandos from "../modulos/comands";
import React, { useEffect, useState } from "react";

function PortScanner() {
  const [InputIp, setInputIp] = useState("");
  const [comandoSelecionado, setComandoSelecionado] = useState("");
  const [resultado, setResultado] = useState("");
  const [isIpValido, setIsIpValido] = useState(true); // Para verificar a validade do IP

  function downloadScanResults() {
    // Cria um Blob com os resultados do escaneamento
    const blob = new Blob([resultado], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    // Cria um link temporário para baixar o arquivo
    const link = document.createElement("a");
    link.href = url;
    link.download = "resultado_escaneamento.txt";

    // Simula o clique no link para iniciar o download
    link.click();

    // Libera o URL temporário
    URL.revokeObjectURL(url);
  }

  function Refresh() {
    window.location.reload();
  }

  // Função de validação de IP com regex
  function ValidaIp(event) {
    const ip = event.target.value;
    const regex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    // Verifica se o IP corresponde ao padrão
    if (regex.test(ip)) {
      setIsIpValido(true);
    } else {
      setIsIpValido(false);
    }

    setInputIp(ip);
  }

  function handleComandoChange(event) {
    setComandoSelecionado(event.target.value);
  }

  function handleScanClick() {
    if (!InputIp || !comandoSelecionado) {
      alert("Por favor, insira o IP e selecione um comando.");
      return;
    }

    // Monta a URL com os parâmetros da requisição GET
    const url = `http://localhost:3333/scan?command_option=presetCommandOption&target=${InputIp}&preset_command=${comandoSelecionado}`;

    // Requisição GET para a API
    setResultado("# Aguardando resultado...");
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setResultado(data.scan_output);
      })
      .catch((error) => {
        console.error("Erro ao realizar a requisição:", error);
      });
  }

  return (
    <div className="container mx-auto p-8 min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-2xl cont">
        <img className="logo" src="src/components/IMG/logo.png" alt="" />

        <div className="menu">
          <ul className="flex justify-around mb-8 text-lg">
            <li className="flex items-center space-x-2 cursor-pointer text-gray-700 hover:text-blue-600 transition-all">
              <button
                type="button"
                onClick={downloadScanResults}
                className="flex items-center justify-center bg-blue-700 text-white px-5 py-3 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-black transition-all w-full"
              >
                <i className="bx bx-down-arrow-alt text-2xl"></i>Baixar Scan
              </button>
            </li>
            <li className="flex items-center space-x-2 cursor-pointer text-gray-700 hover:text-blue-600 transition-all">
              <button
                type="button"
                onClick={Refresh}
                className="flex items-center justify-center bg-blue-700 text-white px-5 py-3 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-black transition-all w-full"
              >
                <i className="bx bx-refresh text-2xl"></i>Refresh
              </button>
            </li>
          </ul>

          <div className="form-group mb-8">
            <form action="#" method="post">
              <label className="block text-gray-700 font-semibold mb-2">
                Coloque o IP da máquina:
              </label>
              <input
                type="text"
                className={`form-control w-full px-4 py-3 border ${
                  isIpValido ? "border-gray-300" : "border-red-500"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all mb-4`}
                name="IP"
                id="id-disp"
                placeholder="Exemplo: 127.0.0.1"
                onChange={ValidaIp}
              />
              {!isIpValido && (
                <p className="text-red-500 text-sm">
                  Por favor, insira um IP válido.
                </p>
              )}

              <label className="block text-gray-700 font-semibold mb-2">
                Escolha um comando abaixo:
              </label>
              <select
                name="comando"
                id="comandos-select"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all mb-4"
                onChange={handleComandoChange}
              >
                <option value="">Selecione um comando:</option>
                <Comandos></Comandos>
              </select>

              <div className="flex space-x-4 mt-6">
                <button
                  type="button"
                  onClick={handleScanClick}
                  className="flex items-center justify-center bg-green-500 text-white px-5 py-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all w-full"
                >
                  <i className="bx bx-search-alt-2 mr-2"></i> Scan
                </button>
              </div>
            </form>
          </div>

          <div className="result">
            <h4 className="text-xl font-bold text-gray-800 mb-4">Resultado:</h4>
            <label className="block text-gray-700 font-semibold mb-2">
              Serviços e Portas
            </label>
            <textarea
              className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 transition-all"
              readOnly
              value={resultado || ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PortScanner;
