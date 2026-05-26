/**
 * OFICINA DO CELULAR — script.js
 * Desenvolvedor: Front-End Sênior
 * Arquitetura: IIFE + módulos funcionais, zero dependências externas
 */

'use strict';

/* ============================================================================
   1. BANCO DE DADOS — APARELHOS
   ============================================================================ */

/**
 * dadosBrutos: catálogo completo de aparelhos por marca.
 * Fonte de verdade para o motor de orçamento.
 */
const dadosBrutos = {
    apple: [
        'iPhone 5S','iPhone 6','iPhone 6 Plus','iPhone 6S','iPhone 6S Plus',
        'iPhone 7','iPhone 7 Plus','iPhone 8','iPhone 8 Plus',
        'iPhone X','iPhone XR','iPhone XS','iPhone XS Max',
        'iPhone 11','iPhone 11 Pro','iPhone 11 Pro Max',
        'iPhone 12','iPhone 12 Mini','iPhone 12 Pro','iPhone 12 Pro Max',
        'iPhone 13','iPhone 13 Mini','iPhone 13 Pro','iPhone 13 Pro Max',
        'iPhone 14','iPhone 14 Plus','iPhone 14 Pro','iPhone 14 Pro Max',
        'iPhone 15','iPhone 15 Plus','iPhone 15 Pro','iPhone 15 Pro Max',
        'iPhone 16','iPhone 16 Plus','iPhone 16 Pro','iPhone 16 Pro Max',
        'iPhone 17','iPhone 17 Plus','iPhone 17 Pro','iPhone 17 Pro Max',
    ],
    samsung: [
        // Linha A
        'Galaxy A01','Galaxy A02','Galaxy A02S','Galaxy A03','Galaxy A03 Core',
        'Galaxy A04','Galaxy A04S','Galaxy A05','Galaxy A05S','Galaxy A06',
        'Galaxy A10','Galaxy A10S','Galaxy A11','Galaxy A12','Galaxy A13',
        'Galaxy A14','Galaxy A15','Galaxy A16','Galaxy A20','Galaxy A20S',
        'Galaxy A21S','Galaxy A22 4G','Galaxy A22 5G','Galaxy A23 4G','Galaxy A23 5G',
        'Galaxy A24','Galaxy A25','Galaxy A30','Galaxy A30S','Galaxy A31',
        'Galaxy A32 4G','Galaxy A32 5G','Galaxy A33','Galaxy A34','Galaxy A35',
        'Galaxy A36','Galaxy A50','Galaxy A51','Galaxy A52','Galaxy A52S',
        'Galaxy A53','Galaxy A54','Galaxy A55','Galaxy A56',
        'Galaxy A70','Galaxy A71','Galaxy A72','Galaxy A73',
        // Linha S
        'Galaxy S10E','Galaxy S10','Galaxy S10 Plus',
        'Galaxy S20 FE','Galaxy S20','Galaxy S20 Plus','Galaxy S20 Ultra',
        'Galaxy S21 FE','Galaxy S21','Galaxy S21 Plus','Galaxy S21 Ultra',
        'Galaxy S22','Galaxy S22 Plus','Galaxy S22 Ultra',
        'Galaxy S23 FE','Galaxy S23','Galaxy S23 Plus','Galaxy S23 Ultra',
        'Galaxy S24 FE','Galaxy S24','Galaxy S24 Plus','Galaxy S24 Ultra',
        // Linha M e J
        'Galaxy M12','Galaxy M23','Galaxy M52','Galaxy M62',
        'Galaxy J4 Plus','Galaxy J5','Galaxy J5 Prime','Galaxy J6','Galaxy J7','Galaxy J7 Prime',
        // Linha Z / dobráveis
        'Galaxy Z Flip 3','Galaxy Z Flip 4','Galaxy Z Flip 5',
        'Galaxy Z Fold 3','Galaxy Z Fold 4','Galaxy Z Fold 5',
        // Nota
        'Galaxy Note 10 Lite','Galaxy Note 10 Plus','Galaxy Note 20','Galaxy Note 20 Ultra',
    ],
    motorola: [
        // Linha E
        'Moto E5','Moto E6','Moto E6 Plus','Moto E7','Moto E7 Plus','Moto E7 Power',
        'Moto E13','Moto E20','Moto E22','Moto E30','Moto E32',
        // Linha G completa
        'Moto G4 Play','Moto G5','Moto G5 Plus','Moto G5S','Moto G6','Moto G6 Play',
        'Moto G7','Moto G7 Plus','Moto G7 Power',
        'Moto G8','Moto G8 Play','Moto G8 Plus','Moto G8 Power','Moto G8 Power Lite',
        'Moto G9 Play','Moto G9 Plus','Moto G9 Power',
        'Moto G10','Moto G20','Moto G22','Moto G30','Moto G31','Moto G32',
        'Moto G34','Moto G35','Moto G41','Moto G42','Moto G50','Moto G51',
        'Moto G52','Moto G53','Moto G54','Moto G55','Moto G60','Moto G60S',
        'Moto G71','Moto G72','Moto G73','Moto G75','Moto G82','Moto G84','Moto G85',
        'Moto G100','Moto G200',
        // Linha Edge
        'Moto Edge 20','Moto Edge 20 Pro','Moto Edge 30','Moto Edge 30 Neo',
        'Moto Edge 30 Pro','Moto Edge 40','Moto Edge 40 Neo','Moto Edge 40 Pro',
        'Moto Edge 50 Fusion','Moto Edge 50 Pro','Moto Edge 50 Ultra',
        // One
        'Moto One','Moto One Action','Moto One Fusion','Moto One Fusion Plus',
        'Moto One Hyper','Moto One Vision',
    ],
    xiaomi: [
        'Redmi 7','Redmi 8','Redmi 8A','Redmi 9','Redmi 9A','Redmi 9C','Redmi 9T',
        'Redmi 10','Redmi 10A','Redmi 10C','Redmi 12','Redmi 12C',
        'Redmi 13','Redmi 13C','Redmi 14C',
        'Redmi Note 7','Redmi Note 8','Redmi Note 8 Pro','Redmi Note 8T',
        'Redmi Note 9','Redmi Note 9 Pro','Redmi Note 9S',
        'Redmi Note 10','Redmi Note 10 Pro','Redmi Note 10S',
        'Redmi Note 11','Redmi Note 11S','Redmi Note 11 Pro',
        'Redmi Note 12','Redmi Note 12 Turbo','Redmi Note 12 Pro',
        'Redmi Note 13','Redmi Note 13 Pro','Redmi Note 13 Pro Plus',
        'Redmi Note 14','Redmi Note 14 Pro',
        'MI 9T','MI 9T Pro','MI 11','MI 12','MI 13',
        'POCO F3','POCO F4','POCO F5','POCO F6 Pro',
        'POCO M3','POCO M3 Pro','POCO M4 Pro','POCO M5',
        'POCO X3','POCO X3 Pro','POCO X3 GT','POCO X4 GT','POCO X4 Pro',
        'POCO X5','POCO X5 Pro','POCO X6 Pro',
    ],
    lg: [
        'LG K10','LG K11','LG K12','LG K22','LG K40','LG K40S',
        'LG K41S','LG K42','LG K50','LG K51','LG K51S','LG K61',
        'LG Q6','LG Q7','LG Velvet',
    ],
    realme: [
        'Realme C11','Realme C20','Realme C21','Realme C25','Realme C25S',
        'Realme C31','Realme C33','Realme C51','Realme C53','Realme C55','Realme C67',
        'Realme C75X','Realme Note 50','Realme Note 60',
        'Realme 8','Realme 8 Pro','Realme 9','Realme 9 Pro',
        'Realme 12','Realme 12 Pro','Realme 14 Pro Plus',
    ],
    tablets: [
        // Samsung
        'Galaxy Tab A7','Galaxy Tab A8','Galaxy Tab A9','Galaxy Tab A9 Plus',
        'Galaxy Tab S6 Lite','Galaxy Tab S7 FE','Galaxy Tab S8','Galaxy Tab S9 FE',
        'Galaxy Tab S9 FE Plus','Galaxy Tab S10 Lite',
        'Galaxy Tab A 10.1 (T510/T515)',
        // iPad
        'iPad 5ª geração','iPad 6ª geração','iPad 7ª geração','iPad 8ª geração',
        'iPad 9ª geração','iPad 10ª geração',
        'iPad Air 2','iPad Air 3ª geração','iPad Air 4ª geração','iPad Air 5ª geração',
        'iPad mini 4','iPad mini 5ª geração','iPad mini 6ª geração',
        'iPad Pro 9.7','iPad Pro 10.5','iPad Pro 11 (1ª/2ª/3ª/4ª geração)',
        'iPad Pro 12.9 (1ª/2ª/3ª/4ª/5ª/6ª geração)',
    ],
    apple_watch: [
        'Apple Watch Series 1 38mm','Apple Watch Series 1 42mm',
        'Apple Watch Series 2 38mm','Apple Watch Series 2 42mm',
        'Apple Watch Series 3 38mm','Apple Watch Series 3 42mm',
        'Apple Watch Series 4 40mm','Apple Watch Series 4 44mm',
        'Apple Watch Series 5 40mm','Apple Watch Series 5 44mm',
        'Apple Watch Series 6 40mm','Apple Watch Series 6 44mm',
        'Apple Watch SE 40mm','Apple Watch SE 44mm',
        'Apple Watch Series 7 41mm','Apple Watch Series 7 45mm',
        'Apple Watch Series 8 41mm','Apple Watch Series 8 45mm',
        'Apple Watch Series 9 41mm','Apple Watch Series 9 45mm',
        'Apple Watch Ultra','Apple Watch Ultra 2',
    ],
};

/* ============================================================================
   2. MOTOR DE PREÇOS — gerarServicos
   ============================================================================ */

/**
 * Retorna um array de { nome, preco } para um dado modelo.
 * Regras específicas têm precedência sobre a tabela genérica.
 * @param {string} nomeModelo
 * @returns {{ nome: string, preco: number }[]}
 */
