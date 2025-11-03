//Iniciação da página
document.addEventListener('DOMContentLoaded', ()=>{

const dadosExtrato ={
    saldo:4820.90,
    transacoes:[
        {tipo:'venda', descricao:'Venda - Rímel', valor:150.50},
        {tipo:'venda', descricao:'Venda - Blush', valor:50.20},
        {tipo:'pix', descricao:'Pagamento ao fornecedor - GlossBeauty', valor:-300.00},
        {tipo:'cashback', descricao:'Cashback - campanha de ações do GlossBeauty', valor:100.00},
        {tipo:'compra', descricao:'compra - Estoque de base da RareBeauty', valor:-3160.90},
        {tipo:'taxa', descricao:'Taxa - Importação de mercadoria', valor:-200.00},
        {tipo:'venda', descricao:'Venda - Kit de maguiagens importados', valor:5999.99},
        {tipo:'pix', descricao:'Recebido via pix - Cliente Daniela Perez', valor:8500.50},
        {tipo:'reembolso', descricao:'Reembolso cliente - Pedido #A3490', valor:-89.00},
        {tipo:'Serviço', descricao:'Assinatura Beauty+ (Mensal)', valor:-51.29}
    ]

};

const saldoElemento = document.getElementById("saldo-conta");
const listaTransacoes = document.getElementById("lista-transacoes");

//chamada do extrato
saldoElemento.textContent = `Saldo ${dadosExtrato.saldo.toLocaleString('pt-BR',{
    style: 'currency',
    currency: 'BRL'
})}`;

//separando cada transação
dadosExtrato.transacoes.forEach(transacao=>{
    const itemLista = document.createElement('li');
    itemLista.classList.add('transacao');

    if (Math.abs(transacao.valor) >= 5000) {
        itemLista.classList.add('destaque');
    }

    const ValorFormatado = new Intl.NumberFormat('pt-BR',{
        style: 'currency',
        currency: 'BRL'
    }).format(transacao.valor);

    itemLista.innerHTML =`
    <div class="transacao-info">
        <span> ${transacao.descricao}</span>
        <small> ${transacao.valor}</small>
        <span class="transacao-valor ${transacao.valor > 0 ? 'negativo' : ''}" >
            ${ValorFormatado}
        </span>

    `;

    listaTransacoes.appendChild(itemLista);
});

});