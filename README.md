# Trabalho Pratico GCC188 - Receitas Buchinho Cheio
* Buchinho Cheio é um site voltado para todos os públicos que possibilita que os usuários compartilhem e pesquisem por receitas.

## Membros

- Ghabriell Luz Alves da Silva
- Luiz Carlos Bessa de Lima
- Taiane Rodrigues de Sousa

## Tecnologias Utilizadas

### Front-end:

- Vue.js 2.6.11
- HTML5
- CSS3
- JS ECMAScript 2018

### Back-end:

- Node.js 14.18.0
- Express.js 4.17.1

### Banco de dados:

- Mongodb - 5.0.3
### Descrição das Pastas
- CodigoFonte: Diretório contendo backend e frontend.
  - backend
      - src: código fonte
        - app
          - controllers: lógica de cada uma das rotas
          - schemas: definição/estrutura dos dados, como se fosse as tabelas das entidades
          - middlewares: intermediário entre o frontend que terá cliente realizando a requisição [intermediário entre requisição e execução do código], verifica quem pode fazer acesso ou não
          - config: configurações relacionadas ao servidor para facilitar caso seja necessário migrar para outro 
          - database: tudo relacionado ao banco de dados
  - frontend
      - public: pasta que contém os arquivos que serão publicados na aplicação;
      - src: código fonte
        - assets: usada para armazenar os arquivos de mídia
        - components: contém todos os componentes que serão utilizados no projeto
        - router: gerenciamento das rotas que serão utilizadas para exibir as views
        - services/api: comunicação com o backend
        - views: telas da aplicação


- Diagramas: Diretório contendo os diagramas de classes, sequência, implantação e casos de uso.
- Padrões Adotados: Diretório contendo padrões para documentação e codificação.
- Protótipo de Interface: Diretório contendo as imagens da interface do projeto.
- Requisitos: Diretório contendo a documentação dos requisitos.
## Padrões de uso do Git

### Branches
- A master será a branch utilizada com o projeto mais atualizado após testes
- A dev será a branch utilizada para realização de testes
- As branches vinculadas à issues serão criadas de acordo com o nome da issue para melhor identificação das funcionalidades

### Issues
- Para todas as funcionalidades, serão criadas issues com backlog, rastreabilidade dos requisitos e links do documento de requisitos e protótipo de interface

### Padrões de Commit
- Mensagens claras e objetivas
- Utilizar o modo imperativo, por exemplo “Adiciona tabela"
- Deverão possuir no máximo 50 caracteres

## Home page
![Home page](https://user-images.githubusercontent.com/56057915/139553999-1277be93-7d2f-4c70-9d4c-41e269ab5c00.png)