function gerarServicos(nomeModelo) {
    // ── Regra específica: iPhone 13 Pro / 13 Pro Max ──
    if (nomeModelo === 'iPhone 13 Pro' || nomeModelo === 'iPhone 13 Pro Max') {
        return [
            { nome: 'Troca de Tela',      preco: 1049.00 },
            { nome: 'Troca de Vidro',     preco:  690.00 },
            { nome: 'Troca de Bateria',   preco:  350.00 },
            { nome: 'Troca de Tampa',     preco:  389.00 },
            { nome: 'Troca de Lente',     preco:   90.00 },
            { nome: 'Reparo de Face ID',  preco:  550.00 },
            { nome: 'Troca de Conector',  preco:  340.00 },
        ];
    }

    // ── Regra específica: iPhones Pro e Pro Max de alta linha ──
    if (/iPhone (14|15|16|17) Pro Max/.test(nomeModelo)) {
        return [
            { nome: 'Troca de Tela',      preco: 1299.00 },
            { nome: 'Troca de Vidro',     preco:  790.00 },
            { nome: 'Troca de Bateria',   preco:  380.00 },
            { nome: 'Troca de Tampa',     preco:  420.00 },
            { nome: 'Troca de Lente',     preco:  110.00 },
            { nome: 'Reparo de Face ID',  preco:  600.00 },
            { nome: 'Troca de Conector',  preco:  360.00 },
        ];
    }

    if (/iPhone (14|15|16|17) Pro/.test(nomeModelo)) {
        return [
            { nome: 'Troca de Tela',      preco: 1149.00 },
            { nome: 'Troca de Vidro',     preco:  720.00 },
            { nome: 'Troca de Bateria',   preco:  360.00 },
            { nome: 'Troca de Tampa',     preco:  399.00 },
            { nome: 'Troca de Lente',     preco:   95.00 },
            { nome: 'Reparo de Face ID',  preco:  570.00 },
            { nome: 'Troca de Conector',  preco:  345.00 },
        ];
    }

    // ── Tabela genérica por tipo de aparelho ──
    if (nomeModelo.includes('Apple Watch')) {
        return [
            { nome: 'Troca de Tela/Vidro', preco: 280.00 },
            { nome: 'Troca de Bateria',    preco: 220.00 },
            { nome: 'Troca de Coroa',      preco: 180.00 },
        ];
    }

    if (nomeModelo.includes('Tab') || nomeModelo.includes('iPad')) {
        return [
            { nome: 'Troca de Tela',    preco: 450.00 },
            { nome: 'Troca de Vidro',   preco: 280.00 },
            { nome: 'Troca de Bateria', preco: 250.00 },
            { nome: 'Troca de Conector',preco: 180.00 },
        ];
    }

    if (/iPhone (X|XS|XR|11|12)/.test(nomeModelo)) {
        return [
            { nome: 'Troca de Tela',      preco:  699.00 },
            { nome: 'Troca de Vidro',     preco:  420.00 },
            { nome: 'Troca de Bateria',   preco:  280.00 },
            { nome: 'Reparo de Face ID',  preco:  480.00 },
            { nome: 'Troca de Conector',  preco:  280.00 },
            { nome: 'Troca de Lente',     preco:   80.00 },
        ];
    }

    if (nomeModelo.includes('iPhone')) {
        return [
            { nome: 'Troca de Tela',      preco:  350.00 },
            { nome: 'Troca de Vidro',     preco:  220.00 },
            { nome: 'Troca de Bateria',   preco:  199.00 },
            { nome: 'Troca de Conector',  preco:  200.00 },
            { nome: 'Troca de Lente',     preco:   70.00 },
        ];
    }

    // Genérico — Android
    return [
        { nome: 'Troca de Tela',     preco: 250.00 },
        { nome: 'Troca de Vidro',    preco: 150.00 },
        { nome: 'Troca de Bateria',  preco: 140.00 },
        { nome: 'Troca de Conector', preco: 100.00 },
        { nome: 'Troca de Câmera',   preco: 180.00 },
    ];
}

/**
 * dadosAparelhos: catálogo processado — cada item inclui id, nome e serviços.
 * Estrutura: { marca: [{ id, nome, servicos }] }
 */
const dadosAparelhos = {};
for (const marca in dadosBrutos) {
    dadosAparelhos[marca] = dadosBrutos[marca].map(nome => ({
        id:       nome.toLowerCase().replace(/\s+/g, '-').replace(/[()\/ª]/g, ''),
        nome,
        servicos: gerarServicos(nome),
    }));
}

/* ============================================================================
   3. UTILITÁRIOS
   ============================================================================ */

/** Formata número como moeda BR (R$ 1.049,00) */
const fmt = n => `R$ ${n.toFixed(2).replace('.', ',')}`;

/** Escapa HTML para evitar XSS */
const esc = s => String(s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');

/** Toast não-bloqueante */
function toast(msg, tipo = 'info') {
    const c = document.getElementById('toast-container-pub');
    if (!c) return;
    const el = document.createElement('div');
    el.className = `toast-pub toast-pub-${tipo}`;
    el.textContent = msg;
    c.appendChild(el);
    requestAnimationFrame(() => el.classList.add('show'));
    setTimeout(() => {
        el.classList.remove('show');
        setTimeout(() => el.remove(), 320);
    }, 3400);
}

/* ============================================================================
   4. CONTROLE DE MODAIS INFORMATIVOS
   Atributo: data-modal="id-do-modal"
   ============================================================================ */

function initModaisInfo() {
    // Abre ao clicar em [data-modal]
    document.addEventListener('click', e => {
        const btn = e.target.closest('[data-modal]');
        if (btn) {
            const id = btn.dataset.modal;
            const overlay = document.getElementById(id);
            if (overlay) {
                overlay.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        }
    });

    // Fecha ao clicar no .modal-close ou fora da caixa
    document.addEventListener('click', e => {
        // Botão fechar
        if (e.target.closest('.modal-close')) {
            const overlay = e.target.closest('.modal-info-overlay');
            if (overlay) fecharModalInfo(overlay);
        }
        // Clique fora da caixa
        if (e.target.classList.contains('modal-info-overlay')) {
            fecharModalInfo(e.target);
        }
    });

    // Fecha com Escape
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-info-overlay').forEach(m => {
                if (m.style.display !== 'none') fecharModalInfo(m);
            });
        }
    });
}

function fecharModalInfo(overlay) {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
}

/* ============================================================================
   5. FLUXO DE ORÇAMENTO — 3 etapas
   ============================================================================ */

/** Estado interno do fluxo de orçamento */
const OrcState = {
    marcaSelecionada: null,
    modeloSelecionado: null,
    servicosSelecionados: [],
};

function initOrcamento() {
    const etapaMarcas   = document.getElementById('etapa-marcas');
    const etapaServicos = document.getElementById('etapa-servicos');
    const etapaEnvio    = document.getElementById('etapa-envio');
    if (!etapaMarcas) return;

    /* ── ETAPA 1: clique em .marca-card ── */
    etapaMarcas.addEventListener('click', e => {
        const card = e.target.closest('.marca-card');
        if (!card) return;

        // Marca como selecionada
        etapaMarcas.querySelectorAll('.marca-card').forEach(c => c.classList.remove('selecionada'));
        card.classList.add('selecionada');

        const marca = card.dataset.marca;
        OrcState.marcaSelecionada = marca;
        OrcState.modeloSelecionado = null;

        renderizarModelos(marca);
    });

    /* ── Busca de modelos em tempo real ── */
    document.getElementById('busca-modelos')?.addEventListener('input', e => {
        if (!OrcState.marcaSelecionada) return;
        renderizarModelos(OrcState.marcaSelecionada, e.target.value.trim());
    });

    /* ── ETAPA 2: clique em modelo ── */
    document.getElementById('lista-modelos')?.addEventListener('click', e => {
        const btn = e.target.closest('.modelo-btn');
        if (!btn) return;
        const nome = btn.dataset.nome;
        OrcState.modeloSelecionado = nome;
        OrcState.servicosSelecionados = gerarServicos(nome);
        mostrarEtapaServicos(nome);
    });

    /* ── Botão voltar: Serviços → Marcas ── */
    document.getElementById('btn-voltar-marcas')?.addEventListener('click', () => {
        etapaServicos.style.display = 'none';
        etapaMarcas.style.display = 'block';
        window.scrollTo({ top: etapaMarcas.offsetTop - 80, behavior: 'smooth' });
    });

    /* ── ETAPA 3: botão "Enviar Aparelho" ── */
    document.getElementById('btn-ir-envio')?.addEventListener('click', () => {
        mostrarEtapaEnvio();
    });

    /* ── Botão voltar: Envio → Serviços ── */
    document.getElementById('btn-voltar-servicos')?.addEventListener('click', () => {
        etapaEnvio.style.display = 'none';
        etapaServicos.style.display = 'block';
        window.scrollTo({ top: etapaServicos.offsetTop - 80, behavior: 'smooth' });
    });

    /* ── Submit do formulário de envio ── */
    document.getElementById('form-orcamento-envio')?.addEventListener('submit', e => {
        e.preventDefault();
        processarEnvioOrcamento();
    });

    /* ── Máscara de telefone ── */
    document.getElementById('orc-telefone')?.addEventListener('input', e => {
        const v = e.target.value.replace(/\D/g, '');
        if (v.length > 10)
            e.target.value = v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        else
            e.target.value = v.replace(/(\d{2})(\d{4,5})(\d{0,4})/, '($1) $2-$3');
    });
}

/** Renderiza a lista de modelos, com filtro opcional */
function renderizarModelos(marca, filtro = '') {
    const wrap   = document.getElementById('modelos-wrap');
    const lista  = document.getElementById('lista-modelos');
    const busca  = document.getElementById('busca-modelos');
    if (!lista || !wrap) return;

    wrap.style.display = 'block';
    if (busca && filtro === '') busca.value = '';

    const aparelhos = dadosAparelhos[marca] || [];
    const termo = filtro.toLowerCase();
    const filtrados = termo
        ? aparelhos.filter(a => a.nome.toLowerCase().includes(termo))
        : aparelhos;

    if (filtrados.length === 0) {
        lista.innerHTML = '<p class="sem-modelos">Nenhum modelo encontrado.</p>';
        return;
    }

    lista.innerHTML = filtrados.map(a => `
        <button type="button" class="modelo-btn" data-nome="${esc(a.nome)}">
            ${esc(a.nome)}
        </button>
    `).join('');
}

