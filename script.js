// script.js - Modern Agroforestry Website

// ==================== DARK MODE ====================
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check for saved preference
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.checked = true;
}

darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
    }
});

// ==================== CUSTOM CURSOR ====================
const customCursor = document.querySelector('.custom-cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (customCursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
        customCursor.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
        cursorFollower.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
    });
    
    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .card-3d, .benefit-card, .ia-card, .accordion-header');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorFollower.style.transform = `scale(1.5)`;
            cursorFollower.style.borderColor = '#a855f7';
        });
        el.addEventListener('mouseleave', () => {
            cursorFollower.style.transform = `scale(1)`;
            cursorFollower.style.borderColor = 'rgba(59,130,246,0.5)';
        });
    });
}

// ==================== SIDEBAR / MENU HAMBURGER ====================
const menuToggle = document.getElementById('menuToggle');
const sidebarNav = document.getElementById('sidebarNav');
const closeNav = document.getElementById('closeNav');

function openSidebar() {
    sidebarNav.classList.add('open');
}

function closeSidebar() {
    sidebarNav.classList.remove('open');
}

if (menuToggle) menuToggle.addEventListener('click', openSidebar);
if (closeNav) closeNav.addEventListener('click', closeSidebar);

// Close sidebar when clicking on a link
document.querySelectorAll('.sidebar-nav a').forEach(link => {
    link.addEventListener('click', closeSidebar);
});

// ==================== ACCORDION (Cultivo) ====================
const accordionItems = document.querySelectorAll('.accordion-item');
accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close all others
        accordionItems.forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
    });
});

// Open first accordion by default
if (accordionItems.length) accordionItems[0].classList.add('active');

// ==================== SCROLL ANIMATIONS (Intersection Observer) ====================
const animatedElements = document.querySelectorAll('.card-3d, .benefit-card, .compare-table, .accordion-wrapper');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==================== CHATBOT IA INTEGRATION ====================
const chatbotBtn = document.getElementById('chatbotBtn');
const chatbotPanel = document.getElementById('chatbotPanel');
const closeChat = document.getElementById('closeChat');
const sendChat = document.getElementById('sendChat');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');

// Knowledge base for AI responses (based on PDF content)
const knowledgeBase = {
    'vantagens': 'Ambientais: recupera nascentes, sequestra carbono. Econômicos: colheita o ano todo, baixo custo. Sociais: alimentos saudáveis sem veneno.',
    'beneficios': 'Ambientais, econômicos e sociais. Solo protegido, biodiversidade, retenção de água natural.',
    'pragas': 'A agrofloresta controla pragas por equilíbrio natural e biodiversidade, sem agrotóxicos.',
    'estratificacao': 'Ocupação do espaço em diferentes alturas: plantas rasteiras, arbustos e árvores altas para máximo aproveitamento do sol.',
    'sucessao': 'Espécies de ciclo curto preparam o terreno para espécies de ciclo longo (madeira, frutas).',
    'poda': 'Cobrir o solo com galhos e folhas funciona como adubo orgânico natural, mantendo umidade.',
    'monocultura': 'A agricultura convencional usa monocultura, solo exposto e agrotóxicos. Já a agrofloresta promove policultivo e biodiversidade.',
    'ciclo curto': 'Alface, rabanete, milho, feijão (0-6 meses)',
    'ciclo medio': 'Banana, mamão, abacaxi, café, cacau (1-3 anos)',
    'ciclo longo': 'Castanhas, mogno, jacarandá, árvores frutíferas grandes (+10 anos)',
    'recomendacao': 'Baseado no seu perfil: cultivo inicial ideal: milho + feijão (ciclo curto) + banana (renda média). Adicione árvores de castanha para futuro.',
    'default': 'A agrofloresta (SAF) é um sistema ecológico que imita a natureza. Pergunte sobre pilares, benefícios, ciclos ou comparação com convencional.'
};

function getBotResponse(question) {
    const lowerQ = question.toLowerCase();
    if (lowerQ.includes('vantagem') || lowerQ.includes('benefício')) return knowledgeBase.vantagens;
    if (lowerQ.includes('praga') || lowerQ.includes('pragas')) return knowledgeBase.pragas;
    if (lowerQ.includes('estratificação') || lowerQ.includes('estratificacao')) return knowledgeBase.estratificacao;
    if (lowerQ.includes('sucessão') || lowerQ.includes('sucessao')) return knowledgeBase.sucessao;
    if (lowerQ.includes('poda') || lowerQ.includes('biomassa')) return knowledgeBase.poda;
    if (lowerQ.includes('monocultura') || lowerQ.includes('convencional')) return knowledgeBase.monocultura;
    if (lowerQ.includes('ciclo curto') || (lowerQ.includes('alface') && lowerQ.includes('milho'))) return knowledgeBase['ciclo curto'];
    if (lowerQ.includes('ciclo médio') || lowerQ.includes('banana')) return knowledgeBase['ciclo medio'];
    if (lowerQ.includes('ciclo longo') || lowerQ.includes('castanha')) return knowledgeBase['ciclo longo'];
    if (lowerQ.includes('recomenda') || lowerQ.includes('sugestão') || lowerQ.includes('cultivar')) return knowledgeBase.recomendacao;
    if (lowerQ.includes('olá') || lowerQ.includes('oi')) return '🌿 Olá! Pergunte sobre agrofloresta, espécies ou benefícios.';
    return knowledgeBase.default;
}

