class Colecionavel {
    constructor({ titulo, autor, ano }) {
        if (new.target === Colecionavel) {
            throw new Error('Colecionavel e abstrata');
        }
        this.titulo = titulo;
        this.autor = autor;
        this.ano = ano;
    }

    get categoria() {
        return 'Colecionavel';
    }

    detalhes() {
        return '';
    }

    resumo() {
        return {
            titulo: this.titulo,
            categoria: this.categoria,
            autor: this.autor,
            ano: this.ano,
            detalhes: this.detalhes()
        };
    }
}

class Livro extends Colecionavel {
    constructor({ titulo, autor, ano, paginas, genero }) {
        super({ titulo, autor, ano });
        this.paginas = paginas;
        this.genero = genero;
    }

    get categoria() {
        return 'Livro';
    }

    detalhes() {
        return `${this.genero} | ${this.paginas} paginas`;
    }
}

class Filme extends Colecionavel {
    constructor({ titulo, autor, ano, duracaoMin, classificacao }) {
        super({ titulo, autor, ano });
        this.duracaoMin = duracaoMin;
        this.classificacao = classificacao;
    }

    get categoria() {
        return 'Filme';
    }

    detalhes() {
        return `${this.duracaoMin} min | ${this.classificacao}`;
    }
}

class Jogo extends Colecionavel {
    constructor({ titulo, autor, ano, plataforma }) {
        super({ titulo, autor, ano });
        this.plataforma = plataforma;
    }

    get categoria() {
        return 'Jogo';
    }

    detalhes() {
        return `Plataforma: ${this.plataforma}`;
    }
}

class Catalogo {
    constructor(nome) {
        this.nome = nome;
        this.itens = [];
    }

    adicionar(item) {
        this.itens.push(item);
        return this;
    }

    listarResumos() {
        return this.itens.map((item) => item.resumo());
    }

    porCategoria(categoria) {
        return this.itens.filter((item) => item.categoria === categoria);
    }
}

const catalogoDemo = new Catalogo('Colecao demonstrativa');

catalogoDemo
    .adicionar(new Livro({ titulo: 'O Programador Pragmatico', autor: 'Andrew Hunt e David Thomas', ano: 1999, paginas: 352, genero: 'Tecnologia' }))
    .adicionar(new Filme({ titulo: 'A Origem', autor: 'Christopher Nolan', ano: 2010, duracaoMin: 148, classificacao: 'PG-13' }))
    .adicionar(new Jogo({ titulo: 'The Legend of Zelda: Breath of the Wild', autor: 'Nintendo', ano: 2017, plataforma: 'Nintendo Switch' }));

const resumos = catalogoDemo.listarResumos();
console.log(`Catalogo "${catalogoDemo.nome}" possui ${resumos.length} itens.`);
console.table(resumos);
console.log('Apenas filmes:', catalogoDemo.porCategoria('Filme').map((item) => item.titulo));

module.exports = { Colecionavel, Livro, Filme, Jogo, Catalogo };