/** Mostra a Etapa 2 — Serviços e preços */
function mostrarEtapaServicos(nomeModelo) {
    const etapaMarcas   = document.getElementById('etapa-marcas');
    const etapaServicos = document.getElementById('etapa-servicos');
    const titulo        = document.getElementById('modelo-selecionado-titulo');
    const listaServicos = document.getElementById('lista-servicos');

    if (!etapaServicos) return;

    titulo.textContent = nomeModelo;

    // Renderiza os serviços
    const servicos = OrcState.servicosSelecionados;
    listaServicos.innerHTML = servicos.map(s => `
        <div class="servico-item">
            <span class="servico-item-nome">${esc(s.nome)}</span>
            <span class="servico-item-preco">${fmt(s.preco)}</span>
        </div>
    `).join('');

    etapaMarcas.style.display   = 'none';
    etapaServicos.style.display = 'block';
    window.scrollTo({ top: etapaServicos.offsetTop - 80, behavior: 'smooth' });
}

/** Mostra a Etapa 3 — Formulário de envio, pré-preenchido */
function mostrarEtapaEnvio() {
    const etapaServicos = document.getElementById('etapa-servicos');
    const etapaEnvio    = document.getElementById('etapa-envio');
    if (!etapaEnvio) return;

    const modelo   = OrcState.modeloSelecionado;
    const servicos = OrcState.servicosSelecionados;

    // Preenche campos automaticamente
    const hiddenAparelho = document.getElementById('aparelho-selecionado');
    const displayAparelho = document.getElementById('orc-aparelho-display');
    const problemaTA     = document.getElementById('orc-problema');

    if (hiddenAparelho)  hiddenAparelho.value  = modelo;
    if (displayAparelho) displayAparelho.value = modelo;
    if (problemaTA)      problemaTA.value      =
        `Interesse nos serviços: ${servicos.map(s => s.nome).join(', ')}`;

    etapaServicos.style.display = 'none';
    etapaEnvio.style.display    = 'block';
    window.scrollTo({ top: etapaEnvio.offsetTop - 80, behavior: 'smooth' });
}

/** Processa o submit: salva no localStorage e abre modal de sucesso */
function processarEnvioOrcamento() {
    const codigo = `ORC-${Date.now().toString().slice(-6)}`;
    const recado = {
        codigo,
        data:         new Date().toLocaleString('pt-BR'),
        nome:         document.getElementById('orc-nome').value.trim(),
        telefone:     document.getElementById('orc-telefone').value.trim(),
        aparelho:     document.getElementById('aparelho-selecionado').value,
        senhaAparelho:document.getElementById('orc-senha').value.trim(),
        textoRecado:  `Orçamento solicitado via site`,
        problema:     document.getElementById('orc-problema').value.trim(),
        observacoes:  document.getElementById('orc-obs').value.trim(),
        status:       'pendente',
        tipo:         'orcamento',
    };

    // Salva na mesma chave que o painel admin lê
    const lista = JSON.parse(localStorage.getItem('recados_envio') || '[]');
    lista.unshift(recado);
    localStorage.setItem('recados_envio', JSON.stringify(lista));

    // Abre modal de sucesso com código
    abrirModalRecado(codigo, () => resetarOrcamento());
}

/** Reseta o fluxo para a Etapa 1 */
function resetarOrcamento() {
    OrcState.marcaSelecionada   = null;
    OrcState.modeloSelecionado  = null;
    OrcState.servicosSelecionados = [];

    const etapaMarcas   = document.getElementById('etapa-marcas');
    const etapaServicos = document.getElementById('etapa-servicos');
    const etapaEnvio    = document.getElementById('etapa-envio');
    const wrap          = document.getElementById('modelos-wrap');

    if (etapaMarcas)   { etapaMarcas.style.display = 'block'; }
    if (etapaServicos) { etapaServicos.style.display = 'none'; }
    if (etapaEnvio)    { etapaEnvio.style.display = 'none'; }
    if (wrap)          { wrap.style.display = 'none'; }

    document.querySelectorAll('.marca-card').forEach(c => c.classList.remove('selecionada'));
    document.getElementById('form-orcamento-envio')?.reset();
}

/* ============================================================================
   6. MODAL DE RECADO / SUCESSO
   ============================================================================ */

/**
 * @param {string} codigo - Código gerado (REC-xxx ou ORC-xxx)
 * @param {Function} [onFechar] - Callback chamado ao fechar o modal
 */
function abrirModalRecado(codigo, onFechar) {
    const overlay = document.getElementById('modal-recado-ok');
    const codEl   = document.getElementById('modal-recado-codigo');
    if (!overlay || !codEl) return;

    // Vincula código ao usuário logado, se houver sessão ativa
    const _sessaoAtiva = getSessao ? getSessao() : null;
    if (_sessaoAtiva && vincularRegistroAoUsuario) {
        const tipo = codigo.startsWith('ORC-') ? 'orcamento' : 'recado';
        vincularRegistroAoUsuario(_sessaoAtiva.email, codigo, tipo);
    }

    codEl.textContent = codigo;
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Copiar código
    const btnCopiar = document.getElementById('modal-recado-copiar');
    btnCopiar.onclick = () => {
        navigator.clipboard.writeText(codigo).catch(() => {});
        toast('Código copiado!', 'sucesso');
    };

    // Fechar / Entendido
    const fechar = () => {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
        if (typeof onFechar === 'function') onFechar();
        else mostrarPagina('inicio'); // fallback: volta pra home
    };

    document.getElementById('modal-recado-fechar').onclick = fechar;
    overlay.onclick = e => { if (e.target === overlay) fechar(); };
}

/* ============================================================================
   7. NAVEGAÇÃO SPA
   ============================================================================ */

let paginaAtual = 'inicio';

