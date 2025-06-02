let blocos = [];

function atualizarPesoPilar() {
    const select = document.getElementById('bitolaPilar');
    const selected = select.options[select.selectedIndex];
    document.getElementById('pesoLinearPilar').value = selected.getAttribute('data-peso');
}
function atualizarPesoLongarina() {
    const select = document.getElementById('bitolaLongarina');
    const selected = select.options[select.selectedIndex];
    document.getElementById('pesoLinearLongarina').value = selected.getAttribute('data-peso');
}

function capturarParametros() {
    return {
        bitolaPilar: document.getElementById('bitolaPilar').value,
        pesoLinearPilar: parseFloat(document.getElementById('pesoLinearPilar').value),
        precoToraPilar: parseFloat(document.getElementById('precoToraPilar').value),
        bitolaLongarina: document.getElementById('bitolaLongarina').value,
        pesoLinearLongarina: parseFloat(document.getElementById('pesoLinearLongarina').value),
        precoToraLongarina: parseFloat(document.getElementById('precoToraLongarina').value),
        larguraVaga: parseFloat(document.getElementById('larguraVaga').value),
        profundidadeVaga: parseFloat(document.getElementById('profundidadeVaga').value),
        custoTela: parseFloat(document.getElementById('custoTela').value),
        custoUsinagem: parseFloat(document.getElementById('custoUsinagem').value),
        custoLixamento: parseFloat(document.getElementById('custoLixamento').value),
        custoVerniz: parseFloat(document.getElementById('custoVerniz').value),
        consumoVerniz: parseFloat(document.getElementById('consumoVerniz').value),
        custoMaoFrancesa: parseFloat(document.getElementById('custoMaoFrancesa').value),
        pesoMaoFrancesa: parseFloat(document.getElementById('pesoMaoFrancesa').value),
        custoLogistica: parseFloat(document.getElementById('custoLogistica').value),
        distanciaIlhos: parseFloat(document.getElementById('distanciaIlhos').value),
        consumoPiche: parseFloat(document.getElementById('consumoPiche').value)
    };
}

function adicionarBloco() {
    const vagas = parseInt(document.getElementById('vagas').value);
    const modulacao = document.getElementById('modulacao').value;
    if (!vagas || vagas <= 0) {
        alert('Informe uma quantidade válida de vagas.');
        return;
    }
    blocos.push({ vagas, modulacao });
    atualizarLista();
}

function editarBloco(index) {
    const bloco = blocos[index];
    const novasVagas = prompt('Editar quantidade de vagas:', bloco.vagas);
    if (novasVagas !== null && !isNaN(parseInt(novasVagas)) && parseInt(novasVagas) > 0) {
        blocos[index].vagas = parseInt(novasVagas);
        atualizarLista();
    }
}

function removerBloco(index) {
    blocos.splice(index, 1);
    atualizarLista();
}

function atualizarLista() {
    const lista = document.getElementById('lista-blocos');
    lista.innerHTML = '';
    blocos.forEach((bloco, index) => {
        const item = document.createElement('li');
        item.textContent = `Bloco ${index + 1}: ${bloco.vagas} vagas (${bloco.modulacao === 'frente' ? 'Frente a Frente' : 'Lado a Lado'})`;
        // Botões editar/remover
        const editarBtn = document.createElement('button');
        editarBtn.textContent = '✏️';
        editarBtn.title = 'Editar Bloco';
        editarBtn.onclick = () => editarBloco(index);

        const removerBtn = document.createElement('button');
        removerBtn.textContent = '🗑️';
        removerBtn.title = 'Remover Bloco';
        removerBtn.onclick = () => removerBloco(index);

        item.appendChild(editarBtn);
        item.appendChild(removerBtn);
        lista.appendChild(item);
    });
}

