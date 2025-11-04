document.getElementById('cadastro-form').addEventListener('submit', function(event){

    event.preventDefault();

    let isValid = true;

    document.querySelectorAll('.error-message').forEach(span => {
        span.textContent = "";
    })

    //validação de CPF
    const entcpf = document.getElementById('cpf');
    const cpf = entcpf.value.replace(/\D/g,"");
    if (cpf.length !== 11) {
        document.getElementById('cpf-error').textContent = 'CPF inválido! O CPF deve conter 11 dígitos.';
        isValid = false;
    }

    //validação de data nascimento
    const EntdtNascimento = document.getElementById('data-nascimento');

    //Data de corte: 18 anos atrás a partir de hoje.
    const dataCorte = new Date();
    dataCorte.setFullYear(dataCorte.getFullYear() - 18);
    dataCorte.setHours(0, 0, 0, 0);

    if (!EntdtNascimento.value) {
        document.getElementById('data-error').textContent = 'Data de Nascimento inválida.';
        isValid = false;
    } else {
        const dtNascimento = new Date(EntdtNascimento.value);
        const hoje = new Date();

        hoje.setHours(0, 0, 0, 0);

        if (isNaN(dtNascimento.getTime()) || dtNascimento > dataCorte) {
        document.getElementById('data-error').textContent = 'É necessário ter no mínimo 18 anos para abrir uma conta.';
        isValid = false;
    }
    }

    const dtNascimento = new Date(EntdtNascimento.value);
    const hoje = new Date();
    
    //validação de Número tel
    const entTel = document.getElementById('tel');
    const tel = entTel.value.replace(/\D/g,"");

    if (tel.length < 10 || tel.length > 11) {
        document.getElementById('tel-error').textContent = 'Telefone inválido! O Número deve conter 10 ou 11 dígitos (com DDD).';
        isValid = false;
    }

    if (isValid) {
        alert('Formulário enviado!!');
    }
})