function mostrarPagina(id, scrollParaId = null) {
    // Carrinho vazio → bloqueia checkout
    if (id === 'checkout') {
        carregarCarrinhoStorage();
        if (carrinho.length === 0) {
            toast('Seu carrinho está vazio!', 'aviso');
            id = 'loja';
        } else {
            renderizarResumoCheckout();
        }
    }
    if (id === 'loja') aplicarFiltros();

    // Reset formulário de recado ao entrar na página
    if (id === 'envio-recado') {
        document.getElementById('form-recado')?.reset();
    }

    // Renderiza área do cliente ao navegar para minha-conta
    if (id === 'minha-conta') {
        setTimeout(() => renderizarPaginaConta && renderizarPaginaConta(), 50);
    }

    document.querySelectorAll('.pagina').forEach(p => p.classList.remove('ativa'));
    document.getElementById(`pagina-${id}`)?.classList.add('ativa');

    document.querySelectorAll('.nav a[data-pagina]').forEach(link => {
        link.classList.toggle('ativo', link.dataset.pagina === id && !link.dataset.scroll);
    });

    paginaAtual = id;
    window.scrollTo(0, 0);

    if (scrollParaId) {
        setTimeout(() => {
            document.getElementById(scrollParaId)
                ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
    }
}

function initNavegacao() {
    document.addEventListener('click', e => {
        const el = e.target.closest('[data-pagina]');
        if (!el) return;
        e.preventDefault();
        mostrarPagina(el.dataset.pagina, el.dataset.scroll || null);
    });
}

/* ============================================================================
   8. TEMA — DARK / LIGHT
   ============================================================================ */

const MOON_SVG = `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
const SUN_SVG  = `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;

function initTema() {
    const btn = document.getElementById('tema-btn');
    const aplicar = escuro => {
        if (escuro) {
            document.documentElement.setAttribute('data-theme', 'dark');
            if (btn) btn.innerHTML = SUN_SVG;
        } else {
            document.documentElement.removeAttribute('data-theme');
            if (btn) btn.innerHTML = MOON_SVG;
        }
        localStorage.setItem('tema', escuro ? 'dark' : 'light');
    };

    // Aplica tema salvo
    aplicar(localStorage.getItem('tema') === 'dark');

    btn?.addEventListener('click', () => {
        aplicar(document.documentElement.getAttribute('data-theme') !== 'dark');
    });
}

/* ============================================================================
   9. CONSULTA UNIFICADA — PEDIDO + O.S.
   ============================================================================ */

/* ── Dados de demonstração (substituídos pelos dados reais do admin) ── */
const ORDENS_DEMO = [
    { numero: 'OS-001', cliente: 'João Silva',      aparelho: 'iPhone 13',           defeito: 'Tela Quebrada',  status: 'analise',    precoEstimado: 450, data: '20/05/2026' },
    { numero: 'OS-002', cliente: 'Maria Santos',    aparelho: 'Samsung Galaxy A53',  defeito: 'Bateria',        status: 'aguardando', precoEstimado: 280, data: '21/05/2026' },
    { numero: 'OS-003', cliente: 'Carlos Oliveira', aparelho: 'Xiaomi Redmi Note 12',defeito: 'Câmera',         status: 'pronto',     precoEstimado: 220, precoFinal: 220, data: '19/05/2026' },
    { numero: 'OS-004', cliente: 'Ana Costa',       aparelho: 'Motorola Edge 40',    defeito: 'Dano por Água',  status: 'analise',    precoEstimado: 380, data: '22/05/2026' },
];

function inicializarOrdensServico() {
    if (!localStorage.getItem('ordens_servico')) {
        localStorage.setItem('ordens_servico', JSON.stringify(ORDENS_DEMO));
    }
}

/* ── Configurações de status ── */
const OS_STATUS = {
    analise:    { label: 'Em análise',          cls: 'status-analise',    step: 0 },
    aguardando: { label: 'Aguardando peça',     cls: 'status-aguardando', step: 1 },
    em_reparo:  { label: 'Em reparo',           cls: 'status-analise',    step: 2 },
    pronto:     { label: 'Pronto para retirar', cls: 'status-pronto',     step: 3 },
};
const OS_STEPS = ['Em análise', 'Aguardando peça', 'Em reparo', 'Pronto'];

const PED_STATUS = {
    pendente:     { label: 'Aguardando confirmação', cls: 'status-aguardando', step: 0 },
    confirmado:   { label: 'Confirmado',             cls: 'status-analise',    step: 1 },
    postado:      { label: 'Postado',                cls: 'status-analise',    step: 2 },
    em_transito:  { label: 'Em trânsito',            cls: 'status-analise',    step: 3 },
    saiu_entrega: { label: 'Saiu para entrega',      cls: 'status-aguardando', step: 4 },
    entregue:     { label: 'Entregue',               cls: 'status-pronto',     step: 5 },
};
const PED_STEPS = ['Confirmado', 'Postado', 'Em trânsito', 'Saiu p/ entrega', 'Entregue'];

/* ── Função auxiliar: renderiza barra de progresso ── */
function renderizarProgressSteps(containerEl, steps, stepAtual) {
    containerEl.innerHTML = steps.map((label, i) => {
        const done   = i < stepAtual;
        const active = i === stepAtual;
        const cls    = done ? 'done' : (active ? 'active' : '');
        const check  = `<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>`;
        const lineHTML = i < steps.length - 1
            ? `<div class="step-line ${done ? 'done' : ''}"></div>` : '';
        return `
            <div class="step ${cls}">
                <div class="step-circle">${done ? check : i + 1}</div>
                <div class="step-label">${label}</div>
            </div>${lineHTML}`;
    }).join('');
}

/* ── Busca O.S. pelo número ── */
function buscarOS(numero) {
    const lista = JSON.parse(localStorage.getItem('ordens_servico') || '[]');
    return lista.find(o => o.numero.toUpperCase() === numero) || null;
}

/* ── Busca Pedido pelo número ── */
function buscarPedido(numero) {
    const lista = JSON.parse(localStorage.getItem('pedidos_oficina') || '[]');
    return lista.find(p => p.numero.toUpperCase() === numero) || null;
}

/* ── Busca envio vinculado ao pedido ── */
function buscarEnvioDoPedido(numeroPedido) {
    const lista = JSON.parse(localStorage.getItem('envios_oficina') || '[]');
    return lista.find(e => e.pedido && e.pedido.toUpperCase() === numeroPedido) || null;
}

/* ── Exibe card de O.S. ── */
function exibirCardOS(os) {
    const cardOS  = document.getElementById('card-resultado-os');
    const cardPed = document.getElementById('card-resultado-pedido');
    const dica    = document.getElementById('consulta-dica');

    cardPed.style.display = 'none';
    dica.style.display    = 'none';
    cardOS.style.display  = 'block';
    cardOS.scrollIntoView({ behavior: 'smooth', block: 'start' });

    const info     = OS_STATUS[os.status] || { label: os.status, cls: '', step: 0 };
    const stepAtual = info.step;

    document.getElementById('r-os-numero').textContent = os.numero;

    const badge = document.getElementById('r-os-status-badge');
    badge.textContent = info.label;
    badge.className   = `status-badge ${info.cls}`;

    // Progress
    const progressEl = document.getElementById('r-os-progress');
    renderizarProgressSteps(progressEl, OS_STEPS, stepAtual);

    // Banner pronto
    document.getElementById('r-os-pronto-banner').style.display =
        os.status === 'pronto' ? 'flex' : 'none';

    // Detalhes
    document.getElementById('r-os-cliente').textContent  = os.cliente || '—';
    document.getElementById('r-os-aparelho').textContent = os.aparelho || '—';
    document.getElementById('r-os-defeito').textContent  = os.defeito || os.problema || '—';

    const valorFinal = os.valorFinal || os.precoFinal;
    const valorEst   = os.precoEst   || os.precoEstimado;
    document.getElementById('r-os-valor').textContent = valorFinal
        ? `R$ ${Number(valorFinal).toFixed(2).replace('.', ',')}`
        : valorEst
            ? `~R$ ${Number(valorEst).toFixed(2).replace('.', ',')} (estimado)`
            : '—';

    // Botão cancelar — só aparece se não estiver já cancelado ou pronto
    const cancelavelOS = !['cancelado', 'pronto'].includes(os.status);
    let btnCancelarOS = document.getElementById('btn-cancelar-os');
    if (!btnCancelarOS) {
        btnCancelarOS = document.createElement('button');
        btnCancelarOS.id = 'btn-cancelar-os';
        btnCancelarOS.type = 'button';
        btnCancelarOS.className = 'btn-cancelar-resultado';
        document.getElementById('card-resultado-os').querySelector('.resultado-card').appendChild(btnCancelarOS);
    }
    if (cancelavelOS) {
        btnCancelarOS.textContent = 'Cancelar O.S.';
        btnCancelarOS.style.display = 'flex';
        btnCancelarOS.onclick = () => cancelarRegistro('os', os.numero);
    } else {
        btnCancelarOS.style.display = 'none';
    }
}

/* ── Exibe card de Pedido ── */
function exibirCardPedido(pedido) {
    const cardOS  = document.getElementById('card-resultado-os');
    const cardPed = document.getElementById('card-resultado-pedido');
    const dica    = document.getElementById('consulta-dica');

    cardOS.style.display  = 'none';
    dica.style.display    = 'none';
    cardPed.style.display = 'block';
    cardPed.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Busca envio vinculado para pegar rastreio e status
    const envio = buscarEnvioDoPedido(pedido.numero);

    // Status: usa envio se existir, senão usa status do pedido
    const statusKey = envio?.status || pedido.status || 'pendente';
    const info      = PED_STATUS[statusKey] || PED_STATUS.pendente;

    document.getElementById('r-ped-numero').textContent = pedido.numero;

    const badge = document.getElementById('r-ped-status-badge');
    badge.textContent = info.label;
    badge.className   = `status-badge ${info.cls}`;

    // Progress
    const progressEl = document.getElementById('r-ped-progress');
    renderizarProgressSteps(progressEl, PED_STEPS, info.step);

    // Rastreio
    const rastreioWrap = document.getElementById('r-ped-rastreio-wrap');
    const rastreioLink = document.getElementById('r-ped-rastreio-link');
    if (envio?.rastreio) {
        rastreioLink.textContent = envio.rastreio;
        rastreioLink.href = `https://www.linkcorreios.com.br/?id=${encodeURIComponent(envio.rastreio)}`;
        rastreioWrap.style.display = 'flex';
    } else {
        rastreioWrap.style.display = 'none';
    }

    // Detalhes
    const nomeCliente = pedido.cliente?.nome || pedido.cliente || '—';
    document.getElementById('r-ped-cliente').textContent = nomeCliente;
    document.getElementById('r-ped-data').textContent    = pedido.data || '—';
    document.getElementById('r-ped-total').textContent   = pedido.total
        ? `R$ ${Number(pedido.total).toFixed(2).replace('.', ',')}`
        : '—';

    const metodosLabel = { cartao: 'Cartão de Crédito', pix: 'PIX', boleto: 'Boleto' };
    const metodo = pedido.pagamento?.metodo || pedido.pagamento || '—';
    document.getElementById('r-ped-pagamento').textContent = metodosLabel[metodo] || metodo;

    // Itens
    const itensEl = document.getElementById('r-ped-itens');
    const itens   = pedido.itens || [];
    if (itens.length) {
        itensEl.innerHTML = itens.map(item => `
            <div class="resultado-item-linha">
                <span>${esc(item.nome)} ×${item.quantidade}</span>
                <span>R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</span>
            </div>`).join('');
    } else {
        itensEl.innerHTML = '<p style="color:var(--text-muted);font-size:.875rem">Nenhum item registrado.</p>';
    }

    // Botão cancelar — só aparece se não estiver já cancelado ou entregue
    const cancelavelPed = !['cancelado', 'entregue', 'saiu_entrega'].includes(statusKey);
    let btnCancelarPed = document.getElementById('btn-cancelar-ped');
    if (!btnCancelarPed) {
        btnCancelarPed = document.createElement('button');
        btnCancelarPed.id = 'btn-cancelar-ped';
        btnCancelarPed.type = 'button';
        btnCancelarPed.className = 'btn-cancelar-resultado';
        document.getElementById('card-resultado-pedido').querySelector('.resultado-card').appendChild(btnCancelarPed);
    }
    if (cancelavelPed) {
        btnCancelarPed.textContent = 'Cancelar Pedido';
        btnCancelarPed.style.display = 'flex';
        btnCancelarPed.onclick = () => cancelarRegistro('pedido', pedido.numero);
    } else {
        btnCancelarPed.style.display = 'none';
    }
}

/* ── Cancelar registro (OS, Pedido ou Orçamento) ── */
function cancelarRegistro(tipo, numero) {
    const confirmou = window.confirm(
        `Tem certeza que deseja cancelar ${tipo === 'os' ? 'a O.S.' : tipo === 'pedido' ? 'o pedido' : 'o orçamento'} ${numero}?\n\nEssa ação não pode ser desfeita.`
    );
    if (!confirmou) return;

    if (tipo === 'os') {
        const lista = JSON.parse(localStorage.getItem('ordens_servico') || '[]');
        const idx   = lista.findIndex(o => o.numero.toUpperCase() === numero.toUpperCase());
        if (idx === -1) { toast('O.S. não encontrada.', 'erro'); return; }
        lista[idx].status = 'cancelado';
        localStorage.setItem('ordens_servico', JSON.stringify(lista));
        toast(`O.S. ${numero} cancelada.`, 'sucesso');
        exibirCardOS(lista[idx]);

    } else if (tipo === 'pedido') {
        const lista = JSON.parse(localStorage.getItem('pedidos_oficina') || '[]');
        const idx   = lista.findIndex(p => p.numero.toUpperCase() === numero.toUpperCase());
        if (idx === -1) { toast('Pedido não encontrado.', 'erro'); return; }
        lista[idx].status = 'cancelado';
        localStorage.setItem('pedidos_oficina', JSON.stringify(lista));
        toast(`Pedido ${numero} cancelado.`, 'sucesso');
        exibirCardPedido(lista[idx]);

    } else if (tipo === 'orcamento') {
        const lista = JSON.parse(localStorage.getItem('recados_envio') || '[]');
        const idx   = lista.findIndex(r => r.codigo.toUpperCase() === numero.toUpperCase());
        if (idx === -1) { toast('Orçamento não encontrado.', 'erro'); return; }
        lista[idx].status = 'cancelado';
        localStorage.setItem('recados_envio', JSON.stringify(lista));
        toast(`Orçamento ${numero} cancelado.`, 'sucesso');
    }

    // Atualiza dashboard se estiver logado
    const sessao = getSessao ? getSessao() : null;
    if (sessao) setTimeout(() => carregarDashboard(sessao.email), 150);
}

/* ── Função principal de consulta ── */
function consultarNumero(numero) {
    numero = numero.trim().toUpperCase();
    if (!numero) { toast('Digite um número para consultar.', 'aviso'); return; }

    const erroEl  = document.getElementById('consulta-erro');
    const cardOS  = document.getElementById('card-resultado-os');
    const cardPed = document.getElementById('card-resultado-pedido');

    // Esconde resultados anteriores
    if (cardOS)  cardOS.style.display  = 'none';
    if (cardPed) cardPed.style.display = 'none';
    if (erroEl)  erroEl.style.display  = 'none';

    if (numero.startsWith('OS-') || numero.startsWith('OS')) {
        const os = buscarOS(numero);
        if (os) { exibirCardOS(os); return; }
    }

    if (numero.startsWith('PED-') || numero.startsWith('PED')) {
        const ped = buscarPedido(numero);
        if (ped) { exibirCardPedido(ped); return; }
    }

    // Tenta buscar em ambos se prefixo não reconhecido
    const os  = buscarOS(numero);
    if (os)  { exibirCardOS(os);  return; }
    const ped = buscarPedido(numero);
    if (ped) { exibirCardPedido(ped); return; }

    // Não encontrado
    if (erroEl) {
        erroEl.textContent = `"${numero}" não encontrado. Verifique o número e tente novamente.`;
        erroEl.style.display = 'block';
    }
    toast(`"${numero}" não encontrado.`, 'erro');
}

function initConsultaOS() {
    const input = document.getElementById('numero-os');
    const btn   = document.getElementById('btn-consultar');
    if (!btn) return;
    btn.addEventListener('click', () => consultarNumero(input.value));
    input?.addEventListener('keypress', e => { if (e.key === 'Enter') consultarNumero(input.value); });
}

/* ============================================================================
   10. FORMULÁRIO DE RECADO (página envio-recado)
   ============================================================================ */

function initFormRecado() {
    const form = document.getElementById('form-recado');
    if (!form) return;

    // Máscara de telefone
    document.getElementById('recado-telefone')?.addEventListener('input', e => {
        const v = e.target.value.replace(/\D/g, '');
        if (v.length > 10) e.target.value = v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        else               e.target.value = v.replace(/(\d{2})(\d{4,5})(\d{0,4})/, '($1) $2-$3');
    });

    form.addEventListener('submit', e => {
        e.preventDefault();
        const codigo = `REC-${Date.now().toString().slice(-6)}`;
        const recado = {
            codigo,
            data:         new Date().toLocaleString('pt-BR'),
            nome:         document.getElementById('recado-nome').value.trim(),
            telefone:     document.getElementById('recado-telefone').value.trim(),
            aparelho:     document.getElementById('recado-aparelho').value.trim(),
            senhaAparelho:document.getElementById('recado-senha').value.trim(),
            textoRecado:  document.getElementById('recado-texto').value.trim(),
            problema:     document.getElementById('recado-problema').value.trim(),
            observacoes:  document.getElementById('recado-obs').value.trim(),
            status:       'pendente',
            tipo:         'recado',
        };

        const lista = JSON.parse(localStorage.getItem('recados_envio') || '[]');
        lista.unshift(recado);
        localStorage.setItem('recados_envio', JSON.stringify(lista));

        form.style.display = 'none';
        abrirModalRecado(codigo, () => {
            form.reset();
            form.style.display = 'block';
            mostrarPagina('inicio');
        });
    });
}

/* ============================================================================
   11. LOJA — PRODUTOS
   ============================================================================ */

const produtosDB = [
    { id:1,  nome:'Cabo USB-C',                categoria:'acessorios', marca:'generico', preco:29.90,   imagem:'🔌', descricao:'Cabo USB-C de alta qualidade',          estoque:50 },
    { id:2,  nome:'Bateria Externa 10000mAh',   categoria:'acessorios', marca:'generico', preco:79.90,   imagem:'🔋', descricao:'Power bank com carregamento rápido',     estoque:35 },
    { id:3,  nome:'Película de Vidro Temperado',categoria:'protecao',   marca:'generico', preco:24.90,   imagem:'🛡️', descricao:'Protetor de tela anti-impacto',          estoque:100},
    { id:4,  nome:'Capa Antichoque Silicone',   categoria:'protecao',   marca:'generico', preco:49.90,   imagem:'📱', descricao:'Capa resistente com material premium',   estoque:75 },
    { id:5,  nome:'Carregador Rápido 65W',      categoria:'acessorios', marca:'generico', preco:149.90,  imagem:'⚡', descricao:'Carregador USB-C universal',             estoque:40 },
    { id:6,  nome:'Fone Bluetooth Premium',     categoria:'audio',      marca:'generico', preco:199.90,  imagem:'🎧', descricao:'Fone sem fio com cancelamento de ruído', estoque:25 },
    { id:7,  nome:'iPhone 12 64GB',             categoria:'celulares',  marca:'apple',    preco:1299.90, imagem:'📱', descricao:'Seminovo, estado excelente',             estoque:5  },
    { id:8,  nome:'iPhone 13 128GB',            categoria:'celulares',  marca:'apple',    preco:1799.90, imagem:'📱', descricao:'Praticamente novo, bateria nova',        estoque:3  },
    { id:9,  nome:'Samsung Galaxy A53',         categoria:'celulares',  marca:'samsung',  preco:899.90,  imagem:'📱', descricao:'Com bateria nova e revisado',            estoque:8  },
    { id:10, nome:'Samsung Galaxy S22',         categoria:'celulares',  marca:'samsung',  preco:1599.90, imagem:'📱', descricao:'Seminovo funcionando perfeitamente',     estoque:4  },
    { id:11, nome:'Xiaomi Redmi Note 12',       categoria:'celulares',  marca:'xiaomi',   preco:699.90,  imagem:'📱', descricao:'Com tela nova',                         estoque:10 },
    { id:12, nome:'Motorola Edge 40',           categoria:'celulares',  marca:'motorola', preco:1199.90, imagem:'📱', descricao:'Com acessórios originais',              estoque:6  },
    { id:13, nome:'Suporte Veicular Magnético', categoria:'acessorios', marca:'generico', preco:39.90,   imagem:'🧲', descricao:'Suporte magnético para carro',           estoque:45 },
    { id:14, nome:'Wireless Charger 15W',       categoria:'acessorios', marca:'generico', preco:99.90,   imagem:'⚡', descricao:'Carregador wireless rápido',             estoque:30 },
    { id:15, nome:'Limpador de Tela Pro',       categoria:'protecao',   marca:'generico', preco:34.90,   imagem:'🧹', descricao:'Kit completo para limpeza',              estoque:60 },
    { id:16, nome:'Cabo Lightning',             categoria:'acessorios', marca:'apple',    preco:89.90,   imagem:'🔌', descricao:'Cabo Lightning para iPhone',             estoque:40 },
];

const FRETE = 15.00;
let carrinho = [];
let produtosFiltrados = [...produtosDB];

function carregarCarrinhoStorage() {
    carrinho = JSON.parse(localStorage.getItem('carrinho_oficina') || '[]');
}

function salvarCarrinho() {
    localStorage.setItem('carrinho_oficina', JSON.stringify(carrinho));
    atualizarBadgeCarrinho();
}

function atualizarBadgeCarrinho() {
    const badge = document.getElementById('carrinho-count');
    if (!badge) return;
    badge.textContent = carrinho.reduce((a, i) => a + i.quantidade, 0);
}

function adicionarAoCarrinho(produtoId, quantidade = 1) {
    const produto = produtosDB.find(p => p.id === produtoId);
    if (!produto || produto.estoque < quantidade) {
        toast('Estoque insuficiente.', 'aviso');
        return;
    }
    const item = carrinho.find(i => i.id === produtoId);
    if (item) item.quantidade += quantidade;
    else carrinho.push({ id: produtoId, nome: produto.nome, preco: produto.preco, quantidade, imagem: produto.imagem });
    salvarCarrinho();
    toast(`${produto.nome} adicionado!`, 'sucesso');
}

function removerDoCarrinho(produtoId) {
    carrinho = carrinho.filter(i => i.id !== produtoId);
    salvarCarrinho();
    renderizarCarrinho();
}

function atualizarQuantidade(produtoId, novaQtd) {
    const item = carrinho.find(i => i.id === produtoId);
    if (!item) return;
    if (novaQtd <= 0) { removerDoCarrinho(produtoId); return; }
    item.quantidade = novaQtd;
    salvarCarrinho();
    renderizarCarrinho();
}

function renderizarProdutos(lista) {
    const container = document.getElementById('produtos-container');
    const semProd   = document.getElementById('sem-produtos');
    if (!container) return;

    if (lista.length === 0) {
        container.innerHTML = '';
        semProd.style.display = 'block';
        return;
    }
    semProd.style.display = 'none';
    container.innerHTML = lista.map(p => `
        <div class="produto-card-loja">
            <div class="produto-imagem">${p.imagem}</div>
            <h3>${esc(p.nome)}</h3>
            <p class="produto-descricao">${esc(p.descricao)}</p>
            <p class="produto-preco">${fmt(p.preco)}</p>
            <p class="produto-estoque ${p.estoque > 0 ? 'disponivel' : 'indisponivel'}">
                ${p.estoque > 0 ? `${p.estoque} em estoque` : 'Indisponível'}
            </p>
            <div class="produto-qty">
                <input type="number" min="1" value="1" class="qty-input" data-id="${p.id}">
                <button type="button" class="btn-adicionar" data-id="${p.id}" ${p.estoque === 0 ? 'disabled' : ''}>
                    Adicionar
                </button>
            </div>
        </div>
    `).join('');

    container.querySelectorAll('.btn-adicionar').forEach(btn => {
        btn.addEventListener('click', () => {
            const id  = parseInt(btn.dataset.id, 10);
            const qty = parseInt(btn.closest('.produto-card-loja').querySelector('.qty-input').value, 10) || 1;
            adicionarAoCarrinho(id, qty);
        });
    });
}

function aplicarFiltros() {
    const filtroPreco  = document.getElementById('filtro-preco');
    const busca        = document.getElementById('busca-produtos');
    if (!filtroPreco || !busca) return;

    const categorias = [...document.querySelectorAll('.filtro-categoria:checked')].map(cb => cb.value);
    const marcas     = [...document.querySelectorAll('.filtro-marca:checked')].map(cb => cb.value);
    const precoMax   = parseInt(filtroPreco.value, 10);
    const termo      = busca.value.toLowerCase();

    produtosFiltrados = produtosDB.filter(p => {
        if (categorias.length && !categorias.includes(p.categoria)) return false;
        if (marcas.length && !marcas.includes(p.marca)) return false;
        if (p.preco > precoMax) return false;
        if (termo && !p.nome.toLowerCase().includes(termo)) return false;
        return true;
    });
    ordenarProdutos();
}

function ordenarProdutos() {
    const sel = document.getElementById('ordenar-produtos');
    if (!sel) return;
    const c = [...produtosFiltrados];
    switch (sel.value) {
        case 'preco-asc':  c.sort((a, b) => a.preco - b.preco); break;
        case 'preco-desc': c.sort((a, b) => b.preco - a.preco); break;
        case 'nome':       c.sort((a, b) => a.nome.localeCompare(b.nome)); break;
    }
    renderizarProdutos(c);
}

function initLoja() {
    document.querySelectorAll('.filtro-categoria, .filtro-marca').forEach(cb =>
        cb.addEventListener('change', aplicarFiltros));

    document.getElementById('filtro-preco')?.addEventListener('input', e => {
        document.getElementById('preco-display').textContent = e.target.value;
        aplicarFiltros();
    });
    document.getElementById('busca-produtos')?.addEventListener('input', aplicarFiltros);
    document.getElementById('ordenar-produtos')?.addEventListener('change', ordenarProdutos);
    document.getElementById('limpar-filtros')?.addEventListener('click', () => {
        document.querySelectorAll('#pagina-loja input[type="checkbox"]').forEach(cb => cb.checked = false);
        const fp = document.getElementById('filtro-preco');
        if (fp) { fp.value = 2000; document.getElementById('preco-display').textContent = '2000'; }
        document.getElementById('busca-produtos').value = '';
        aplicarFiltros();
    });
}

/* ============================================================================
   12. MODAL CARRINHO
   ============================================================================ */

function renderizarCarrinho() {
    const itensEl  = document.getElementById('carrinho-itens');
    const vazioEl  = document.getElementById('carrinho-vazio');
    if (!itensEl) return;

    if (carrinho.length === 0) {
        itensEl.innerHTML = '';
        vazioEl.style.display = 'block';
        atualizarResumoCarrinhoModal();
        return;
    }
    vazioEl.style.display = 'none';
    itensEl.innerHTML = carrinho.map(item => `
        <div class="carrinho-item">
            <div class="item-info">
                <span class="item-imagem">${item.imagem}</span>
                <div><strong>${esc(item.nome)}</strong><br><small>${fmt(item.preco)}</small></div>
            </div>
            <div class="item-qty">
                <button class="qty-btn" type="button" data-id="${item.id}" data-acao="menos">−</button>
                <input type="number" class="qty-display" value="${item.quantidade}" readonly>
                <button class="qty-btn" type="button" data-id="${item.id}" data-acao="mais">+</button>
            </div>
            <div>${fmt(item.preco * item.quantidade)}</div>
            <button class="item-remove" type="button" data-id="${item.id}" title="Remover">
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                </svg>
            </button>
        </div>
    `).join('');

    itensEl.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id   = parseInt(btn.dataset.id, 10);
            const item = carrinho.find(i => i.id === id);
            if (!item) return;
            atualizarQuantidade(id, btn.dataset.acao === 'mais' ? item.quantidade + 1 : item.quantidade - 1);
        });
    });
    itensEl.querySelectorAll('.item-remove').forEach(btn => {
        btn.addEventListener('click', () => removerDoCarrinho(parseInt(btn.dataset.id, 10)));
    });

    atualizarResumoCarrinhoModal();
}

