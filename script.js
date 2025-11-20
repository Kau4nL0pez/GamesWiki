let cardContainer = document.querySelector(".card-container");
let campoBusca = document.querySelector("header input");
let dados = [];
 
async function carregarDados() {
    try {
        let resposta = await fetch("data.json");
        dados = await resposta.json();
        renderizarCards(dados); // Mostra todos os cards inicialmente
    } catch (error) {
        console.error("Falha ao buscar dados:", error);
    }
}
 
function executarBusca() {
    const termoBusca = campoBusca.value.toLowerCase();
    const dadosFiltrados = dados.filter(dado =>
        dado.nome.toLowerCase().includes(termoBusca) ||
        dado.genero.toLowerCase().includes(termoBusca) ||
        dado.desenvolvedor.toLowerCase().includes(termoBusca)
    );
 
    renderizarCards(dadosFiltrados);
}
 
function renderizarCards(dados) {
    cardContainer.innerHTML = ""; // Limpa os cards existentes antes de renderizar novos
    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <h2>${dado.nome}</h2>
        <p><strong>Desenvolvedor:</strong> ${dado.desenvolvedor}</p>
        <p><strong>Gênero:</strong> ${dado.genero}</p>
        <p><strong>Plataformas:</strong> ${dado.plataformasDisponiveis}</p>
        <a href="${dado.site}" target="_blank">Saiba mais</a>
        `
        cardContainer.appendChild(article);
    }
}

// Adiciona o "ouvinte" de eventos ao campo de busca
campoBusca.addEventListener('input', executarBusca);

// Carrega os dados assim que o script é executado
carregarDados();
