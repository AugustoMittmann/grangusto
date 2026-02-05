/* ============================================
   EMPÓRIO GRANGUSTO - ATENDIMENTO DIGITAL
   Lógica do Questionário e Recomendações
   ============================================ */

// Estado do questionário
const quizState = {
    currentQuestion: 0,
    answers: {
        preco: null,
        ocasiao: null,
        corpo: null,
        tipo: null,
        sabor: null
    },
    history: ['welcome']
};

// Configuração do WhatsApp
const WHATSAPP_NUMBER = '5551992975072';

// Mapa de recomendações de vinhos
// Estrutura: tipo-corpo-sabor (com algumas variações por preço e ocasião)
const recommendations = {
    // TINTOS ENCORPADOS
    'tinto-encorpado-seco': {
        nome: 'Cabernet Sauvignon Gran Reserva',
        video: 'videos/cabernet-gran-reserva.mp4'
    },
    'tinto-encorpado-frutado': {
        nome: 'Malbec Reserva Mendoza',
        video: 'videos/malbec-reserva.mp4'
    },
    'tinto-encorpado-equilibrado': {
        nome: 'Carménère Premium Chile',
        video: 'videos/carmenere-premium.mp4'
    },
    
    // TINTOS MÉDIOS
    'tinto-medio-seco': {
        nome: 'Pinot Noir Borgonha',
        video: 'videos/pinot-noir.mp4'
    },
    'tinto-medio-frutado': {
        nome: 'Merlot Reserva Valle Central',
        video: 'videos/merlot-reserva.mp4'
    },
    'tinto-medio-equilibrado': {
        nome: 'Tempranillo Rioja Crianza',
        video: 'videos/tempranillo-rioja.mp4'
    },
    
    // TINTOS LEVES
    'tinto-leve-seco': {
        nome: 'Pinot Noir Clássico',
        video: 'videos/pinot-noir-classico.mp4'
    },
    'tinto-leve-frutado': {
        nome: 'Beaujolais Villages',
        video: 'videos/beaujolais.mp4'
    },
    'tinto-leve-equilibrado': {
        nome: 'Lambrusco Emilia',
        video: 'videos/lambrusco.mp4'
    },
    
    // BRANCOS ENCORPADOS
    'branco-encorpado-seco': {
        nome: 'Chardonnay Reserva Napa Valley',
        video: 'videos/chardonnay-napa.mp4'
    },
    'branco-encorpado-frutado': {
        nome: 'Viognier Premium',
        video: 'videos/viognier.mp4'
    },
    'branco-encorpado-equilibrado': {
        nome: 'Chardonnay Barrica',
        video: 'videos/chardonnay-barrica.mp4'
    },
    
    // BRANCOS MÉDIOS
    'branco-medio-seco': {
        nome: 'Sauvignon Blanc Nova Zelândia',
        video: 'videos/sauvignon-blanc-nz.mp4'
    },
    'branco-medio-frutado': {
        nome: 'Riesling Alsácia',
        video: 'videos/riesling-alsacia.mp4'
    },
    'branco-medio-equilibrado': {
        nome: 'Albariño Rías Baixas',
        video: 'videos/albarino.mp4'
    },
    
    // BRANCOS LEVES
    'branco-leve-seco': {
        nome: 'Vinho Verde DOC',
        video: 'videos/vinho-verde.mp4'
    },
    'branco-leve-frutado': {
        nome: 'Moscato d\'Asti',
        video: 'videos/moscato-asti.mp4'
    },
    'branco-leve-equilibrado': {
        nome: 'Pinot Grigio Trentino',
        video: 'videos/pinot-grigio.mp4'
    },
    
    // ROSÉS
    'rose-leve-seco': {
        nome: 'Rosé de Provence',
        video: 'videos/rose-provence.mp4'
    },
    'rose-leve-frutado': {
        nome: 'White Zinfandel California',
        video: 'videos/white-zinfandel.mp4'
    },
    'rose-leve-equilibrado': {
        nome: 'Rosé Côtes du Rhône',
        video: 'videos/rose-cotes-rhone.mp4'
    },
    'rose-medio-seco': {
        nome: 'Rosé de Provence',
        video: 'videos/rose-provence.mp4'
    },
    'rose-medio-frutado': {
        nome: 'Rosé Tavel',
        video: 'videos/rose-tavel.mp4'
    },
    'rose-medio-equilibrado': {
        nome: 'Rosé Navarra',
        video: 'videos/rose-navarra.mp4'
    },
    'rose-encorpado-seco': {
        nome: 'Rosé Bandol',
        video: 'videos/rose-bandol.mp4'
    },
    'rose-encorpado-frutado': {
        nome: 'Rosé Tavel',
        video: 'videos/rose-tavel.mp4'
    },
    'rose-encorpado-equilibrado': {
        nome: 'Rosé Côtes de Provence Premium',
        video: 'videos/rose-provence-premium.mp4'
    },
    
    // ESPUMANTES
    'espumante-leve-seco': {
        nome: 'Prosecco Extra Dry',
        video: 'videos/prosecco.mp4'
    },
    'espumante-leve-frutado': {
        nome: 'Moscato Spumante',
        video: 'videos/moscato-spumante.mp4'
    },
    'espumante-leve-equilibrado': {
        nome: 'Cava Brut',
        video: 'videos/cava-brut.mp4'
    },
    'espumante-medio-seco': {
        nome: 'Champagne Brut',
        video: 'videos/champagne-brut.mp4'
    },
    'espumante-medio-frutado': {
        nome: 'Crémant de Loire',
        video: 'videos/cremant-loire.mp4'
    },
    'espumante-medio-equilibrado': {
        nome: 'Franciacorta Brut',
        video: 'videos/franciacorta.mp4'
    },
    'espumante-encorpado-seco': {
        nome: 'Champagne Blanc de Noirs',
        video: 'videos/champagne-blanc-noirs.mp4'
    },
    'espumante-encorpado-frutado': {
        nome: 'Champagne Rosé',
        video: 'videos/champagne-rose.mp4'
    },
    'espumante-encorpado-equilibrado': {
        nome: 'Champagne Grand Cru',
        video: 'videos/champagne-grand-cru.mp4'
    }
};