function atualizarResumoCarrinhoModal() {
    const sub   = carrinho.reduce((a, i) => a + i.preco * i.quantidade, 0);
    const frete = carrinho.length > 0 ? FRETE : 0;
    document.getElementById('subtotal').textContent = fmt(sub);
    document.getElementById('frete').textContent    = fmt(frete);
    document.getElementById('total').textContent    = fmt(sub + frete);
}

function initCarrinho() {
    const modal      = document.getElementById('modal-carrinho');
    const btnAbrir   = document.getElementById('carrinho-btn');
    const btnFechar  = document.getElementById('fechar-carrinho');
    const btnCheckout = document.getElementById('btn-checkout');

    btnAbrir?.addEventListener('click', () => {
        carregarCarrinhoStorage();
        modal.style.display = 'flex';
        renderizarCarrinho();
    });
    btnFechar?.addEventListener('click', () => { modal.style.display = 'none'; });
    modal?.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });

    btnCheckout?.addEventListener('click', () => {
        carregarCarrinhoStorage();
        if (carrinho.length === 0) { toast('Carrinho vazio!', 'aviso'); return; }
        modal.style.display = 'none';
        mostrarPagina('checkout');
    });
}

/* ============================================================================
   13. CHECKOUT
   ============================================================================ */

function renderizarResumoCheckout() {
    const el = document.getElementById('resumo-itens');
    if (!el) return;
    let sub = 0;
    el.innerHTML = carrinho.map(item => {
        const total = item.preco * item.quantidade;
        sub += total;
        return `
            <div class="resumo-item-checkout">
                <span>${esc(item.nome)} ×${item.quantidade}</span>
                <span>${fmt(total)}</span>
            </div>`;
    }).join('');
    document.getElementById('checkout-subtotal').textContent = fmt(sub);
    document.getElementById('checkout-frete').textContent   = fmt(FRETE);
    document.getElementById('checkout-total').textContent   = fmt(sub + FRETE);
}

