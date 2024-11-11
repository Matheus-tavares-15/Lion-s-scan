from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import subprocess
import nmap3
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todas as origens. Para maior segurança, especifique a URL exata do seu frontend, por exemplo: ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos HTTP (GET, POST, etc.)
    allow_headers=["*"],  # Permite todos os cabeçalhos
)


@app.get("/")
async def get():
    comandos = []
    with open("DB_commands.txt", "r") as arquivo:
        for linha in arquivo:
            comandos.append(f"{linha.strip()}")  # Adiciona 'Comandos:' no início de cada linha
    
    return {'comandos': comandos}

@app.get("/scan")
async def get_scan(command_option: str, target: str = "", preset_command: str = ""):
    try:
        # Tentando acessar os parâmetros passados pela URL
        if not command_option or not target:
            raise HTTPException(status_code=400, detail="Campos obrigatórios ausentes: command_option ou target")
        
        # Inicializando o scanner Nmap
        nm = nmap3.Nmap()

        # Lógica para executar o comando com base na opção escolhida
        try:
            if command_option == 'presetCommandOption':

                nmap_command = f"{preset_command} {target}"

                # Executando o comando Nmap via subprocess
                scan_output = subprocess.check_output(nmap_command, shell=True, stderr=subprocess.PIPE)
                scan_output = scan_output.decode('utf-8')

            else:
                raise HTTPException(status_code=400, detail="Opção de comando inválida")
            
            # Retorna a saída do scan
    
            return {'scan_output': scan_output}

        except subprocess.CalledProcessError as e:
            raise HTTPException(status_code=500, detail=f"Erro ao executar o comando Nmap: {e.stderr.decode()}")
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    except Exception as e:
        print(f"Erro ao processar a requisição: {str(e)}")  # Log adicional de erro
        raise HTTPException(status_code=400, detail=f"Erro ao processar a requisição: {str(e)}")
    

if __name__ == '__main__':
    uvicorn.run(app, host="localhost", port=3333)
