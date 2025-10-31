//importação das bibliotecas
const express= require('express');
const bodyParcer = require('body-parser');
const {v4:uuidv4} = require ('uuid');
const app = express();
const port = 3000;
//transforma as informações obtidas no modelo json
app.use(bodyParcer.json());

//identificadores da conta, cada uma possuindo um saldo
const contas = {
    '12345':{saldo:10000},
    '76498':{saldo:500}
}

//armazena as transações
const transacoes = [];

//rota para 'postar' dados. req = pergunta res = resposta
app.post('/api/trasferencia',(req, res) => {
const {contaOrigen, contaDestino, valor}= req.body;

//validação dos dados
if(!contaOrigen || !contaDestino || !valor === undefined){
    return res.status(400).json({mensagem:'Dados inválidos!!'})
}

if(!contas[contaOrigen] || !contas[contaDestino]){
    return res.status(400).json({mensagen:'conta origem ou conta destino não existe!'})
}

if(valor <= 0){
    return res.status(400).json({mensagen:'O valor da transferência deve ser maior que zero!'})
}

if(contas[contaOrigen].saldo < valor){
    return res.status(400).json({mensagen:'Saldo insuficiente!'})
}

const idTransacao = uuidv4();

//consulta a api de pagamento
const novaTransacao = {
    id: idTransacao,
    contaOrigen,
    contaDestino,
    valor,
    data: new Date().toISOString(),
    status:'Concluido!'
}

transacoes.push(novaTransacao);
contas[contaOrigen].saldo -= valor;
contas[contaDestino].saldo += valor;

return res.status(200).json({
    mensagem:'Transfêrencia Concluída!',
    idTransacao,
    novoSaldoOrigen : contas[contaOrigen].saldo,
    novoSaldoDestino: contas[contaDestino].saldo
});

});

app.listen(port,()=>{
    console.log(`API rodando em http://localhost${port}`);
});

//abrir terminal e escrever node index.js
//Para acessar digite http://localhost:3000