function validarCheckout() {
    const campos = ['nome','email','telefone','cep','rua','numero','bairro','cidade','estado'];
    for (const id of campos) {
        if (!document.getElementById(id)?.value.trim()) {
            toast(`Campo obrigatório: ${id.toUpperCase()}`, 'aviso');
            return false;
        }
    }
    if (!document.getElementById('email').value.includes('@')) {
        toast('E-mail inválido!', 'aviso'); return false;
    }
    const metodo = document.querySelector('input[name="pagamento"]:checked')?.value;
    if (metodo === 'cartao') {
        if (document.getElementById('numero-cartao').value.length < 19) { toast('Número do cartão inválido!', 'aviso'); return false; }
        if (document.getElementById('validade').value.length < 5)       { toast('Validade inválida!', 'aviso'); return false; }
        if (document.getElementById('cvv').value.length < 3)            { toast('CVV inválido!', 'aviso'); return false; }
        if (!document.getElementById('titular').value.trim())           { toast('Nome do titular obrigatório!', 'aviso'); return false; }
    }
    return true;
}

function processarPedido() {
    if (!validarCheckout()) return;
    const num = `PED-${Date.now().toString().slice(-6)}${Math.random().toString(36).slice(2,5).toUpperCase()}`;
    const pedido = {
        numero: num,
        data:   new Date().toLocaleDateString('pt-BR'),
        cliente: {
            nome:  document.getElementById('nome').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value,
            endereco: {
                cep:         document.getElementById('cep').value,
                rua:         document.getElementById('rua').value,
                numero:      document.getElementById('numero').value,
                complemento: document.getElementById('complemento').value,
                bairro:      document.getElementById('bairro').value,
                cidade:      document.getElementById('cidade').value,
                estado:      document.getElementById('estado').value,
            },
        },
        pagamento: {
            metodo:   document.querySelector('input[name="pagamento"]:checked').value,
            parcelas: document.getElementById('parcelas')?.value || 1,
        },
        itens:    carrinho,
        subtotal: carrinho.reduce((a, i) => a + i.preco * i.quantidade, 0),
        frete:    FRETE,
        total:    carrinho.reduce((a, i) => a + i.preco * i.quantidade, 0) + FRETE,
        status:   'pendente',
    };

    const pedidos = JSON.parse(localStorage.getItem('pedidos_oficina') || '[]');
    pedidos.push(pedido);
    localStorage.setItem('pedidos_oficina', JSON.stringify(pedidos));
    localStorage.removeItem('carrinho_oficina');
    carrinho = [];
    atualizarBadgeCarrinho();

    // Vincula pedido ao usuário logado, se houver sessão ativa
    const _sessaoPedido = getSessao ? getSessao() : null;
    if (_sessaoPedido && vincularRegistroAoUsuario) {
        vincularRegistroAoUsuario(_sessaoPedido.email, num, 'pedido');
    }

    document.getElementById('pedido-numero').innerHTML =
        `Número do pedido: <strong>${num}</strong>`;
    document.getElementById('modal-confirmacao').style.display = 'flex';
}

