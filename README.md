

<div align="center">

![logo](https://github.com/user-attachments/assets/6fa6e59a-3da7-43d8-99f8-e1f0f3c66547)

</div>

**Lion's Scanner** é uma ferramenta de varredura de portas desenvolvida com React que permite aos usuários escanear portas e serviços em dispositivos remotos. A interface permite a inserção de um IP, seleção de comandos de escaneamento e exibição dos resultados diretamente na página, além de funcionalidades para baixar os resultados e atualizar a página.

## Características

- Interface amigável para escolher diferentes comandos de varredura.
- Exibição dos resultados do escaneamento de portas e serviços.
- Opção para baixar os resultados do escaneamento em um arquivo `.txt`.
- Design responsivo e interativo com Tailwind CSS.


## Capturas de Tela

![image](https://github.com/user-attachments/assets/9d04257d-d876-4388-9f9c-1a22c1458fac)


## Pré-requisitos

Antes de começar, certifique-se de ter os seguintes programas instalados em sua máquina:

- Node.js v12 ou superior
- NPM ou Yarn
- Para o servidor: Python 3.x
- Nmap (https://nmap.org/download.html) 

## Branches

O projeto está dividido em duas branches para facilitar a manutenção e o desenvolvimento:

1. **Programa**: Esta branch contém o código do **programa** (frontend em React).
2. **Server**: Esta branch contém o código do **servidor** backend, responsável por realizar o escaneamento de portas e retornar os dados para o frontend.

### Como alternar entre as branches:

- Para clonar e trabalhar com o frontend (branch `Programa`):
```
  git clone -b Programa https://github.com/SeuUsuario/LionsScanner.git
```
- Para clonar e trabalhar com o backend (branch `server`):
```
  git clone -b server https://github.com/SeuUsuario/LionsScanner.git
```
## Instalação

### Frontend (branch `Programa`):

1. Clone a branch `Programa`:
```
  git clone -b Programa https://github.com/SeuUsuario/LionsScanner.git
```
2. Acesse o diretório do projeto:
```
  cd LionsScanner
```
3. Instale as dependências:
```
  npm install
```
  ou, se estiver usando Yarn:
```
  yarn
```
4. Inicie o servidor de desenvolvimento:
```
  npm run dev
```
  ou com Yarn:
```
  yarn dev
```
5. O aplicativo estará disponível no endereço:
```
  http://localhost:5173/
```
### Backend (branch `server`):

1. Clone a branch `server`:
```
  git clone -b server https://github.com/SeuUsuario/LionsScanner.git
```
2. Acesse o diretório do servidor:
```
  cd LionsScanner/server
```
3.  Crie e inicie um ambiente virtual

```
python -m venv venv

venv\Scripts\activate
```

4. Instale as dependências do Python:
```
  pip install -r requirements.txt
```
5. Execute o servidor backend:
```
  python server.py
```
6. O servidor estará escutando em:
```
  http://localhost:3333
```
## Como Usar

1. Abra a interface no navegador.
2. Insira o endereço IP do dispositivo alvo no campo de IP.
3. Selecione um comando de escaneamento disponível no dropdown.
4. Clique no botão "Scan" para iniciar a varredura.
5. O resultado da varredura será exibido na seção de **Resultado**.
6. Você pode baixar os resultados clicando no botão "Baixar Scan".
7. Para realizar um novo escaneamento, clique no botão "Refresh".


## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção da interface de usuário.
- **Tailwind CSS**: Framework CSS para estilização rápida e responsiva.
- **Vite**: Ferramenta de build para um desenvolvimento mais rápido em projetos com React.
- **JavaScript (ES6+)**: Linguagem de programação.
- **HTML5** e **CSS3**: Estrutura e estilos.
