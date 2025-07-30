
🪙 DevCripto

Aplicação web desenvolvida com React + TypeScript que permite pesquisar e visualizar informações em tempo real sobre criptomoedas, incluindo preço, volume, valor de mercado e variação nas últimas 24h.

--------------------------------------------------

🚀 Funcionalidades

- 🔍 Busca por nome da moeda (ex: bitcoin, ethereum)
- 📊 Exibição de dados atualizados:
  - Preço atual (USD)
  - Valor de mercado (market cap)
  - Volume de transações (24h)
  - Variação percentual (24h)
- 📈 Carregamento progressivo de moedas (paginado com botão “Carregar mais”)
- 🧭 Navegação entre página inicial e página de detalhes da moeda

--------------------------------------------------

🛠️ Tecnologias utilizadas

- React
- TypeScript
- React Router DOM
- CoinCap API
- CSS Modules
- React Icons

--------------------------------------------------

📦 Instalação

1. Clone o repositório
   git clone https://github.com/ArturIbanez/devcripto.git

2. Acesse a pasta do projeto
   cd devcripto

3. Instale as dependências
   npm install

4. Inicie o servidor local
   npm run dev

--------------------------------------------------

📄 Como usar

1. Digite o nome de uma criptomoeda no campo de busca (ex: bitcoin)
2. Clique na moeda desejada na tabela ou pressione Enter para ir direto para os detalhes
3. Clique em "Carregar mais" para ver mais moedas
4. Navegue para a página de detalhes para ver mais informações sobre a moeda

--------------------------------------------------

🌐 API utilizada

Todos os dados são fornecidos pela CoinCap API:
- GET /assets: lista de moedas
- GET /assets/:id: detalhes de uma moeda

--------------------------------------------------

🧑‍💻 Autor

Desenvolvido por Artur Ibañez
GitHub: https://github.com/ArturIbanez