function initCheckout() {
    // Alterna formulário de pagamento
    document.querySelectorAll('input[name="pagamento"]').forEach(radio => {
        radio.addEventListener('change', e => {
            ['cartao-form','pix-form','boleto-form'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.style.display = 'none';
            });
            document.getElementById(`${e.target.value}-form`).style.display = 'block';
        });
    });

    // Máscaras
    const maskCEP    = e => { const v = e.target.value.replace(/\D/g,''); e.target.value = v.replace(/(\d{5})(\d)/,'$1-$2'); };
    const maskTel    = e => { const v = e.target.value.replace(/\D/g,''); e.target.value = v.replace(/(\d{2})(\d{5})(\d{4})/,'($1) $2-$3'); };
    const maskCartao = e => { e.target.value = e.target.value.replace(/\s/g,'').replace(/(\d{4})/g,'$1 ').trim(); };
    const maskVal    = e => { const v = e.target.value.replace(/\D/g,''); if (v.length >= 2) e.target.value = v.slice(0,2)+'/'+v.slice(2,4); };
    const maskCVV    = e => { e.target.value = e.target.value.replace(/\D/g,'').slice(0,3); };

    document.getElementById('cep')?.addEventListener('input', maskCEP);
    document.getElementById('telefone')?.addEventListener('input', maskTel);
    document.getElementById('numero-cartao')?.addEventListener('input', maskCartao);
    document.getElementById('validade')?.addEventListener('input', maskVal);
    document.getElementById('cvv')?.addEventListener('input', maskCVV);

    document.getElementById('btn-confirmar')?.addEventListener('click', processarPedido);
    document.getElementById('btn-voltar-loja')?.addEventListener('click', () => mostrarPagina('loja'));
    document.getElementById('btn-voltar-home')?.addEventListener('click', () => {
        document.getElementById('modal-confirmacao').style.display = 'none';
        mostrarPagina('inicio');
    });
}

/* ============================================================================
   14. DESTAQUES HOME
   ============================================================================ */

function renderizarDestaquesHome() {
    const container = document.getElementById('home-produtos-destaque');
    if (!container) return;
    container.innerHTML = produtosDB.slice(0, 4).map(p => `
        <div class="produto-card">
            <div class="produto-img">${p.imagem}</div>
            <h3>${esc(p.nome)}</h3>
            <p class="preco">${fmt(p.preco)}</p>
            <button type="button" class="btn-comprar" data-id="${p.id}" ${p.estoque === 0 ? 'disabled' : ''}>
                Adicionar ao carrinho
            </button>
        </div>
    `).join('');

    container.querySelectorAll('.btn-comprar[data-id]').forEach(btn => {
        btn.addEventListener('click', () => adicionarAoCarrinho(parseInt(btn.dataset.id, 10), 1));
    });
}

/* ============================================================================
   15. INICIALIZAÇÃO PRINCIPAL
   ============================================================================ */

document.addEventListener('DOMContentLoaded', () => {
    inicializarOrdensServico();
    initTema();
    initNavegacao();
    initModaisInfo();
    initOrcamento();
    initConsultaOS();
    initFormRecado();
    initLoja();
    initCarrinho();
    initCheckout();
    carregarCarrinhoStorage();
    atualizarBadgeCarrinho();
    renderizarDestaquesHome();
    mostrarPagina('inicio');
});
/* ============================================================================
   16. ÁREA DO CLIENTE — login, cadastro, dashboard
   ============================================================================ */

const STORAGE_USUARIOS   = 'ofc_usuarios';
const STORAGE_SESSAO     = 'ofc_sessao';

/* ── Utilitários ── */
function getUsuarios() {
    return JSON.parse(localStorage.getItem(STORAGE_USUARIOS) || '[]');
}
function salvarUsuarios(lista) {
    localStorage.setItem(STORAGE_USUARIOS, JSON.stringify(lista));
}
function getSessao() {
    try { return JSON.parse(localStorage.getItem(STORAGE_SESSAO)); } catch { return null; }
}
function setSessao(usuario) {
    localStorage.setItem(STORAGE_SESSAO, JSON.stringify(usuario));
}
function encerrarSessao() {
    localStorage.removeItem(STORAGE_SESSAO);
}

/* ── Vincula pedidos/OS/recados ao email do usuário logado no momento do registro ── */
function vincularRegistroAoUsuario(email, codigo, tipo) {
    const usuarios = getUsuarios();
    const idx = usuarios.findIndex(u => u.email === email);
    if (idx === -1) return;
    if (!usuarios[idx].codigos) usuarios[idx].codigos = [];
    // evita duplicata
    if (!usuarios[idx].codigos.find(c => c.codigo === codigo)) {
        usuarios[idx].codigos.push({ codigo, tipo, data: new Date().toLocaleString('pt-BR') });
    }
    salvarUsuarios(usuarios);
}

/* ── Atualiza header conforme estado de login ── */
function atualizarHeaderConta() {
    const sessao = getSessao();
    const btn    = document.getElementById('btn-header-conta');
    const label  = document.getElementById('header-conta-label');
    if (!btn || !label) return;
    if (sessao) {
        const primeiroNome = sessao.nome.split(' ')[0];
        label.textContent  = primeiroNome;
        btn.classList.add('logado');
    } else {
        label.textContent = 'Entrar';
        btn.classList.remove('logado');
    }
}

/* ── Renderiza estado logado / deslogado na página ── */
function renderizarPaginaConta() {
    const sessao      = getSessao();
    const divLogado   = document.getElementById('conta-logado');
    const divDeslogado= document.getElementById('conta-deslogado');
    if (!divLogado || !divDeslogado) return;

    if (sessao) {
        divDeslogado.style.display = 'none';
        divLogado.style.display    = 'block';
        document.getElementById('conta-nome-exibido').textContent  = sessao.nome.split(' ')[0];
        document.getElementById('conta-email-exibido').textContent = sessao.email;
        carregarDashboard(sessao.email);
    } else {
        divLogado.style.display    = 'none';
        divDeslogado.style.display = 'block';
    }
}

/* ── Login ── */
function tentarLogin() {
    const email = document.getElementById('login-email').value.trim().toLowerCase();
    const senha = document.getElementById('login-senha').value;
    const erroEl= document.getElementById('login-erro');

    if (!email || !senha) {
        erroEl.textContent = 'Preencha email e senha.';
        erroEl.style.display = 'block';
        return;
    }
    const usuarios = getUsuarios();
    const usuario  = usuarios.find(u => u.email === email && u.senha === senha);
    if (!usuario) {
        erroEl.textContent = 'Email ou senha incorretos.';
        erroEl.style.display = 'block';
        return;
    }
    erroEl.style.display = 'none';
    setSessao({ nome: usuario.nome, email: usuario.email, telefone: usuario.telefone });
    atualizarHeaderConta();
    renderizarPaginaConta();
    toast(`Bem-vindo, ${usuario.nome.split(' ')[0]}!`, 'sucesso');
}

/* ── Cadastro ── */
function tentarCadastro() {
    const nome   = document.getElementById('cad-nome').value.trim();
    const email  = document.getElementById('cad-email').value.trim().toLowerCase();
    const tel    = document.getElementById('cad-telefone').value.trim();
    const senha  = document.getElementById('cad-senha').value;
    const senha2 = document.getElementById('cad-senha2').value;
    const erroEl = document.getElementById('cad-erro');

    if (!nome || !email || !senha) {
        erroEl.textContent = 'Preencha todos os campos obrigatórios.';
        erroEl.style.display = 'block'; return;
    }
    if (!email.includes('@')) {
        erroEl.textContent = 'Email inválido.';
        erroEl.style.display = 'block'; return;
    }
    if (senha.length < 6) {
        erroEl.textContent = 'A senha deve ter pelo menos 6 caracteres.';
        erroEl.style.display = 'block'; return;
    }
    if (senha !== senha2) {
        erroEl.textContent = 'As senhas não coincidem.';
        erroEl.style.display = 'block'; return;
    }
    const usuarios = getUsuarios();
    if (usuarios.find(u => u.email === email)) {
        erroEl.textContent = 'Já existe uma conta com esse email.';
        erroEl.style.display = 'block'; return;
    }
    erroEl.style.display = 'none';
    const novoUsuario = { nome, email, telefone: tel, senha, codigos: [], criadoEm: new Date().toLocaleString('pt-BR') };
    usuarios.push(novoUsuario);
    salvarUsuarios(usuarios);
    setSessao({ nome, email, telefone: tel });
    atualizarHeaderConta();
    renderizarPaginaConta();
    toast('Conta criada com sucesso!', 'sucesso');
}

/* ── Sair ── */
function fazerLogout() {
    encerrarSessao();
    atualizarHeaderConta();
    renderizarPaginaConta();
    toast('Você saiu da conta.', 'info');
}

/* ── Dashboard: carrega dados do usuário ── */
function carregarDashboard(email) {
    const usuarios = getUsuarios();
    const usuario  = usuarios.find(u => u.email === email) || {};
    const codigos  = usuario.codigos || [];

    // Busca todos os registros linkados a este usuário pelo email
    const todasOS      = JSON.parse(localStorage.getItem('ordens_servico') || '[]');
    const todosPedidos = JSON.parse(localStorage.getItem('pedidos_oficina') || '[]');
    const todosRecados = JSON.parse(localStorage.getItem('recados_envio') || '[]');

    // Filtra por email OU por código vinculado
    const codigosSet = new Set(codigos.map(c => c.codigo));

    const minhasOS = todasOS.filter(o =>
        ((o.emailCliente && o.emailCliente.toLowerCase() === email) ||
        codigosSet.has(o.numero)) &&
        o.status !== 'cancelado'
    );
    const meusPedidos = todosPedidos.filter(p =>
        ((p.cliente?.email && p.cliente.email.toLowerCase() === email) ||
        codigosSet.has(p.numero)) &&
        p.status !== 'cancelado'
    );
    const meusRecados = todosRecados.filter(r =>
        codigosSet.has(r.codigo) && r.status !== 'cancelado'
    );

    renderizarHistoricoOS(minhasOS);
    renderizarHistoricoPedidos(meusPedidos);
    renderizarHistoricoOrcamentos(meusRecados.filter(r => r.tipo === 'orcamento'));
    renderizarCodigos(codigos, minhasOS, meusPedidos, meusRecados);
}

