# Exercício Boas Práticas CSS - Metodologia BEM

Este projeto demonstra a aplicação da metodologia BEM (Block Element Modifier) para organização de CSS.

## Estrutura do Projeto

```
boas_praticas_css/
├── index.html              # HTML com classes BEM aplicadas
├── main.css               # CSS compilado
├── src/
│   └── styles/
│       ├── main.scss           # Arquivo principal SASS
│       ├── _variaveis.scss     # Variáveis do projeto
│       ├── _reset.scss         # Reset CSS
│       ├── _produtos-lista.scss # Estilos do container de produtos
│       └── _produto.scss       # Estilos do bloco produto
└── README.md
```

## Metodologia BEM Aplicada

### Blocos Identificados:
- **produtos-lista**: Container principal dos produtos
- **produto**: Card individual de produto

### Elementos:
- **produto__imagem**: Imagem do produto
- **produto__titulo**: Título do produto
- **produto__descricao**: Descrição do produto

### Modificadores:
- **produto--destaque**: Versão em destaque do produto (com borda dourada e fundo amarelo)

## Nomenclatura BEM

- **Bloco**: `.produto`
- **Elemento**: `.produto__titulo` (bloco + dois underscores + elemento)
- **Modificador**: `.produto--destaque` (bloco + dois hífens + modificador)

## Compilação SASS

Para compilar os arquivos SASS, você pode usar:

```bash
npm install
npm run sass
```

Ou compilar manualmente:

```bash
sass src/styles/main.scss main.css
```

## Alterações Realizadas

### HTML:
- Substituído `class="produtos"` por `class="produtos-lista"` (mais semântico)
- Alterado `class="produto-imagem"` para `class="produto__imagem"` (elemento)
- Alterado `class="produto-nome"` para `class="produto__titulo"` (elemento)
- Alterado `class="produto-descricao"` para `class="produto__descricao"` (elemento)
- Alterado `class="em-destaque"` para `class="produto--destaque"` (modificador)
- Trocado `<div>` por `<article>` para melhor semântica
- Adicionado atributo `alt` nas imagens

### CSS/SASS:
- Organizado em arquivos parciais por responsabilidade
- Criado arquivo de variáveis para valores reutilizáveis
- Aplicada nomenclatura BEM em todos os seletores
- Adicionados efeitos de hover no produto em destaque
- Melhorada a organização com grid-template-columns usando repeat()
- Adicionado box-sizing: border-box no reset

## Benefícios da Metodologia BEM

1. **Modularidade**: Cada bloco é independente e reutilizável
2. **Clareza**: Nomenclatura clara indica a hierarquia e propósito
3. **Manutenibilidade**: Fácil localizar e modificar estilos específicos
4. **Escalabilidade**: Estrutura consistente para projetos grandes
5. **Especificidade baixa**: Evita problemas de especificidade CSS