// Recomendação padrão (fallback)
const defaultRecommendation = {
    nome: 'Casillero del Diablo Cabernet Sauvignon',
    video: 'videos/casillero-diablo.mp4'
};

// ============================================
// FUNÇÕES DE NAVEGAÇÃO
// ============================================

function startQuiz() {
    navigateTo('question-1');
}

function goBack() {
    if (quizState.history.length > 1) {
        quizState.history.pop(); // Remove tela atual
        const previousScreen = quizState.history[quizState.history.length - 1];
        
        // Limpa a resposta da pergunta atual se voltando de uma pergunta
        const currentQuestionNum = getCurrentQuestionNumber();
        if (currentQuestionNum > 0) {
            const questionKey = getQuestionKey(currentQuestionNum);
            quizState.answers[questionKey] = null;
        }
        
        navigateTo(previousScreen, true);
    }
}

function restartQuiz() {
    // Reset state
    quizState.currentQuestion = 0;
    quizState.answers = {
        preco: null,
        ocasiao: null,
        corpo: null,
        tipo: null,
        sabor: null
    };
    quizState.history = ['welcome'];
    
    // Limpa seleções visuais
    document.querySelectorAll('.option-btn.selected').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Volta para o início
    navigateTo('welcome');
}

function navigateTo(screenId, isBack = false) {
    const currentScreen = document.querySelector('.screen.active');
    const nextScreen = document.getElementById(screenId);
    
    if (!nextScreen) return;
    
    // Animação de saída
    if (currentScreen) {
        currentScreen.classList.add(isBack ? 'slide-in' : 'slide-out');
        currentScreen.classList.remove('active');
        
        setTimeout(() => {
            currentScreen.classList.remove('slide-in', 'slide-out');
            currentScreen.style.display = 'none';
        }, 300);
    }
    
    // Animação de entrada
    setTimeout(() => {
        nextScreen.style.display = 'flex';
        nextScreen.classList.add('active', isBack ? 'slide-out' : 'slide-in');
        
        setTimeout(() => {
            nextScreen.classList.remove('slide-in', 'slide-out');
        }, 400);
    }, 100);
    
    // Atualiza histórico
    if (!isBack && !quizState.history.includes(screenId)) {
        quizState.history.push(screenId);
    }
    
    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// FUNÇÕES DE PERGUNTAS
// ============================================

function getCurrentQuestionNumber() {
    const activeScreen = document.querySelector('.screen.active');
    if (!activeScreen) return 0;
    
    const match = activeScreen.id.match(/question-(\d+)/);
    return match ? parseInt(match[1]) : 0;
}

function getQuestionKey(questionNum) {
    const keys = ['preco', 'ocasiao', 'corpo', 'tipo', 'sabor'];
    return keys[questionNum - 1] || null;
}

function selectOption(button) {
    const question = button.dataset.question;
    const value = button.dataset.value;
    
    // Remove seleção anterior na mesma pergunta
    const siblings = button.parentElement.querySelectorAll('.option-btn');
    siblings.forEach(btn => btn.classList.remove('selected'));
    
    // Adiciona seleção ao botão clicado
    button.classList.add('selected');
    
    // Salva a resposta
    quizState.answers[question] = value;
    
    // Avança para próxima pergunta após breve delay
    setTimeout(() => {
        advanceToNextQuestion();
    }, 300);
}

function advanceToNextQuestion() {
    const currentNum = getCurrentQuestionNumber();
    
    if (currentNum < 5) {
        navigateTo(`question-${currentNum + 1}`);
    } else {
        // Última pergunta - mostra resultado
        showResult();
    }
}

// ============================================
// FUNÇÕES DE RESULTADO
// ============================================

function getRecommendations() {
    const { tipo, corpo, sabor, preco, ocasiao } = quizState.answers;
    
    const wineOptions = [];
    
    // Gera chave principal
    const primaryKey = `${tipo}-${corpo}-${sabor}`;
    
    // 1ª opção - Combinação exata (tipo-corpo-sabor)
    let primaryRec = recommendations[primaryKey];
    if (primaryRec) {
        wineOptions.push(primaryRec);
    }
    
    // 2ª opção - Varia o corpo (mantém tipo e sabor)
    const corpos = ['leve', 'medio', 'encorpado'];
    const otherCorpos = corpos.filter(c => c !== corpo);
    
    for (const otherCorpo of otherCorpos) {
        const altKey = `${tipo}-${otherCorpo}-${sabor}`;
        if (recommendations[altKey] && !wineOptions.includes(recommendations[altKey])) {
            wineOptions.push(recommendations[altKey]);
            break;
        }
    }
    
    // 3ª opção - Varia o sabor (mantém tipo e corpo)
    const sabores = ['seco', 'frutado', 'equilibrado'];
    const otherSabores = sabores.filter(s => s !== sabor);
    
    for (const otherSabor of otherSabores) {
        const altKey = `${tipo}-${corpo}-${otherSabor}`;
        if (recommendations[altKey] && !wineOptions.includes(recommendations[altKey])) {
            wineOptions.push(recommendations[altKey]);
            break;
        }
    }
    
    // Se ainda não tiver 3 opções, busca mais alternativas
    while (wineOptions.length < 3) {
        // Busca por qualquer vinho do mesmo tipo que ainda não está na lista
        const allKeysOfType = Object.keys(recommendations).filter(k => k.startsWith(tipo));
        
        for (const key of allKeysOfType) {
            if (!wineOptions.includes(recommendations[key])) {
                wineOptions.push(recommendations[key]);
                break;
            }
        }
        
        // Se mesmo assim não encontrar, usa o padrão
        if (wineOptions.length === 0 || allKeysOfType.length === 0) {
            wineOptions.push(defaultRecommendation);
            break;
        }
    }
    
    // Garante que sempre retorne exatamente 3 opções
    while (wineOptions.length < 3) {
        wineOptions.push(defaultRecommendation);
    }
    
    return wineOptions.slice(0, 3);
}

function showResult() {
    const wineRecommendations = getRecommendations();
    
    // Atualiza os 3 vinhos
    wineRecommendations.forEach((wine, index) => {
        const wineNum = index + 1;
        
        // Atualiza nome do vinho
        const wineNameEl = document.getElementById(`wine-name-${wineNum}`);
        wineNameEl.textContent = wine.nome;
        
        // Atualiza vídeo
        const videoEl = document.getElementById(`wine-video-${wineNum}`);
        const sourceEl = videoEl.querySelector('source');
        sourceEl.src = wine.video;
        videoEl.load();
    });
    
    // Atualiza link do WhatsApp com todos os 3 vinhos
    const whatsappBtn = document.getElementById('whatsapp-btn');
    const wineNames = wineRecommendations.map(w => w.nome).join(', ');
    const message = encodeURIComponent(`Vim pelo site e os vinhos ideais para mim são: ${wineNames}`);
    whatsappBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    
    // Navega para tela de resultado
    navigateTo('result');
}

// ============================================
// INICIALIZAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Adiciona event listener ao botão "Começar"
    const startBtn = document.querySelector('.start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', function(e) {
            e.preventDefault();
            startQuiz();
        });
    }
    
    // Adiciona event listeners aos botões de voltar
    const backButtons = document.querySelectorAll('.btn-back');
    backButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            goBack();
        });
    });
    
    // Adiciona event listener ao botão "Refazer"
    const restartBtn = document.querySelector('.btn-restart');
    if (restartBtn) {
        restartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            restartQuiz();
        });
    }
    
    // Adiciona event listeners aos botões de opção
    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            selectOption(this);
        });
    });
    
    // Nota: Removido o preventDefault em links para permitir que o WhatsApp funcione
    
    // Teclado - Enter para avançar, Escape para voltar
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            goBack();
        }
    });
    
    // Touch feedback para mobile
    optionButtons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        }, { passive: true });
        
        button.addEventListener('touchend', function() {
            this.style.transform = '';
        }, { passive: true });
    });
    
    console.log('Empório GranGusto - Quiz inicializado');
});

// ============================================
// FUNÇÕES UTILITÁRIAS
// ============================================

// Valida se todas as respostas foram preenchidas
function validateAnswers() {
    return Object.values(quizState.answers).every(answer => answer !== null);
}

// Debug - mostra estado atual (remover em produção)
function debugState() {
    console.log('Quiz State:', quizState);
    console.log('Answers:', quizState.answers);
}