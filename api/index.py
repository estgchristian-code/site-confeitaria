from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from sqlmodel import Field, SQLModel, Session, create_engine
import os

# Pega a URL direto da variável de ambiente da Vercel
DATABASE_URL = os.getenv("DATABASE_URL")

# Garante que o SQLAlchemy/SQLModel vai usar o driver do pymysql corretamente
if DATABASE_URL and DATABASE_URL.startswith("mysql://"):
    URL_BANCO = DATABASE_URL.replace("mysql://", "mysql+pymysql://", 1)
else:
    URL_BANCO = DATABASE_URL

# 2. Pega o certificado SSL dinamicamente de dentro da pasta 'api'
caminho_atual = os.path.dirname(os.path.abspath(__file__))
pem_path = os.path.join(caminho_atual, "isrgrootx1.pem")

if URL_BANCO:
    engine = create_engine(
        URL_BANCO,
        connect_args={"ssl": {"ca": pem_path}},
    )
else:
    engine = None
    print("Aviso: DATABASE_URL nao configurada no ambiente da Vercel")

# 3. O Molde da nossa tabela de Pedidos
class Pedido(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    cliente: str
    produto: str
    quantidade: int
    status: str = "Pendente"
    valor: float

# 4. Cria as tabelas no TiDB Cloud
if engine is not None:
    try:
        SQLModel.metadata.create_all(engine)
    except Exception as e:
        print(f"Aviso ao criar tabelas: {e}")

# 5. Inicia o FastAPI
app = FastAPI()

# 6. A Rota para criar um pedido (com o prefixo /api/)
@app.post("/api/pedidos")
def criar_pedido(pedido_recebido: Pedido):
    with Session(engine) as sessao:
        sessao.add(pedido_recebido)
        sessao.commit()
        sessao.refresh(pedido_recebido)
        return {"mensagem": "Pedido salvo com sucesso na nuvem!", "pedido": pedido_recebido}
    
# 7. Rota para atualizar o status de um pedido existente
@app.put("/api/pedidos/{pedido_id}")
def atualizar_status(pedido_id: int, novo_status: str):
    with Session(engine) as sessao:
        pedido_no_banco = sessao.get(Pedido, pedido_id)
        if not pedido_no_banco:
            raise HTTPException(status_code=404, detail="Pedido não encontrado")
            
        pedido_no_banco.status = novo_status
        sessao.add(pedido_no_banco)
        sessao.commit()
        sessao.refresh(pedido_no_banco)
        return {"mensagem": "Status atualizado!", "pedido": pedido_no_banco}
    
# 8. Rota para deletar um pedido
@app.delete("/api/pedidos/{pedido_id}")
def deletar_pedido(pedido_id: int):
    with Session(engine) as sessao:
        pedido_no_banco = sessao.get(Pedido, pedido_id)
        if not pedido_no_banco:
            raise HTTPException(status_code=404, detail="Pedido não encontrado")
            
        sessao.delete(pedido_no_banco)
        sessao.commit()
        return {"mensagem": f"Pedido {pedido_id} deletado com sucesso!"}
    
@app.get("/api/")
def home():
    return {"mensagem": "API da Confeitaria rodando conectada ao TiDB Cloud!"}