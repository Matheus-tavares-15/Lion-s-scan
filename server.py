from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import subprocess
import nmap3
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)


@app.get("/")
async def get():
    comandos = []
    with open("DB_commands.txt", "r") as arquivo:
        for linha in arquivo:
            comandos.append(f"{linha.strip()}")  
    
    return {'comandos': comandos}

@app.get("/scan")
async def get_scan(command_option: str, target: str = "", preset_command: str = ""):
    try:
       
        if not command_option or not target:
            raise HTTPException(status_code=400, detail="Campos obrigatórios ausentes: command_option ou target")
        
        
        nm = nmap3.Nmap()

        
        try:
            if command_option == 'presetCommandOption':

                nmap_command = f"{preset_command} {target}"

                
                scan_output = subprocess.check_output(nmap_command, shell=True, stderr=subprocess.PIPE)
                scan_output = scan_output.decode('utf-8')

            else:
                raise HTTPException(status_code=400, detail="Opção de comando inválida")
            
            
    
            return {'scan_output': scan_output}

        except subprocess.CalledProcessError as e:
            raise HTTPException(status_code=500, detail=f"Erro ao executar o comando Nmap: {e.stderr.decode()}")
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    except Exception as e:
        print(f"Erro ao processar a requisição: {str(e)}")  
        raise HTTPException(status_code=400, detail=f"Erro ao processar a requisição: {str(e)}")
    

if __name__ == '__main__':
    uvicorn.run(app, host="localhost", port=3333)