function statusBadgeHTML(status, tipo) {
    const mapaOS  = { analise:'status-analise', aguardando:'status-aguardando', em_reparo:'status-analise', pronto:'status-pronto', cancelado:'status-cancelado' };
    const mapaPed = { pendente:'status-aguardando', confirmado:'status-analise', postado:'status-analise', em_transito:'status-analise', saiu_entrega:'status-aguardando', entregue:'status-pronto', cancelado:'status-cancelado' };
    const mapa    = tipo === 'pedido' ? mapaPed : mapaOS;
    const cls     = mapa[status] || '';
    const labels  = {
        analise:'Em análise', aguardando:'Aguardando peça', em_reparo:'Em reparo', pronto:'Pronto p/ retirar',
        pendente:'Pendente', confirmado:'Confirmado', postado:'Postado', em_transito:'Em trânsito',
        saiu_entrega:'Saiu p/ entrega', entregue:'Entregue', cancelado:'Cancelado'
    };
    return `<span class="status-badge ${cls}">${labels[status] || status}</span>`;
}

function renderizarHistoricoOS(lista) {
    const el = document.getElementById('lista-os-usuario');
    if (!el) return;
    if (!lista.length) { el.innerHTML = '<div class="hist-vazio">Nenhuma O.S. encontrada ainda.</div>'; return; }
    el.innerHTML = lista.map(os => `
        <div class="hist-item">
            <div class="hist-item-info">
                <span class="hist-item-num">${esc(os.numero)}</span>
                <span class="hist-item-det">${esc(os.aparelho || '—')} · ${esc(os.defeito || os.problema || '—')}</span>
                <span class="hist-item-det">${os.data || ''}</span>
            </div>
            <div class="hist-item-acoes">
                ${statusBadgeHTML(os.status, 'os')}
                <button type="button" class="btn-secondary" style="font-size:.8rem;padding:.4rem .875rem"
                    onclick="mostrarPagina('consulta-os');setTimeout(()=>{document.getElementById('numero-os').value='${esc(os.numero)}';consultarNumero('${esc(os.numero)}');},120)">
                    Ver detalhes
                </button>
            </div>
        </div>`).join('');
}

function renderizarHistoricoPedidos(lista) {
    const el = document.getElementById('lista-pedidos-usuario');
    if (!el) return;
    if (!lista.length) { el.innerHTML = '<div class="hist-vazio">Nenhum pedido encontrado ainda.</div>'; return; }
    el.innerHTML = lista.map(p => `
        <div class="hist-item">
            <div class="hist-item-info">
                <span class="hist-item-num">${esc(p.numero)}</span>
                <span class="hist-item-det">${p.itens?.length || 0} item(s) · R$ ${Number(p.total||0).toFixed(2).replace('.',',')}</span>
                <span class="hist-item-det">${p.data || ''}</span>
            </div>
            <div class="hist-item-acoes">
                ${statusBadgeHTML(p.status, 'pedido')}
                <button type="button" class="btn-secondary" style="font-size:.8rem;padding:.4rem .875rem"
                    onclick="mostrarPagina('consulta-os');setTimeout(()=>{document.getElementById('numero-os').value='${esc(p.numero)}';consultarNumero('${esc(p.numero)}');},120)">
                    Ver detalhes
                </button>
            </div>
        </div>`).join('');
}

function renderizarHistoricoOrcamentos(lista) {
    const el = document.getElementById('lista-orc-usuario');
    if (!el) return;
    if (!lista.length) { el.innerHTML = '<div class="hist-vazio">Nenhum orçamento solicitado ainda.</div>'; return; }
    el.innerHTML = lista.map(r => `
        <div class="hist-item">
            <div class="hist-item-info">
                <span class="hist-item-num">${esc(r.codigo)}</span>
                <span class="hist-item-det">${esc(r.aparelho || '—')} · ${esc(r.problema || '—').slice(0,60)}</span>
                <span class="hist-item-det">${r.data || ''}</span>
            </div>
            <div class="hist-item-acoes">
                ${r.status === 'cancelado'
                    ? '<span class="status-badge status-cancelado">Cancelado</span>'
                    : '<span class="status-badge status-aguardando">Solicitado</span>'
                }
                ${r.status !== 'cancelado' ? `
                <button type="button" class="btn-cancelar-hist" onclick="cancelarRegistro('orcamento','${esc(r.codigo)}');renderizarPaginaConta()">
                    Cancelar
                </button>` : ''}
            </div>
        </div>`).join('');
}

function renderizarCodigos(codigos, os, pedidos, recados) {
    const el = document.getElementById('lista-codigos-usuario');
    if (!el) return;
    if (!codigos.length) { el.innerHTML = '<div class="hist-vazio">Nenhum código registrado. Faça um orçamento ou compra para ver os códigos aqui.</div>'; return; }

    // Monta mapa de status — exclui cancelados da exibição
    const statusMap = {};
    os.forEach(o  => statusMap[o.numero] = { status: o.status, tipo: 'os' });
    pedidos.forEach(p => statusMap[p.numero] = { status: p.status, tipo: 'pedido' });
    recados.forEach(r => statusMap[r.codigo] = { status: r.status || 'pendente', tipo: r.tipo || 'recado' });

    const codigosVisiveis = codigos.filter(c => statusMap[c.codigo]?.status !== 'cancelado');
    if (!codigosVisiveis.length) { el.innerHTML = '<div class="hist-vazio">Nenhum código ativo. Faça um orçamento ou compra para ver os códigos aqui.</div>'; return; }

    const tipoLabel = { os: 'O.S.', orcamento: 'Orçamento', recado: 'Recado', pedido: 'Pedido' };

    el.innerHTML = codigosVisiveis.map(c => {
        const info = statusMap[c.codigo] || {};
        const statusHTML = info.status ? statusBadgeHTML(info.status, info.tipo) : '';
        return `
        <div class="codigo-card">
            <span class="codigo-card-tipo">${tipoLabel[c.tipo] || c.tipo}</span>
            <span class="codigo-card-val">${esc(c.codigo)}</span>
            <span class="codigo-card-data">${c.data || ''}</span>
            <div class="codigo-card-status">${statusHTML}</div>
            <button type="button" class="btn-copiar-cod" onclick="navigator.clipboard.writeText('${esc(c.codigo)}').then(()=>toast('Código copiado!','sucesso'))">
                <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                Copiar
            </button>
        </div>`;
    }).join('');
}

/* ── Enviar recado pelo dashboard ── */
function enviarRecadoDashboard() {
    const sessao   = getSessao();
    if (!sessao) return;
    const aparelho = document.getElementById('dash-aparelho').value.trim();
    const msg      = document.getElementById('dash-mensagem').value.trim();
    const senha    = document.getElementById('dash-senha-aparelho').value.trim();
    if (!msg) { toast('Escreva uma mensagem.', 'aviso'); return; }
    const codigo   = `REC-${Date.now().toString().slice(-6)}`;
    const recado   = {
        codigo, tipo: 'recado',
        data:         new Date().toLocaleString('pt-BR'),
        nome:         sessao.nome,
        telefone:     sessao.telefone || '',
        aparelho:     aparelho,
        senhaAparelho:senha,
        textoRecado:  msg,
        problema:     msg,
        observacoes:  '',
        status:       'pendente',
        emailCliente: sessao.email,
    };
    const lista = JSON.parse(localStorage.getItem('recados_envio') || '[]');
    lista.unshift(recado);
    localStorage.setItem('recados_envio', JSON.stringify(lista));

    // Vincula código ao usuário
    vincularRegistroAoUsuario(sessao.email, codigo, 'recado');

    document.getElementById('dash-aparelho').value = '';
    document.getElementById('dash-mensagem').value = '';
    document.getElementById('dash-senha-aparelho').value = '';

    toast(`Recado enviado! Código: ${codigo}`, 'sucesso');
    carregarDashboard(sessao.email);
}

/* ── Inicialização ── */
function initMinhaConta() {
    // Login
    document.getElementById('btn-fazer-login')?.addEventListener('click', tentarLogin);
    document.getElementById('login-senha')?.addEventListener('keypress', e => { if (e.key === 'Enter') tentarLogin(); });

    // Cadastro
    document.getElementById('btn-cadastrar')?.addEventListener('click', tentarCadastro);

    // Sair
    document.getElementById('btn-sair')?.addEventListener('click', fazerLogout);

    // Enviar recado pelo dash
    document.getElementById('btn-dash-enviar-recado')?.addEventListener('click', enviarRecadoDashboard);

    // Tabs login/cadastro
    document.querySelectorAll('.conta-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const alvo = tab.dataset.tab;
            document.querySelectorAll('.conta-tab').forEach(t => t.classList.remove('ativo'));
            document.querySelectorAll('.conta-tab-conteudo').forEach(c => c.classList.remove('ativo'));
            tab.classList.add('ativo');
            document.getElementById(`conta-tab-${alvo}`)?.classList.add('ativo');
        });
    });

    // Links "Criar agora" / "Entrar"
    document.querySelectorAll('[data-tab-switch]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const alvo = link.dataset.tabSwitch;
            document.querySelectorAll('.conta-tab').forEach(t => {
                t.classList.toggle('ativo', t.dataset.tab === alvo);
            });
            document.querySelectorAll('.conta-tab-conteudo').forEach(c => {
                c.classList.toggle('ativo', c.id === `conta-tab-${alvo}`);
            });
        });
    });

    // Tabs do dashboard
    document.querySelectorAll('.dash-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const alvo = tab.dataset.dash;
            document.querySelectorAll('.dash-tab').forEach(t => t.classList.remove('ativo'));
            document.querySelectorAll('.dash-painel').forEach(p => p.classList.remove('ativo'));
            tab.classList.add('ativo');
            document.getElementById(`dash-${alvo}`)?.classList.add('ativo');
        });
    });

    // Botões "ver senha"
    document.querySelectorAll('.btn-ver-senha').forEach(btn => {
        btn.addEventListener('click', () => {
            const input = document.getElementById(btn.dataset.target);
            if (!input) return;
            input.type = input.type === 'password' ? 'text' : 'password';
        });
    });

    // Atualiza header e renderiza página ao navegar para minha-conta
    atualizarHeaderConta();
}

// Adiciona initMinhaConta ao DOMContentLoaded (hooks integrados nas funções originais via flags)
document.addEventListener('DOMContentLoaded', () => {
    initMinhaConta();
});