function calcular() {
    const p = capturarParametros();
    let resultadoHTML = '';
    let totalizadores = {
        pilares: 0,
        torasPilar: 0,
        longLong: 0,
        longTransv: 0,
        torasLongarina: 0,
        pesoPilares: 0,
        pesoLongarinas: 0,
        custoTorasPilar: 0,
        custoTorasLongarina: 0,
        maoFrancesaQtd: 0,
        pesoMaoFrancesa: 0,
        ilhos: 0,
        areaTela: 0,
        custoTela: 0,
        custoProcessos: 0,
        custoLogistica: 0,
        totalBlocos: 0
    };

    blocos.forEach((bloco, index) => {
        const { vagas, modulacao } = bloco;

        let numModulos, pilares, torasPilar, metrosPilares, pesoPilares, custoTorasPilar;
        let longLong, metrosLongarinaLong, torasLongarinaLong;
        let longTransv, torasLongarinaTransv;
        let torasLongarina, metrosLongarinas, pesoLongarinas, custoTorasLongarina;
        let maoFrancesaQtd, pesoMaoFrancesa, totalIlhos;
        let areaTela, custoTela, custoProcessos, custoLogistica, totalBloco;

        // --------------------------
        // LÓGICA LADO A LADO (Santo Dumont - Eucalipto 4 Pilares)
        if (modulacao === 'lado') {
            // Modulação em módulos de até 2 vagas
            let modulos = [];
            let vagasRestantes = vagas;
            while (vagasRestantes > 0) {
                if (vagasRestantes >= 2) {
                    modulos.push(2);
                    vagasRestantes -= 2;
                } else {
                    modulos.push(1);
                    vagasRestantes -= 1;
                }
            }
            numModulos = modulos.length;

            pilares = (numModulos + 1) * 2;
            torasPilar = pilares; // 1 tora por pilar (3m cada)
            metrosPilares = torasPilar * 3;
            pesoPilares = metrosPilares * p.pesoLinearPilar;
            custoTorasPilar = torasPilar * p.precoToraPilar;

            // LONGARINAS LONGITUDINAIS: 2 linhas laterais de fora a fora
            const comprimentoBloco = numModulos * p.profundidadeVaga;
            longLong = 2; // 2 laterais
            metrosLongarinaLong = comprimentoBloco * 2;
            torasLongarinaLong = Math.ceil(comprimentoBloco / 5) * 2;

            // TRANSVERSAIS: número de vãos = pilares por fileira - 1
            const numPilaresFileira = numModulos + 1;
            longTransv = numPilaresFileira - 1;
            // Cada transversal cobre largura do bloco (1 tora pode atender até 5m)
            const comprimentoTransv = p.larguraVaga;
            torasLongarinaTransv = longTransv * Math.ceil(comprimentoTransv / 5);

            // Total de longarinas e metros
            torasLongarina = torasLongarinaLong + torasLongarinaTransv;
            metrosLongarinas = (torasLongarinaLong + torasLongarinaTransv) * 5;
            pesoLongarinas = metrosLongarinas * p.pesoLinearLongarina;
            custoTorasLongarina = torasLongarina * p.precoToraLongarina;

            // Mãos francesas
            maoFrancesaQtd = pilares * 2;
            pesoMaoFrancesa = maoFrancesaQtd * p.pesoMaoFrancesa;

            // Ilhós (longarinas longitudinais)
            totalIlhos = Math.ceil((metrosLongarinaLong) / p.distanciaIlhos);

            // Área de tela e custos
            areaTela = vagas * p.larguraVaga * p.profundidadeVaga;
            custoTela = areaTela * p.custoTela;
            custoProcessos = (metrosLongarinas + metrosPilares) * (
                p.custoUsinagem + p.custoLixamento + p.custoVerniz
            );
            custoLogistica = (pesoPilares + pesoLongarinas + pesoMaoFrancesa) * p.custoLogistica;
            totalBloco = custoTela + custoProcessos + custoLogistica + custoTorasPilar + custoTorasLongarina;
        }
        // --------------------------
        // LÓGICA FRENTE A FRENTE
        else if (modulacao === 'frente') {
            // Aqui cada "módulo" são 2 vagas frente a frente
            const vagasPorModulo = 2;
            numModulos = Math.ceil(vagas / (vagasPorModulo * 2)); // 2 vagas por fileira, 4 por módulo
            // N de vagas de cada lado
            const vagasPorFileira = Math.ceil(vagas / 2);

            // Pilares: (numModulos + 1) * 3
            const fileiraPilares = numModulos + 1;
            pilares = fileiraPilares * 3;
            torasPilar = pilares;
            metrosPilares = torasPilar * 3;
            pesoPilares = metrosPilares * p.pesoLinearPilar;
            custoTorasPilar = torasPilar * p.precoToraPilar;

            // Longarinas longitudinais: 3 linhas (duas laterais, uma central)
            const comprimentoModulo = numModulos * p.profundidadeVaga;
            longLong = 3; // duas laterais + central
            metrosLongarinaLong = comprimentoModulo * 3;
            torasLongarinaLong = Math.ceil(comprimentoModulo / 5) * 3;

            // Transversais: entre cada pilar (em cada módulo, fileira de transversais)
            longTransv = fileiraPilares - 1;
            const comprimentoTransv = p.larguraVaga * 2;
            torasLongarinaTransv = longTransv * Math.ceil(comprimentoTransv / 5);

            torasLongarina = torasLongarinaLong + torasLongarinaTransv;
            metrosLongarinas = (torasLongarinaLong + torasLongarinaTransv) * 5;
            pesoLongarinas = metrosLongarinas * p.pesoLinearLongarina;
            custoTorasLongarina = torasLongarina * p.precoToraLongarina;

            maoFrancesaQtd = pilares * 2;
            pesoMaoFrancesa = maoFrancesaQtd * p.pesoMaoFrancesa;
            totalIlhos = Math.ceil((metrosLongarinaLong) / p.distanciaIlhos);
            areaTela = vagas * p.larguraVaga * p.profundidadeVaga;
            custoTela = areaTela * p.custoTela;
            custoProcessos = (metrosLongarinas + metrosPilares) * (
                p.custoUsinagem + p.custoLixamento + p.custoVerniz
            );
            custoLogistica = (pesoPilares + pesoLongarinas + pesoMaoFrancesa) * p.custoLogistica;
            totalBloco = custoTela + custoProcessos + custoLogistica + custoTorasPilar + custoTorasLongarina;
        }

        // TOTALIZADORES
        totalizadores.pilares += pilares;
        totalizadores.torasPilar += torasPilar;
        totalizadores.longLong += (typeof torasLongarinaLong !== 'undefined') ? torasLongarinaLong : 0;
        totalizadores.longTransv += (typeof torasLongarinaTransv !== 'undefined') ? torasLongarinaTransv : 0;
        totalizadores.torasLongarina += torasLongarina;
        totalizadores.pesoPilares += pesoPilares;
        totalizadores.pesoLongarinas += pesoLongarinas;
        totalizadores.custoTorasPilar += custoTorasPilar;
        totalizadores.custoTorasLongarina += custoTorasLongarina;
        totalizadores.maoFrancesaQtd += maoFrancesaQtd;
        totalizadores.pesoMaoFrancesa += pesoMaoFrancesa;
        totalizadores.ilhos += totalIlhos;
        totalizadores.areaTela += areaTela;
        totalizadores.custoTela += custoTela;
        totalizadores.custoProcessos += custoProcessos;
        totalizadores.custoLogistica += custoLogistica;
        totalizadores.totalBlocos += totalBloco;

        // RENDER BLOCO
        resultadoHTML += `
        <div class="bloco-card">
        <h3>Bloco ${index + 1} - ${vagas} vagas (${modulacao === 'frente' ? 'Frente a Frente' : 'Lado a Lado'})</h3>
        <table class="resultado-tabela">
            <tr><th>Item</th><th>Qtd.</th><th>Unid.</th><th>Observação</th></tr>
            <tr><td>Pilares (3m)</td><td>${torasPilar}</td><td>peças</td><td>Bitola: ${p.bitolaPilar}</td></tr>
            <tr><td>Long. Longitudinais (5m)</td><td>${(typeof torasLongarinaLong !== 'undefined') ? torasLongarinaLong : '-'}</td><td>peças</td><td>Bitola: ${p.bitolaLongarina}</td></tr>
            <tr><td>Long. Transversais (5m)</td><td>${(typeof torasLongarinaTransv !== 'undefined') ? torasLongarinaTransv : '-'}</td><td>peças</td><td>Reforço</td></tr>
            <tr><td>Peso de Pilares</td><td>${pesoPilares.toFixed(2)}</td><td>kg</td><td></td></tr>
            <tr><td>Peso de Longarinas</td><td>${pesoLongarinas.toFixed(2)}</td><td>kg</td><td></td></tr>
            <tr><td>Custo Toras Pilar</td><td colspan="3">R$ ${custoTorasPilar.toFixed(2)}</td></tr>
            <tr><td>Custo Toras Longarina</td><td colspan="3">R$ ${custoTorasLongarina.toFixed(2)}</td></tr>
            <tr><td>Mãos Francesas</td><td>${maoFrancesaQtd}</td><td>unidades</td><td>(${pesoMaoFrancesa.toFixed(2)} kg)</td></tr>
            <tr><td>Ilhós</td><td>${totalIlhos}</td><td>unidades</td><td></td></tr>
            <tr><td>Área de Tela</td><td>${areaTela.toFixed(2)}</td><td>m²</td><td>Custo: R$ ${custoTela.toFixed(2)}</td></tr>
            <tr><td>Custo de Processos</td><td colspan="3">R$ ${custoProcessos.toFixed(2)}</td></tr>
            <tr><td>Custo Logística</td><td colspan="3">R$ ${custoLogistica.toFixed(2)}</td></tr>
            <tr class="total-bloco"><td colspan="4"><strong>Total do Bloco: R$ ${totalBloco.toFixed(2)}</strong></td></tr>
        </table>
        </div>
        `;
    });

    // RENDER TOTALIZADOR
    resultadoHTML += `
    <div class="resumo-total">
    <h3>Resumo Geral dos Blocos</h3>
    <table class="resultado-tabela">
        <tr><th>Item</th><th>Total</th><th>Unid.</th></tr>
        <tr><td>Pilares (3m)</td><td>${totalizadores.torasPilar}</td><td>peças</td></tr>
        <tr><td>Long. Longitudinais (5m)</td><td>${totalizadores.longLong}</td><td>peças</td></tr>
        <tr><td>Long. Transversais (5m)</td><td>${totalizadores.longTransv}</td><td>peças</td></tr>
        <tr><td>Peso Pilares</td><td>${totalizadores.pesoPilares.toFixed(2)}</td><td>kg</td></tr>
        <tr><td>Peso Longarinas</td><td>${totalizadores.pesoLongarinas.toFixed(2)}</td><td>kg</td></tr>
        <tr><td>Custo Toras Pilar</td><td>R$ ${totalizadores.custoTorasPilar.toFixed(2)}</td><td>-</td></tr>
        <tr><td>Custo Toras Longarina</td><td>R$ ${totalizadores.custoTorasLongarina.toFixed(2)}</td><td>-</td></tr>
        <tr><td>Mãos Francesas</td><td>${totalizadores.maoFrancesaQtd}</td><td>unidades</td></tr>
        <tr><td>Peso Mãos Francesas</td><td>${totalizadores.pesoMaoFrancesa.toFixed(2)}</td><td>kg</td></tr>
        <tr><td>Ilhós</td><td>${totalizadores.ilhos}</td><td>unidades</td></tr>
        <tr><td>Área de Tela</td><td>${totalizadores.areaTela.toFixed(2)}</td><td>m²</td></tr>
        <tr><td>Custo de Tela</td><td>R$ ${totalizadores.custoTela.toFixed(2)}</td><td>-</td></tr>
        <tr><td>Custo de Processos</td><td>R$ ${totalizadores.custoProcessos.toFixed(2)}</td><td>-</td></tr>
        <tr><td>Custo Logística</td><td>R$ ${totalizadores.custoLogistica.toFixed(2)}</td><td>-</td></tr>
        <tr class="total-geral"><td colspan="3"><strong>Total Geral: R$ ${totalizadores.totalBlocos.toFixed(2)}</strong></td></tr>
    </table>
    </div>
    `;

    document.getElementById('resultado').innerHTML = resultadoHTML;
}

// Inicialização automática para garantir recálculo
window.onload = function() {
    atualizarLista();
}
