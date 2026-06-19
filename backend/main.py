from fastapi import FastAPI
from sqlmodel import Field, SQLModel, Session, create_engine

# 1. Configuração do Banco de Dados (Cria o arquivo confeitaria.db)
URL_BANCO = "sqlite:///confeitaria.db"
engine = create_engine(URL_BANCO)

# 2. O Molde da nossa tabela de Pedidos
class Pedido(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    cliente: str
    produto: str
    quantidade: int
    status: str = "Pendente"
    valor: float

# 3. Cria as tabelas de verdade dentro do arquivo do banco
SQLModel.metadata.create_all(engine)

# 4. Inicia o FastAPI
app = FastAPI()

# 5. A Rota para criar um pedido (Essa é a operação que estava faltando!)
@app.post("/pedidos")
def criar_pedido(pedido_recebido: Pedido):
    with Session(engine) as sessao:
        sessao.add(pedido_recebido)
        sessao.commit()
        sessao.refresh(pedido_recebido)
        return {"mensagem": "Pedido salvo com sucesso!", "pedido": pedido_recebido}
    
# 6. Rota para atualizar o status de um pedido existente
@app.put("/pedidos/{pedido_id}")
def atualizar_status(pedido_id: int, novo_status: str):
    with Session(engine) as sessao:
        # Procuramos o pedido pelo ID que foi enviado
        pedido_no_banco = sessao.get(Pedido, pedido_id)
        
        # Se não encontrar o pedido, avisa que deu erro
        if not pedido_no_banco:
            return {"erro": "Pedido não encontrado"}
            
        # Se encontrar, atualiza o status dele
        pedido_no_banco.status = novo_status
        sessao.add(pedido_no_banco)
        sessao.commit()
        sessao.refresh(pedido_no_banco)
        
        return {"mensagem": "Status atualizado!", "pedido": pedido_no_banco}
    
# 7. Rota para deletar um pedido do banco de dados
@app.delete("/pedidos/{pedido_id}")
def deletar_pedido(pedido_id: int):
    with Session(engine) as sessao:
        # Procuramos o pedido pelo ID
        pedido_no_banco = sessao.get(Pedido, pedido_id)
        
        if not pedido_no_banco:
            return {"erro": "Pedido não encontrado"}
            
        # Se encontrar, deletamos ele do banco
        sessao.delete(pedido_no_banco)
        sessao.commit()
        return {"mensagem": f"Pedido {pedido_id} deletado com sucesso!"}