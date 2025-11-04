import sqlite3
from datetime import datetime, timedelta

# conectar a um banco de dados
conn = sqlite3.connect(':memory:')
cursor = conn.cursor()

# criar tabelas de exemplo
def setup_database():
    cursor.execute("""
        CREATE TABLE Contas(
            id_conta INTEGER PRIMARY KEY,
            id_cliente INTEGER,
            saldo REAL            
       )
    """)
    cursor.execute("""
        CREATE TABLE Transacoes(
            id_transacao INTEGER PRIMARY KEY,
            id_conta INTEGER,
            tipo TEXT,
            valor REAL,
            data_transacao TEXT            
       )
    """)

#inserir dados para exemplo
def insert_sample_data():
    cursor.execute("INSERT INTO Contas (id_conta, id_cliente, saldo)VALUES(?,?,?)",(1, 101, 5000.00))
    cursor.execute("INSERT INTO Contas (id_conta, id_cliente, saldo)VALUES(?,?,?)",(2, 102, 1200.50))

    transacoes_data = [
        (1, 'deposito', 150.50, (datetime.now() - timedelta(days=2)).isoformat()),
        (1, 'deposito', 50.20, (datetime.now() - timedelta(days=5)).isoformat()),
        (1, 'pix', -300.00, (datetime.now() - timedelta(days=7)).isoformat()),
        (1, 'deposito', 100.00, (datetime.now() - timedelta(days=10)).isoformat()),
        (1, 'compra', -3160.90, (datetime.now() - timedelta(days=12)).isoformat()),
        (1, 'saque', -200.00, (datetime.now() - timedelta(days=15)).isoformat()),
        (1, 'deposito', 5999.99, (datetime.now() - timedelta(days=18)).isoformat()),
        (1, 'pix', 8500.50, (datetime.now() - timedelta(days=20)).isoformat()),
        (1, 'saque', -89.00, (datetime.now() - timedelta(days=25)).isoformat()),
        (1, 'saque', -51.29, (datetime.now() - timedelta(days=28)).isoformat()),
        (1, 'saque', -200.00, (datetime.now() - timedelta(days=25)).isoformat()),
        (1, 'deposito', 1000.00, (datetime.now() - timedelta(days=1)).isoformat()),
        (1, 'compra', -50.25, (datetime.now() - timedelta(days=3)).isoformat()),
        (1, 'pix', -200.00, (datetime.now() - timedelta(days=7)).isoformat()),
        (1, 'saque', 100.00, (datetime.now() - timedelta(days=12)).isoformat()),
    ]

    cursor.executemany("INSERT INTO Transacoes (id_conta, tipo, valor, data_transacao) VALUES(?,?,?,?)", transacoes_data)
    conn.commit()
    print("Dados de exemplo inseridos com sucesso!")

#simule a stored procedure para calcular o saldo e listar transações
def sp_extrato_conta(id_conta, periodo_dias):
    """
    Simula uma stored procedure para calcular o saldo e listar transações
    """
    print(f"\n---Extrato da Conta {id_conta}---")


    #calculo do saldo
    cursor.execute("SELECT saldo FROM Contas WHERE id_conta = ?", (id_conta,))
    saldo_atual = cursor.fetchone()[0]
    print(f"Saldo atual: R$ {saldo_atual:,.2f}")

    #lista as últimas 10 transações no perído
    data_limite = datetime.now() - timedelta(days=periodo_dias)
    data_limite_str = data_limite.isoformat()

    print(f"\n Últimas 10 transações (últimos {periodo_dias} dias):")

    cursor.execute("""
        SELECT id_transacao, tipo, valor, data_transacao
        FROM Transacoes
        WHERE id_conta = ? AND data_transacao >= ?
        ORDER BY data_transacao DESC
        LIMIT 10
    """, (id_conta, data_limite_str))

    transacoes = cursor.fetchall()

    if not transacoes:
        print("Nenhuma transação encontrada no período")

    else:
        for transacao in transacoes:
            id_transacao, tipo, valor, data_transacao = transacao
            data_formatada = datetime.fromisoformat(data_transacao).strftime('%d/%m/%Y %H:%M')
            print(f"ID: {id_transacao} | Tipo: {tipo:<10} | Valor: R$ {valor:,.2f} | Data: {data_formatada}")

#Executar o script
if __name__ == "__main__":
    setup_database() 
    insert_sample_data()

    #exemplo de uso: 
    sp_extrato_conta(1, 30)

    #exemplo com conta diferente e período menor
    sp_extrato_conta(2, 10)

    #fecha a conexão com o banco de dados em memória
    conn.close()