function addMessage(text, isUser = false) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('msg', isUser ? 'user' : 'bot');
    msgDiv.innerHTML = isUser ? `<i class="fas fa-user"></i> ${text}` : `<i class="fas fa-leaf"></i> ${text}`;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendMessage() {
    const question = chatInput.value.trim();
    if (!question) return;
    addMessage(question, true);
    const answer = getBotResponse(question);
    setTimeout(() => addMessage(answer, false), 300);
    chatInput.value = '';
}

if (chatbotBtn) {
    chatbotBtn.addEventListener('click', () => {
        chatbotPanel.classList.toggle('open');
    });
}
if (closeChat) {
    closeChat.addEventListener('click', () => {
        chatbotPanel.classList.remove('open');
    });
}
if (sendChat) {
    sendChat.addEventListener('click', sendMessage);
}
if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}

// ==================== IA RECOMENDATION CARD (Personalização) ====================
const recommendCard = document.getElementById('recommendCard');
const iaOutput = document.getElementById('iaOutput');
const customizeBtn = document.getElementById('customizeIA');

let biomaPreference = 'Mata Atlântica'; // Default

function generateRecommendation() {
    if (biomaPreference === 'Mata Atlântica') {
        iaOutput.innerHTML = '🌳 Recomendação IA: <strong>Pupunha + cacau + banana + feijão</strong>. Ciclo curto, médio e árvores de dossel.';
    } else if (biomaPreference === 'Cerrado') {
        iaOutput.innerHTML = '☀️ Recomendação IA: <strong>Baru + pequi + mandioca + milho</strong>. Adaptadas ao Cerrado, com alta resiliência.';
    } else if (biomaPreference === 'Amazônia') {
        iaOutput.innerHTML = '🌴 Recomendação IA: <strong>Cacau + cupuaçu + pupunha + castanha</strong>. SAF amazônico biodiverso.';
    } else {
        iaOutput.innerHTML = '🌱 Recomendação base: <strong>Alface (ciclo curto) + milho + banana</strong>. Inicie com estratificação herbácea.';
    }
}

if (recommendCard) {
    recommendCard.addEventListener('click', () => {
        generateRecommendation();
        iaOutput.style.animation = 'none';
        iaOutput.offsetHeight;
        iaOutput.style.animation = 'pulse 0.4s ease';
    });
}

if (customizeBtn) {
    customizeBtn.addEventListener('click', () => {
        const newBioma = prompt('Personalize sua IA: escolha Bioma (Mata Atlântica, Cerrado, Amazônia) ou outro:', biomaPreference);
        if (newBioma && newBioma.trim()) {
            biomaPreference = newBioma.trim();
            generateRecommendation();
            addChatbotMessagePersonalizado(`Bioma alterado para ${biomaPreference}. Recomendação atualizada!`);
        }
    });
}

function addChatbotMessagePersonalizado(msg) {
    if (chatMessages) {
        const botMsg = document.createElement('div');
        botMsg.classList.add('msg', 'bot');
        botMsg.innerHTML = `<i class="fas fa-microchip"></i> ${msg}`;
        chatMessages.appendChild(botMsg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// ==================== PARTICLES BACKGROUND (Sutis) ====================
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    for (let i = 0; i < 45; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 15 + 8}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.background = `rgba(59, 130, 246, ${Math.random() * 0.4})`;
        particle.style.position = 'absolute';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particlesContainer.appendChild(particle);
    }
}

// Add particle styles dynamically
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    .particles-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 0;
    }
    .particle {
        position: absolute;
        border-radius: 50%;
        opacity: 0.5;
        animation: floatParticle linear infinite;
    }
    @keyframes floatParticle {
        0% { transform: translateY(0) translateX(0); opacity: 0; }
        20% { opacity: 0.6; }
        80% { opacity: 0.6; }
        100% { transform: translateY(-100vh) translateX(30px); opacity: 0; }
    }
    .ia-output {
        transition: all 0.2s;
    }
    @keyframes pulse {
        0% { transform: scale(1); background: rgba(255,255,255,0.2);}
        50% { transform: scale(1.02); background: rgba(255,255,255,0.4);}
        100% { transform: scale(1); background: transparent;}
    }
`;
document.head.appendChild(styleSheet);
initParticles();

// ==================== PARALLAX LEVE ====================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-section');
    if (hero) {
        hero.style.backgroundPosition = `50% ${scrolled * 0.3}px`;
    }
});

// ==================== GLASSMORPHISM CARD HOVER 3D ====================
const cards3d = document.querySelectorAll('.card-3d');
cards3d.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
});

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === "#" || href === "") return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ==================== ADD LAST UPDATE TIMESTAMP ====================
const updateSpan = document.querySelector('.last-update');
if (updateSpan) {
    const date = new Date();
    updateSpan.innerHTML = `<i class="fas fa-sync-alt"></i> Última atualização: ${date.toLocaleDateString('pt-BR')} • Dados Embrapa SAFs`;
}

// ==================== PWA INSTALL PROMPT SIMULATED (Service Worker optional) ====================
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(err => console.log('Service worker not registered', err));
}
// Simple offline cache note: just for demonstration, not mandatory for main content.

// Initialize any tooltip or micro-interactions
console.log('🌱 Site Agrofloresta carregado - Moderno, gradientes e IA integrada');